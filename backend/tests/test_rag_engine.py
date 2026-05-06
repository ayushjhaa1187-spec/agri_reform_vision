import pytest
from unittest.mock import patch, MagicMock
from backend.rag.rag_engine import AgroRAG

@pytest.fixture
def mock_rag():
    with patch("backend.rag.rag_engine.GoogleGenerativeAIEmbeddings"), \
         patch("backend.rag.rag_engine.FAISS") as MockFAISS:
        
        mock_faiss_instance = MagicMock()
        mock_doc = MagicMock()
        mock_doc.page_content = "Wheat is good."
        mock_faiss_instance.similarity_search.return_value = [mock_doc]
        
        MockFAISS.from_documents.return_value = mock_faiss_instance
        
        rag = AgroRAG(index_path="dummy_path")
        yield rag, MockFAISS

def test_rag_query_auto_initializes():
    # It should not be empty even for a non-existent path because of auto-init
    rag = AgroRAG(index_path="temp_non_existent")
    result = rag.query("wheat")
    assert "Wheat" in result

def test_rag_index_and_query(mock_rag):
    rag, mock_faiss_class = mock_rag
    
    rag.index_documents(["test document about wheat"])
    
    assert mock_faiss_class.from_documents.called
    assert rag.vector_db is not None
    
    result = rag.query("wheat")
    assert result == "Wheat is good."
