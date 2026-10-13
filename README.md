# Growth Decision Engine — Churn Prediction → Next-Best-Action API

> **Independent Data Science project** (self-directed, synthetic e-commerce data). Not a client engagement.
> Live methodology + reproducible training — see *ML methodology* and *Limitations* below.

An end-to-end ML decision system for e-commerce retention. It **predicts churn** (RandomForest classifier, evaluated with ROC-AUC / average precision) and converts the prediction into an **executable next-best action** through a rules-based decision API served with FastAPI.

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

## ML methodology (what to check first)

**Target:** binary churn label (`churned`) on synthetic customer activity.

**Features (9 columns):** `avg_order_value`, `total_orders`, `days_since_last_purchase`, `sessions_last_30d`, `support_tickets_90d`, `email_click_rate`, `discount_usage_rate`, plus engineered `customer_value = avg_order_value × total_orders` and `engagement_score = sessions_last_30d × 0.7 + email_click_rate × 10` (`src/growth_decision_engine/feature_engineering/features.py`).

**Model:** `StandardScaler` → `RandomForestClassifier(n_estimators=250, min_samples_leaf=10, class_weight="balanced", random_state=42)` (`src/growth_decision_engine/models/train.py`).

**Validation:** stratified 75/25 train/test split (`random_state=42`); reports **ROC-AUC** and **average precision** plus train/test row counts to `models/metrics.json`. Run `POST /train` or `python -m growth_decision_engine.models.train` to reproduce your numbers — paste the resulting ROC-AUC/AP into your CV rather than quoting anyone else's.

**Decision layer (intentional separation):** ML handles pattern detection; transparent business rules map churn probability + customer value to an action (`configs/decision_rules.yaml`, `src/growth_decision_engine/decision_engine/`). Every response includes the reason and channel, so the action is explainable and controllable.

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

## Limitations (read before citing results)

- **Synthetic data** — customer activity is generated for demonstration. Real churn distributions, seasonality, and feature drift will differ; the pipeline is built so real event data can replace the generator.
- **Single split, single model family** — results come from one stratified split with a RandomForest baseline. No cross-validation or model comparison yet; treat ROC-AUC/AP as a baseline, not a production guarantee.
- **Rules are illustrative** — thresholds in `decision_rules.yaml` are reasonable defaults, not calibrated business policy.

## Technologies

Python · Pandas · Scikit-learn (RandomForest, StandardScaler, Pipeline) · FastAPI · Pydantic · Streamlit · pytest
