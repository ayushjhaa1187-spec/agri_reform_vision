import pytest
from unittest.mock import patch, MagicMock
from backend.stream.soil_service import SoilService

def test_get_soil_data_success():
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = {
        "properties": {
            "layers": [
                {
                    "name": "phh2o",
                    "depths": [{"values": {"mean": 65}}]
                },
                {
                    "name": "clay",
                    "depths": [{"values": {"mean": 200}}]
                },
                {
                    "name": "soc",
                    "depths": [{"values": {"mean": 15}}]
                }
            ]
        }
    }
    mock_response.raise_for_status.return_value = None

    with patch("requests.get", return_value=mock_response):
        result = SoilService.get_soil_data(31.6340, 74.8723)
        
        assert result["phh2o"] == 6.5
        assert result["clay"] == 20.0
        assert result["soc"] == 15.0

def test_get_soil_data_failure():
    with patch("requests.get", side_effect=Exception("API Down")):
        result = SoilService.get_soil_data(0, 0)
        assert result is None
