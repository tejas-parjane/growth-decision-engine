from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml


RULES_PATH = Path("configs/decision_rules.yaml")


def load_rules(path: Path = RULES_PATH) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as rule_file:
        return yaml.safe_load(rule_file)


def choose_action(customer: dict, churn_probability: float, rules: dict[str, Any] | None = None) -> dict:
    rulebook = rules or load_rules()
    thresholds = rulebook["thresholds"]
    actions = rulebook["actions"]

    customer_value = customer["avg_order_value"] * customer["total_orders"]
    sessions = customer["sessions_last_30d"]

    if (
        churn_probability >= thresholds["high_churn_probability"]
        and customer_value >= thresholds["high_customer_value"]
    ):
        action_key = "save_with_concierge"
        reason = "High churn risk and high customer value justify human follow-up."
    elif churn_probability >= thresholds["high_churn_probability"]:
        action_key = "save_with_discount"
        reason = "High churn risk merits an immediate retention offer."
    elif churn_probability >= thresholds["medium_churn_probability"]:
        action_key = "remind"
        reason = "Moderate churn risk suggests a low-cost reminder."
    elif sessions >= thresholds["high_activity_sessions"]:
        action_key = "upsell"
        reason = "Low churn risk with high activity creates an upsell window."
    else:
        action_key = "nurture"
        reason = "Customer is stable; keep engagement warm without over-incentivizing."

    action = actions[action_key]
    return {
        "action_key": action_key,
        "action": action["label"],
        "channel": action["channel"],
        "priority": action["priority"],
        "reason": reason,
    }

