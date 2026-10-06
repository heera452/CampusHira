from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.database import get_db
from app.db.models import (
    User,
    Student,
    Attendance,
    Mark,
    Timetable,
    Subject
)
from app.services.ai_assistant import ask_ai_assistant


router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


@router.post("/ask")
def ask_question(
    question: str,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Find logged-in user
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

    # Find student using email
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

    # Get attendance
    attendance_records = (
        db.query(Attendance, Subject)
        .join(Subject, Attendance.subject_id == Subject.id)
        .filter(Attendance.student_id == student.id)
        .all()
    )

    # Get marks
    mark_records = (
        db.query(Mark, Subject)
        .join(Subject, Mark.subject_id == Subject.id)
        .filter(Mark.student_id == student.id)
        .all()
    )

    # Get timetable
    timetable_records = (
        db.query(Timetable, Subject)
        .join(Subject, Timetable.subject_id == Subject.id)
        .all()
    )

    # Build student context
    student_context = f"""
Student Name: {student.name}
Register Number: {student.register_number}
Semester: {student.semester}

Attendance:
"""

    for attendance, subject in attendance_records:
        percentage = round(
            (attendance.attended_classes / attendance.total_classes) * 100,
            2
        )

        student_context += (
            f"- {subject.name}: "
            f"{attendance.attended_classes}/"
            f"{attendance.total_classes} "
            f"({percentage}%)\n"
        )

    student_context += "\nMarks:\n"

    for mark, subject in mark_records:
        percentage = round(
            (mark.marks_obtained / mark.max_marks) * 100,
            2
        )

        student_context += (
            f"- {subject.name} - {mark.exam_type}: "
            f"{mark.marks_obtained}/"
            f"{mark.max_marks} "
            f"({percentage}%)\n"
        )

    student_context += "\nTimetable:\n"

    for timetable, subject in timetable_records:
        student_context += (
            f"- {timetable.day}: "
            f"{subject.name}, "
            f"{timetable.start_time} - "
            f"{timetable.end_time}, "
            f"Room: {timetable.room}\n"
        )

    # Ask AI using ERP + RAG context
    result = ask_ai_assistant(
        question,
        student_context
    )

    return result