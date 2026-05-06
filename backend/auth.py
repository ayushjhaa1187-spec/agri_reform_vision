import os
import firebase_admin
from firebase_admin import auth as firebase_auth, credentials
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# Initialize Firebase Admin
# In production, ensure GOOGLE_APPLICATION_CREDENTIALS points to your service account JSON
if not firebase_admin._apps:
    try:
        firebase_admin.initialize_app()
    except Exception as e:
        # Fallback for local development or if credentials aren't set
        print(f"Firebase Admin initialization warning: {e}")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Verify the ID token sent from the frontend
        decoded_token = firebase_auth.verify_id_token(token)
        uid = decoded_token.get("uid")
        email = decoded_token.get("email")
        
        if not uid:
            raise credentials_exception
            
        return {
            "uid": uid,
            "email": email,
            "role": "farmer" # Mock role for now
        }
    except Exception as e:
        print(f"Auth error: {e}")
        raise credentials_exception
