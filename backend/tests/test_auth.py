import pytest
from backend.auth import verify_password, get_password_hash, create_access_token
from datetime import timedelta

def test_password_hashing():
    password = "supersecretpassword"
    hashed = get_password_hash(password)
    assert hashed != password
    assert verify_password(password, hashed) is True
    assert verify_password("wrongpassword", hashed) is False

def test_create_access_token():
    data = {"sub": "test@example.com"}
    token = create_access_token(data)
    assert isinstance(token, str)
    assert len(token) > 20

def test_create_access_token_with_expires():
    data = {"sub": "test@example.com"}
    token = create_access_token(data, expires_delta=timedelta(minutes=5))
    assert isinstance(token, str)
