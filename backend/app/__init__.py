from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import router

# Create an instance of the FastAPI class
app = FastAPI(
    title="Company Locations API",  # Title of the API
    description="API for managing company locations.",  # Description of the API
    version="1.0.0",  # Version of the API
)

# Define the origins that are allowed to make requests to this API
origins = [
    "http://localhost:3000",  # Allow requests from localhost on port 3000
    "http://127.0.0.1:3000",  # Allow requests from 127.0.0.1 on port 3000
    "http://localhost:5173",  # Allow requests from localhost on port 5173
    "http://127.0.0.1:5173",  # Allow requests from 127.0.0.1 on port 5173
]

# Add CORS middleware to the app to handle Cross-Origin Resource Sharing
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,  # Allow cookies and other credentials to be included in requests
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include the router for the API endpoints
app.include_router(router)
