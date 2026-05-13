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

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: dict, db: AsyncSession = Depends(get_db)):
    from backend.auth import get_password_hash
    
    # Check if user already exists
    result = await db.execute(select(User).where(User.email == user_data["email"]))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        email=user_data["email"],
        hashed_password=get_password_hash(user_data["password"]),
        full_name=user_data.get("full_name")
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return {"message": "User created successfully"}

@router.post("/login")
async def login(credentials: dict, db: AsyncSession = Depends(get_db)):
    from backend.auth import verify_password, create_access_token
    
    result = await db.execute(select(User).where(User.email == credentials["email"]))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(credentials["password"], user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserProfile)
async def get_me(current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Fetch current user profile including credits and subscription."""
    email = current_user["email"]
    
    # Try to find the user
    result = await db.execute(select(User).where(User.email == email))
    db_user = result.scalar_one_or_none()
    
    if not db_user:
        # Auto-create user for prototype if it doesn't exist (though it should now)
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

