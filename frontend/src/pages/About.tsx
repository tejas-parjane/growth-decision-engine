const LAYERS = [
  {
    title: "Data Pipeline",
    path: "src/growth_decision_engine/data_pipeline/generate_sample_data.py",
    desc: "Creates synthetic e-commerce customer data so the project runs without needing private datasets. Produces data/raw/customer_events.csv.",
    tech: "CSV, Pandas",
  },
  {
    title: "Feature Engineering",
    path: "src/growth_decision_engine/feature_engineering/features.py",
    desc: "Converts raw behaviour into model-ready features including customer_value and engagement_score. Training and inference share this same code.",
    tech: "Pandas, Python",
  },
  {
    title: "ML Model",
    path: "src/growth_decision_engine/models/train.py",
    desc: "Trains a RandomForestClassifier via a StandardScaler pipeline. Saves the model to models/churn_model.joblib and metrics to models/metrics.json.",
    tech: "scikit-learn",
  },
  {
    title: "Decision Engine",
    path: "src/growth_decision_engine/decision_engine/rules.py",
    desc: "Combines ML predictions with configurable YAML business rules. The model predicts risk; the rules decide the action — kept separate intentionally.",
    tech: "Python, YAML",
  },
  {
    title: "API",
    path: "src/growth_decision_engine/api/main.py",
    desc: "FastAPI endpoints expose GET /health, POST /decisions, and POST /train with Pydantic validation and automatic Swagger docs.",
    tech: "FastAPI",
  },
  {
    title: "Activation Layer",
    path: "Decisions map to email, CRM, or in-app channels",
    desc: "Every decision carries a channel — email, CRM task, or in-app message — ready for downstream execution systems.",
    tech: "API-ready",
  },
];

const FEATURES_LIST = [
  { name: "avg_order_value", desc: "Average monetary value per order" },
  { name: "total_orders", desc: "Total number of orders placed" },
  { name: "days_since_last_purchase", desc: "Days since last order" },
  { name: "sessions_last_30d", desc: "Sessions in the last 30 days" },
  { name: "support_tickets_90d", desc: "Support tickets in the last 90 days" },
  { name: "email_click_rate", desc: "Email click-through rate (0–1)" },
  { name: "discount_usage_rate", desc: "Fraction of orders with a discount (0–1)" },
  { name: "customer_value", desc: "avg_order_value × total_orders (derived)" },
  { name: "engagement_score", desc: "sessions_last_30d × 0.7 + email_click_rate × 10 (derived)" },
];

const STACK = [
  { name: "Python 3.10+", role: "Core language" },
  { name: "FastAPI", role: "Decision API with auto docs" },
  { name: "scikit-learn", role: "Random Forest churn model" },
  { name: "Pandas / NumPy", role: "Data processing & features" },
  { name: "React + TypeScript", role: "Frontend UI" },
  { name: "Tailwind CSS", role: "UI styling" },
  { name: "YAML", role: "Decision rules configuration" },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">About the Project</h1>
      <p className="mt-2 text-slate-400">
        Why a decision engine matters and how this project is built.
      </p>

      {/* Problem */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">The Problem</h2>
        <p className="mt-3 leading-relaxed text-slate-400">
          Dashboards show what happened. They describe the past. But businesses don't fail
          from a lack of dashboards — they fail because no system converts insight into action.
        </p>
        <p className="mt-3 leading-relaxed text-slate-400">
          A churn prediction model alone is just a number. The Growth Decision Engine
          closes the gap: it predicts churn and then <strong className="text-white">decides what to do about it</strong>.
        </p>
      </section>

      {/* Layers with file paths */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">System Layers</h2>
        <div className="mt-6 space-y-4">
          {LAYERS.map((layer) => (
            <div
              key={layer.title}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-semibold text-white">{layer.title}</h3>
                  <code className="mt-0.5 inline-block text-xs text-slate-500">{layer.path}</code>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-0.5 text-xs text-slate-400 shrink-0">
                  {layer.tech}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{layer.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Model Features</h2>
        <p className="mt-2 text-sm text-slate-400">
          Seven raw signals plus two derived features power the churn model.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="px-4 py-3 font-medium text-slate-300">Feature</th>
                <th className="px-4 py-3 font-medium text-slate-300">Description</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES_LIST.map((f) => (
                <tr key={f.name} className="border-b border-slate-800/50 last:border-0">
                  <td className={`px-4 py-3 font-mono ${f.name.includes("_value") || f.name.includes("_score") ? "text-cyan-300" : "text-violet-300"}`}>
                    {f.name}
                    {f.name.includes("_value") || f.name.includes("_score") ? " *" : ""}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-600">* Derived features computed during feature engineering</p>
      </section>

      {/* ML Workflow */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">ML Workflow</h2>
        <div className="mt-4 space-y-4">
          {[
            { cmd: "python -m growth_decision_engine.data_pipeline.generate_sample_data", desc: "Generates synthetic customer events at data/raw/customer_events.csv", out: "data/raw/customer_events.csv" },
            { cmd: "python -m growth_decision_engine.models.train", desc: "Builds features, trains Random Forest via StandardScaler pipeline, evaluates on held-out test set", out: "models/churn_model.joblib + models/metrics.json" },
          ].map((step) => (
            <div key={step.cmd} className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
              <code className="text-sm text-cyan-300">{step.cmd}</code>
              <p className="mt-2 text-sm text-slate-400">{step.desc}</p>
              <p className="mt-1 text-xs text-slate-600">Output: {step.out}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Model Metrics</h2>
        <p className="mt-2 text-sm text-slate-400">
          Current metrics logged to <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-violet-300">models/metrics.json</code>:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
            <div className="font-semibold text-white">ROC-AUC</div>
            <div className="mt-1 text-sm text-slate-400">
              Measures how well the model ranks churned customers above non-churned ones.
              A score of 0.75 means the model correctly ranks a random churned customer higher
              than a non-churned customer 75% of the time.
            </div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
            <div className="font-semibold text-white">Average Precision</div>
            <div className="mt-1 text-sm text-slate-400">
              Useful when churn classes are imbalanced. Focuses on precision-recall behaviour
              rather than overall accuracy, giving a clearer picture of model performance on the
              minority (churn) class.
            </div>
          </div>
        </div>
      </section>

      {/* Why ML + Rules */}
      <section className="mt-12 rounded-xl border border-amber-800/30 bg-amber-950/10 p-6">
        <h2 className="text-lg font-semibold text-white">Why ML + Rules?</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          The model should not directly decide every action because:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-400">
          <li>Business actions have real costs — not every risk deserves a discount.</li>
          <li>Some rules must be controlled by business teams, not data scientists.</li>
          <li>Decision reasoning should be explainable to non-technical stakeholders.</li>
          <li>Thresholds change faster than model retraining cycles.</li>
        </ul>
        <p className="mt-3 text-sm text-slate-400">
          <strong className="text-white">Separation principle:</strong> ML predicts risk, rules decide the action.
        </p>
      </section>

      {/* Current limitation */}
      <section className="mt-12 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">Current Limitation</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          The model uses synthetic data, so the metrics validate the pipeline rather than
          claiming production business accuracy. Synthetic data makes the project reproducible
          without private customer data. With real data, the next steps would be feature
          quality validation, probability calibration, and performance monitoring over time.
        </p>
      </section>

      {/* FastAPI choice */}
      <section className="mt-12 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">Why FastAPI?</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          FastAPI was chosen because it is lightweight and production-friendly, gives automatic
          OpenAPI / Swagger docs, uses Pydantic for request validation, and is the most common
          Python framework for ML model serving workflows.
        </p>
      </section>

      {/* Stack */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Technology Stack</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {STACK.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-slate-800 bg-slate-900/30 px-4 py-3"
            >
              <div className="font-medium text-white">{item.name}</div>
              <div className="text-xs text-slate-500">{item.role}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
