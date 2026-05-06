import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from backend.stream.redis_listener import connected_clients, start_redis_listener
from backend.stream.sensor_simulator import sensor_simulator
from backend.stream.agent_orchestrator import agent_orchestrator
from backend.routers import chatbot, ml, users, farms

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
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

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "Agri-Intelligence Online", "layer": 4}

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
