import asyncio
import json
from backend.config import get_redis_client
from backend.agentic_ai.coordinator import agri_agents

async def agent_orchestrator():
    """
    Listens to sensor_data and triggers the multi-agent negotiation loop.
    """
    print("Starting Agent Orchestrator...")
    try:
        r = get_redis_client()
        pubsub = r.pubsub()
        await pubsub.subscribe("sensor_data")
        print("Agent Orchestrator subscribed to sensor_data channel.")
        
        msg_count = 0
        
        async for message in pubsub.listen():
            if message["type"] == "message":
                try:
                    payload = json.loads(message["data"])
                    if payload.get("type") == "telemetry":
                        farm_data = payload["data"]["farm"]
                        weather_data = payload["data"]["weather"]
                        soil_moisture = farm_data.get("soil_moisture", 100)
                        
                        # Create full context for agents
                        negotiation_context = {**farm_data, "weather_forecast": weather_data}
                        
                        # Trigger negotiation if moisture is low OR every 10 messages
                        msg_count += 1
                        should_negotiate = soil_moisture < 35 or msg_count % 10 == 0
                        
                        if should_negotiate:
                            print(f"Triggering negotiation cycle for {farm_data['farm_id']}...")
                            # We use the full context for negotiation
                            negotiation_result = await agri_agents.negotiate(negotiation_context)
                            
                            # Prepare the decision payload
                            decision_payload = {
                                "type": "agent_decision",
                                "data": {
                                    "agent": "Master Coordinator",
                                    "decision": negotiation_result["decision"].get("final_action", "No action needed"),
                                    "action_type": "decision",
                                    "timestamp": negotiation_result["decision"].get("timestamp", ""),
                                    "justification": negotiation_result["decision"].get("justification", ""),
                                    "proposals": negotiation_result["proposals"]
                                }
                            }
                            
                            await r.publish("agent_decisions", json.dumps(decision_payload))
                            print(f"Published agent decision: {decision_payload['data']['decision']}")
                            
                except Exception as e:
                    print(f"Orchestrator Processing Error: {e}")
    except Exception as e:
        print(f"Orchestrator Connection Error: {e}")
        await asyncio.sleep(5)
        # Restart the orchestrator
        asyncio.create_task(agent_orchestrator())

if __name__ == "__main__":
    asyncio.run(agent_orchestrator())
