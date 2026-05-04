import requests
from typing import Dict, Optional
import time

class SoilService:
    BASE_URL = "https://rest.isric.org/soilgrids/v2.0/properties/query"

    @staticmethod
    def get_soil_data(lat: float, lon: float) -> Optional[Dict]:
        """
        Queries SoilGrids API for soil properties at a given lat/lon.
        Properties include: pH, Clay, Sand, Silt, Organic Carbon, etc.
        """
        params = {
            "lat": lat,
            "lon": lon,
            "property": ["phh2o", "clay", "sand", "silt", "soc", "bdod"],
            "depth": "0-30cm",
            "value": "mean"
        }
        
        try:
            response = requests.get(
                SoilService.BASE_URL, 
                params=params, 
                headers={"accept": "application/geojson"},
                timeout=10
            )
            response.raise_for_status()
            data = response.json()
            
            # Simplified parsing for our specific needs
            results = {}
            for layer in data.get("properties", {}).get("layers", []):
                name = layer.get("name")
                # Get the mean value for the first (and only) depth requested
                mean_val = layer.get("depths", [{}])[0].get("values", {}).get("mean")
                if mean_val is not None:
                    # Adjust units if necessary (SoilGrids often returns values * 10)
                    factor = 10 if name in ["phh2o", "clay", "sand", "silt"] else 1
                    results[name] = mean_val / factor
            
            return results
        except Exception as e:
            print(f"SoilGrids API Error: {e}")
            return None

if __name__ == "__main__":
    # Test with Punjab coordinates
    punjab_soil = SoilService.get_soil_data(31.6340, 74.8723)
    print(f"Punjab Soil Data: {punjab_soil}")
