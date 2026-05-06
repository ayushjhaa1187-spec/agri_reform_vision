import os
from dotenv import load_dotenv

load_dotenv()

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://user:password@db:5432/agri_db")
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Redis
# Railway provides REDIS_URL or REDISHOST/REDISPORT
REDIS_URL = os.getenv("REDIS_URL")
REDIS_HOST = os.getenv("REDISHOST", os.getenv("REDIS_HOST", "redis"))

raw_port = os.getenv("REDISPORT", os.getenv("REDIS_PORT", "6379"))
REDIS_PORT = int(raw_port) if raw_port and raw_port.isdigit() else 6379

REDIS_PASSWORD = os.getenv("REDISPASSWORD", os.getenv("REDIS_PASSWORD"))
REDIS_USER = os.getenv("REDISUSER", "default")

def get_redis_client():
    import redis.asyncio as redis
    if REDIS_URL:
        return redis.from_url(REDIS_URL, decode_responses=True)
    
    return redis.Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        password=REDIS_PASSWORD,
        username=REDIS_USER,
        decode_responses=True
    )
