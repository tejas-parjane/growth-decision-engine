import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

const NAV = [
  { path: "/", label: "Home" },
  { path: "/decision", label: "Engine" },
  { path: "/data", label: "Data" },
  { path: "/guide", label: "Guide" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0e1a" }}>
      <nav className="sticky top-0 z-50 border-b border-[#161c30] bg-[#0a0e1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span
              className="flex size-8 items-center justify-center rounded-lg text-sm font-bold tracking-wide text-white"
              style={{ background: "linear-gradient(135deg, #4a6fa5, #5d80b0)" }}
            >
              G
            </span>
            <span className="text-base font-semibold tracking-tight text-[#e8edf5]">
              Growth Decision Engine
            </span>
          </Link>
          <div className="flex items-center gap-0.5">
            {NAV.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "text-[#7a99c4]"
                      : "text-[#6b7a8f] hover:text-[#b0c4de]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[#161c30] py-8 text-center">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-[#4a5568]">
            Growth Decision Engine &middot; Closed-loop analytics
          </p>
        </div>
      </footer>
    </div>
  );
}
