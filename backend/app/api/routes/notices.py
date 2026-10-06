from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.database import get_db
from app.db.models import Notice

router = APIRouter()


@router.get("/")
def get_notices(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notices = (
        db.query(Notice)
        .order_by(Notice.id.desc())
        .all()
    )

    return [
        {
            "id": notice.id,
            "title": notice.title,
            "content": notice.content,
            "published_date": notice.published_date,
            "file_url": notice.file_url
        }
        for notice in notices
    ]