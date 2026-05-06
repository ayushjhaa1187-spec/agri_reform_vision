from backend.ml_service.yield_model import yield_model

def test_yield_prediction_optimal():
    input_data = {
        "N": 100,
        "P": 80,
        "K": 60,
        "temperature": 25,
        "soil_moisture": 40,
        "humidity": 70,
        "ph": 6.5,
        "rainfall": 150
    }
    result = yield_model.predict(input_data)
    assert result["predicted_yield_kg_ha"] > 1000
    assert result["confidence_score"] > 0.8

def test_yield_prediction_suboptimal():
    input_data = {
        "temperature": 35,
        "soil_moisture": 20,
        "rain_probability": 10
    }
    result = yield_model.predict(input_data)
    assert result["predicted_yield_kg_ha"] < 2000
