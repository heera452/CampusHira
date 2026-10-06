from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.database import get_db
from app.db.models import Attendance, Subject

router = APIRouter()


@router.get("/")
def get_attendance(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    attendance_records = (
        db.query(Attendance, Subject)
        .join(
            Subject,
            Attendance.subject_id == Subject.id
        )
        .filter(
            Attendance.student_id == 2
        )
        .all()
    )

    return [
        {
            "id": attendance.id,
            "subject_id": attendance.subject_id,
            "subject_name": subject.name,
            "total_classes": attendance.total_classes,
            "attended_classes": attendance.attended_classes,
            "percentage": round(
                (
                    attendance.attended_classes
                    / attendance.total_classes
                ) * 100,
                2
            )
        }
        for attendance, subject in attendance_records
    ]