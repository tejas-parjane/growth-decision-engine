from __future__ import annotations

from growth_decision_engine.decision_engine.rules import choose_action
from growth_decision_engine.models.predict import predict_churn_probability


def decide_next_best_action(customer: dict) -> dict:
    churn_probability = predict_churn_probability(customer)
    decision = choose_action(customer, churn_probability)
    return {
        "customer_id": customer.get("customer_id"),
        "churn_probability": churn_probability,
        **decision,
    }

