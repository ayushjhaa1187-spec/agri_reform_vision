import asyncio
import json
import random
from datetime import datetime
from backend.config import get_redis_client

async def sensor_simulator():
    """Simulates real-time IoT sensor data and weather telemetry."""
    print("Starting Sensor Simulator...")
    r = get_redis_client()
    
    # Punjabi Farm Context ( पंजाब focus)
    farm_context = {
        "farm_id": "PB-ASR-001",
        "location": "Amritsar, Punjab",
        "crop_type": "Wheat",
        "growth_stage": 45,  # Days
        "soil_moisture": 42.0,
        "temperature": 28.5,
        "humidity": 65.0,
        "npk": {"N": 40, "P": 20, "K": 20},
        "current_disease_risk": 0.15,
        "yield_reduction_risk": 0.05
    }

    while True:
        try:
            # Simulate slight fluctuations in metrics
            farm_context["soil_moisture"] = max(0, min(100, farm_context["soil_moisture"] + random.uniform(-0.5, 0.5)))
            farm_context["temperature"] = farm_context["temperature"] + random.uniform(-0.2, 0.2)
            farm_context["humidity"] = max(0, min(100, farm_context["humidity"] + random.uniform(-1.0, 1.0)))
            
            # Weather Forecast Mock (48h)
            weather_data = {
                "timestamp": datetime.now().isoformat(),
                "rain_probability": random.randint(10, 80),
                "forecast_temp": farm_context["temperature"] + random.uniform(-2, 5)
            }

            payload = {
                "type": "telemetry",
                "data": {
                    "farm": farm_context,
                    "weather": weather_data,
                    "timestamp": datetime.now().isoformat()
                }
            }

            # Publish to Redis channel
            await r.publish("sensor_data", json.dumps(payload))
            print(f"Published telemetry: {payload['data']['timestamp']} | Moisture: {farm_context['soil_moisture']:.2f}%")
            
            await asyncio.sleep(5)  # 5-second interval as requested
        except Exception as e:
            print(f"Simulator Error: {e}")
            await asyncio.sleep(10)

if __name__ == "__main__":
    asyncio.run(sensor_simulator())
