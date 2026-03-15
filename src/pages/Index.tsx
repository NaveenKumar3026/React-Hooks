import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeHook, setActiveHook] = useState(0);

  const hooks = [
    { name: "useState", desc: "Manage dynamic data", icon: "🔄", color: "from-cyan-400 to-blue-500" },
    { name: "useEffect", desc: "Handle side effects", icon: "⚡", color: "from-violet-400 to-purple-600" },
    { name: "useRef", desc: "Access DOM directly", icon: "🎯", color: "from-amber-400 to-orange-500" },
    { name: "useContext", desc: "Share global state", icon: "🌐", color: "from-pink-400 to-rose-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => setActiveHook((p) => (p + 1) % 4), 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
      {/* Dynamic cursor glow */}
      <div
        className="pointer-events-none fixed h-[500px] w-[500px] rounded-full opacity-20 blur-[120px] transition-all duration-700"
        style={{
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          background: `radial-gradient(circle, hsl(193 92% 55% / 0.4), hsl(270 70% 60% / 0.2), transparent 70%)`,
        }}
      />

      {/* Animated orbs */}
      <div className="absolute top-[10%] left-[15%] h-72 w-72 rounded-full bg-gradient-to-br from-primary/10 to-secondary/5 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[15%] right-[10%] h-80 w-80 rounded-full bg-gradient-to-br from-secondary/10 to-accent/5 blur-[100px] animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[50%] left-[60%] h-64 w-64 rounded-full bg-gradient-to-br from-accent/8 to-primary/5 blur-[80px] animate-pulse" style={{ animationDelay: "3s" }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(193 92% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(193 92% 55%) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 flex flex-col items-center max-w-4xl">
        {/* Floating React icon */}
        <div className="animate-float mb-8 relative">
          <div className="text-8xl md:text-9xl drop-shadow-[0_0_40px_hsl(193_92%_55%/0.4)]">⚛️</div>
          <div className="absolute -inset-4 rounded-full bg-primary/10 blur-2xl animate-pulse" />
        </div>

        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 px-5 py-2 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-xs text-primary tracking-wider uppercase">Interactive Learning Platform</span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-center font-display text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
          Master React{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Hooks
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-sm" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-6 max-w-2xl text-center font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
          Dive deep into the <span className="text-primary font-semibold">4 essential React Hooks</span> with
          interactive live demos, real-world code examples, syntax guides, and interview-ready explanations
        </p>

        {/* Stats bar */}
        <div className="mb-8 flex items-center gap-6 text-center">
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold text-primary">4</span>
            <span className="text-xs text-muted-foreground">Core Hooks</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold text-secondary">8+</span>
            <span className="text-xs text-muted-foreground">Live Demos</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold text-accent">20+</span>
            <span className="text-xs text-muted-foreground">Interview Q&A</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">100%</span>
            <span className="text-xs text-muted-foreground">Interactive</span>
          </div>
        </div>

        {/* Animated hook cards */}
        <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
          {hooks.map((hook, i) => (
            <div
              key={hook.name}
              className={`relative rounded-xl border p-4 text-center transition-all duration-500 cursor-pointer group ${
                activeHook === i
                  ? "border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/5 scale-105 shadow-[0_0_30px_hsl(193_92%_55%/0.15)]"
                  : "border-border bg-card/40 hover:border-primary/30 hover:bg-card/60"
              }`}
              onMouseEnter={() => setActiveHook(i)}
            >
              <span className={`text-3xl block mb-2 transition-transform duration-300 ${activeHook === i ? "scale-125" : ""}`}>
                {hook.icon}
              </span>
              <p className="font-mono text-sm font-semibold text-foreground">{hook.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{hook.desc}</p>
              {activeHook === i && (
                <div className="absolute -bottom-px left-1/4 right-1/4 h-0.5 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/hooks")}
          className="group relative overflow-hidden rounded-2xl px-12 py-5 font-display text-lg font-bold transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, hsl(193 92% 55%), hsl(270 70% 60%), hsl(330 80% 60%))",
            backgroundSize: "200% 200%",
            animation: "gradient-rotate 4s ease infinite",
          }}
        >
          <span className="relative z-10 flex items-center gap-3 text-background">
            ⚡ Start Learning Now
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Code preview teaser */}
        <div className="mt-10 w-full max-w-lg rounded-xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/60" />
              <span className="h-3 w-3 rounded-full bg-accent/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
            </div>
            <span className="font-mono text-xs text-muted-foreground ml-2">App.jsx — Preview</span>
          </div>
          <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
            <span className="text-secondary">import</span>
            <span className="text-foreground"> {"{ "}</span>
            <span className="text-primary">{hooks[activeHook].name}</span>
            <span className="text-foreground">{" }"} </span>
            <span className="text-secondary">from</span>
            <span className="text-accent"> "react"</span>
            <span className="text-foreground">;</span>
            {"\n\n"}
            <span className="text-secondary">function</span>
            <span className="text-primary"> MyComponent</span>
            <span className="text-foreground">() {"{"}</span>
            {"\n"}
            <span className="text-muted-foreground">  {"// "}{hooks[activeHook].desc}</span>
            {"\n"}
            <span className="text-secondary">  const</span>
            <span className="text-foreground"> result = </span>
            <span className="text-primary">{hooks[activeHook].name}</span>
            <span className="text-foreground">(...);</span>
            {"\n"}
            <span className="text-foreground">{"}"}</span>
          </pre>
        </div>

        {/* Footer text */}
        <p className="mt-8 max-w-md text-center font-body text-xs text-muted-foreground/50">
          Built for seminar presentations • Each hook includes live demos, code walkthroughs,
          common mistakes, and interview preparation questions
        </p>
      </div>
    </div>
  );
};

export default Index;
