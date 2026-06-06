from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd


RAW_DATA_PATH = Path("data/raw/customer_events.csv")


def generate_customer_events(rows: int = 2500, seed: int = 42) -> pd.DataFrame:
    """Create realistic synthetic e-commerce customer activity for portfolio demos."""
    rng = np.random.default_rng(seed)

    avg_order_value = rng.gamma(shape=5.0, scale=450.0, size=rows).round(2)
    total_orders = rng.poisson(lam=4.5, size=rows) + 1
    days_since_last_purchase = rng.integers(1, 180, size=rows)
    sessions_last_30d = rng.poisson(lam=6.0, size=rows)
    support_tickets_90d = rng.poisson(lam=0.8, size=rows)
    email_click_rate = rng.beta(a=2.2, b=6.0, size=rows).round(3)
    discount_usage_rate = rng.beta(a=1.7, b=5.5, size=rows).round(3)

    logit = (
        -1.8
        + 0.022 * days_since_last_purchase
        + 0.45 * support_tickets_90d
        - 0.18 * sessions_last_30d
        - 1.2 * email_click_rate
        + 0.9 * discount_usage_rate
        - 0.00015 * avg_order_value
    )
    churn_probability = 1 / (1 + np.exp(-logit))
    churned = rng.binomial(1, churn_probability)

    return pd.DataFrame(
        {
            "customer_id": [f"CUST-{idx:05d}" for idx in range(1, rows + 1)],
            "avg_order_value": avg_order_value,
            "total_orders": total_orders,
            "days_since_last_purchase": days_since_last_purchase,
            "sessions_last_30d": sessions_last_30d,
            "support_tickets_90d": support_tickets_90d,
            "email_click_rate": email_click_rate,
            "discount_usage_rate": discount_usage_rate,
            "churned": churned,
        }
    )


def write_sample_data(path: Path = RAW_DATA_PATH, rows: int = 2500, seed: int = 42) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    generate_customer_events(rows=rows, seed=seed).to_csv(path, index=False)
    return path


if __name__ == "__main__":
    output_path = write_sample_data()
    print(f"Wrote sample customer events to {output_path}")

