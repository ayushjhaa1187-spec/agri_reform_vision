import pytest
import asyncio
from unittest.mock import patch, MagicMock, AsyncMock
from backend.database import get_db

@pytest.mark.asyncio
async def test_get_db():
    # Mock AsyncSessionLocal to return a mock session
    mock_session = AsyncMock()
    mock_session.close = AsyncMock()
    
    # SessionLocal() returns a context manager that yields the session
    mock_session_factory = MagicMock()
    mock_session_factory.return_value.__aenter__.return_value = mock_session
    mock_session_factory.return_value.__aexit__.return_value = None

    with patch("backend.database.AsyncSessionLocal", mock_session_factory):
        # We need to test the async generator
        async_gen = get_db()
        session = await async_gen.__anext__()
        
        assert session == mock_session
        
        # Finish the generator
        try:
            await async_gen.__anext__()
        except StopAsyncIteration:
            pass
            
        # Ensure session.close was called via the finally block
        mock_session.close.assert_called_once()
