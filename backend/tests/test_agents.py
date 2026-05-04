import pytest
import json
from unittest.mock import AsyncMock, patch, MagicMock
from backend.agentic_ai.coordinator import AgriAgentSystem

@pytest.fixture
def mock_agent_system():
    with patch("backend.agentic_ai.coordinator.ChatGoogleGenerativeAI"):
        system = AgriAgentSystem()
        yield system

@pytest.mark.asyncio
@patch("backend.agentic_ai.coordinator.ChatPromptTemplate.from_template")
async def test_get_agent_proposal(mock_from_template, mock_agent_system):
    # Mock the chain
    mock_chain = AsyncMock()
    mock_response = MagicMock()
    mock_response.content = '```json\n{"agent": "agronomist", "proposed_action": "irrigate"}\n```'
    mock_chain.ainvoke.return_value = mock_response
    
    # Mock prompt | llm
    mock_prompt = MagicMock()
    mock_prompt.__or__.return_value = mock_chain
    mock_from_template.return_value = mock_prompt
    
    result = await mock_agent_system.get_agent_proposal("agronomist", "test prompt", {"farm_id": "123"})
    
    assert result["agent"] == "agronomist"
    assert result["proposed_action"] == "irrigate"

@pytest.mark.asyncio
async def test_negotiate(mock_agent_system):
    # Just mock get_agent_proposal and the final coordinator chain
    with patch.object(mock_agent_system, "get_agent_proposal", new_callable=AsyncMock) as mock_get_proposal, \
         patch("backend.agentic_ai.coordinator.ChatPromptTemplate.from_template") as mock_from_template:
        
        mock_get_proposal.return_value = {"agent": "specialist", "proposed_action": "irrigate"}
        
        mock_chain = AsyncMock()
        mock_response = MagicMock()
        mock_response.content = '```json\n{"agent": "coordinator", "final_action": "irrigate", "justification": "test"}\n```'
        mock_chain.ainvoke.return_value = mock_response
        
        mock_prompt = MagicMock()
        mock_prompt.__or__.return_value = mock_chain
        mock_from_template.return_value = mock_prompt
        
        farm_context = {"farm_id": "farm_test_123"}
        result = await mock_agent_system.negotiate(farm_context)
        
        assert result["cycle_id"] == "farm_test_123"
        assert len(result["proposals"]) == 3
        assert result["decision"]["final_action"] == "irrigate"
