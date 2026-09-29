from fastapi import APIRouter

from app.db.database import check_database_connection


router = APIRouter()


@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CampusHira Backend"
    }


@router.get("/health/db")
def database_health_check():
    check_database_connection()

    return {
        "status": "healthy",
        "database": "PostgreSQL"
    }