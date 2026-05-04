from backend.ml_service.yield_model import yield_model

def test_yield_prediction_optimal():
    input_data = {
        "temperature": 25,
        "soil_moisture": 40,
        "rain_probability": 50
    }
    result = yield_model.predict(input_data)
    assert result["predicted_yield_kg_ha"] > 2000
    assert result["confidence_score"] == 0.88

def test_yield_prediction_suboptimal():
    input_data = {
        "temperature": 35,
        "soil_moisture": 20,
        "rain_probability": 10
    }
    result = yield_model.predict(input_data)
    assert result["predicted_yield_kg_ha"] < 2000
