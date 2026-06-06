# Architecture

## High-Level Flow

```text
Customer Activity
-> Data Pipeline
-> Feature Engineering
-> Churn Model
-> Decision Engine
-> Recommended Action
-> Activation Channel
```

## Folder Structure

```text
growth-decision-engine/
  app/
    streamlit_app.py
  configs/
    decision_rules.yaml
  data/
    raw/
    processed/
  docs/
  models/
  notebooks/
  src/growth_decision_engine/
    api/
    data_pipeline/
    decision_engine/
    feature_engineering/
    models/
  tests/
```

## Layer 1: Data Pipeline

File:

```text
src/growth_decision_engine/data_pipeline/generate_sample_data.py
```

Purpose:

- Creates synthetic e-commerce customer data.
- Makes the project runnable without needing a private company dataset.
- Produces `data/raw/customer_events.csv`.

Why synthetic data is acceptable here:

- The goal is to demonstrate system design and ML workflow.
- Real customer data is often private.
- Synthetic data lets reviewers run the project end to end.

## Layer 2: Feature Engineering

File:

```text
src/growth_decision_engine/feature_engineering/features.py
```

Purpose:

- Converts raw customer behavior into model-ready features.
- Adds derived features such as customer value and engagement score.

Important features:

```text
customer_value = avg_order_value * total_orders
engagement_score = sessions_last_30d * 0.7 + email_click_rate * 10
```

Why this matters:

- Raw data is rarely enough for good decisions.
- Features represent business meaning.
- Feature engineering connects domain understanding with ML.

## Layer 3: ML Model

Files:

```text
src/growth_decision_engine/models/train.py
src/growth_decision_engine/models/predict.py
```

Purpose:

- Trains a churn prediction model.
- Saves the trained model to `models/churn_model.joblib`.
- Saves metrics to `models/metrics.json`.
- Loads the model during API or UI inference.

Current model:

```text
RandomForestClassifier
```

Why this model is used:

- Works well as a baseline.
- Handles nonlinear relationships.
- Easy to train and explain at a high level.
- Good enough for a first portfolio version.

## Layer 4: Decision Engine

Files:

```text
src/growth_decision_engine/decision_engine/engine.py
src/growth_decision_engine/decision_engine/rules.py
configs/decision_rules.yaml
```

Purpose:

- Combines ML predictions with business rules.
- Converts churn probability into a recommended business action.

This is the core of the project.

The ML model answers:

```text
How likely is this customer to churn?
```

The decision engine answers:

```text
What should the business do about it?
```

## Layer 5: API

File:

```text
src/growth_decision_engine/api/main.py
```

Purpose:

- Exposes the decision engine through FastAPI.
- Allows other systems to request customer decisions.
- Provides interactive API docs through Swagger UI.

Main endpoints:

```text
GET /health
POST /decisions
POST /train
```

## Layer 6: Streamlit UI

File:

```text
app/streamlit_app.py
```

Purpose:

- Provides an interactive portfolio demo.
- Lets users adjust customer signals.
- Shows churn probability, priority, channel, action, and rationale.

This is useful for demos because recruiters and interviewers can understand the system visually.

