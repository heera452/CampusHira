from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.database import get_db
from app.db.models import Timetable, Subject

router = APIRouter()


@router.get("/")
def get_timetable(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    timetable_records = (
        db.query(Timetable, Subject)
        .join(
            Subject,
            Timetable.subject_id == Subject.id
        )
        .all()
    )

    return [
        {
            "id": timetable.id,
            "subject_id": timetable.subject_id,
            "subject_name": subject.name,
            "day": timetable.day,
            "start_time": timetable.start_time,
            "end_time": timetable.end_time,
            "room": timetable.room
        }
        for timetable, subject in timetable_records
    ]