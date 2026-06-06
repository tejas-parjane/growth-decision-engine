export interface CustomerSignal {
  customer_id: string;
  avg_order_value: number;
  total_orders: number;
  days_since_last_purchase: number;
  sessions_last_30d: number;
  support_tickets_90d: number;
  email_click_rate: number;
  discount_usage_rate: number;
}

export interface DecisionResponse {
  customer_id: string;
  churn_probability: number;
  action_key: string;
  action: string;
  channel: "email" | "crm" | "in_app";
  priority: number;
  reason: string;
}

export interface HealthResponse {
  status: string;
}
