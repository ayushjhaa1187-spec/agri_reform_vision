from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from backend.auth import get_current_user

router = APIRouter(prefix="/farms", tags=["Farms"])

class FarmCreate(BaseModel):
    name: str
    location_district: str
    location_state: str
    total_area_hectares: float
    primary_crop: str

class FarmResponse(FarmCreate):
    id: int
    owner_email: str

# Mock data
mock_farms = []
farm_id_counter = 1

@router.post("/", response_model=FarmResponse, status_code=status.HTTP_201_CREATED)
async def create_farm(farm: FarmCreate, current_user: dict = Depends(get_current_user)):
    """Create a new farm profile."""
    global farm_id_counter
    new_farm = {
        "id": farm_id_counter,
        "owner_email": current_user["email"],
        **farm.dict()
    }
    mock_farms.append(new_farm)
    farm_id_counter += 1
    return new_farm

@router.get("/", response_model=List[FarmResponse])
async def get_farms(current_user: dict = Depends(get_current_user)):
    """Get all farms belonging to the current user."""
    user_farms = [f for f in mock_farms if f["owner_email"] == current_user["email"]]
    return user_farms

@router.get("/{farm_id}", response_model=FarmResponse)
async def get_farm(farm_id: int, current_user: dict = Depends(get_current_user)):
    """Get details of a specific farm."""
    for f in mock_farms:
        if f["id"] == farm_id and f["owner_email"] == current_user["email"]:
            return f
    raise HTTPException(status_code=404, detail="Farm not found or not authorized")
