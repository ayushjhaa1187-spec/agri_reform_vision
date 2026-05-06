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
    def __init__(self, index_path: str = "backend/rag/faiss_index"):
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
        if not self.vector_db:
            return "Knowledge base not yet initialized."
            
        docs = self.vector_db.similarity_search(question, k=k)
        context = "\n\n".join([d.page_content for d in docs])
        return context

    async def get_answer(self, question: str) -> str:
        """
        Provides a conversational answer grounded in the retrieved context.
        """
        context = self.query(question)
        if context == "Knowledge base not yet initialized.":
            return context

        prompt_template = """
        You are an expert agricultural AI assistant. Use the following context to answer the farmer's question.
        If the answer is not in the context, say that you don't have enough specific information but give general best practices.
        Keep the answer concise, encouraging, and grounded in scientific facts.

        Context:
        {context}

        Question: {question}

        Answer:
        """
        prompt = ChatPromptTemplate.from_template(prompt_template)
        chain = prompt | self.llm
        
        response = await chain.ainvoke({"context": context, "question": question})
        return response.content

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
