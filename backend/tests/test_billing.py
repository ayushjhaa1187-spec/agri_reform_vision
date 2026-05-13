import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.auth import get_current_user
from backend.database import get_db
from unittest.mock import AsyncMock, MagicMock

client = TestClient(app)

def override_get_current_user():
    return {"email": "test@example.com", "role": "farmer"}

async def override_get_db():
    mock_session = AsyncMock()
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = MagicMock(id=1, email="test@example.com", ai_credits=100)
    mock_session.execute.return_value = mock_result
    yield mock_session

app.dependency_overrides[get_current_user] = override_get_current_user
app.dependency_overrides[get_db] = override_get_db

def test_get_plans():
    response = client.get("/billing/plans")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_checkout():
    response = client.post("/billing/checkout", json={"plan_id": "free"})
    assert response.status_code == 200
    assert "checkout_url" in response.json()
