from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.database import get_db
from app.db.models import (
    Attendance,
    Subject,
    Student,
    User,
    Mark
)

from app.services.what_if import calculate_attendance_projection
from app.services.academic_risk import predict_academic_risk


router = APIRouter()


@router.post("/attendance")
def attendance_what_if(
    subject_id: int,
    future_classes: int,
    future_attended: int,
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

    # Find attendance record for selected subject
    attendance = (
        db.query(Attendance)
        .filter(
            Attendance.student_id == student.id,
            Attendance.subject_id == subject_id
        )
        .first()
    )

    # Find selected subject
    subject = (
        db.query(Subject)
        .filter(Subject.id == subject_id)
        .first()
    )

    if not attendance or not subject:
        raise HTTPException(
            status_code=404,
            detail="Attendance record not found"
        )

    # Find internal mark for selected subject
    mark = (
        db.query(Mark)
        .filter(
            Mark.student_id == student.id,
            Mark.subject_id == subject_id
        )
        .first()
    )

    if not mark:
        raise HTTPException(
            status_code=404,
            detail="Internal mark not found for selected subject"
        )

    # Validate future values
    if future_classes < 0 or future_attended < 0:
        raise HTTPException(
            status_code=400,
            detail="Class values cannot be negative"
        )

    if future_attended > future_classes:
        raise HTTPException(
            status_code=400,
            detail="Future attended classes cannot exceed future classes"
        )

    # Calculate projected attendance
    result = calculate_attendance_projection(
        attended_classes=attendance.attended_classes,
        total_classes=attendance.total_classes,
        future_classes=future_classes,
        future_attended=future_attended
    )

    # Calculate projected classes missed
    projected_classes_missed = (
        result["projected_total"]
        - result["projected_attended"]
    )

    # Calculate actual internal mark percentage
    internal_marks_percentage = (
        mark.marks_obtained / mark.max_marks
    ) * 100

    # Predict academic risk
    risk_result = predict_academic_risk(
        attendance_percentage=result["projected_percentage"],
        internal_marks_percentage=internal_marks_percentage,
        classes_missed=projected_classes_missed
    )

    # Add subject information
    result["subject_id"] = subject.id
    result["subject_name"] = subject.name

    # Add current internal mark
    result["internal_marks"] = mark.marks_obtained
    result["max_marks"] = mark.max_marks
    result["internal_marks_percentage"] = round(
        internal_marks_percentage,
        2
    )

    # Add ML prediction
    result["academic_risk"] = risk_result["academic_risk"]

    return result