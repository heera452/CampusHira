from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.database import get_db
from app.db.models import Mark, Subject

router = APIRouter()


@router.get("/")
def get_marks(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    marks_records = (
        db.query(Mark, Subject)
        .join(
            Subject,
            Mark.subject_id == Subject.id
        )
        .filter(
            Mark.student_id == 2
        )
        .all()
    )

    return [
        {
            "id": mark.id,
            "subject_id": mark.subject_id,
            "subject_name": subject.name,
            "exam_type": mark.exam_type,
            "marks_obtained": mark.marks_obtained,
            "max_marks": mark.max_marks,
            "percentage": round(
                (mark.marks_obtained / mark.max_marks) * 100,
                2
            )
        }
        for mark, subject in marks_records
    ]