import { Link } from "react-router-dom";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/health",
    desc: "Health check",
    curl: "curl http://127.0.0.1:8000/health",
  },
  {
    method: "POST",
    path: "/decisions",
    desc: "Get a decision for a customer",
    curl: `curl -X POST http://127.0.0.1:8000/decisions \\
  -H "Content-Type: application/json" \\
  -d '{"customer_id":"CUST-DEMO-001","avg_order_value":1250,"total_orders":5,"days_since_last_purchase":68,"sessions_last_30d":3,"support_tickets_90d":2,"email_click_rate":0.12,"discount_usage_rate":0.35}'`,
  },
  {
    method: "POST",
    path: "/train",
    desc: "Retrain the churn model",
    curl: "curl -X POST http://127.0.0.1:8000/train",
  },
];

const INPUT_FIELDS = [
  { field: "customer_id", type: "string", desc: "Unique customer identifier" },
  { field: "avg_order_value", type: "number", desc: "Average monetary value per order" },
  { field: "total_orders", type: "integer", desc: "Total orders placed" },
  { field: "days_since_last_purchase", type: "integer", desc: "Days since last order" },
  { field: "sessions_last_30d", type: "integer", desc: "Sessions in the last 30 days" },
  { field: "support_tickets_90d", type: "integer", desc: "Support tickets in the last 90 days" },
  { field: "email_click_rate", type: "number (0–1)", desc: "Email click-through rate" },
  { field: "discount_usage_rate", type: "number (0–1)", desc: "Fraction of orders with a discount" },
];

const FAQ = [
  {
    q: "Why use synthetic data?",
    a: "Synthetic data makes the project reproducible without depending on private customer data. The focus is demonstrating the end-to-end ML decision architecture. With real data, I would validate feature quality, tune the model, calibrate probabilities, and monitor drift.",
  },
  {
    q: "Why rules after ML?",
    a: "ML predicts risk, but business rules decide the action. That keeps the system explainable and allows business thresholds to change without retraining the model.",
  },
  {
    q: "Why Random Forest?",
    a: "Random Forest is a strong baseline for tabular data. It handles nonlinear patterns and requires less preprocessing than many linear models. A next version could compare it with logistic regression for interpretability or XGBoost for performance.",
  },
  {
    q: "How would you make this production-ready?",
    a: "I would add a real database, batch scoring jobs, model tracking with MLflow, decision logging, monitoring, CI/CD, and a feedback loop that records whether each recommended action worked.",
  },
  {
    q: "What is the most important engineering decision?",
    a: "Separating prediction from decisioning. The model estimates churn risk, while the decision engine maps that risk to business actions. This makes the system easier to explain, test, and change independently.",
  },
];

const DEMO_SCRIPT = `This project is a Growth Decision Engine for e-commerce retention. It predicts customer churn and then uses business rules to recommend the next best action, such as a discount, reminder, upsell, or CRM follow-up. I built it as an end-to-end ML system with data generation, feature engineering, model training, FastAPI serving, and a React UI.

The key idea: this is not just a churn model. It is an operational decision system that converts ML insight into action.`;

export default function Guide() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-light text-[#e8edf5]">Guide</h1>
        <p className="mt-1.5 text-sm text-[#6b7a8f]">
          How to use the engine and integrate with the API.
        </p>
      </div>

      <section className="mb-16">
        <div className="mb-8">
          <span className="text-xs tracking-[0.2em] text-[#4a5568] uppercase">Quickstart</span>
          <h2 className="mt-2 text-xl font-light text-[#e8edf5]">Get started</h2>
        </div>
        <div className="space-y-0">
          {[
            { step: "01", title: "Open the Engine", desc: <Link to="/decision" className="text-[#4a6fa5] underline underline-offset-2 hover:text-[#5d80b0]">Navigate to the Decision Engine</Link> },
            { step: "02", title: "Input signals", desc: "Fill in customer behaviour data. Use sliders and number fields to adjust values." },
            { step: "03", title: "Get a decision", desc: "Click 'Get Decision' to see churn probability, recommended action, and rationale." },
            { step: "04", title: "Try scenarios", desc: "Use 'Random' to test different profiles and see how the decision changes." },
          ].map((s) => (
            <div key={s.step} className="flex gap-4 py-4">
              <span className="text-sm font-medium text-[#4a6fa5] w-8 shrink-0">{s.step}</span>
              <div>
                <div className="text-sm font-medium text-[#e8edf5]">{s.title}</div>
                <div className="mt-0.5 text-sm text-[#6b7a8f]">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8">
          <span className="text-xs tracking-[0.2em] text-[#4a5568] uppercase">Reference</span>
          <h2 className="mt-2 text-xl font-light text-[#e8edf5]">Input fields</h2>
        </div>
        <div className="overflow-x-auto rounded-lg border border-[#1e2640]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1e2640] bg-[#0f1424]">
                <th className="px-4 py-3 font-medium text-[#4a5568] uppercase tracking-wider">Field</th>
                <th className="px-4 py-3 font-medium text-[#4a5568] uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 font-medium text-[#4a5568] uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody>
              {INPUT_FIELDS.map((f) => (
                <tr key={f.field} className="border-b border-[#161c30] last:border-0">
                  <td className="px-4 py-3 text-[#4a6fa5]">{f.field}</td>
                  <td className="px-4 py-3 text-[#6b7a8f]">{f.type}</td>
                  <td className="px-4 py-3 text-[#6b7a8f]">{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8">
          <span className="text-xs tracking-[0.2em] text-[#4a5568] uppercase">API</span>
          <h2 className="mt-2 text-xl font-light text-[#e8edf5]">Endpoints</h2>
        </div>
        <p className="mb-6 text-sm text-[#6b7a8f]">
          The API runs at <code className="rounded bg-[#0f1424] px-2 py-0.5 text-[#7a99c4]">http://127.0.0.1:8000</code>.
          Interactive docs at <a href="http://127.0.0.1:8000/docs" target="_blank" rel="noopener noreferrer" className="text-[#4a6fa5] underline underline-offset-2 hover:text-[#5d80b0]">/docs</a>.
        </p>
        <div className="space-y-4">
          {ENDPOINTS.map((ep) => (
            <div key={ep.path} className="border border-[#1e2640] bg-[#0f1424] p-5">
              <div className="flex items-center gap-3">
                <span className={`rounded px-2 py-0.5 text-xs font-medium uppercase ${
                  ep.method === "GET" ? "bg-[#4a6fa5]/10 text-[#5d80b0]" : "bg-[#5d80b0]/10 text-[#7a99c4]"
                }`}>
                  {ep.method}
                </span>
                <code className="text-sm text-[#e8edf5]">{ep.path}</code>
                <span className="text-xs text-[#4a5568]">{ep.desc}</span>
              </div>
              <div className="mt-3">
                <div className="mb-1 text-xs text-[#4a5568]">Example:</div>
                <pre className="overflow-x-auto rounded bg-[#0a0e1a] p-3 text-xs text-[#6b7a8f]">
                  {ep.curl}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8">
          <span className="text-xs tracking-[0.2em] text-[#4a5568] uppercase">Configuration</span>
          <h2 className="mt-2 text-xl font-light text-[#e8edf5]">Decision rules</h2>
        </div>
        <p className="mb-4 text-sm text-[#6b7a8f]">
          Thresholds and action catalog in <code className="rounded bg-[#0f1424] px-2 py-0.5 text-[#7a99c4]">configs/decision_rules.yaml</code>.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-[#1e2640] bg-[#0f1424] p-5 text-xs text-[#6b7a8f]">
{`actions:
  save_with_discount:     "Send 20% retention discount"    (email, P1)
  save_with_concierge:    "Create concierge recovery task" (crm, P1)
  remind:                 "Send personalized reminder"     (email, P2)
  upsell:                 "Offer premium bundle"           (in_app, P3)
  nurture:                "Continue nurture sequence"      (email, P4)

thresholds:
  high_churn_probability:    0.72
  medium_churn_probability:  0.45
  high_customer_value:       5000
  high_activity_sessions:    8`}
        </pre>
      </section>

      <section className="mb-16 rounded-lg border border-[#1e2640] bg-[#0f1424] p-6">
        <h2 className="text-sm font-medium text-[#b0c4de]">Demo script</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#6b7a8f] italic">
          {DEMO_SCRIPT}
        </p>
        <p className="mt-4 text-xs text-[#4a5568]">Use this when presenting the project in a portfolio or interview.</p>
      </section>

      <section>
        <div className="mb-8">
          <span className="text-xs tracking-[0.2em] text-[#4a5568] uppercase">FAQ</span>
          <h2 className="mt-2 text-xl font-light text-[#e8edf5]">Common questions</h2>
        </div>
        <div className="space-y-0 divide-y divide-[#161c30]">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-[#b0c4de] transition hover:text-[#e8edf5]">
                {item.q}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#4a5568] transition group-open:rotate-180">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="mt-3 text-sm leading-relaxed text-[#6b7a8f]">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
