# API Guide

## Start The API

From the project root:

```bash
uvicorn growth_decision_engine.api.main:app --reload
```

If port `8000` is busy, use:

```bash
uvicorn growth_decision_engine.api.main:app --reload --port 8001
```

## API Docs

Open:

```text
http://127.0.0.1:8000/docs
```

or, if using port `8001`:

```text
http://127.0.0.1:8001/docs
```

## Health Endpoint

Request:

```text
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

Purpose:

This confirms the API server is running.

## Decision Endpoint

Request:

```text
POST /decisions
```

Payload:

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

Response:

```json
{
  "customer_id": "CUST-DEMO-001",
  "churn_probability": 0.7444,
  "action_key": "save_with_concierge",
  "action": "Create concierge recovery task",
  "channel": "crm",
  "priority": 1,
  "reason": "High churn risk and high customer value justify human follow-up."
}
```

## Train Endpoint

Request:

```text
POST /train
```

Purpose:

Retrains the churn model and returns metrics.

This is useful for demos, but in a production system retraining would usually run as a scheduled job or CI/CD pipeline step instead of a public API endpoint.

## How To Explain FastAPI Choice

FastAPI is used because:

- It is lightweight and production-friendly.
- It gives automatic API docs.
- Pydantic validates request payloads.
- It is common in Python ML serving workflows.

