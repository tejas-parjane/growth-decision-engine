from __future__ import annotations

from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from growth_decision_engine.decision_engine.engine import decide_next_best_action
from growth_decision_engine.models.train import train_churn_model


app = FastAPI(
    title="Growth Decision Engine",
    description="Predicts churn and returns the next best growth action.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CustomerSignal(BaseModel):
    customer_id: str = Field(examples=["CUST-00991"])
    avg_order_value: float = Field(gt=0, examples=[1250.0])
    total_orders: int = Field(ge=1, examples=[5])
    days_since_last_purchase: int = Field(ge=0, examples=[68])
    sessions_last_30d: int = Field(ge=0, examples=[3])
    support_tickets_90d: int = Field(ge=0, examples=[2])
    email_click_rate: float = Field(ge=0, le=1, examples=[0.12])
    discount_usage_rate: float = Field(ge=0, le=1, examples=[0.35])


class DecisionResponse(BaseModel):
    customer_id: str
    churn_probability: float
    action_key: str
    action: str
    channel: Literal["email", "crm", "in_app"]
    priority: int
    reason: str


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/decisions", response_model=DecisionResponse)
def create_decision(signal: CustomerSignal) -> dict:
    return decide_next_best_action(signal.model_dump())


@app.post("/train")
def train() -> dict:
    return {"metrics": train_churn_model()}

