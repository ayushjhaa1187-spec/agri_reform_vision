import os
from typing import List
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

class AgroRAG:
    def __init__(self, index_path: str = None):
        if index_path is None:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            index_path = os.path.join(base_dir, "faiss_index")
            
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
        self.llm = ChatGoogleGenerativeAI(model="gemini-flash-latest", temperature=0.3)
        self.index_path = index_path
        self.vector_db = None
        
        if os.path.exists(index_path):
            try:
                self.vector_db = FAISS.load_local(index_path, self.embeddings, allow_dangerous_deserialization=True)
                print("Loaded existing FAISS index.")
            except Exception as e:
                print(f"Error loading FAISS index: {e}")
        else:
            print("FAISS index not found. Will initialize on first query or manual trigger.")

    def _ensure_initialized(self):
        """Lazy initialization of the knowledge base."""
        if self.vector_db is None:
            try:
                print("Lazy initializing FAISS index with default knowledge...")
                from backend.rag.knowledge import AGRI_KNOWLEDGE
                self.index_documents(AGRI_KNOWLEDGE)
            except Exception as e:
                print(f"Failed to lazy initialize RAG: {e}")
                return False
        return True

    def index_documents(self, texts: List[str]):
        """
        Indexes raw text into the FAISS vector store.
        """
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        docs = [Document(page_content=t) for t in texts]
        split_docs = text_splitter.split_documents(docs)
        
        if self.vector_db is None:
            self.vector_db = FAISS.from_documents(split_docs, self.embeddings)
        else:
            self.vector_db.add_documents(split_docs)
            
        self.vector_db.save_local(self.index_path)
        print(f"Indexed {len(split_docs)} chunks.")

    def query(self, question: str, k: int = 3) -> str:
        """
        Retrieves top-k relevant chunks for a given question.
        """
        if not self._ensure_initialized():
            return "Knowledge base not yet initialized."
            
        docs = self.vector_db.similarity_search(question, k=k)
        context = "\n\n".join([d.page_content for d in docs])
        return context

    async def get_answer(self, question: str) -> str:
        """
        Provides a conversational answer grounded in the retrieved context.
        Tailors the tone to be helpful for both novice and experienced farmers.
        """
        context = self.query(question, k=4) # Increased k for more depth
        if context == "Knowledge base not yet initialized.":
            return context

        prompt_template = """
        You are 'Agri-Intelligence Bot', a senior agricultural advisor at IIT Madras. 
        Your goal is to provide expert guidance to farmers.

        STRICT GUIDELINES:
        1. Base your answer ONLY on the provided Context if possible.
        2. If the Context doesn't have the specific answer, use your general expert knowledge but mention it's a general best practice.
        3. If a question is too vague, ask for specific details like crop type or location.
        4. TONE: 
           - For New Farmers: Explain technical terms simply.
           - For Experienced Farmers: Provide specific metrics, ratios, and dosages.
        5. FORMAT: Use clear headings, bullet points, and bold text for key dosages or dates.
        6. LANGUAGES: If the farmer asks in Hindi, respond in Hindi.

        Context:
        {context}

        Farmer's Question: {question}

        Expert Advice:
        """
        prompt = ChatPromptTemplate.from_template(prompt_template)
        chain = prompt | self.llm
        
        response = await chain.ainvoke({"context": context, "question": question})
        content = response.content
        
        if isinstance(content, list):
            text_blocks = []
            for block in content:
                if isinstance(block, dict) and block.get("type") == "text":
                    text_blocks.append(block.get("text", ""))
                elif isinstance(block, str):
                    text_blocks.append(block)
            return "".join(text_blocks)
        return str(content)

# Global instance
agro_rag = AgroRAG()

if __name__ == "__main__":
    import asyncio
    async def test():
        print(f"RAG Answering Test: {await agro_rag.get_answer('What is the best NPK ratio for cereals?')}")
    
    if agro_rag.vector_db:
        asyncio.run(test())
    else:
        print("Vector DB not found. Run initialize_kb.py first.")
