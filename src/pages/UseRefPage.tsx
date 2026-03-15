import { useState, useRef, useEffect } from "react";
import HookLayout from "@/components/HookLayout";

const useRefCode = `import React, { useRef, useState, useEffect } from "react";

// ✅ Demo 1: Focus Input + Scroll to Section
function FocusAndScrollDemo() {
  const inputRef = useRef(null);
  const sectionRefs = useRef([]);

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <button onClick={() => inputRef.current?.focus()}>
        Focus Search
      </button>
      <input ref={inputRef} placeholder="Search..." />

      {sections.map((s, i) => (
        <button onClick={() => scrollToSection(i)}>
          {s.title}
        </button>
      ))}

      {sections.map((s, i) => (
        <div ref={(el) => (sectionRefs.current[i] = el)}>
          <h3>{s.title}</h3>
        </div>
      ))}
    </div>
  );
}

// ✅ Demo 2: Stopwatch using useRef for interval
function StopwatchDemo() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Why useRef and not useState for interval?
  // Because storing interval ID in state would
  // cause an unnecessary re-render every time
  // we start/stop the timer!

  const formatTime = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return \`\${mins}:\${secs}.\${centis}\`;
  };

  return (
    <div>
      <h2>{formatTime(time)}</h2>
      <button onClick={() => setIsRunning(true)}>
        Start
      </button>
      <button onClick={() => setIsRunning(false)}>
        Stop
      </button>
      <button onClick={() => {
        setIsRunning(false);
        setTime(0);
      }}>
        Reset
      </button>
    </div>
  );
}`;

function FocusAndScrollDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    { title: "🏠 Home", desc: "Welcome section with hero content", gradient: "from-primary/10 to-primary/3" },
    { title: "📦 Products", desc: "Product catalog and listings", gradient: "from-secondary/10 to-secondary/3" },
    { title: "📬 Contact", desc: "Get in touch and support", gradient: "from-accent/10 to-accent/3" },
  ];

  return (
    <div className="demo-container">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent/15 to-primary/10 px-3 py-1 text-xs font-semibold text-accent border border-accent/20">
          🎯 Demo 1
        </span>
      </div>
      <h3 className="mb-1 font-display text-xl font-semibold">Focus Input + Scroll to Section</h3>
      <p className="mb-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Landing pages, search UX, portfolio navigation
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => inputRef.current?.focus()} className="glow-button text-sm px-4 py-2.5">
          🎯 Focus Search
        </button>
        {sections.map((s, i) => (
          <button
            key={i}
            onClick={() => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary/40 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, hsl(225 25% 10% / 0.6), hsl(225 30% 8%))" }}
          >
            {s.title}
          </button>
        ))}
      </div>

      <input
        ref={inputRef}
        type="text"
        placeholder="🔍 This input gets focused via useRef..."
        className="demo-input mb-4"
      />

      <div className="space-y-3 max-h-52 overflow-y-auto rounded-xl border border-border p-3" style={{ background: "hsl(225 25% 7% / 0.5)" }}>
        {sections.map((s, i) => (
          <div
            key={i}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className={`rounded-xl border border-border p-6 bg-gradient-to-br ${s.gradient} transition-all duration-300`}
          >
            <h4 className="font-display text-lg font-semibold">{s.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            <p className="text-xs text-primary/60 mt-2 font-mono">
              ref.current.scrollIntoView({"{"} behavior: "smooth" {"}"})
            </p>
          </div>
        ))}
      </div>

      <div className="code-window mt-4">
        <div className="code-window-header">
          <div className="code-window-dots">
            <span className="bg-destructive/60" />
            <span className="bg-accent/60" />
            <span className="bg-green-500/60" />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">DOM Access via Ref</span>
        </div>
        <div className="code-window-body">
          <p><span className="text-secondary">const</span> inputRef = <span className="text-primary">useRef</span>(<span className="text-accent">null</span>);</p>
          <p>inputRef.<span className="text-accent">current</span> = <span className="text-primary">&lt;input /&gt;</span> <span className="text-muted-foreground">// DOM node</span></p>
          <p>inputRef.current.<span className="text-accent">focus</span>(); <span className="text-muted-foreground">// Direct DOM access!</span></p>
          <p className="text-muted-foreground mt-1">// ⚡ No re-render when ref changes!</p>
        </div>
      </div>

      <div className="tip-box mt-4">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Key Point:</strong> "useRef gives you a .current property pointing directly to the DOM element. Unlike state, changing a ref does NOT trigger a re-render — it's a direct, imperative escape hatch from React's declarative model."
        </p>
      </div>
    </div>
  );
}

function StopwatchDemo() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setTime((p) => p + 10), 10);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${centis.toString().padStart(2, "0")}`;
  };

  const reset = () => { setIsRunning(false); setTime(0); setLaps([]); };
  const lap = () => { if (isRunning) setLaps((p) => [time, ...p]); };

  return (
    <div className="demo-container">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/15 to-accent/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
          ⏱️ Demo 2
        </span>
      </div>
      <h3 className="mb-1 font-display text-xl font-semibold">Precision Stopwatch with Laps</h3>
      <p className="mb-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Timer apps, quiz countdowns, productivity tools
      </p>

      {/* Timer display */}
      <div className="mb-6 text-center rounded-2xl border border-border py-8" style={{ background: "linear-gradient(180deg, hsl(225 30% 8%), hsl(225 35% 5%))" }}>
        <p className="font-display text-6xl md:text-7xl font-bold tracking-widest bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {formatTime(time)}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Renders: <span className="text-accent font-bold">{renderCount.current}</span>
          <span className="mx-2 text-border">|</span>
          Status: <span className={isRunning ? "text-green-400" : "text-muted-foreground"}>{isRunning ? "Running" : "Paused"}</span>
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-5">
        {[
          { label: "▶ Start", action: () => setIsRunning(true), disabled: isRunning, style: "bg-green-500/80 hover:bg-green-500 text-background" },
          { label: "⏸ Pause", action: () => setIsRunning(false), disabled: !isRunning, style: "bg-orange-500/80 hover:bg-orange-500 text-background" },
          { label: "🏁 Lap", action: lap, disabled: !isRunning, style: "bg-secondary/80 hover:bg-secondary text-background" },
          { label: "↺ Reset", action: reset, disabled: false, style: "bg-destructive/80 hover:bg-destructive text-background" },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            disabled={btn.disabled}
            className={`rounded-xl px-3 py-3 font-display font-semibold text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${btn.style}`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {laps.length > 0 && (
        <div className="mb-5 rounded-xl border border-border overflow-hidden" style={{ background: "hsl(225 25% 7% / 0.5)" }}>
          <div className="px-4 py-2.5 border-b border-border">
            <p className="text-xs font-bold text-muted-foreground">🏁 Lap Times ({laps.length})</p>
          </div>
          <div className="max-h-32 overflow-y-auto p-2">
            {laps.map((l, i) => (
              <div key={i} className="flex justify-between text-xs py-2 px-3 rounded-lg hover:bg-muted/20 transition-colors">
                <span className="text-muted-foreground">Lap {laps.length - i}</span>
                <span className="font-mono text-primary font-bold">{formatTime(l)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="code-window">
        <div className="code-window-header">
          <div className="code-window-dots">
            <span className="bg-destructive/60" />
            <span className="bg-accent/60" />
            <span className="bg-green-500/60" />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">Why useRef for intervals?</span>
        </div>
        <div className="code-window-body">
          <p><span className="text-secondary">const</span> intervalRef = <span className="text-primary">useRef</span>(<span className="text-accent">null</span>);</p>
          <p className="text-muted-foreground">// Store interval ID without re-rendering</p>
          <p>intervalRef.current = <span className="text-primary">{intervalRef.current ? "setInterval(...)" : "null"}</span></p>
          <p className="text-muted-foreground mt-1">// If we used useState for the interval ID,</p>
          <p className="text-muted-foreground">// it would cause an extra re-render on start/stop!</p>
        </div>
      </div>

      <div className="tip-box mt-4">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">useState vs useRef:</strong> "State changes trigger re-renders (needed for the timer display). But the interval ID doesn't need to appear in the UI — storing it in useRef avoids unnecessary re-renders while keeping the value persistent across renders."
        </p>
      </div>
    </div>
  );
}

const UseRefPage = () => (
  <HookLayout
    title="useRef"
    icon="🎯"
    whatIsIt="useRef creates a mutable reference object that persists across renders without triggering re-renders. It serves two main purposes: (1) Accessing and manipulating DOM elements directly — like focus(), scroll(), or measuring dimensions. (2) Storing mutable values that survive re-renders but don't need to be displayed — like timer IDs, previous values, or render counts."
    howItWorks="useRef returns an object { current: initialValue }. This object is stable — React guarantees the same object on every render. When you assign a ref to a JSX element via the ref attribute, React automatically sets .current to that DOM node after mounting. Unlike state, updating .current is a simple mutation — React is completely unaware of it and won't schedule a re-render."
    realLifeUses={[
      "Focus an input field on page load or after action",
      "Scroll to a specific section smoothly (landing pages)",
      "Store timer/interval IDs for start/stop/cleanup",
      "Track previous state or prop values",
      "Access canvas, video, or audio DOM elements",
      "Store values that shouldn't trigger re-renders",
      "Count renders without causing infinite loops",
      "Integrate with third-party DOM libraries (D3, Chart.js)",
    ]}
    syntax={`// Create a ref:
const myRef = useRef(initialValue);

// Access DOM element:
<input ref={myRef} />
myRef.current.focus();
myRef.current.scrollIntoView({ behavior: "smooth" });
myRef.current.getBoundingClientRect(); // dimensions

// Store mutable value (no re-render):
const intervalRef = useRef(null);
intervalRef.current = setInterval(callback, 1000);
clearInterval(intervalRef.current);

// Track previous value:
const prevValue = useRef(value);
useEffect(() => {
  prevValue.current = value; // update after render
}, [value]);

// Array of refs for dynamic lists:
const refs = useRef([]);
<div ref={(el) => (refs.current[i] = el)} />`}
    rules={[
      "Don't read or write .current during rendering — use event handlers and effects instead",
      "useRef doesn't trigger re-renders — if you need UI to update, use useState",
      "The ref object identity is stable — React guarantees the same object every render",
      "For DOM refs, .current is null until mount — always access in useEffect or event handlers",
      "You can store any value in .current — numbers, objects, functions, DOM nodes, timer IDs",
    ]}
    commonMistakes={[
      {
        wrong: `// ❌ Trying to display ref value in UI
const renderCount = useRef(0);
renderCount.current++;
return <p>Renders: {renderCount.current}</p>;
// Value updates but UI doesn't reflect it!`,
        right: `// ✅ Use state for values that need to be displayed
const [count, setCount] = useState(0);
return <p>Count: {count}</p>; // Re-renders on change

// Use ref ONLY for values you don't display:
const intervalId = useRef(null); // ← hidden value`,
        why: "Changing .current doesn't trigger a re-render. The value updates silently in memory. If you need the value reflected in the UI, you must use useState.",
      },
      {
        wrong: `// ❌ Accessing ref before mount
const inputRef = useRef(null);
inputRef.current.focus(); // 💥 null error!

return <input ref={inputRef} />;`,
        right: `// ✅ Access in useEffect or event handler
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current?.focus(); // ✅ safe!
}, []);

return <input ref={inputRef} />;`,
        why: "The ref's .current is null until React mounts the component and attaches the DOM node. Always access DOM refs inside useEffect (runs after mount) or in event handlers.",
      },
    ]}
    interviewQuestions={[
      { q: "What is useRef and when do you use it?", a: "useRef creates a persistent mutable container (.current). Use it for DOM access (focus, scroll, measure) and storing values that shouldn't trigger re-renders (timer IDs, previous values, render counters)." },
      { q: "What's the difference between useRef and useState?", a: "useState triggers re-renders and is for values displayed in the UI. useRef is silent — updating .current doesn't re-render. Use state for what users see, ref for internal bookkeeping." },
      { q: "Does changing useRef.current cause a re-render?", a: "No. That's the key distinction. It's a simple mutation that React doesn't track. The component won't re-render, the DOM won't update, and no effects will re-run." },
      { q: "Why not use a regular variable instead of useRef?", a: "Regular variables are re-created on every render — their values reset. useRef maintains the same object across renders, preserving .current. It's like an instance variable for functional components." },
      { q: "Can you store non-DOM values in useRef?", a: "Yes! Any value — numbers, objects, functions, timer IDs. It's a general-purpose persistent container that survives re-renders without causing them." },
    ]}
    codeExample={useRefCode}
  >
    <FocusAndScrollDemo />
    <StopwatchDemo />
  </HookLayout>
);

export default UseRefPage;
