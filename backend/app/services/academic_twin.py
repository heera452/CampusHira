from sqlalchemy.orm import Session

from app.db.models import (
    Student,
    Attendance,
    Mark,
    Timetable,
    Subject
)


def get_academic_twin(student_id: int, db: Session):

    student = (
        db.query(Student)
        .filter(Student.id == student_id)
        .first()
    )

    if not student:
        return None

    attendance = (
        db.query(Attendance, Subject)
        .join(
            Subject,
            Attendance.subject_id == Subject.id
        )
        .filter(
            Attendance.student_id == student_id
        )
        .all()
    )

    marks = (
        db.query(Mark, Subject)
        .join(
            Subject,
            Mark.subject_id == Subject.id
        )
        .filter(
            Mark.student_id == student_id
        )
        .all()
    )

    timetable = (
        db.query(Timetable, Subject)
        .join(
            Subject,
            Timetable.subject_id == Subject.id
        )
        .all()
    )

    return {
        "student": {
            "id": student.id,
            "name": student.name,
            "register_number": student.register_number,
            "email": student.email,
            "semester": student.semester,
            "department_id": student.department_id
        },

        "attendance": [
            {
                "subject": subject.name,
                "total_classes": record.total_classes,
                "attended_classes": record.attended_classes,
                "percentage": round(
                    (record.attended_classes /
                     record.total_classes) * 100,
                    2
                )
            }
            for record, subject in attendance
        ],

        "marks": [
            {
                "subject": subject.name,
                "exam_type": record.exam_type,
                "marks_obtained": record.marks_obtained,
                "max_marks": record.max_marks,
                "percentage": round(
                    (record.marks_obtained /
                     record.max_marks) * 100,
                    2
                )
            }
            for record, subject in marks
        ],

        "timetable": [
            {
                "subject": subject.name,
                "day": record.day,
                "start_time": record.start_time,
                "end_time": record.end_time,
                "room": record.room
            }
            for record, subject in timetable
        ]
    }