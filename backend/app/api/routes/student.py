from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.database import get_db
from app.db.models import Student


router = APIRouter()


@router.get("/profile")
def get_student_profile(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(
        Student.email == "heera@campushira.com"
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    return {
        "id": student.id,
        "register_number": student.register_number,
        "name": student.name,
        "email": student.email,
        "semester": student.semester,
        "department_id": student.department_id
    }