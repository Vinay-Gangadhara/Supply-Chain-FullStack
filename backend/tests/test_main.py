import pytest
from fastapi.testclient import TestClient
from main import app
import pandas as pd

client = TestClient(app)

# Mocking the data for companies and locations
companies_data = [
    {"company_id": 1, "name": "Company A", "address": "Address A", "latitude": 10.0, "longitude": 20.0},
    {"company_id": 2, "name": "Company B", "address": "Address B", "latitude": 15.0, "longitude": 25.0}
]

locations_data = [
    {"location_id": 1, "company_id": 1, "name": "Location 1", "address": "Location Address 1", "latitude": 10.1, "longitude": 20.1},
    {"location_id": 2, "company_id": 1, "name": "Location 2", "address": "Location Address 2", "latitude": 10.2, "longitude": 20.2},
    {"location_id": 3, "company_id": 2, "name": "Location 3", "address": "Location Address 3", "latitude": 15.1, "longitude": 25.1}
]

# Mock the pandas read_csv function to return the mock data
def mock_load_companies_data(file_path: str) -> pd.DataFrame:
    return pd.DataFrame(companies_data)

def mock_load_locations_data(file_path: str) -> pd.DataFrame:
    return pd.DataFrame(locations_data)

# Apply the mocks
import routers
routers.load_companies_data = mock_load_companies_data
routers.load_locations_data = mock_load_locations_data

def test_get_companies():
    response = client.get("/companies")
    assert response.status_code == 200
    assert response.json() == companies_data

def test_get_company():
    response = client.get("/companies/1")
    assert response.status_code == 200
    assert response.json() == companies_data[0]

def test_get_company_not_found():
    response = client.get("/companies/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Company not found"}

def test_get_locations():
    response = client.get("/companies/1/locations")
    assert response.status_code == 200
    assert response.json() == [locations_data[0], locations_data[1]]

def test_get_locations_not_found():
    response = client.get("/companies/999/locations")
    assert response.status_code == 404
    assert response.json() == {"detail": "Locations not found"}

def test_compare_locations():
    response = client.get("/compare/locations", params={"location_ids": [1, 2]})
    assert response.status_code == 200
    assert response.json() == [locations_data[0], locations_data[1]]

def test_compare_locations_not_found():
    response = client.get("/compare/locations", params={"location_ids": [999, 1000]})
    assert response.status_code == 404
    assert response.json() == {"detail": "No locations found"}

def test_get_nearest_location():
    response = client.get("/companies/1/nearest_location", params={"user_latitude": 10.15, "user_longitude": 20.15})
    assert response.status_code == 200
    assert response.json() == locations_data[0]

def test_get_nearest_location_not_found():
    response = client.get("/companies/999/nearest_location", params={"user_latitude": 10.15, "user_longitude": 20.15})
    assert response.status_code == 404
    assert response.json() == {"detail": "Locations not found"}
