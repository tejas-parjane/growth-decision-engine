import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHealth } from "../api/client";

const FEATURES = [
  {
    number: "01",
    title: "Predict Churn",
    desc: "Random Forest model estimates churn probability from customer behaviour signals.",
  },
  {
    number: "02",
    title: "Apply Rules",
    desc: "Business rules combine model output with customer value to pick the right action.",
  },
  {
    number: "03",
    title: "Recommend Action",
    desc: "Every decision maps to a channel — email, CRM task, or in-app message.",
  },
  {
    number: "04",
    title: "Close the Loop",
    desc: "Feedback from activated actions feeds into future model retraining.",
  },
];

const STATS = [
  { value: "75%", label: "ROC-AUC" },
  { value: "5", label: "Decision Actions" },
  { value: "3", label: "Activation Channels" },
  { value: "2500", label: "Training Records" },
];

export default function Landing() {
  const [health, setHealth] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const tryHealth = (retries: number): void => {
      if (cancelled || retries <= 0) {
        if (!cancelled) setHealth("unreachable");
        return;
      }

      getHealth()
        .then((r) => {
          if (!cancelled) setHealth(r.status);
        })
        .catch(() => {
          if (!cancelled) {
            const delay = Math.min(2000 * (9 - retries), 15000);
            setTimeout(() => tryHealth(retries - 1), delay);
          }
        });
    };

    tryHealth(8);
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#161c30]">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" />
        <div
          className="pointer-events-none absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #4a6fa5, transparent)" }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-36 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1e2640] bg-[#0f1424] px-4 py-1.5">
            <span className="size-1.5 rounded-full bg-[#5d80b0]" />
            <span className="text-xs tracking-wide text-[#6b7a8f]">
              {health === "ok" ? "SERVICE ONLINE" : health === "unreachable" ? "SERVICE OFFLINE" : "CONNECTING..."}
            </span>
          </div>

          <h1 className="text-5xl font-extralight leading-tight tracking-tight text-[#e8edf5] sm:text-6xl">
            From insight
            <br />
            <span className="font-semibold text-[#7a99c4]">to action.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#6b7a8f]">
            A decision engine that predicts customer churn and automatically
            recommends the next best retention or growth action.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to="/decision"
              className="inline-flex items-center gap-2 rounded-lg bg-[#4a6fa5] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#5d80b0]"
            >
              Try the Engine
            </Link>
            <Link
              to="/data"
              className="inline-flex items-center gap-2 rounded-lg border border-[#1e2640] px-6 py-2.5 text-sm font-medium text-[#b0c4de] transition hover:border-[#4a6fa5] hover:text-[#e8edf5]"
            >
              Data Sources
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#161c30]">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 px-4 py-14 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-semibold text-[#e8edf5]">{s.value}</div>
              <div className="mt-1 text-xs tracking-wide text-[#4a5568] uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[#161c30] py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <span className="text-xs tracking-[0.2em] text-[#4a5568] uppercase">System Overview</span>
            <h2 className="mt-3 text-3xl font-light text-[#e8edf5]">
              How the engine works
            </h2>
          </div>

          <div className="grid gap-px bg-[#161c30] sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.number}
                className="bg-[#0f1424] p-8 transition hover:bg-[#161c30]"
              >
                <span className="text-2xl font-light text-[#4a6fa5]">{f.number}</span>
                <h3 className="mt-4 text-lg font-medium text-[#e8edf5]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b7a8f]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio positioning */}
      <section className="border-b border-[#161c30] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="border-l-2 border-[#4a6fa5] bg-[#0f1424] px-8 py-8 text-left">
            <p className="text-base leading-relaxed text-[#b0c4de]">
              &ldquo;Built a Growth Decision Engine that predicts churn and converts
              predictions into explainable retention and upsell actions.&rdquo;
            </p>
            <p className="mt-4 text-xs tracking-wide text-[#4a5568] uppercase">
              Portfolio positioning
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-light text-[#e8edf5]">
            Ready to run a decision?
          </h2>
          <p className="mt-3 text-sm text-[#6b7a8f]">
            Input customer signals and get an instant churn prediction with recommended action.
          </p>
          <Link
            to="/decision"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#4a6fa5] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#5d80b0]"
          >
            Open the Engine
          </Link>
        </div>
      </section>
    </div>
  );
}
