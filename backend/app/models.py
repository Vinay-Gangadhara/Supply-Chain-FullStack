from pydantic import BaseModel

class Company(BaseModel):
    company_id: int
    name: str
    address: str
    latitude: float
    longitude: float

class Location(BaseModel):
    location_id: int
    company_id: int
    name: str
    address: str
    latitude: float
    longitude: float
