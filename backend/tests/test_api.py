import pytest
from httpx import AsyncClient, ASGITransport
from backend.main import app

@pytest.mark.asyncio
async def test_root():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "Agri-Intelligence Online", "layer": 4}

@pytest.mark.asyncio
async def test_websocket_feed():
    from fastapi.testclient import TestClient
    client = TestClient(app)
    with client.websocket_connect("/ws/agent-feed") as websocket:
        # Just verifying the connection opens successfully.
        assert websocket is not None
