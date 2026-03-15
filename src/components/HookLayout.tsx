import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface HookLayoutProps {
  title: string;
  icon: string;
  whatIsIt: string;
  realLifeUses: string[];
  syntax: string;
  children: React.ReactNode;
}

const HookLayout = ({ title, icon, whatIsIt, realLifeUses, syntax, children }: HookLayoutProps) => {
  const navigate = useNavigate();
  const [showSyntax, setShowSyntax] = useState(false);

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => navigate("/hooks")}
          className="mb-6 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to Hooks
        </button>

        <div className="mb-8 flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          <h1 className="font-display text-4xl font-bold">{title}</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Explanation */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-2 font-display text-lg font-semibold">📌 What is {title}?</h3>
              <p className="font-body text-muted-foreground">{whatIsIt}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 font-display text-lg font-semibold">🌍 Real World Uses</h3>
              <ul className="space-y-2">
                {realLifeUses.map((use, i) => (
                  <li key={i} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                    <span className="text-primary">▸</span> {use}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <button
                onClick={() => setShowSyntax(!showSyntax)}
                className="flex w-full items-center justify-between font-display text-lg font-semibold"
              >
                <span>💻 Syntax</span>
                <span className="text-sm text-muted-foreground">{showSyntax ? "Hide" : "Show"}</span>
              </button>
              {showSyntax && (
                <pre className="code-block mt-3 text-xs">{syntax}</pre>
              )}
            </div>
          </div>

          {/* Right: Live Demos */}
          <div className="lg:col-span-3 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HookLayout;
