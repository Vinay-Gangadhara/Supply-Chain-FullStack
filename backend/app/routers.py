from fastapi import APIRouter, HTTPException, Query
import pandas as pd
from geopy.distance import geodesic
from .models import Company, Location
from .utils import load_companies_data, load_locations_data

# Create a router object for managing API routes
router = APIRouter()

# Load data from CSV files using relative paths
companies_df = load_companies_data('companies.csv')  # Load companies data into a DataFrame
locations_df = load_locations_data('locations.csv')  # Load locations data into a DataFrame

@router.get("/companies", response_model=list[Company])
def get_companies():
    """
    Get the list of all companies.
    """
    # Convert the DataFrame to a list of dictionaries and return
    return companies_df.to_dict(orient='records')

@router.get("/companies/{company_id}", response_model=Company)
def get_company(company_id: int):
    """
    Get details of a specific company by ID.
    """
    # Filter the DataFrame to find the company with the specified ID
    company = companies_df[companies_df['company_id'] == company_id]
    if company.empty:
        # Raise an HTTP 404 exception if the company is not found
        raise HTTPException(status_code=404, detail="Company not found")
    # Convert the company data to a dictionary and return the first (and only) result
    return company.to_dict(orient='records')[0]

@router.get("/companies/{company_id}/locations", response_model=list[Location])
def get_locations(company_id: int):
    """
    Get the list of locations for a specific company by company ID.
    """
    # Filter the DataFrame to find locations associated with the specified company ID
    locations = locations_df[locations_df['company_id'] == company_id]
    if locations.empty:
        # Raise an HTTP 404 exception if no locations are found for the company
        raise HTTPException(status_code=404, detail="Locations not found")
    # Convert the DataFrame to a list of dictionaries and return
    return locations.to_dict(orient='records')

@router.get("/compare/locations", response_model=list[Location])
def compare_locations(location_ids: list[int]):
    """
    Compare multiple locations by their IDs.
    """
    # Filter the DataFrame to find locations with the specified IDs
    locations = locations_df[locations_df['location_id'].isin(location_ids)]
    if locations.empty:
        # Raise an HTTP 404 exception if no locations are found
        raise HTTPException(status_code=404, detail="No locations found")
    # Convert the DataFrame to a list of dictionaries and return
    return locations.to_dict(orient='records')

@router.get("/companies/{company_id}/nearest_location", response_model=Location)
def get_nearest_location(company_id: int, user_latitude: float = Query(...), user_longitude: float = Query(...)):
    """
    Find the nearest location of a company based on the user's current location.
    """
    # Filter the DataFrame to find locations associated with the specified company ID
    locations = locations_df[locations_df['company_id'] == company_id]
    if locations.empty:
        # Raise an HTTP 404 exception if no locations are found for the company
        raise HTTPException(status_code=404, detail="Locations not found")

    user_location = (user_latitude, user_longitude)  # User's current location
    min_distance = float('inf')  # Initialize the minimum distance to infinity
    nearest_location = None  # Initialize the nearest location

    # Iterate through the locations to find the nearest one
    for _, location in locations.iterrows():
        loc = (location['latitude'], location['longitude'])  # Location coordinates
        distance = geodesic(user_location, loc).kilometers  # Calculate distance to the user location
        if distance < min_distance:
            min_distance = distance  # Update the minimum distance
            nearest_location = location  # Update the nearest location

    if nearest_location is None:
        # Raise an HTTP 404 exception if no location is found
        raise HTTPException(status_code=404, detail="No location found")

    # Convert the nearest location to a dictionary and return
    return nearest_location.to_dict()
