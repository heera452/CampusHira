def calculate_attendance_projection(
    attended_classes: int,
    total_classes: int,
    future_classes: int,
    future_attended: int
):
    new_attended = attended_classes + future_attended
    new_total = total_classes + future_classes

    percentage = (
        new_attended / new_total
    ) * 100

    return {
        "current_attended": attended_classes,
        "current_total": total_classes,
        "current_percentage": round(
            (attended_classes / total_classes) * 100,
            2
        ),
        "future_classes": future_classes,
        "future_attended": future_attended,
        "projected_attended": new_attended,
        "projected_total": new_total,
        "projected_percentage": round(
            percentage,
            2
        )
    }