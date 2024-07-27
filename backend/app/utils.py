import pandas as pd
import os

def load_companies_data(file_path: str) -> pd.DataFrame:
    """
    Load companies data from a CSV file.

    Parameters:
    file_path (str): Relative path to the CSV file containing the companies data.

    Returns:
    pd.DataFrame: DataFrame containing the companies data.
    """
    # Get the base path of the current file's directory
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # Construct the full path to the CSV file
    full_path = os.path.join(base_path, file_path)
    # Load the CSV file into a DataFrame and return it
    return pd.read_csv(full_path)

def load_locations_data(file_path: str) -> pd.DataFrame:
    """
    Load locations data from a CSV file.

    Parameters:
    file_path (str): Relative path to the CSV file containing the locations data.

    Returns:
    pd.DataFrame: DataFrame containing the locations data.
    """
    # Get the base path of the current file's directory
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # Construct the full path to the CSV file
    full_path = os.path.join(base_path, file_path)
    # Load the CSV file into a DataFrame and return it
    return pd.read_csv(full_path)
