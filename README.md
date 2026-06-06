# Growth Decision Engine

An end-to-end ML decision system for e-commerce retention. It predicts churn and converts the prediction into an executable next best action through a rules-based decision API.

This is positioned as a portfolio project for AI/ML engineering roles: it includes data generation, feature engineering, model training, decision orchestration, an API, an operator UI, and tests.

## Why This Project Exists

Dashboards show what happened. A decision engine decides what to do next.

This project demonstrates closed-loop analytics:

```text
Customer activity
-> Feature engineering
-> Churn model
-> Decision rules
-> Action recommendation
-> Activation channel
-> Feedback for future retraining
```

## System Architecture

```text
data/
  raw/customer_events.csv       Synthetic customer activity
src/growth_decision_engine/
  data_pipeline/                Reproducible data generation
  feature_engineering/          Customer value and engagement features
  models/                       Churn training and inference
  decision_engine/              Rules + model output -> action
  api/                          FastAPI service
app/
  streamlit_app.py              Interactive portfolio demo
configs/
  decision_rules.yaml           Business thresholds and action catalog
tests/
  test_decision_rules.py        Decision behavior tests
```

## Documentation

Read these docs to understand and explain the project:

- [Project Overview](docs/01_project_overview.md)
- [Architecture](docs/02_architecture.md)
- [Decision Logic](docs/03_decision_logic.md)
- [ML Workflow](docs/04_ml_workflow.md)
- [API Guide](docs/05_api_guide.md)
- [Demo Script](docs/06_demo_script.md)

## Quickstart

Create an environment and install dependencies:

```bash
pip install -r requirements.txt
```

Generate data and train the churn model:

```bash
python -m growth_decision_engine.data_pipeline.generate_sample_data
python -m growth_decision_engine.models.train
```

Run the API:

```bash
uvicorn growth_decision_engine.api.main:app --reload
```

Open the API docs:

```text
http://127.0.0.1:8000/docs
```

Run the Streamlit UI:

```bash
streamlit run app/streamlit_app.py
```

## Example API Request

```bash
curl -X POST "http://127.0.0.1:8000/decisions" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "CUST-DEMO-001",
    "avg_order_value": 1250,
    "total_orders": 5,
    "days_since_last_purchase": 68,
    "sessions_last_30d": 3,
    "support_tickets_90d": 2,
    "email_click_rate": 0.12,
    "discount_usage_rate": 0.35
  }'
```

Example response:

```json
{
  "customer_id": "CUST-DEMO-001",
  "churn_probability": 0.8124,
  "action_key": "save_with_concierge",
  "action": "Create concierge recovery task",
  "channel": "crm",
  "priority": 1,
  "reason": "High churn risk and high customer value justify human follow-up."
}
```

## Decision Logic

The ML model estimates churn probability. The decision engine then combines that probability with business context:

- High churn + high customer value -> concierge recovery task
- High churn -> retention discount
- Medium churn -> personalized reminder
- Low churn + high activity -> premium upsell
- Otherwise -> nurture sequence

This separation is intentional: ML handles pattern detection, while business rules keep actions explainable and controllable.

## Portfolio Positioning

Use this wording:

> Built a Growth Decision Engine that predicts churn and automatically recommends retention or upsell actions through a FastAPI decisioning service.

Avoid reducing it to:

> Built a churn prediction model.

## Next Enhancements

- Add MLflow experiment tracking and model registry metadata.
- Persist decisions to PostgreSQL for auditability.
- Add feedback events such as `offer_sent`, `clicked`, `converted`, and `retained`.
- Add a batch scoring job for daily customer action queues.
- Add an LLM explanation layer after the non-LLM system is stable.
