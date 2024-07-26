import pandas as pd
import os

def load_companies_data(file_path: str) -> pd.DataFrame:
    """
    Load companies data from CSV file.
    """
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    full_path = os.path.join(base_path, file_path)
    return pd.read_csv(full_path)

def load_locations_data(file_path: str) -> pd.DataFrame:
    """
    Load locations data from CSV file.
    """
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    full_path = os.path.join(base_path, file_path)
    return pd.read_csv(full_path)
