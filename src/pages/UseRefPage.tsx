import { useState, useRef } from "react";
import HookLayout from "@/components/HookLayout";

function ScrollDemo() {
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 1: Scroll to Section</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong>Real World:</strong> Landing pages & Portfolios
      </p>
      <button onClick={scrollToContact} className="glow-button mb-4 w-full text-base">
        🎯 Go to Contact Section
      </button>
      <div className="h-48 rounded-lg bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">
        ↕️ Scroll space (simulating page content)
      </div>
      <div
        ref={contactRef}
        className="mt-4 rounded-lg border-2 border-primary/40 bg-primary/5 p-5"
      >
        <h4 className="font-display text-lg font-semibold">📬 Contact Section</h4>
        <p className="text-sm text-muted-foreground">
          This section was reached using <code className="rounded bg-muted px-1 font-mono text-xs">useRef</code> + <code className="rounded bg-muted px-1 font-mono text-xs">scrollIntoView()</code>
        </p>
      </div>
      <div className="mt-3 rounded-lg bg-muted p-3 font-mono text-xs">
        <p>contactRef.current = <span className="text-primary">&lt;div&gt;...&lt;/div&gt;</span></p>
      </div>
    </div>
  );
}

function StopwatchDemo() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => setSeconds((p) => p + 1), 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 2: Stopwatch</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong>Real World:</strong> Quiz apps / Timers / Productivity tools
      </p>
      <div className="mb-4 text-center font-display text-6xl font-bold text-primary">
        {seconds}<span className="text-2xl text-muted-foreground">s</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <button onClick={start} className="rounded-lg bg-green-500 px-4 py-2.5 font-display font-semibold text-card transition-transform hover:scale-105">
          ▶ Start
        </button>
        <button onClick={stop} className="rounded-lg bg-orange-500 px-4 py-2.5 font-display font-semibold text-card transition-transform hover:scale-105">
          ⏸ Stop
        </button>
        <button onClick={reset} className="rounded-lg bg-red-500 px-4 py-2.5 font-display font-semibold text-card transition-transform hover:scale-105">
          ↺ Reset
        </button>
      </div>
      <div className="mt-4 rounded-lg bg-muted p-3 font-mono text-xs">
        <p>intervalRef.current = <span className="text-primary">{intervalRef.current ? "setInterval()" : "null"}</span></p>
        <p className="mt-1 text-muted-foreground">💡 useRef stores the interval ID without causing re-renders</p>
      </div>
    </div>
  );
}

const UseRefPage = () => (
  <HookLayout
    title="useRef"
    icon="🎯"
    whatIsIt="useRef lets you directly access DOM elements and store mutable values that persist across renders without causing re-renders."
    realLifeUses={[
      "Scroll to a specific section",
      "Focus an input field",
      "Store timer/interval IDs",
      "Track previous state values",
      "Access canvas or video elements",
    ]}
    syntax={`const myRef = useRef(initialValue);

// Access DOM element:
<div ref={myRef} />
myRef.current.scrollIntoView();

// Store mutable value:
myRef.current = someValue;`}
  >
    <ScrollDemo />
    <StopwatchDemo />
  </HookLayout>
);

export default UseRefPage;
