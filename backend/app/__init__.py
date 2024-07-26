from fastapi import FastAPI
from .routers import router

app = FastAPI(
    title="Company Locations API",
    description="API for managing company locations.",
    version="1.0.0",
)

app.include_router(router)
