from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.rag.rag_engine import agro_rag

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str

@router.post("/query", response_model=ChatResponse)
async def chat_query(request: ChatRequest):
    """
    Endpoint for farmers to ask questions to the RAG system.
    """
    try:
        answer = await agro_rag.get_answer(request.question)
        return ChatResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
