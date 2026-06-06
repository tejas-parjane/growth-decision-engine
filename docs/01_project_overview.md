# Project Overview

## One-Line Explanation

Growth Decision Engine is an ML-powered decision system that predicts customer churn and recommends the next best growth action, such as a discount, reminder, upsell, or CRM follow-up.

## Problem

Most analytics systems stop at reporting:

```text
This customer is likely to churn.
```

That is useful, but incomplete. A business still needs to decide:

```text
What should we do next?
Who should receive which action?
Which channel should trigger the action?
Why did the system choose that action?
```

This project solves that gap by converting model insight into operational action.

## What The System Does

For each customer, the system:

1. Takes customer behavior signals.
2. Builds ML-ready features.
3. Predicts churn probability.
4. Applies business rules.
5. Returns a recommended action with a reason.

Example:

```json
{
  "customer_id": "CUST-DEMO-001",
  "churn_probability": 0.7444,
  "action": "Create concierge recovery task",
  "channel": "crm",
  "reason": "High churn risk and high customer value justify human follow-up."
}
```

## Why This Is Strong For A Portfolio

This is stronger than only building a churn model because it shows system thinking.

It demonstrates:

- Data generation and pipeline design
- Feature engineering
- ML model training
- Model inference
- Business rule design
- API development
- Interactive demo creation
- Explainable decisioning

The main portfolio message:

```text
I built a Growth Decision Engine that predicts churn and converts predictions into explainable retention and upsell actions through a decisioning API.
```

## Target Use Case

The current version models an e-commerce retention engine.

Customer signals include:

- Average order value
- Total orders
- Days since last purchase
- Sessions in the last 30 days
- Support tickets in the last 90 days
- Email click rate
- Discount usage rate

The system then decides whether to:

- Send a discount
- Create a CRM task
- Send a reminder
- Offer an upsell
- Continue nurture messaging

