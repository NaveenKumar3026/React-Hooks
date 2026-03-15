import { useNavigate } from "react-router-dom";
import { useState } from "react";

const hooks = [
  {
    name: "useState",
    icon: "🔄",
    tagline: "State Management",
    description: "Store and update dynamic data inside components. The most fundamental hook — the backbone of every interactive React app.",
    examples: "Password toggle • Shopping Cart • Like Button • Forms",
    path: "/hooks/usestate",
    glowColor: "193 92% 55%",
    accentClass: "text-primary",
    number: "01",
  },
  {
    name: "useEffect",
    icon: "⚡",
    tagline: "Side Effects & Lifecycle",
    description: "Run code after rendering — API calls, event listeners, timers, localStorage. React's bridge to the outside world.",
    examples: "Live Search • Theme Save • Event Tracker • API Fetch",
    path: "/hooks/useeffect",
    glowColor: "270 70% 60%",
    accentClass: "text-secondary",
    number: "02",
  },
  {
    name: "useRef",
    icon: "🎯",
    tagline: "DOM Access & Persistence",
    description: "Access DOM elements directly and store mutable values that persist across renders without triggering re-renders.",
    examples: "Scroll to Section • Stopwatch • Focus Input • Canvas",
    path: "/hooks/useref",
    glowColor: "51 97% 55%",
    accentClass: "text-accent",
    number: "03",
  },
  {
    name: "useContext",
    icon: "🌐",
    tagline: "Global State Sharing",
    description: "Share data across the entire component tree without prop drilling — theme, auth, language, and more.",
    examples: "Language Switcher • Theme Context • Auth State",
    path: "/hooks/usecontext",
    glowColor: "330 80% 60%",
    accentClass: "text-pink-400",
    number: "04",
  },
];

const HooksGrid = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen px-4 py-12 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-[20%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute bottom-[10%] left-[10%] h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[120px]" />
      <div className="absolute top-[40%] left-[50%] h-[300px] w-[300px] rounded-full bg-accent/3 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-primary group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Home
        </button>

        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 px-5 py-2 backdrop-blur-sm">
            <span className="text-sm">📚</span>
            <span className="font-mono text-xs text-primary">4 Hooks • 8+ Demos • 20+ Interview Q&A</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold md:text-6xl">
            Choose a{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Hook
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Each card takes you to a deep dive with explanations, syntax, live demos, code examples, and interview preparation
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {hooks.map((hook, i) => (
            <div
              key={hook.name}
              onClick={() => navigate(hook.path)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="lightning-card group"
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 50%, hsl(${hook.glowColor} / 0.1), transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-4xl transition-transform duration-500 ${hoveredIndex === i ? "scale-125 rotate-12" : ""}`}>
                      {hook.icon}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/40 font-bold">{hook.number}</span>
                  </div>
                  <span className="section-badge border-border bg-muted/40 text-muted-foreground text-xs">
                    {hook.tagline}
                  </span>
                </div>

                {/* Name */}
                <h2 className={`mb-2 font-display text-2xl font-bold transition-colors duration-300 ${hoveredIndex === i ? hook.accentClass : "text-foreground"}`}>
                  {hook.name}
                </h2>

                {/* Description */}
                <p className="mb-4 font-body text-sm text-muted-foreground leading-relaxed">
                  {hook.description}
                </p>

                {/* Examples */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground/50">📌</span>
                  <p className="font-mono text-xs text-muted-foreground/60">{hook.examples}</p>
                </div>

                {/* Explore arrow */}
                <div className={`mt-4 flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${hoveredIndex === i ? `${hook.accentClass} translate-x-1` : "text-muted-foreground/40"}`}>
                  Explore →
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground/40 max-w-md mx-auto">
            💡 Each hook page contains: Theory & Concepts • Syntax Guide • Code Examples • Live Interactive Demos • Common Mistakes • Interview Questions & Answers
          </p>
        </div>
      </div>
    </div>
  );
};

export default HooksGrid;
