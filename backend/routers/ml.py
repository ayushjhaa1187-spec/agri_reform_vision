from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
from backend.ml_service.yield_model import yield_model

router = APIRouter(prefix="/ml", tags=["Machine Learning"])

class YieldRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

class YieldResponse(BaseModel):
    predicted_yield_kg_ha: float
    confidence_score: float
    status: str
    recommendation: str

@router.post("/predict-yield", response_model=YieldResponse)
async def predict_yield(request: YieldRequest):
    """
    Endpoint to predict crop yield based on soil and environmental factors.
    """
    try:
        # Convert Pydantic model to dict
        input_data = request.model_dump()
        result = yield_model.predict(input_data)
        return YieldResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
