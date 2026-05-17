import asyncio
import os
import sentry_sdk
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from backend.stream.redis_listener import connected_clients, start_redis_listener
from backend.stream.sensor_simulator import sensor_simulator
from backend.stream.agent_orchestrator import agent_orchestrator
from backend.routers import chatbot, ml, users, farms, billing, feedback, cv

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN", "https://mock@sentry.io/12345"),
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    from backend.database import check_and_init_db
    await check_and_init_db()
    
    await start_redis_listener()
    # Start the simulator and orchestrator in the background
    asyncio.create_task(sensor_simulator())
    asyncio.create_task(agent_orchestrator())
    yield
    # Shutdown logic (if any) could go here

app = FastAPI(title="Agri-Intelligence API", lifespan=lifespan)

# Add Routers
app.include_router(chatbot.router)
app.include_router(ml.router)
app.include_router(users.router)
app.include_router(farms.router)
app.include_router(billing.router)
app.include_router(feedback.router)
app.include_router(cv.router)

# Add CORS middleware
cors_origins = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:5173;http://localhost:3000;https://agrireformvision.vercel.app").split(";")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex="https://agrireformvision.*\\.vercel\\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "Agri-Intelligence Online", "layer": 4}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": asyncio.get_event_loop().time()}

@app.websocket("/ws/agent-feed")
async def agent_feed(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    print(f"Client connected. Total clients: {len(connected_clients)}")
    try:
        while True:
            # Keep the connection alive; we only push from Redis
            await websocket.receive_text()
    except WebSocketDisconnect:
        connected_clients.discard(websocket)
        print(f"Client disconnected. Total clients: {len(connected_clients)}")
