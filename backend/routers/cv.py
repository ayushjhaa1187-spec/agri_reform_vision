import os
import json
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from typing import List
from backend.auth import get_current_user

router = APIRouter(prefix="/cv", tags=["Computer Vision"])

# Mock disease detection logic
DISEASES = {
    "leaf_rust": {"name": "Leaf Rust", "confidence": 0.92, "treatment": "Apply fungicides containing propiconazole or tebuconazole."},
    "late_blight": {"name": "Late Blight", "confidence": 0.88, "treatment": "Remove infected plants immediately and apply copper-based fungicides."},
    "healthy": {"name": "Healthy", "confidence": 0.95, "treatment": "Maintain current care cycle."}
}

@router.post("/detect-disease")
async def detect_disease(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """
    Receives an image of a crop leaf and returns a disease diagnosis.
    In a real implementation, this would use a CNN (TensorFlow/PyTorch) model.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

    # Save file (simulated)
    filename = file.filename
    contents = await file.read()
    
    # Simulate processing delay
    import asyncio
    await asyncio.sleep(1.5)
    
    # Mock logic: pick a disease based on filename or just random for prototype
    import random
    disease_key = random.choice(list(DISEASES.keys()))
    result = DISEASES[disease_key]
    
    return {
        "status": "success",
        "diagnosis": result["name"],
        "confidence_score": result["confidence"],
        "recommended_action": result["treatment"],
        "filename": filename
    }
