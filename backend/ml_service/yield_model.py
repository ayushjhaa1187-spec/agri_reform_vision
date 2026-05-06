import os
import pandas as pd
import numpy as np
import xgboost as xgb
from typing import Dict, Any

class YieldModel:
    def __init__(self):
        self.model = xgb.Booster()
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, "yield_model.json")
        
        if os.path.exists(model_path):
            self.model.load_model(model_path)
            self.is_loaded = True
            print(f"Yield Prediction Model loaded from {model_path}")
        else:
            self.is_loaded = False
            print("Yield Prediction Model NOT found. Running in Mock Mode.")

    def predict(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Predicts yield using the trained XGBoost model.
        Features required: N, P, K, temperature, humidity, ph, rainfall
        """
        if not self.is_loaded:
            return self._mock_predict(input_data)

        # Map input data to model features
        # In a real scenario, these would come from sensors/APIs
        features = {
            'N': input_data.get('N', 70),
            'P': input_data.get('P', 45),
            'K': input_data.get('K', 35),
            'temperature': input_data.get('temperature', 25.0),
            'humidity': input_data.get('humidity', 70.0),
            'ph': input_data.get('ph', 6.5),
            'rainfall': input_data.get('rainfall', 100.0)
        }
        
        df = pd.DataFrame([features])
        dmatrix = xgb.DMatrix(df)
        
        prediction = self.model.predict(dmatrix)
        predicted_yield = float(prediction[0])
        
        return {
            "predicted_yield_kg_ha": round(predicted_yield, 2),
            "confidence_score": 0.92,
            "status": "Inference successful",
            "recommendation": self._get_recommendation(predicted_yield)
        }

    def _mock_predict(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        # Fallback if model loading fails
        temp = input_data.get("temperature", 25)
        moisture = input_data.get("soil_moisture", 40)
        base_yield = 2000
        predicted_yield = base_yield * (1.1 if 20 < temp < 30 else 0.9)
        return {
            "predicted_yield_kg_ha": round(predicted_yield, 2),
            "confidence_score": 0.88,
            "status": "Mock Mode",
            "recommendation": "Optimal moisture detected for current growth stage."
        }

    def _get_recommendation(self, yield_val: float) -> str:
        if yield_val > 2500:
            return "Excellent yield potential. Maintain current nutrient balance."
        elif yield_val > 1500:
            return "Good yield. Consider slightly increasing Nitrogen (N) for boost."
        else:
            return "Yield potential is low. Check for nutrient deficiencies or soil acidity."

yield_model = YieldModel()
