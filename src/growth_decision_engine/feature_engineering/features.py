from __future__ import annotations

import pandas as pd


FEATURE_COLUMNS = [
    "avg_order_value",
    "total_orders",
    "days_since_last_purchase",
    "sessions_last_30d",
    "support_tickets_90d",
    "email_click_rate",
    "discount_usage_rate",
    "customer_value",
    "engagement_score",
]


def build_customer_features(events: pd.DataFrame) -> pd.DataFrame:
    features = events.copy()
    features["customer_value"] = features["avg_order_value"] * features["total_orders"]
    features["engagement_score"] = (
        features["sessions_last_30d"] * 0.7 + features["email_click_rate"] * 10
    )
    return features


def select_model_frame(events: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series]:
    features = build_customer_features(events)
    return features[FEATURE_COLUMNS], features["churned"]

