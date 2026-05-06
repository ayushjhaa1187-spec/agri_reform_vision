from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Dict, Any, Optional
from backend.ml_service.yield_model import yield_model
from backend.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.models import AgentDecision, User
from backend.auth import get_current_user

router = APIRouter(prefix="/ml", tags=["Machine Learning"])

class YieldRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
    farm_id: Optional[int] = None

class YieldResponse(BaseModel):
    predicted_yield_kg_ha: float
    confidence_score: float
    status: str
    recommendation: str

@router.post("/predict-yield", response_model=YieldResponse)
async def predict_yield(
    request: YieldRequest, 
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to predict crop yield and log the insight if a farm is linked. Deducts 5 AI credits.
    """
    # 1. Deduct Credit
    email = current_user["email"]
    result_user = await db.execute(select(User).where(User.email == email))
    db_user = result_user.scalar_one_or_none()
    
    if not db_user or db_user.ai_credits < 5:
        raise HTTPException(status_code=402, detail="Insufficient AI credits. Please upgrade your plan.")
        
    db_user.ai_credits -= 5
    await db.commit()

    try:
        # Convert Pydantic model to dict
        input_data = request.model_dump()
        result = yield_model.predict(input_data)
        
        if request.farm_id:
            new_insight = AgentDecision(
                farm_id=request.farm_id,
                action_type="yield_forecast",
                decision_summary=f"Forecasted Yield: {result['predicted_yield_kg_ha']} kg/ha",
                justification=result["recommendation"]
            )
            db.add(new_insight)
            await db.commit()
            
        return YieldResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
