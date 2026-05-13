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

def test_submit_feedback():
    response = client.post(
        "/feedback/submit", 
        json={
            "category": "UI",
            "rating": 5,
            "comment": "Great dashboard!",
            "context": {"telemetry": {}}
        }
    )
    assert response.status_code == 200
    assert response.json()["status"] == "success"

def test_cv_detect_disease():
    # Mocking a file upload
    files = {'file': ('test.jpg', b'fake-image-content', 'image/jpeg')}
    response = client.post("/cv/detect-disease", files=files)
    assert response.status_code == 200
    assert "diagnosis" in response.json()
