import { useState, useRef } from "react";
import { postDecision } from "../api/client";
import type { CustomerSignal, DecisionResponse } from "../types";

const DEFAULT_SIGNAL: CustomerSignal = {
  customer_id: "CUST-DEMO-001",
  avg_order_value: 1250,
  total_orders: 5,
  days_since_last_purchase: 68,
  sessions_last_30d: 3,
  support_tickets_90d: 2,
  email_click_rate: 0.12,
  discount_usage_rate: 0.35,
};

const REQUIRED_CSV_COLUMNS = [
  "customer_id", "avg_order_value", "total_orders", "days_since_last_purchase",
  "sessions_last_30d", "support_tickets_90d", "email_click_rate", "discount_usage_rate",
];

const CHANNEL_STYLES: Record<string, string> = {
  email: "bg-[#4a6fa5]/10 text-[#5d80b0]",
  crm: "bg-[#c97f3a]/10 text-[#d4914e]",
  in_app: "bg-[#5d80b0]/10 text-[#7a99c4]",
};

export default function DecisionEngine() {
  const [tab, setTab] = useState<"single" | "batch">("single");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-light text-[#e8edf5]">Decision Engine</h1>
        <p className="mt-1.5 text-sm text-[#6b7a8f]">
          Score a single customer or upload a CSV for batch decisions.
        </p>
      </div>

      <div className="mb-8 flex gap-6 border-b border-[#1e2640]">
        <button
          onClick={() => setTab("single")}
          className={`pb-3 text-sm font-medium transition-colors ${
            tab === "single"
              ? "border-b-2 border-[#4a6fa5] text-[#e8edf5]"
              : "text-[#4a5568] hover:text-[#b0c4de]"
          }`}
        >
          Single Customer
        </button>
        <button
          onClick={() => setTab("batch")}
          className={`pb-3 text-sm font-medium transition-colors ${
            tab === "batch"
              ? "border-b-2 border-[#4a6fa5] text-[#e8edf5]"
              : "text-[#4a5568] hover:text-[#b0c4de]"
          }`}
        >
          Batch CSV
        </button>
      </div>

      {tab === "single" ? <SingleCustomer /> : <BatchUpload />}
    </div>
  );
}

function SingleCustomer() {
  const [signal, setSignal] = useState<CustomerSignal>(DEFAULT_SIGNAL);
  const [decision, setDecision] = useState<DecisionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const update = (field: keyof CustomerSignal, value: string | number) => {
    setSignal((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDecision(null);
    try {
      setDecision(await postDecision(signal));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const randomize = () => {
    setSignal({
      customer_id: "CUST-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
      avg_order_value: Math.round(Math.random() * 2000 + 500),
      total_orders: Math.floor(Math.random() * 15 + 1),
      days_since_last_purchase: Math.floor(Math.random() * 150 + 1),
      sessions_last_30d: Math.floor(Math.random() * 30 + 1),
      support_tickets_90d: Math.floor(Math.random() * 5),
      email_click_rate: Number((Math.random() * 0.5).toFixed(2)),
      discount_usage_rate: Number((Math.random() * 0.6).toFixed(2)),
    });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      {/* Form */}
      <form onSubmit={submit} className="lg:col-span-2 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-[#b0c4de]">Customer Signals</h2>
          <button
            type="button"
            onClick={randomize}
            className="rounded border border-[#1e2640] px-3 py-1 text-xs text-[#6b7a8f] transition hover:border-[#4a6fa5] hover:text-[#b0c4de]"
          >
            Random
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-[#4a5568] uppercase tracking-wider">Customer ID</label>
          <input
            type="text"
            value={signal.customer_id}
            onChange={(e) => update("customer_id", e.target.value)}
            className="w-full rounded-lg border border-[#1e2640] bg-[#0f1424] px-3 py-2 text-sm text-[#e8edf5] outline-none transition focus:border-[#4a6fa5]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs text-[#4a5568] uppercase tracking-wider">Avg Order Value</label>
            <input
              type="number"
              min={1}
              value={signal.avg_order_value}
              onChange={(e) => update("avg_order_value", Number(e.target.value))}
              className="w-full rounded-lg border border-[#1e2640] bg-[#0f1424] px-3 py-2 text-sm text-[#e8edf5] outline-none transition focus:border-[#4a6fa5]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#4a5568] uppercase tracking-wider">Total Orders</label>
            <input
              type="number"
              min={1}
              value={signal.total_orders}
              onChange={(e) => update("total_orders", Number(e.target.value))}
              className="w-full rounded-lg border border-[#1e2640] bg-[#0f1424] px-3 py-2 text-sm text-[#e8edf5] outline-none transition focus:border-[#4a6fa5]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-[#4a5568] uppercase tracking-wider">Days Since Purchase</label>
            <span className="text-xs text-[#6b7a8f]">{signal.days_since_last_purchase}d</span>
          </div>
          <input
            type="range"
            min={0}
            max={180}
            value={signal.days_since_last_purchase}
            onChange={(e) => update("days_since_last_purchase", Number(e.target.value))}
            className="w-full accent-[#4a6fa5]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs text-[#4a5568] uppercase tracking-wider">Sessions (30d)</label>
            <input
              type="number"
              min={0}
              value={signal.sessions_last_30d}
              onChange={(e) => update("sessions_last_30d", Number(e.target.value))}
              className="w-full rounded-lg border border-[#1e2640] bg-[#0f1424] px-3 py-2 text-sm text-[#e8edf5] outline-none transition focus:border-[#4a6fa5]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#4a5568] uppercase tracking-wider">Support Tickets</label>
            <input
              type="number"
              min={0}
              value={signal.support_tickets_90d}
              onChange={(e) => update("support_tickets_90d", Number(e.target.value))}
              className="w-full rounded-lg border border-[#1e2640] bg-[#0f1424] px-3 py-2 text-sm text-[#e8edf5] outline-none transition focus:border-[#4a6fa5]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-[#4a5568] uppercase tracking-wider">Email Click Rate</label>
            <span className="text-xs text-[#6b7a8f]">{signal.email_click_rate}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={signal.email_click_rate}
            onChange={(e) => update("email_click_rate", Number(e.target.value))}
            className="w-full accent-[#4a6fa5]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-[#4a5568] uppercase tracking-wider">Discount Usage Rate</label>
            <span className="text-xs text-[#6b7a8f]">{signal.discount_usage_rate}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={signal.discount_usage_rate}
            onChange={(e) => update("discount_usage_rate", Number(e.target.value))}
            className="w-full accent-[#4a6fa5]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#4a6fa5] py-2.5 text-sm font-medium text-white transition hover:bg-[#5d80b0] disabled:opacity-50"
        >
          {loading ? "Running prediction..." : "Get Decision"}
        </button>
      </form>

      {/* Output */}
      <div className="lg:col-span-3 space-y-6">
        {error && (
          <div className="rounded-lg border border-[#c97f3a]/30 bg-[#c97f3a]/5 p-4 text-sm text-[#d4914e]">
            {error}
          </div>
        )}

        {!decision && !error && (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-[#1e2640] p-16 text-center">
            <div>
              <p className="text-sm text-[#4a5568]">Submit signals to see the decision</p>
            </div>
          </div>
        )}

        {decision && (
          <>
            <div className="rounded-lg border border-[#1e2640] bg-[#0f1424] p-6">
              <div className="mb-2 text-xs text-[#4a5568] uppercase tracking-wider">Churn Probability</div>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-light text-[#e8edf5]">
                  {(decision.churn_probability * 100).toFixed(1)}%
                </span>
                <span className="mb-1 text-xs text-[#4a5568]">/ 100</span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#161c30]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${decision.churn_probability * 100}%`,
                    background: `linear-gradient(90deg, #4a6fa5, ${decision.churn_probability > 0.6 ? '#c97f3a' : '#5d80b0'})`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-lg border border-[#1e2640] bg-[#0f1424] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-[#b0c4de]">Decision</h3>
                <span className={`rounded px-2.5 py-0.5 text-xs font-medium ${CHANNEL_STYLES[decision.channel]}`}>
                  {decision.channel.toUpperCase()}
                </span>
              </div>
              <p className="text-lg font-medium text-[#e8edf5]">{decision.action}</p>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <span className="text-[#c97f3a]">P{decision.priority}</span>
                <span className="text-[#1e2640]">|</span>
                <span className="text-[#4a5568]">{decision.action_key}</span>
              </div>
            </div>

            <div className="rounded-lg border border-[#1e2640] bg-[#0f1424] p-6">
              <h3 className="mb-2 text-xs text-[#4a5568] uppercase tracking-wider">Rationale</h3>
              <p className="text-sm leading-relaxed text-[#6b7a8f]">{decision.reason}</p>
            </div>

            <details className="rounded-lg border border-[#1e2640]">
              <summary className="cursor-pointer px-6 py-3 text-xs text-[#4a5568] transition hover:text-[#b0c4de]">
                Raw API Response
              </summary>
              <div className="border-t border-[#1e2640] p-4">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(decision, null, 2));
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="rounded bg-[#161c30] px-3 py-1 text-xs text-[#6b7a8f] transition hover:text-[#b0c4de]"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="overflow-x-auto text-xs text-[#4a5568]">
                  {JSON.stringify(decision, null, 2)}
                </pre>
              </div>
            </details>
          </>
        )}
      </div>
    </div>
  );
}

function BatchUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Array<{ signal: CustomerSignal; decision: DecisionResponse }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.trim().split("\n");
    if (lines.length < 2) {
      setError("CSV must have a header row and at least one data row.");
      return;
    }

    const headers = lines[0].split(",").map((h) => h.trim());
    const missing = REQUIRED_CSV_COLUMNS.filter((c) => !headers.includes(c));
    if (missing.length > 0) {
      setError(`Missing columns: ${missing.join(", ")}`);
      return;
    }

    const parsed: CustomerSignal[] = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(",").map((v) => v.trim());
      if (vals.length !== headers.length) continue;
      const row: Record<string, string | number> = {};
      headers.forEach((h, idx) => {
        row[h] = h === "customer_id" ? vals[idx] : Number(vals[idx]);
      });
      parsed.push(row as unknown as CustomerSignal);
    }

    if (parsed.length === 0) {
      setError("No valid rows found.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    setProgress(0);

    const batch: Array<{ signal: CustomerSignal; decision: DecisionResponse }> = [];
    for (let i = 0; i < parsed.length; i++) {
      try {
        batch.push({ signal: parsed[i], decision: await postDecision(parsed[i]) });
      } catch {
        batch.push({
          signal: parsed[i],
          decision: {
            customer_id: parsed[i].customer_id,
            churn_probability: 0,
            action_key: "error",
            action: "Request failed",
            channel: "email",
            priority: 99,
            reason: "Error processing this customer.",
          },
        });
      }
      setProgress(Math.round(((i + 1) / parsed.length) * 100));
    }
    setResults(batch);
    setLoading(false);
  };

  const downloadResults = () => {
    if (results.length === 0) return;
    const rows = results.map((r) => ({
      customer_id: r.decision.customer_id,
      churn_probability: r.decision.churn_probability,
      action: r.decision.action,
      action_key: r.decision.action_key,
      channel: r.decision.channel,
      priority: r.decision.priority,
      reason: r.decision.reason,
    }));
    const csv = [
      "customer_id,churn_probability,action,action_key,channel,priority,reason",
      ...rows.map((r) =>
        `"${r.customer_id}",${r.churn_probability},"${r.action}","${r.action_key}","${r.channel}",${r.priority},"${r.reason}"`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "batch_decisions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="rounded-lg border border-[#1e2640] bg-[#0f1424] p-6">
        <h2 className="text-sm font-medium text-[#b0c4de]">Upload CSV</h2>
        <p className="mt-1.5 text-xs text-[#6b7a8f]">
          Required columns: <span className="text-[#4a6fa5]">{REQUIRED_CSV_COLUMNS.join(", ")}</span>
        </p>
        <div className="mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFile}
            className="block w-full text-xs text-[#6b7a8f] file:mr-3 file:rounded file:border-0 file:bg-[#4a6fa5] file:px-4 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-[#5d80b0]"
          />
        </div>

        {loading && (
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-[#6b7a8f]">
              <span>Processing...</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#161c30]">
              <div
                className="h-full rounded-full bg-[#4a6fa5] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg border border-[#c97f3a]/30 bg-[#c97f3a]/5 p-3 text-xs text-[#d4914e]">
            {error}
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="rounded-lg border border-[#1e2640] bg-[#0f1424] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-[#b0c4de]">
              {results.length} customer{results.length > 1 ? "s" : ""} scored
            </h3>
            <button
              onClick={downloadResults}
              className="rounded bg-[#161c30] px-3 py-1.5 text-xs text-[#6b7a8f] transition hover:text-[#b0c4de]"
            >
              Download CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1e2640]">
                  <th className="px-3 py-2 font-medium text-[#4a5568]">Customer</th>
                  <th className="px-3 py-2 font-medium text-[#4a5568]">Churn</th>
                  <th className="px-3 py-2 font-medium text-[#4a5568]">Action</th>
                  <th className="px-3 py-2 font-medium text-[#4a5568]">Channel</th>
                  <th className="px-3 py-2 font-medium text-[#4a5568]">Priority</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.decision.customer_id} className="border-b border-[#1e2640]/50 last:border-0">
                    <td className="px-3 py-2 text-[#4a6fa5]">{r.decision.customer_id}</td>
                    <td className="px-3 py-2 text-[#b0c4de]">{(r.decision.churn_probability * 100).toFixed(1)}%</td>
                    <td className="max-w-40 truncate px-3 py-2 text-[#6b7a8f]" title={r.decision.action}>
                      {r.decision.action}
                    </td>
                    <td className="px-3 py-2">
                      <span className={`rounded px-2 py-0.5 text-xs font-medium ${CHANNEL_STYLES[r.decision.channel] || "bg-[#161c30] text-[#6b7a8f]"}`}>
                        {r.decision.channel.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[#c97f3a]">P{r.decision.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
