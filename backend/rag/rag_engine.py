import os
from typing import List
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from dotenv import load_dotenv

load_dotenv()

class AgroRAG:
    def __init__(self, index_path: str = "backend/rag/faiss_index"):
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        self.index_path = index_path
        self.vector_db = None
        
        if os.path.exists(index_path):
            self.vector_db = FAISS.load_local(index_path, self.embeddings, allow_dangerous_deserialization=True)
            print("Loaded existing FAISS index.")

    def index_documents(self, texts: List[str]):
        """
        Indexes raw text into the FAISS vector store.
        In a full build, this would ingest the 19 agricultural textbooks.
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

# Global instance
agro_rag = AgroRAG()

if __name__ == "__main__":
    # Sample initialization with domain knowledge snippets
    sample_knowledge = [
        "Wheat in Punjab is typically sown in November and harvested in April.",
        "Optimal soil pH for wheat ranges from 6.0 to 7.5.",
        "Yellow Rust is a common fungal disease in North Indian wheat varieties.",
        "Urea should be applied in 2-3 split doses for maximum nitrogen efficiency."
    ]
    agro_rag.index_documents(sample_knowledge)
    print(f"RAG Query Test: {agro_rag.query('When is wheat harvested in Punjab?')}")
