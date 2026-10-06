
from fastapi import APIRouter, Depends

from app.core.auth import get_current_user
from app.services.academic_risk import predict_academic_risk


router = APIRouter()


@router.post("/")
def academic_risk_prediction(
    attendance_percentage: float,
    internal_marks_percentage: float,
    classes_missed: int,
    current_user: dict = Depends(get_current_user)
):
    result = predict_academic_risk(
        attendance_percentage=attendance_percentage,
        internal_marks_percentage=internal_marks_percentage,
        classes_missed=classes_missed
    )

    return result
