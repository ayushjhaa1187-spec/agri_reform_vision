from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from backend.database import Base

class UserRole(str, enum.Enum):
    FARMER = "farmer"
    AGRONOMIST = "agronomist"
    ADMIN = "admin"
    ORG_ADMIN = "org_admin"

class SubscriptionTier(str, enum.Enum):
    FREE = "free"
    PRO = "pro"
    ENTERPRISE = "enterprise"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True) # Nullable for passwordless/OAuth
    phone_number = Column(String, unique=True, index=True, nullable=True)
    full_name = Column(String)
    role = Column(Enum(UserRole), default=UserRole.FARMER)
    subscription_tier = Column(Enum(SubscriptionTier), default=SubscriptionTier.FREE)
    ai_credits = Column(Integer, default=100)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)

    farms = relationship("Farm", back_populates="owner")

class Farm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    farm_identifier = Column(String, unique=True, index=True, nullable=False) # e.g. 'PB-ASR-001'
    name = Column(String, nullable=False)
    location_district = Column(String)
    location_state = Column(String)
    total_area_hectares = Column(Float)
    primary_crop = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="farms")
    sensor_data = relationship("SensorData", back_populates="farm")
    decisions = relationship("AgentDecision", back_populates="farm")

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=False)
    soil_moisture = Column(Float)
    temperature = Column(Float)
    humidity = Column(Float)
    nitrogen = Column(Float)
    phosphorus = Column(Float)
    potassium = Column(Float)
    ph = Column(Float)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())

    farm = relationship("Farm", back_populates="sensor_data")

class AgentDecision(Base):
    __tablename__ = "agent_decisions"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=False)
    action_type = Column(String) # e.g., 'irrigate', 'fertilize'
    decision_summary = Column(String)
    justification = Column(String)
    executed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    farm = relationship("Farm", back_populates="decisions")
