from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.rag.rag_engine import agro_rag
from backend.auth import get_current_user
from backend.database import get_db
from backend.models import User

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str

@router.post("/query", response_model=ChatResponse)
async def chat_query(
    request: ChatRequest, 
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Endpoint for farmers to ask questions to the RAG system. Deducts 1 AI credit.
    """
    # 1. Deduct Credit
    email = current_user["email"]
    result = await db.execute(select(User).where(User.email == email))
    db_user = result.scalar_one_or_none()
    
    if not db_user or db_user.ai_credits < 1:
        raise HTTPException(status_code=402, detail="Insufficient AI credits. Please upgrade your plan.")
        
    db_user.ai_credits -= 1
    await db.commit()

    # 2. Get Answer
    try:
        answer = await agro_rag.get_answer(request.question)
        return ChatResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
