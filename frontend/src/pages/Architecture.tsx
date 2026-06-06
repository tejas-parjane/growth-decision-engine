const FLOW_STEPS = [
  { label: "Data Sources", desc: "CRM, app logs, transactions" },
  { label: "Data Pipeline", desc: "ETL, cleaning, aggregation" },
  { label: "Feature Store", desc: "Customer metrics & signals" },
  { label: "ML Models", desc: "Churn prediction (Random Forest)" },
  { label: "Decision Engine", desc: "Rules + Model output = Action" },
  { label: "Action Layer", desc: "Email, CRM task, In-app" },
  { label: "Feedback Loop", desc: "Monitor, retrain, improve" },
];

const FOLDER_STRUCTURE = [
  { level: 0, name: "growth-decision-engine/" },
  { level: 1, name: "configs/decision_rules.yaml" },
  { level: 1, name: "data/raw/customer_events.csv" },
  { level: 1, name: "models/churn_model.joblib" },
  { level: 1, name: "src/growth_decision_engine/" },
  { level: 2, name: "api/main.py" },
  { level: 2, name: "data_pipeline/generate_sample_data.py" },
  { level: 2, name: "decision_engine/engine.py" },
  { level: 2, name: "decision_engine/rules.py" },
  { level: 2, name: "feature_engineering/features.py" },
  { level: 2, name: "models/train.py" },
  { level: 2, name: "models/predict.py" },
  { level: 1, name: "frontend/" },
  { level: 1, name: "tests/" },
];

export default function Architecture() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">Architecture</h1>
      <p className="mt-2 text-slate-400">
        The six-layer architecture of the Growth Decision Engine.
      </p>

      {/* High-level flow */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">High-Level Flow</h2>
        <p className="mt-2 text-sm text-slate-400">
          Customer activity flows through the system:
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          {[
            "Customer Activity",
            "Data Pipeline",
            "Feature Engineering",
            "Churn Model",
            "Decision Engine",
            "Recommended Action",
            "Activation Channel",
          ].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-slate-300">
                {step}
              </span>
              {i < 6 && <span className="text-slate-600">&rarr;</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Folder structure */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Project Structure</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/30 p-4">
          {FOLDER_STRUCTURE.map((item) => (
            <div
              key={item.name}
              className="font-mono text-sm leading-7"
              style={{ paddingLeft: `${item.level * 20}px` }}
            >
              {item.name.endsWith("/") ? (
                <span className="text-cyan-300">{item.name}</span>
              ) : (
                <span className="text-slate-400">{item.name}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Vertical flow diagram */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Data Flow</h2>
        <div className="mt-4 relative flex flex-col items-center">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-4 w-full max-w-md">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <div className="font-semibold text-white">{step.label}</div>
                  <div className="text-xs text-slate-500">{step.desc}</div>
                </div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <div className="flex flex-col items-center py-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                    <path
                      d="M12 5v14M8 15l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Decision Logic */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Decision Logic</h2>
        <p className="mt-2 text-sm text-slate-400">
          The ML model produces a churn probability. The decision engine combines it with
          business context to pick the best action. Rules are configured in
          {" "}<code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-violet-300">configs/decision_rules.yaml</code>.
        </p>

        <div className="mt-6 space-y-3">
          {[
            { condition: "Churn ≥ 72% + Value ≥ $5,000", action: "Concierge recovery task (CRM)", reason: "High-value customers deserve human follow-up.", priority: "P1" },
            { condition: "Churn ≥ 72%", action: "20% retention discount (Email)", reason: "High-risk customers need immediate intervention.", priority: "P1" },
            { condition: "Churn ≥ 45%", action: "Personalized reminder (Email)", reason: "Moderate-risk may not need a costly discount yet.", priority: "P2" },
            { condition: "Sessions ≥ 8 + Low churn", action: "Premium bundle upsell (In-app)", reason: "Active low-risk customers are good upsell candidates.", priority: "P3" },
            { condition: "Default (stable)", action: "Nurture sequence (Email)", reason: "Do not over-incentivize stable customers.", priority: "P4" },
          ].map((rule) => (
            <div
              key={rule.priority}
              className="flex items-start gap-4 rounded-lg border border-slate-800 bg-slate-900/30 p-4"
            >
              <span className="shrink-0 rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-400">
                {rule.priority}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-white">{rule.condition}</div>
                <div className="mt-0.5 text-sm text-slate-500">&rarr; {rule.action}</div>
                <div className="mt-0.5 text-xs text-slate-600 italic">{rule.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closed-loop note */}
      <section className="mt-14 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">Closed-Loop Analytics</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          This system is designed for continuous improvement. Every action triggered
          generates feedback data that can be used to retrain the model, creating a
          self-improving cycle of prediction, action, and learning.
        </p>
      </section>
    </div>
  );
}
