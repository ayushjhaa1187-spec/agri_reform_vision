import pytest
import json
from unittest.mock import patch, MagicMock, AsyncMock
from backend.stream.agent_orchestrator import agent_orchestrator

@pytest.mark.asyncio
async def test_agent_orchestrator():
    mock_redis = MagicMock()
    mock_pubsub = MagicMock()
    mock_pubsub.subscribe = AsyncMock()
    
    # Mock pubsub.listen() to return an async iterator
    mock_message = {
        "type": "message",
        "data": json.dumps({
            "type": "telemetry",
            "data": {
                "farm": {
                    "farm_id": "TEST-001",
                    "soil_moisture": 30.0  # Low moisture to trigger negotiation
                },
                "weather": {
                    "rain_probability": 10
                }
            }
        })
    }
    async def mock_listen_iter():
        yield mock_message

    mock_pubsub.listen.return_value = mock_listen_iter()
    mock_redis.pubsub.return_value = mock_pubsub
    mock_redis.publish = AsyncMock()
    
    with patch("backend.stream.agent_orchestrator.get_redis_client", return_value=mock_redis), \
         patch("backend.stream.agent_orchestrator.agri_agents.negotiate", new_callable=AsyncMock) as mock_negotiate:
        
        mock_negotiate.return_value = {
            "decision": {"final_action": "irrigate", "justification": "low moisture"},
            "proposals": []
        }
        
        # Run the orchestrator. Since mock_listen returns, it will finish.
        await agent_orchestrator()
        
        mock_negotiate.assert_called_once()
        mock_redis.publish.assert_called_once()
        args, _ = mock_redis.publish.call_args
        assert args[0] == "agent_decisions"
        published_data = json.loads(args[1])
        assert published_data["data"]["decision"] == "irrigate"
