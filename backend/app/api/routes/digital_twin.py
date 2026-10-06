from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.database import get_db
from app.db.models import User, Student
from app.services.academic_twin import get_academic_twin

router = APIRouter()


@router.get("/")
def academic_digital_twin(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(User.id == current_user["id"])
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    student = (
        db.query(Student)
        .filter(Student.email == user.email)
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    twin = get_academic_twin(
        student.id,
        db
    )

    return twin