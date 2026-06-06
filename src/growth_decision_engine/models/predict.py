from __future__ import annotations

from pathlib import Path

import joblib
import pandas as pd

from growth_decision_engine.feature_engineering.features import FEATURE_COLUMNS, build_customer_features
from growth_decision_engine.models.train import MODEL_PATH, train_churn_model


def load_churn_model(model_path: Path = MODEL_PATH):
    if not model_path.exists():
        train_churn_model()
    return joblib.load(model_path)


def predict_churn_probability(customer: dict, model_path: Path = MODEL_PATH) -> float:
    model = load_churn_model(model_path)
    frame = build_customer_features(pd.DataFrame([customer]))
    probability = model.predict_proba(frame[FEATURE_COLUMNS])[:, 1][0]
    return round(float(probability), 4)

