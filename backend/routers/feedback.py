from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import get_db
from backend.auth import get_current_user
from backend.models import User
import uuid
import json
import os

router = APIRouter(prefix="/feedback", tags=["Feedback"])

class FeedbackRequest(BaseModel):
    category: str  # e.g., "UI", "Agent Decision", "ML Prediction", "Other"
    rating: int    # 1-5
    comment: str
    context: dict = {} # Extra context like current telemetry or agent state

@router.post("/submit")
async def submit_feedback(
    request: FeedbackRequest, 
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Submits user feedback and saves it to a local JSON file (simulating a feedback DB/queue).
    In a real app, this would go to a Feedback table or Sentry.
    """
    feedback_id = str(uuid.uuid4())
    feedback_data = {
        "id": feedback_id,
        "email": current_user["email"],
        "category": request.category,
        "rating": request.rating,
        "comment": request.comment,
        "context": request.context,
        "timestamp": uuid.uuid4().hex # Not ideal but just for unique keying
    }
    
    # Save to a local file for audit
    os.makedirs("feedback_logs", exist_ok=True)
    with open(f"feedback_logs/feedback_{feedback_id}.json", "w") as f:
        json.dump(feedback_data, f, indent=2)
        
    return {"status": "success", "message": "Thank you for your feedback! Our agronomists will review it.", "id": feedback_id}
