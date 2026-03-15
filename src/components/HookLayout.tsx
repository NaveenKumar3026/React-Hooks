import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface HookLayoutProps {
  title: string;
  icon: string;
  whatIsIt: string;
  howItWorks: string;
  realLifeUses: string[];
  syntax: string;
  rules: string[];
  commonMistakes: { wrong: string; right: string; why: string }[];
  interviewQuestions: { q: string; a: string }[];
  children: React.ReactNode;
}

const HookLayout = ({
  title, icon, whatIsIt, howItWorks, realLifeUses, syntax, rules, commonMistakes, interviewQuestions, children,
}: HookLayoutProps) => {
  const navigate = useNavigate();
  const [showSyntax, setShowSyntax] = useState(true);
  const [showMistakes, setShowMistakes] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen px-4 py-8 overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/3 right-0 h-80 w-80 rounded-full bg-secondary/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <button
          onClick={() => navigate("/hooks")}
          className="mb-6 flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <span>←</span> Back to Hooks
        </button>

        <div className="mb-8 flex items-center gap-4">
          <span className="text-5xl drop-shadow-[0_0_20px_hsl(var(--primary)/0.3)]">{icon}</span>
          <div>
            <h1 className="font-display text-4xl font-bold md:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">React Hook • Interactive Learning</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Explanation */}
          <div className="lg:col-span-2 space-y-5">
            {/* What is it */}
            <div className="info-card">
              <h3 className="mb-2 flex items-center gap-2 font-display text-lg font-semibold">
                <span className="section-badge border-primary/30 bg-primary/10 text-primary">📌 Concept</span>
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">{whatIsIt}</p>
            </div>

            {/* How it works */}
            <div className="info-card">
              <h3 className="mb-2 flex items-center gap-2 font-display text-lg font-semibold">
                <span className="section-badge border-secondary/30 bg-secondary/10 text-secondary">⚙️ How It Works</span>
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{howItWorks}</p>
            </div>

            {/* Real world uses */}
            <div className="info-card">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
                <span className="section-badge border-accent/30 bg-accent/10 text-accent">🌍 Real World</span>
              </h3>
              <ul className="space-y-2">
                {realLifeUses.map((use, i) => (
                  <li key={i} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {use}
                  </li>
                ))}
              </ul>
            </div>

            {/* Syntax */}
            <div className="info-card">
              <button
                onClick={() => setShowSyntax(!showSyntax)}
                className="flex w-full items-center justify-between font-display text-lg font-semibold"
              >
                <span className="section-badge border-primary/30 bg-primary/10 text-primary">💻 Syntax</span>
                <span className="text-xs text-muted-foreground rounded-full border border-border px-2 py-0.5">{showSyntax ? "Hide" : "Show"}</span>
              </button>
              {showSyntax && <pre className="code-block mt-3 text-xs">{syntax}</pre>}
            </div>

            {/* Rules */}
            <div className="info-card">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
                <span className="section-badge border-accent/30 bg-accent/10 text-accent">📏 Rules</span>
              </h3>
              <ul className="space-y-2">
                {rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-0.5 text-accent">⚠️</span> {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="info-card">
              <button
                onClick={() => setShowMistakes(!showMistakes)}
                className="flex w-full items-center justify-between font-display text-lg font-semibold"
              >
                <span className="section-badge border-destructive/30 bg-destructive/10 text-destructive">❌ Common Mistakes</span>
                <span className="text-xs text-muted-foreground rounded-full border border-border px-2 py-0.5">{showMistakes ? "Hide" : "Show"}</span>
              </button>
              {showMistakes && (
                <div className="mt-3 space-y-4">
                  {commonMistakes.map((m, i) => (
                    <div key={i} className="space-y-2">
                      <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">
                        <p className="text-xs font-semibold text-destructive mb-1">❌ Wrong:</p>
                        <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">{m.wrong}</pre>
                      </div>
                      <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-3">
                        <p className="text-xs font-semibold text-green-400 mb-1">✅ Correct:</p>
                        <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">{m.right}</pre>
                      </div>
                      <p className="text-xs text-muted-foreground italic pl-2 border-l-2 border-primary/30">{m.why}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interview Questions */}
            <div className="info-card">
              <button
                onClick={() => setShowInterview(!showInterview)}
                className="flex w-full items-center justify-between font-display text-lg font-semibold"
              >
                <span className="section-badge border-secondary/30 bg-secondary/10 text-secondary">🎓 Interview Q&A</span>
                <span className="text-xs text-muted-foreground rounded-full border border-border px-2 py-0.5">{showInterview ? "Hide" : "Show"}</span>
              </button>
              {showInterview && (
                <div className="mt-3 space-y-2">
                  {interviewQuestions.map((item, i) => (
                    <div key={i} className="rounded-lg border border-border overflow-hidden">
                      <button
                        onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold hover:bg-muted/30 transition-colors"
                      >
                        <span>Q: {item.q}</span>
                        <span className="text-muted-foreground text-xs">{expandedQ === i ? "▲" : "▼"}</span>
                      </button>
                      {expandedQ === i && (
                        <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground leading-relaxed bg-muted/10">
                          <span className="text-primary font-semibold">A:</span> {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Live Demos */}
          <div className="lg:col-span-3 space-y-6">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-primary">Live Interactive Demos</span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HookLayout;
