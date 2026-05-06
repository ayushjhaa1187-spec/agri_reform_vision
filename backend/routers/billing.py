from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.database import get_db
from backend.models import User, SubscriptionTier
from backend.auth import get_current_user

router = APIRouter(prefix="/billing", tags=["Billing & Monetization"])

class SubscriptionPlan(BaseModel):
    id: str
    name: str
    price_inr: int
    features: List[str]
    monthly_credits: int

PLANS = [
    SubscriptionPlan(
        id="free",
        name="Free Tier",
        price_inr=0,
        features=["Basic Yield Prediction", "Standard Agent Access", "Email Support"],
        monthly_credits=100
    ),
    SubscriptionPlan(
        id="pro",
        name="Pro Farmer",
        price_inr=299,
        features=["Advanced RAG Insights", "Priority Agent Queues", "WhatsApp Alerts", "Detailed Forecasts"],
        monthly_credits=1000
    ),
    SubscriptionPlan(
        id="enterprise",
        name="Enterprise",
        price_inr=4999,
        features=["Unlimited Fields", "Custom Crop Models", "Dedicated Account Manager", "API Access"],
        monthly_credits=10000
    )
]

class CheckoutRequest(BaseModel):
    plan_id: str

@router.get("/plans", response_model=List[SubscriptionPlan])
async def get_plans():
    return PLANS

@router.post("/checkout")
async def create_checkout_session(request: CheckoutRequest, current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """
    Simulates creating a Stripe/Razorpay checkout session.
    """
    plan = next((p for p in PLANS if p.id == request.plan_id), None)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
        
    # In a real app, you'd call Razorpay/Stripe API here
    # Return a mock checkout URL
    return {
        "checkout_url": f"/billing/simulate-success?plan_id={plan.id}",
        "amount": plan.price_inr,
        "currency": "INR"
    }

@router.post("/simulate-success")
async def simulate_payment_success(plan_id: str, current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """
    Mocks a webhook fulfilling a successful payment.
    """
    plan = next((p for p in PLANS if p.id == plan_id), None)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
        
    email = current_user["email"]
    result = await db.execute(select(User).where(User.email == email))
    db_user = result.scalar_one_or_none()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    # Upgrade user
    try:
        db_user.subscription_tier = SubscriptionTier(plan.id)
    except ValueError:
         raise HTTPException(status_code=400, detail="Invalid plan ID for subscription tier")
         
    db_user.ai_credits += plan.monthly_credits
    await db.commit()
    
    return {"message": f"Successfully upgraded to {plan.name}. Added {plan.monthly_credits} credits."}

@router.post("/deduct-credit")
async def deduct_credit(cost: int = 1, current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Internal helper to deduct credits"""
    email = current_user["email"]
    result = await db.execute(select(User).where(User.email == email))
    db_user = result.scalar_one_or_none()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if db_user.ai_credits < cost:
        raise HTTPException(status_code=402, detail="Insufficient AI credits. Please upgrade your plan.")
        
    db_user.ai_credits -= cost
    await db.commit()
    return {"remaining_credits": db_user.ai_credits}
