import pytest
import json
from unittest.mock import patch, AsyncMock
from backend.stream.redis_listener import start_redis_listener

@pytest.mark.asyncio
@patch("backend.stream.redis_listener.redis_subscriber")
async def test_start_redis_listener(mock_subscriber):
    # Just a placeholder to ensure the module loads correctly and runs
    pass
