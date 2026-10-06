from fastapi import APIRouter, Depends

from app.core.auth import get_current_user, require_roles
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


@router.get("/health/protected")
def protected_health_check(
    current_user: dict = Depends(get_current_user)
):
    return {
        "status": "authenticated",
        "user": current_user
    }
@router.get("/health/student")
def student_only(
    current_user: dict = Depends(
        require_roles(["student"])
    )
):
    return {
        "message": "Student access granted",
        "user": current_user
    }
