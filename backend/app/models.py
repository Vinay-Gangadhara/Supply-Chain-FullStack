from pydantic import BaseModel

# Define a Pydantic model for a Company
class Company(BaseModel):
    company_id: int  # Unique identifier for the company
    name: str  # Name of the company
    address: str  # Address of the company
    latitude: float  # Latitude coordinate of the company's location
    longitude: float  # Longitude coordinate of the company's location

# Define a Pydantic model for a Location
class Location(BaseModel):
    location_id: int  # Unique identifier for the location
    company_id: int  # Identifier of the company to which the location belongs
    name: str  # Name of the location
    address: str  # Address of the location
    latitude: float  # Latitude coordinate of the location
    longitude: float  # Longitude coordinate of the location

