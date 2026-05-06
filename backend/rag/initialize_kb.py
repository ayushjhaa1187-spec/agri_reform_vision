import os
from backend.rag.rag_engine import agro_rag
from backend.rag.knowledge import AGRI_KNOWLEDGE

def initialize_knowledge_base():
    print("Initializing Agricultural Knowledge Base...")
    agro_rag.index_documents(AGRI_KNOWLEDGE)
    print("Knowledge base initialized successfully.")

if __name__ == "__main__":
    initialize_knowledge_base()
