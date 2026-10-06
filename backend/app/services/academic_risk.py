import mlflow
import pandas as pd


# MLflow configuration
mlflow.set_tracking_uri("http://127.0.0.1:5000")


# Load Version 1 from MLflow Model Registry
MODEL_URI = "models:/CampusHira-Academic-Risk-Model/1"

model = mlflow.sklearn.load_model(MODEL_URI)


# Risk classes used by the trained model
RISK_CLASSES = ["High", "Low", "Medium"]


def predict_academic_risk(
    attendance_percentage: float,
    internal_marks_percentage: float,
    classes_missed: int
):
    # Create input data
    data = pd.DataFrame([
        {
            "attendance_percentage": attendance_percentage,
            "internal_marks_percentage": internal_marks_percentage,
            "classes_missed": classes_missed
        }
    ])

    # Make prediction
    prediction = model.predict(data)

    # Convert prediction number to risk name
    risk = RISK_CLASSES[int(prediction[0])]

    return {
        "attendance_percentage": attendance_percentage,
        "internal_marks_percentage": internal_marks_percentage,
        "classes_missed": classes_missed,
        "academic_risk": risk
    }