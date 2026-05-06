from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.auth import get_current_user
from backend.models import Farm as FarmModel, AgentDecision
from backend.database import get_db

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

@router.post("/", response_model=FarmResponse, status_code=status.HTTP_201_CREATED)
async def create_farm(farm: FarmCreate, current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Create a new farm profile and persist to DB."""
    new_farm = FarmModel(
        owner_id=1, # Mock owner ID for prototype
        farm_identifier=f"FARM-{farm.name[:3].upper()}-{farm.location_district[:3].upper()}",
        name=farm.name,
        location_district=farm.location_district,
        location_state=farm.location_state,
        total_area_hectares=farm.total_area_hectares,
        primary_crop=farm.primary_crop
    )
    db.add(new_farm)
    await db.commit()
    await db.refresh(new_farm)
    
    return FarmResponse(
        id=new_farm.id,
        owner_email=current_user["email"],
        **farm.dict()
    )

@router.get("/", response_model=List[FarmResponse])
async def get_farms(current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Get all farms belonging to the current user."""
    result = await db.execute(select(FarmModel))
    farms = result.scalars().all()
    return [
        FarmResponse(
            id=f.id,
            owner_email=current_user["email"],
            name=f.name,
            location_district=f.location_district,
            location_state=f.location_state,
            total_area_hectares=f.total_area_hectares,
            primary_crop=f.primary_crop
        ) for f in farms
    ]

@router.get("/{farm_id}/decisions")
async def get_farm_decisions(farm_id: int, db: AsyncSession = Depends(get_db)):
    """Fetch all autonomous decisions for a specific farm."""
    result = await db.execute(
        select(AgentDecision).where(AgentDecision.farm_id == farm_id).order_by(AgentDecision.created_at.desc())
    )
    return result.scalars().all()
