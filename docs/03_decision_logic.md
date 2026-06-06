# Decision Logic

## Core Idea

The model predicts churn probability, but the business rules decide the action.

This split is important:

- ML is used where patterns are complex.
- Rules are used where business logic must be exact and explainable.

## Inputs

The decision engine receives customer signals such as:

```json
{
  "customer_id": "CUST-DEMO-001",
  "avg_order_value": 1250,
  "total_orders": 5,
  "days_since_last_purchase": 68,
  "sessions_last_30d": 3,
  "support_tickets_90d": 2,
  "email_click_rate": 0.12,
  "discount_usage_rate": 0.35
}
```

## ML Output

The churn model outputs a probability:

```text
churn_probability = 0.7444
```

This means the customer is estimated to have a 74.44% likelihood of churn based on the current model.

## Business Rule Inputs

The rules also use:

```text
customer_value = avg_order_value * total_orders
sessions_last_30d
churn_probability
```

## Rule Configuration

Rules are configured in:

```text
configs/decision_rules.yaml
```

Current thresholds:

```yaml
high_churn_probability: 0.72
medium_churn_probability: 0.45
high_customer_value: 5000
high_activity_sessions: 8
```

## Current Rules

### High Churn + High Customer Value

```text
IF churn_probability >= 0.72 AND customer_value >= 5000
THEN Create concierge recovery task
```

Reason:

High-value customers deserve human follow-up because losing them has a larger business impact.

### High Churn

```text
IF churn_probability >= 0.72
THEN Send 20% retention discount
```

Reason:

High-risk customers need immediate intervention.

### Medium Churn

```text
IF churn_probability >= 0.45
THEN Send personalized reminder
```

Reason:

Moderate-risk customers may not need a costly discount yet.

### Low Churn + High Activity

```text
IF churn_probability < 0.45 AND sessions_last_30d >= 8
THEN Offer premium bundle
```

Reason:

Active customers with low churn risk may be good upsell candidates.

### Default Case

```text
ELSE Continue nurture sequence
```

Reason:

Do not over-incentivize stable customers.

## Why Not Use Only ML?

The model should not directly decide every action because:

- Business actions have costs.
- Some rules must be controlled by business teams.
- Decision reasoning should be explainable.
- Thresholds may change faster than model retraining cycles.

This is why the project uses ML plus rules.

