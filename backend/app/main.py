from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.core.config import settings


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-Native Intelligent College Operating System"
)


app.add_middleware(
    CORSMiddleware,
	allow_origins=[
    settings.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5175",
    "http://localhost:3000"
],
        allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    health_router,
    prefix="/api/v1"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to CampusHira",
        "version": settings.APP_VERSION,
        "status": "running"
    }