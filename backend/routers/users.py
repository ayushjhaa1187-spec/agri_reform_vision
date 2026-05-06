from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Optional
from backend.auth import get_password_hash, create_access_token, verify_password, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta

router = APIRouter(prefix="/users", tags=["Users"])

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone_number: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate):
    """Register a new farmer or user."""
    # Mock DB insertion
    hashed_password = get_password_hash(user.password)
    return {"message": "User registered successfully", "email": user.email}

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    """Authenticate user and return JWT token."""
    # Mock authentication
    # In reality, fetch user from DB and use verify_password(user_credentials.password, db_user.hashed_password)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_credentials.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
