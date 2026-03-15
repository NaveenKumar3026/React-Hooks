import { useNavigate } from "react-router-dom";

const hooks = [
  {
    name: "useState",
    icon: "🔄",
    tagline: "State Management",
    description: "Store and update changing data inside components. The most fundamental hook for building interactive UIs.",
    examples: "Password toggle, Like button, Form inputs, Modals",
    path: "/hooks/usestate",
    gradient: "from-primary/20 via-primary/5 to-transparent",
    borderGlow: "group-hover:shadow-[0_0_30px_hsl(193_92%_55%/0.2)]",
  },
  {
    name: "useEffect",
    icon: "⚡",
    tagline: "Side Effects",
    description: "Run code after rendering — API calls, timers, localStorage, event listeners, and more.",
    examples: "Live search, Theme persistence, Data fetching",
    path: "/hooks/useeffect",
    gradient: "from-secondary/20 via-secondary/5 to-transparent",
    borderGlow: "group-hover:shadow-[0_0_30px_hsl(270_70%_60%/0.2)]",
  },
  {
    name: "useRef",
    icon: "🎯",
    tagline: "DOM & Persistence",
    description: "Access DOM elements directly and store mutable values that persist without causing re-renders.",
    examples: "Scroll to section, Stopwatch, Focus input",
    path: "/hooks/useref",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    borderGlow: "group-hover:shadow-[0_0_30px_hsl(51_97%_55%/0.2)]",
  },
  {
    name: "useContext",
    icon: "🌐",
    tagline: "Global State",
    description: "Share data across multiple components without prop drilling — like a global state any child can access.",
    examples: "Language switcher, Theme context, Auth state",
    path: "/hooks/usecontext",
    gradient: "from-pink-500/15 via-primary/5 to-transparent",
    borderGlow: "group-hover:shadow-[0_0_30px_hsl(330_80%_60%/0.2)]",
  },
];

const HooksGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen px-4 py-12 overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-secondary/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <span>←</span> Back to Home
        </button>

        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5">
            <span className="text-sm">📚</span>
            <span className="font-mono text-xs text-muted-foreground">4 Hooks • Interactive Demos</span>
          </div>
          <h1 className="mb-3 font-display text-4xl font-bold md:text-5xl">
            Choose a <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Hook</span>
          </h1>
          <p className="text-muted-foreground">
            Click any card to explore with live demos, code examples, and interview tips
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {hooks.map((hook, i) => (
            <div
              key={hook.name}
              onClick={() => navigate(hook.path)}
              className={`lightning-card group ${hook.borderGlow}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${hook.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="relative z-10">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-4xl">{hook.icon}</span>
                  <span className="section-badge border-border text-muted-foreground">
                    {hook.tagline}
                  </span>
                </div>
                <h2 className="mb-2 font-display text-2xl font-bold">{hook.name}</h2>
                <p className="mb-3 font-body text-sm text-muted-foreground leading-relaxed">{hook.description}</p>
                <p className="font-mono text-xs text-primary/60">{hook.examples}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground/50">
            💡 Tip: Each hook page contains theory, syntax, live demos, common mistakes, and interview questions
          </p>
        </div>
      </div>
    </div>
  );
};

export default HooksGrid;
