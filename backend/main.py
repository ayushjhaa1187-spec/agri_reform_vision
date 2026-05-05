import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from backend.stream.redis_listener import connected_clients, start_redis_listener
from backend.stream.sensor_simulator import sensor_simulator

app = FastAPI(title="Agri-Intelligence API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await start_redis_listener()
    # Start the simulator in the background
    asyncio.create_task(sensor_simulator())

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
