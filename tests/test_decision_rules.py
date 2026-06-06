from growth_decision_engine.decision_engine.rules import choose_action


def test_high_value_high_churn_gets_concierge_action():
    customer = {
        "avg_order_value": 1400,
        "total_orders": 5,
        "sessions_last_30d": 2,
    }

    decision = choose_action(customer, churn_probability=0.9)

    assert decision["action_key"] == "save_with_concierge"
    assert decision["channel"] == "crm"


def test_low_churn_high_activity_gets_upsell_action():
    customer = {
        "avg_order_value": 300,
        "total_orders": 3,
        "sessions_last_30d": 12,
    }

    decision = choose_action(customer, churn_probability=0.2)

    assert decision["action_key"] == "upsell"
    assert decision["priority"] == 3

