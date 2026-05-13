from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.database import get_db
from backend.models import User, SubscriptionTier
from backend.auth import get_current_user
import stripe
import os

router = APIRouter(prefix="/billing", tags=["Billing & Monetization"])

stripe.api_key = os.getenv("STRIPE_API_KEY", "sk_test_mock_key_for_development")

class SubscriptionPlan(BaseModel):
    id: str
    name: str
    price_inr: int
    features: List[str]
    monthly_credits: int
    stripe_price_id: str = ""

PLANS = [
    SubscriptionPlan(
        id="free",
        name="Free Tier",
        price_inr=0,
        features=["Basic Yield Prediction", "Standard Agent Access", "Email Support"],
        monthly_credits=100,
        stripe_price_id=""
    ),
    SubscriptionPlan(
        id="pro",
        name="Pro Farmer",
        price_inr=299,
        features=["Advanced RAG Insights", "Priority Agent Queues", "WhatsApp Alerts", "Detailed Forecasts"],
        monthly_credits=1000,
        stripe_price_id="price_mock_pro"
    ),
    SubscriptionPlan(
        id="enterprise",
        name="Enterprise",
        price_inr=4999,
        features=["Unlimited Fields", "Custom Crop Models", "Dedicated Account Manager", "API Access"],
        monthly_credits=10000,
        stripe_price_id="price_mock_enterprise"
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
    Creates a Stripe checkout session.
    """
    plan = next((p for p in PLANS if p.id == request.plan_id), None)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
        
    if plan.price_inr == 0:
        return {"checkout_url": f"/billing/simulate-success?plan_id={plan.id}"}

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'inr',
                    'product_data': {
                        'name': plan.name,
                    },
                    'unit_amount': plan.price_inr * 100,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=os.getenv("FRONTEND_URL", "http://localhost:3000") + f"/billing/success?plan_id={plan.id}",
            cancel_url=os.getenv("FRONTEND_URL", "http://localhost:3000") + "/billing/cancel",
            customer_email=current_user["email"]
        )
        return {
            "checkout_url": session.url,
            "amount": plan.price_inr,
            "currency": "INR"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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
