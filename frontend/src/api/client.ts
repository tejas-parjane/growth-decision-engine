import type { CustomerSignal, DecisionResponse, HealthResponse } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

export function getHealth(): Promise<HealthResponse> {
  return request("/health");
}

export function postDecision(signal: CustomerSignal): Promise<DecisionResponse> {
  return request("/decisions", {
    method: "POST",
    body: JSON.stringify(signal),
  });
}
