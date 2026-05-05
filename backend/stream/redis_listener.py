import asyncio
import json
from typing import Set
from fastapi import WebSocket
from backend.config import get_redis_client

# One global set to hold all connected WebSocket clients
connected_clients: Set[WebSocket] = set()

async def redis_subscriber():
    """Subscribes to Redis channels and broadcasts to all WebSocket clients."""
    try:
        r = get_redis_client()
        pubsub = r.pubsub()
        await pubsub.subscribe("agent_decisions", "sensor_data")
        print("Successfully subscribed to Redis channels: agent_decisions, sensor_data")

        async for message in pubsub.listen():
            if message["type"] == "message":
                data = json.loads(message["data"])
                # Broadcast to all connected WebSocket clients
                disconnected = set()
                for ws in connected_clients:
                    try:
                        await ws.send_json(data)
                    except Exception:
                        disconnected.add(ws)
                connected_clients.difference_update(disconnected)
    except Exception as e:
        print(f"Redis Subscriber Error: {e}")
        await asyncio.sleep(5)
        asyncio.create_task(redis_subscriber())

async def start_redis_listener():
    asyncio.create_task(redis_subscriber())
