# ML Workflow

## Step 1: Generate Data

Command:

```bash
python -m growth_decision_engine.data_pipeline.generate_sample_data
```

Output:

```text
data/raw/customer_events.csv
```

The generated dataset contains customer behavior signals and a churn label.

## Step 2: Build Features

The system builds model features in:

```text
src/growth_decision_engine/feature_engineering/features.py
```

The final model features include:

```text
avg_order_value
total_orders
days_since_last_purchase
sessions_last_30d
support_tickets_90d
email_click_rate
discount_usage_rate
customer_value
engagement_score
```

## Step 3: Train Model

Command:

```bash
python -m growth_decision_engine.models.train
```

Training file:

```text
src/growth_decision_engine/models/train.py
```

The model pipeline:

```text
StandardScaler -> RandomForestClassifier
```

Outputs:

```text
models/churn_model.joblib
models/metrics.json
```

## Step 4: Evaluate Model

Current metrics include:

```text
roc_auc
average_precision
training_rows
test_rows
```

ROC AUC measures how well the model ranks churned customers above non-churned customers.

Average precision is useful when churn classes are imbalanced because it focuses on precision-recall behavior.

## Step 5: Inference

Inference happens in:

```text
src/growth_decision_engine/models/predict.py
```

The function:

```python
predict_churn_probability(customer)
```

does three things:

1. Loads the trained model.
2. Builds the same features used during training.
3. Returns churn probability.

## Important ML Engineering Point

Training and inference must use the same feature logic.

That is why both training and prediction call the shared feature engineering code instead of duplicating feature calculations in multiple places.

## Current Limitation

The model uses synthetic data, so the metric is useful for validating the pipeline, not for claiming production business accuracy.

How to explain this:

```text
I used synthetic data to make the project reproducible. The focus is the end-to-end decisioning architecture. With real company data, I would validate feature quality, calibrate probabilities, and monitor model performance over time.
```

