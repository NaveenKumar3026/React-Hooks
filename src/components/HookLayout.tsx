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
  codeExample?: string;
  children: React.ReactNode;
}

const HookLayout = ({
  title, icon, whatIsIt, howItWorks, realLifeUses, syntax, rules, commonMistakes, interviewQuestions, codeExample, children,
}: HookLayoutProps) => {
  const navigate = useNavigate();
  const [showSyntax, setShowSyntax] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen px-4 py-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute bottom-[20%] right-[5%] h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[120px]" />
      <div className="absolute top-[50%] left-[50%] h-[300px] w-[300px] rounded-full bg-accent/3 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <button
          onClick={() => navigate("/hooks")}
          className="mb-6 flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-primary group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Hooks
        </button>

        {/* Header */}
        <div className="mb-8 flex items-center gap-5">
          <div className="relative">
            <span className="text-5xl md:text-6xl drop-shadow-[0_0_25px_hsl(var(--primary)/0.3)]">{icon}</span>
            <div className="absolute -inset-3 rounded-full bg-primary/8 blur-xl" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold md:text-5xl bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent">{title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">React Hook • Interactive Learning • Seminar Ready</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Explanation */}
          <div className="lg:col-span-2 space-y-5">
            {/* Concept */}
            <div className="info-card">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
                <span className="section-badge border-primary/30 bg-gradient-to-r from-primary/15 to-primary/5 text-primary">📌 What is {title}?</span>
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed text-sm">{whatIsIt}</p>
            </div>

            {/* How it works */}
            <div className="info-card">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
                <span className="section-badge border-secondary/30 bg-gradient-to-r from-secondary/15 to-secondary/5 text-secondary">⚙️ How It Works</span>
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{howItWorks}</p>
            </div>

            {/* Real world */}
            <div className="info-card">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
                <span className="section-badge border-accent/30 bg-gradient-to-r from-accent/15 to-accent/5 text-accent">🌍 Real World Uses</span>
              </h3>
              <ul className="space-y-2">
                {realLifeUses.map((use, i) => (
                  <li key={i} className="flex items-center gap-2.5 font-body text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0" /> {use}
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
                <span className="section-badge border-primary/30 bg-gradient-to-r from-primary/15 to-primary/5 text-primary">💻 Syntax</span>
                <span className="text-xs text-muted-foreground rounded-full border border-border px-2.5 py-0.5 hover:bg-muted/30 transition-colors">{showSyntax ? "Hide ▲" : "Show ▼"}</span>
              </button>
              {showSyntax && <pre className="code-block mt-4 text-xs">{syntax}</pre>}
            </div>

            {/* Full Code Example */}
            {codeExample && (
              <div className="info-card">
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="flex w-full items-center justify-between font-display text-lg font-semibold"
                >
                  <span className="section-badge border-green-500/30 bg-gradient-to-r from-green-500/15 to-green-500/5 text-green-400">📄 Full Code</span>
                  <span className="text-xs text-muted-foreground rounded-full border border-border px-2.5 py-0.5 hover:bg-muted/30 transition-colors">{showCode ? "Hide ▲" : "Show ▼"}</span>
                </button>
                {showCode && (
                  <div className="code-window mt-4">
                    <div className="code-window-header">
                      <div className="code-window-dots">
                        <span className="bg-destructive/60" />
                        <span className="bg-accent/60" />
                        <span className="bg-green-500/60" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground ml-2">{title}Demo.jsx</span>
                    </div>
                    <pre className="code-window-body text-xs max-h-[500px] overflow-y-auto">
                      <code className="text-primary/80">{codeExample}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Rules */}
            <div className="info-card">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
                <span className="section-badge border-accent/30 bg-gradient-to-r from-accent/15 to-accent/5 text-accent">📏 Rules & Best Practices</span>
              </h3>
              <ul className="space-y-2.5">
                {rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-body text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-0.5 text-accent flex-shrink-0">⚠️</span> {rule}
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
                <span className="section-badge border-destructive/30 bg-gradient-to-r from-destructive/15 to-destructive/5 text-destructive">❌ Common Mistakes</span>
                <span className="text-xs text-muted-foreground rounded-full border border-border px-2.5 py-0.5 hover:bg-muted/30 transition-colors">{showMistakes ? "Hide ▲" : "Show ▼"}</span>
              </button>
              {showMistakes && (
                <div className="mt-4 space-y-5">
                  {commonMistakes.map((m, i) => (
                    <div key={i} className="space-y-2.5">
                      <div className="rounded-xl border border-destructive/20 p-4" style={{ background: "linear-gradient(135deg, hsl(0 84% 60% / 0.05), transparent)" }}>
                        <p className="text-xs font-bold text-destructive mb-2">❌ Wrong:</p>
                        <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">{m.wrong}</pre>
                      </div>
                      <div className="rounded-xl border border-green-500/20 p-4" style={{ background: "linear-gradient(135deg, hsl(140 70% 50% / 0.05), transparent)" }}>
                        <p className="text-xs font-bold text-green-400 mb-2">✅ Correct:</p>
                        <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">{m.right}</pre>
                      </div>
                      <p className="text-xs text-muted-foreground italic pl-3 border-l-2 border-primary/30 leading-relaxed">{m.why}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interview Q&A */}
            <div className="info-card">
              <button
                onClick={() => setShowInterview(!showInterview)}
                className="flex w-full items-center justify-between font-display text-lg font-semibold"
              >
                <span className="section-badge border-secondary/30 bg-gradient-to-r from-secondary/15 to-secondary/5 text-secondary">🎓 Interview Q&A</span>
                <span className="text-xs text-muted-foreground rounded-full border border-border px-2.5 py-0.5 hover:bg-muted/30 transition-colors">{showInterview ? "Hide ▲" : "Show ▼"}</span>
              </button>
              {showInterview && (
                <div className="mt-4 space-y-2">
                  {interviewQuestions.map((item, i) => (
                    <div key={i} className="rounded-xl border border-border overflow-hidden">
                      <button
                        onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-semibold hover:bg-muted/20 transition-colors"
                      >
                        <span className="pr-2">Q: {item.q}</span>
                        <span className="text-muted-foreground text-xs flex-shrink-0">{expandedQ === i ? "▲" : "▼"}</span>
                      </button>
                      {expandedQ === i && (
                        <div className="border-t border-border px-4 py-3.5 text-sm text-muted-foreground leading-relaxed" style={{ background: "hsl(225 25% 8% / 0.5)" }}>
                          <span className="text-primary font-bold">A:</span> {item.a}
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
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 px-5 py-2 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              <span className="font-mono text-xs text-primary tracking-wider">Live Interactive Demos</span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HookLayout;
