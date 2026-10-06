from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routes.health import router as health_router
from app.api.routes.auth.login import router as login_router
from app.api.routes.student import router as student_router
from app.api.routes.attendance import router as attendance_router
from app.api.routes.marks import router as marks_router
from app.api.routes.timetable import router as timetable_router
from app.api.routes.notices import router as notices_router
from app.api.routes.digital_twin import router as digital_twin_router
from app.api.routes.what_if import router as what_if_router
from app.api.routes.academic_risk import router as academic_risk_router
from app.api.routes.ai_assistant import router as ai_assistant_router
from app.core.config import settings


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-Native Intelligent College Operating System"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:5175",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Serve PDF and image notice files
app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)


app.include_router(
    health_router,
    prefix="/api/v1"
)

app.include_router(
    login_router,
    prefix="/api/v1/auth",
    tags=["Authentication"]
)

app.include_router(
    student_router,
    prefix="/api/v1/student",
    tags=["Student"]
)

app.include_router(
    attendance_router,
    prefix="/api/v1/attendance",
    tags=["Attendance"]
)

app.include_router(
    marks_router,
    prefix="/api/v1/marks",
    tags=["Marks"]
)

app.include_router(
    timetable_router,
    prefix="/api/v1/timetable",
    tags=["Timetable"]
)

app.include_router(
    notices_router,
    prefix="/api/v1/notices",
    tags=["Notices"]
)

app.include_router(
    digital_twin_router,
    prefix="/api/v1/digital-twin",
    tags=["Digital Twin"]
)

app.include_router(
    what_if_router,
    prefix="/api/v1/what-if",
    tags=["What-If Simulator"]
)

app.include_router(
    academic_risk_router,
    prefix="/api/v1/ml/academic-risk",
    tags=["ML - Academic Risk"]
)

app.include_router(
    ai_assistant_router,
    prefix="/api/v1"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to CampusHira",
        "version": settings.APP_VERSION,
        "status": "running"
    }