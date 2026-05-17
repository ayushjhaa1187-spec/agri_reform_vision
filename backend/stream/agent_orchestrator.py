import asyncio
import json
from sqlalchemy import select
from backend.config import get_redis_client
from backend.agentic_ai.coordinator import agri_agents
from backend import database
from backend.models import Farm, SensorData, AgentDecision

async def save_sensor_snapshot(session, farm_data):
    """Saves a snapshot of current sensor data to the DB."""
    # Find the farm by identifier
    farm_id_str = farm_data.get("farm_id")
    result = await session.execute(select(Farm).where(Farm.farm_identifier == farm_id_str))
    farm = result.scalar_one_or_none()
    
    if not farm:
        # For prototype: auto-create farm if missing (usually would be done in onboarding)
        print(f"Farm {farm_id_str} not found in DB. Auto-creating for prototype...")
        # We need a user to own it, assuming user with ID 1 exists or creating one
        # This is a bit complex for a background task, so we'll just skip or log
        return None

    new_entry = SensorData(
        farm_id=farm.id,
        soil_moisture=farm_data.get("soil_moisture"),
        temperature=farm_data.get("temperature"),
        humidity=farm_data.get("humidity"),
        nitrogen=farm_data.get("npk", {}).get("N"),
        phosphorus=farm_data.get("npk", {}).get("P"),
        potassium=farm_data.get("npk", {}).get("K"),
        ph=farm_data.get("ph")
    )
    session.add(new_entry)
    await session.commit()
    return farm.id

async def save_agent_decision(session, farm_id, result):
    """Saves the outcome of an agent negotiation to the DB."""
    new_decision = AgentDecision(
        farm_id=farm_id,
        action_type=result["decision"].get("final_action"),
        decision_summary=f"Decision for cycle {result['cycle_id']}",
        justification=result["decision"].get("justification")
    )
    session.add(new_decision)
    await session.commit()

async def agent_orchestrator():
    """
    Listens to sensor_data, persists to DB, and triggers the multi-agent negotiation loop.
    """
    print("Starting Persistent Agent Orchestrator...")
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
                        
                        # Database Persistence
                        async with database.AsyncSessionLocal() as session:
                            farm_db_id = await save_sensor_snapshot(session, farm_data)
                            
                            # Create full context for agents
                            negotiation_context = {**farm_data, "weather_forecast": weather_data}
                            
                            # Trigger negotiation if moisture is low OR every 10 messages
                            msg_count += 1
                            should_negotiate = soil_moisture < 35 or msg_count % 10 == 0
                            
                            if should_negotiate:
                                print(f"Triggering negotiation cycle for {farm_data['farm_id']}...")
                                negotiation_result = await agri_agents.negotiate(negotiation_context)
                                
                                if farm_db_id:
                                    await save_agent_decision(session, farm_db_id, negotiation_result)
                                
                                # Prepare the decision payload for real-time broadcast
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
        asyncio.create_task(agent_orchestrator())

if __name__ == "__main__":
    asyncio.run(agent_orchestrator())
