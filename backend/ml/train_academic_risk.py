
import pandas as pd
import joblib
import mlflow
import mlflow.sklearn
from mlflow.tracking import MlflowClient

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score


# MLflow experiment
mlflow.set_tracking_uri("http://127.0.0.1:5000")
mlflow.set_experiment("CampusHira-Academic-Risk")


# Load dataset
data = pd.read_csv("ml/data/academic_risk.csv")


# Input features
X = data[
    [
        "attendance_percentage",
        "internal_marks_percentage",
        "classes_missed"
    ]
]


# Target
y = data["academic_risk"]


# Convert Low/Medium/High into numbers
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)


# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)


# Start MLflow run
with mlflow.start_run():

    # Create Decision Tree model
    model = DecisionTreeClassifier(
        max_depth=3,
        random_state=42
    )

    # Train model
    model.fit(X_train, y_train)

    # Test model
    predictions = model.predict(X_test)

    # Calculate accuracy
    accuracy = accuracy_score(
        y_test,
        predictions
    )

    # Log model parameters
    mlflow.log_param(
        "model_type",
        "DecisionTreeClassifier"
    )

    mlflow.log_param(
        "max_depth",
        3
    )

    mlflow.log_param(
        "test_size",
        0.2
    )

    mlflow.log_param(
        "random_state",
        42
    )

    # Log training information
    mlflow.log_metric(
        "training_records",
        len(X_train)
    )

    mlflow.log_metric(
        "testing_records",
        len(X_test)
    )

    # Log accuracy
    mlflow.log_metric(
        "accuracy",
        accuracy
    )

    # Save trained model locally
    joblib.dump(
        {
            "model": model,
            "encoder": encoder
        },
        "ml/models/academic_risk_model.pkl"
    )

    # Log model to MLflow
    mlflow.sklearn.log_model(
        model,
        name="academic_risk_model",
        skops_trusted_types=[
            "sklearn.tree._tree.Tree"
        ]
    )

    print("Model saved successfully.")

    # Display results
    print("Academic Risk Model")
    print("-------------------")
    print("Training records:", len(X_train))
    print("Testing records:", len(X_test))
    print("Accuracy:", round(accuracy * 100, 2), "%")

    print("\nRisk classes:")
    print(encoder.classes_)

    print("\nMLflow tracking completed.")
