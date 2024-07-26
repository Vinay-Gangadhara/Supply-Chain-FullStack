from fastapi import APIRouter, HTTPException
import pandas as pd
from .models import Company, Location
from .utils import load_companies_data, load_locations_data

router = APIRouter()

# Load data from CSV files using relative paths
companies_df = load_companies_data('companies.csv')
locations_df = load_locations_data('locations.csv')

@router.get("/companies", response_model=list[Company])
def get_companies():
    """
    Get the list of all companies.
    """
    return companies_df.to_dict(orient='records')

@router.get("/companies/{company_id}", response_model=Company)
def get_company(company_id: int):
    """
    Get details of a specific company by ID.
    """
    company = companies_df[companies_df['company_id'] == company_id]
    if company.empty:
        raise HTTPException(status_code=404, detail="Company not found")
    return company.to_dict(orient='records')[0]

@router.get("/companies/{company_id}/locations", response_model=list[Location])
def get_locations(company_id: int):
    """
    Get the list of locations for a specific company by company ID.
    """
    locations = locations_df[locations_df['company_id'] == company_id]
    if locations.empty:
        raise HTTPException(status_code=404, detail="Locations not found")
    return locations.to_dict(orient='records')

@router.get("/compare/locations", response_model=list[Location])
def compare_locations(location_ids: list[int]):
    """
    Compare multiple locations by their IDs.
    """
    locations = locations_df[locations_df['location_id'].isin(location_ids)]
    if locations.empty:
        raise HTTPException(status_code=404, detail="No locations found")
    return locations.to_dict(orient='records')
