import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from backend.config import DATABASE_URL

Base = declarative_base()

# Dynamically configured engine and sessionmaker
engine = create_async_engine(DATABASE_URL, echo=True, connect_args={"timeout": 3, "command_timeout": 3})
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

def get_engine_and_session(db_url: str):
    global engine, AsyncSessionLocal
    if db_url.startswith("sqlite"):
        engine = create_async_engine(db_url, echo=True, connect_args={"check_same_thread": False})
    else:
        engine = create_async_engine(db_url, echo=True, connect_args={"timeout": 3, "command_timeout": 3})
    
    AsyncSessionLocal = sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False
    )
    return engine, AsyncSessionLocal

async def check_and_init_db():
    global engine, AsyncSessionLocal
    from sqlalchemy import text
    
    print(f"Checking database connection to: {DATABASE_URL}")
    try:
        # Quick connection test
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        print("Successfully connected to the primary PostgreSQL database.")
    except Exception as e:
        print(f"Primary PostgreSQL database connection failed: {e}")
        sqlite_url = "sqlite+aiosqlite:///./agri.db"
        print(f"Falling back to local SQLite database: {sqlite_url}")
        
        get_engine_and_session(sqlite_url)
        
        # Auto-create all tables for SQLite
        async with engine.begin() as conn:
            from backend.models import User, Farm, SensorData, AgentDecision
            await conn.run_sync(Base.metadata.create_all)
        print("SQLite database initialized and tables created successfully.")

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

