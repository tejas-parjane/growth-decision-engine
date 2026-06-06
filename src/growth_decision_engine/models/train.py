from __future__ import annotations

import json
from pathlib import Path

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import average_precision_score, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from growth_decision_engine.data_pipeline.generate_sample_data import RAW_DATA_PATH, write_sample_data
from growth_decision_engine.feature_engineering.features import select_model_frame


MODEL_PATH = Path("models/churn_model.joblib")
METRICS_PATH = Path("models/metrics.json")


def train_churn_model(data_path: Path = RAW_DATA_PATH) -> dict[str, float]:
    if not data_path.exists():
        write_sample_data(data_path)

    events = pd.read_csv(data_path)
    x, y = select_model_frame(events)
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.25, random_state=42, stratify=y
    )

    model = Pipeline(
        steps=[
            ("scaler", StandardScaler()),
            (
                "classifier",
                RandomForestClassifier(
                    n_estimators=250,
                    min_samples_leaf=10,
                    random_state=42,
                    class_weight="balanced",
                ),
            ),
        ]
    )
    model.fit(x_train, y_train)
    scores = model.predict_proba(x_test)[:, 1]

    metrics = {
        "roc_auc": round(float(roc_auc_score(y_test, scores)), 4),
        "average_precision": round(float(average_precision_score(y_test, scores)), 4),
        "training_rows": int(len(x_train)),
        "test_rows": int(len(x_test)),
    }

    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    METRICS_PATH.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    return metrics


if __name__ == "__main__":
    print(json.dumps(train_churn_model(), indent=2))

