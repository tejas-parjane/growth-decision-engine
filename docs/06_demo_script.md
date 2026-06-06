# Demo Script

Use this when explaining the project in your portfolio, interview, or LinkedIn post.

## Short Version

```text
This project is a Growth Decision Engine for e-commerce retention. It predicts customer churn and then uses business rules to recommend the next best action, such as a discount, reminder, upsell, or CRM follow-up. I built it as an end-to-end ML system with data generation, feature engineering, model training, FastAPI serving, and a Streamlit demo.
```

## 60-Second Walkthrough

```text
The goal of this project is to move beyond dashboards. A dashboard tells the business what happened, but this system decides what to do next.

The workflow starts with customer activity data, such as purchase history, session frequency, support tickets, email engagement, and discount behavior. I transform that into features like customer value and engagement score.

Then I train a churn model that estimates the probability that a customer will churn. But the project does not stop at prediction. The decision engine combines the model score with business rules. For example, if a customer has high churn risk and high customer value, the system recommends a concierge recovery task in CRM. If the customer has low churn risk but high activity, it recommends an upsell.

I exposed the system through FastAPI and also built a Streamlit demo so a reviewer can change customer signals and see the decision update.

The key idea is that this is not just a churn model. It is an operational decision system that converts ML insight into action.
```

## Technical Explanation

```text
I separated the system into layers: data pipeline, feature engineering, model training, decision engine, API, and UI. This separation makes the system easier to test and extend.

The model layer predicts churn probability. The decision layer owns business logic. I intentionally kept these separate because model scores and business actions change for different reasons. A business team may want to adjust discount thresholds without retraining the model.

The API validates customer payloads using Pydantic and returns a structured decision response. The Streamlit UI acts as an operator demo for portfolio presentation.
```

## Questions You Might Get

### Why did you use synthetic data?

```text
I used synthetic data so the project is reproducible and does not depend on private customer data. The focus is demonstrating the end-to-end ML decision architecture. With real data, I would validate feature quality, tune the model, calibrate probabilities, and monitor drift.
```

### Why use rules after ML?

```text
ML predicts risk, but business rules decide the action. That keeps the system explainable and allows business thresholds to change without retraining the model.
```

### Why Random Forest?

```text
Random Forest is a strong baseline for tabular data. It handles nonlinear patterns and requires less preprocessing than many linear models. For a next version, I would compare it with logistic regression for interpretability and XGBoost for performance.
```

### How would you make this production-ready?

```text
I would add a real database, batch scoring jobs, model tracking with MLflow, decision logging, monitoring, CI/CD, and a feedback loop that records whether each recommended action worked.
```

### What is the most important engineering decision?

```text
The most important decision is separating prediction from decisioning. The model estimates churn risk, while the decision engine maps that risk to business actions. That makes the system easier to explain, test, and change.
```

## Resume Bullet

```text
Built an end-to-end Growth Decision Engine using Python, scikit-learn, FastAPI, and Streamlit to predict churn and recommend explainable retention or upsell actions through a decisioning API.
```

