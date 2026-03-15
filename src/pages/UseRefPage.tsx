import { useState, useRef, useEffect } from "react";
import HookLayout from "@/components/HookLayout";

function FocusAndScrollDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    { title: "🏠 Home", color: "border-primary/30 bg-primary/5" },
    { title: "📦 Products", color: "border-secondary/30 bg-secondary/5" },
    { title: "📬 Contact", color: "border-accent/30 bg-accent/5" },
  ];

  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 1: Focus Input + Scroll to Section</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Landing pages, search UX, navigation
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => inputRef.current?.focus()} className="glow-button text-sm px-4 py-2">
          🎯 Focus Search
        </button>
        {sections.map((s, i) => (
          <button
            key={i}
            onClick={() => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="rounded-xl border border-border bg-muted/30 px-4 py-2 text-sm font-semibold hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            {s.title}
          </button>
        ))}
      </div>

      <input
        ref={inputRef}
        type="text"
        placeholder="🔍 This input gets focused via useRef..."
        className="mb-4 w-full rounded-xl border border-input bg-muted/30 px-4 py-3 font-body text-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
      />

      <div className="space-y-3 max-h-48 overflow-y-auto rounded-xl border border-border p-3">
        {sections.map((s, i) => (
          <div key={i} ref={(el) => { sectionRefs.current[i] = el; }} className={`rounded-xl border p-6 ${s.color}`}>
            <h4 className="font-display text-lg font-semibold">{s.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Scrolled here using <code className="rounded bg-muted px-1 font-mono text-xs text-primary">ref.scrollIntoView()</code>
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-1 rounded-xl bg-muted/30 border border-border p-4 font-mono text-xs mt-4">
        <p className="text-muted-foreground">// Direct DOM access:</p>
        <p>inputRef.current = <span className="text-primary">&lt;input /&gt;</span></p>
        <p>sectionRefs.current = <span className="text-primary">[&lt;div/&gt;, &lt;div/&gt;, &lt;div/&gt;]</span></p>
        <p className="text-muted-foreground">// No re-render when ref changes!</p>
      </div>

      <div className="tip-box mt-3">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Key Point:</strong> "useRef gives you a .current property that points directly to the DOM element. Unlike state, changing a ref does NOT trigger a re-render — it's a direct, imperative escape hatch."
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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
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
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 2: Precision Stopwatch with Laps</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Timer apps, quiz countdowns, productivity tools
      </p>

      <div className="mb-5 text-center">
        <p className="font-display text-6xl font-bold tracking-wider text-primary drop-shadow-[0_0_20px_hsl(193_92%_55%/0.3)]">
          {formatTime(time)}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">Renders: <span className="text-accent">{renderCount.current}</span></p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        <button onClick={() => setIsRunning(true)} disabled={isRunning} className="rounded-xl bg-green-500/80 px-3 py-2.5 font-display font-semibold text-sm text-card transition-all hover:bg-green-500 disabled:opacity-40">▶ Start</button>
        <button onClick={() => setIsRunning(false)} disabled={!isRunning} className="rounded-xl bg-orange-500/80 px-3 py-2.5 font-display font-semibold text-sm text-card transition-all hover:bg-orange-500 disabled:opacity-40">⏸ Pause</button>
        <button onClick={lap} disabled={!isRunning} className="rounded-xl bg-secondary/80 px-3 py-2.5 font-display font-semibold text-sm text-card transition-all hover:bg-secondary disabled:opacity-40">🏁 Lap</button>
        <button onClick={reset} className="rounded-xl bg-destructive/80 px-3 py-2.5 font-display font-semibold text-sm text-card transition-all hover:bg-destructive">↺ Reset</button>
      </div>

      {laps.length > 0 && (
        <div className="mb-4 rounded-xl border border-border bg-muted/20 p-3 max-h-32 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Lap Times:</p>
          {laps.map((l, i) => (
            <div key={i} className="flex justify-between text-xs py-1 border-b border-border/50 last:border-0">
              <span className="text-muted-foreground">Lap {laps.length - i}</span>
              <span className="font-mono text-primary">{formatTime(l)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-1 rounded-xl bg-muted/30 border border-border p-4 font-mono text-xs">
        <p className="text-muted-foreground">// Why useRef for the interval?</p>
        <p>intervalRef.current = <span className="text-primary">{intervalRef.current ? "setInterval()" : "null"}</span></p>
        <p className="text-muted-foreground">// Storing interval ID in state would cause</p>
        <p className="text-muted-foreground">// unnecessary re-renders on start/stop!</p>
      </div>

      <div className="tip-box mt-3">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">useState vs useRef:</strong> "State changes trigger re-renders (needed for the timer display). But the interval ID doesn't need to be displayed — storing it in useRef avoids extra re-renders while keeping the value accessible across renders."
        </p>
      </div>
    </div>
  );
}

const UseRefPage = () => (
  <HookLayout
    title="useRef"
    icon="🎯"
    whatIsIt="useRef creates a mutable reference that persists across renders without triggering re-renders. It has two main uses: (1) accessing DOM elements directly (like document.getElementById but the React way), and (2) storing mutable values that should survive re-renders but don't need to be displayed."
    howItWorks="useRef returns an object with a .current property. This object stays the same between renders — React doesn't create a new one. When you assign a ref to a JSX element via the ref attribute, React sets .current to that DOM node after mounting. Unlike state, updating .current doesn't cause a re-render."
    realLifeUses={[
      "Focus an input field on page load",
      "Scroll to a specific section smoothly",
      "Store timer/interval IDs for cleanup",
      "Track previous state values",
      "Access canvas, video, or audio elements",
      "Store values that shouldn't trigger re-renders",
      "Count renders without infinite loops",
      "Integrate with third-party DOM libraries",
    ]}
    syntax={`// Create a ref:
const myRef = useRef(initialValue);

// Access DOM element:
<input ref={myRef} />
myRef.current.focus();
myRef.current.scrollIntoView({ behavior: "smooth" });

// Store mutable value (no re-render):
const intervalRef = useRef(null);
intervalRef.current = setInterval(callback, 1000);
clearInterval(intervalRef.current);

// Track previous value:
const prevValue = useRef(value);
useEffect(() => {
  prevValue.current = value;
}, [value]);`}
    rules={[
      "Don't read or write .current during rendering — it's meant for event handlers and effects",
      "useRef doesn't trigger re-renders — if you need UI to update, use useState instead",
      "The ref object identity is stable — React guarantees the same object on every render",
      "For DOM refs, .current is null until the component mounts and the ref is attached",
      "You can store any value in .current — it's like an instance variable for functional components",
    ]}
    commonMistakes={[
      {
        wrong: `// Trying to render ref value
const renderCount = useRef(0);
renderCount.current++;
return <p>{renderCount.current}</p>; // Won't update UI!`,
        right: `// Use state for displayed values
const [count, setCount] = useState(0);
// Use ref for non-displayed values only`,
        why: "Changing .current doesn't trigger a re-render. If you need the value displayed in the UI, use useState. Refs are for values you need to persist but not display.",
      },
      {
        wrong: `// Accessing ref before mount
const inputRef = useRef(null);
inputRef.current.focus(); // ❌ null on first render!`,
        right: `// Access in useEffect or event handler
useEffect(() => {
  inputRef.current?.focus(); // ✅ safe
}, []);`,
        why: "The ref's .current is null until React mounts the component and attaches the DOM node. Always access DOM refs inside useEffect or event handlers.",
      },
    ]}
    interviewQuestions={[
      { q: "What is useRef and when do you use it?", a: "useRef creates a persistent mutable container. Use it for DOM access (focus, scroll) and storing values that shouldn't trigger re-renders (timer IDs, previous values, render counts)." },
      { q: "What's the difference between useRef and useState?", a: "useState triggers a re-render when updated and is for values displayed in UI. useRef doesn't trigger re-renders and is for mutable values you need to persist silently (like timer IDs)." },
      { q: "Does changing useRef cause a re-render?", a: "No. That's the key distinction. Updating .current is a simple mutation — React is not aware of it and won't re-render the component." },
      { q: "Can you store non-DOM values in useRef?", a: "Yes! useRef can store any value — numbers, objects, functions, timer IDs. It's essentially an instance variable that persists across renders." },
      { q: "Why not use a regular variable instead of useRef?", a: "Regular variables are re-created on every render — their values don't persist. useRef maintains the same object reference across renders, preserving the .current value." },
    ]}
  >
    <FocusAndScrollDemo />
    <StopwatchDemo />
  </HookLayout>
);

export default UseRefPage;
