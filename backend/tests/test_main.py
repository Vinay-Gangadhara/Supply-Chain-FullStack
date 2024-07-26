from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_get_companies():
    response = client.get("/companies")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_company():
    response = client.get("/companies/1")
    assert response.status_code == 200 or response.status_code == 404

def test_get_locations():
    response = client.get("/companies/1/locations")
    assert response.status_code == 200 or response.status_code == 404
