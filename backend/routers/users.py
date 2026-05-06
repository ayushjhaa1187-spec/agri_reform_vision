from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Optional
from backend.auth import get_current_user
from backend.database import get_db
from backend.models import User
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

router = APIRouter(prefix="/users", tags=["Users"])

class UserProfile(BaseModel):
    email: str
    role: str
    ai_credits: int
    subscription_tier: str

@router.get("/me", response_model=UserProfile)
async def get_me(current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Fetch current user profile including credits and subscription."""
    email = current_user["email"]
    
    # Try to find the user
    result = await db.execute(select(User).where(User.email == email))
    db_user = result.scalar_one_or_none()
    
    if not db_user:
        # Auto-create user for prototype
        db_user = User(email=email, full_name=email.split('@')[0])
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        
    return UserProfile(
        email=db_user.email,
        role=db_user.role.value,
        ai_credits=db_user.ai_credits,
        subscription_tier=db_user.subscription_tier.value
    )
