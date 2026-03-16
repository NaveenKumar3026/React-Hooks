import { useState, useEffect, useRef } from "react";
import HookLayout from "@/components/HookLayout";

const useEffectCode = `import React, { useState, useEffect } from "react";

// ✅ Demo 1: Live Search with Debounce + AbortController
function LiveSearchDemo() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    // Debounce: wait 400ms before fetching
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );
        const data = await res.json();
        const filtered = data.filter((u) =>
          u.name.toLowerCase().includes(
            search.toLowerCase()
          )
        );
        setUsers(filtered);
      } catch (e) {
        if (!(e instanceof DOMException)) {
          setUsers([]);
        }
      }
      setLoading(false);
    }, 400);

    // Cleanup: cancel timer + abort fetch
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]); // Re-run when search changes
}

// ✅ Demo 2: Window Event Tracker
function WindowTrackerDemo() {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onResize = () =>
      setSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    const onMouse = (e) =>
      setMouse({ x: e.clientX, y: e.clientY });

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);

    // Cleanup removes ALL listeners
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []); // Empty array = mount only
}`;

function LiveSearchDemo() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<{ id: number; name: string; email: string; phone: string; company: { name: string } }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const renderCount = useRef(0);
  const effectRunCount = useRef(0);
  const cleanupCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    effectRunCount.current++;
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal });
        const data = await res.json();
        const filtered = data.filter((u: { name: string }) => u.name.toLowerCase().includes(search.toLowerCase()));
        setUsers(filtered);
      } catch (e) {
        if (!(e instanceof DOMException)) setUsers([]);
      }
      setLoading(false);
    }, 400);
    return () => {
      cleanupCount.current++;
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return (
    <div className="demo-container">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-secondary/15 to-primary/10 px-3 py-1 text-xs font-semibold text-secondary border border-secondary/20">
          🔍 Demo 1
        </span>
      </div>
      <h3 className="mb-1 font-display text-xl font-semibold">Live Search with API + Debounce</h3>
      <p className="mb-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Search bars with API calls, debouncing, and request cleanup
      </p>

      <input
        type="text"
        placeholder="🔍 Type to search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="demo-input mb-4"
      />

      {loading ? (
        <div className="flex items-center gap-3 p-6 justify-center text-sm text-muted-foreground">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Fetching from JSONPlaceholder API...
        </div>
      ) : (
        <ul className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {users.map((u) => (
            <li
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm cursor-pointer transition-all duration-300 ${
                selectedUser?.id === u.id
                  ? "border-secondary/50 bg-gradient-to-r from-secondary/10 to-primary/5"
                  : "border-border hover:border-secondary/30"
              }`}
              style={{ background: selectedUser?.id === u.id ? undefined : "linear-gradient(145deg, hsl(225 25% 10% / 0.4), hsl(225 30% 8% / 0.6))" }}
            >
              <div>
                <span className="font-semibold">{u.name}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{u.company.name}</p>
              </div>
              <span className="text-xs text-muted-foreground/60">{u.email}</span>
            </li>
          ))}
          {users.length === 0 && <p className="text-sm text-muted-foreground p-6 text-center">No users found for "{search}"</p>}
        </ul>
      )}

      {selectedUser && (
        <div className="mt-4 rounded-xl border border-secondary/30 p-4" style={{ background: "linear-gradient(135deg, hsl(270 70% 60% / 0.08), hsl(193 92% 55% / 0.04))" }}>
          <p className="text-xs text-secondary font-bold mb-2">📋 Selected User Details:</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <p>📧 {selectedUser.email}</p>
            <p>📱 {selectedUser.phone}</p>
            <p>🏢 {selectedUser.company.name}</p>
            <p>👤 {selectedUser.name}</p>
          </div>
        </div>
      )}

      {/* REACTIVE CODE */}
      <div className="code-window mt-4">
        <div className="code-window-header">
          <div className="code-window-dots">
            <span className="bg-destructive/60" />
            <span className="bg-accent/60" />
            <span className="bg-green-500/60" />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">🔴 Live — Type in search to see the effect lifecycle!</span>
        </div>
        <div className="code-window-body">
          <p><span className="text-primary">useEffect</span>(() =&gt; {"{"}</p>
          <p className="pl-4 text-muted-foreground">{"// This effect has run"} <span className="text-accent font-bold">{effectRunCount.current}</span> {"time(s)"}</p>
          <p className="pl-4"><span className="text-secondary">const</span> controller = <span className="text-primary">new AbortController</span>();</p>
          <p className="pl-4"><span className="text-secondary">const</span> timer = <span className="text-primary">setTimeout</span>(async () =&gt; {"{"}</p>
          <p className="pl-8"><span className="text-secondary">await</span> fetch(<span className="text-accent">"...users"</span>, {"{"} signal {"}"});</p>
          <p className="pl-8 text-muted-foreground">{"// search ="} <span className="text-accent">"{search}"</span> → filtered <span className="text-primary font-bold">{users.length}</span> results</p>
          <p className="pl-4">{"}"}, <span className="text-accent">400</span>); <span className="text-muted-foreground">{"// debounce delay"}</span></p>
          <p className="pl-4"><span className="text-secondary">return</span> () =&gt; {"{"} <span className="text-muted-foreground">{"// Cleanup (ran"} <span className="text-destructive font-bold">{cleanupCount.current}</span> {"times)"}</span></p>
          <p className="pl-8"><span className="text-destructive">clearTimeout</span>(timer);</p>
          <p className="pl-8">controller.<span className="text-destructive">abort</span>(); <span className="text-muted-foreground">{"// cancel in-flight request"}</span></p>
          <p className="pl-4">{"};"}</p>
          <p>{"}"}, [<span className="text-accent">search</span>]); <span className="text-muted-foreground">{"// ← dependency: "}<span className="text-accent">"{search}"</span></span></p>
          <p className="mt-2 text-muted-foreground">{"// Component has rendered"} <span className="text-primary font-bold">{renderCount.current}</span> {"time(s)"}</p>
        </div>
      </div>

      <div className="tip-box mt-4">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Watch the code!</strong> Every keystroke increments the effect run count. Cleanup runs before each new effect (cancelling the previous timer). The debounce (400ms) means the fetch only fires after you stop typing. Try typing fast — you'll see cleanups outnumber fetches!
        </p>
      </div>
    </div>
  );
}

function WindowTrackerDemo() {
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [scrollY, setScrollY] = useState(0);
  const [keyPressed, setKeyPressed] = useState("");

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleKey = (e: KeyboardEvent) => setKeyPressed(e.key);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const stats = [
    { label: "Window", value: `${windowSize.w}×${windowSize.h}`, icon: "📐", color: "text-primary" },
    { label: "Mouse", value: `${mousePos.x}, ${mousePos.y}`, icon: "🖱️", color: "text-secondary" },
    { label: "Network", value: isOnline ? "Online" : "Offline", icon: isOnline ? "🟢" : "🔴", color: isOnline ? "text-green-400" : "text-destructive" },
    { label: "Scroll", value: `${Math.round(scrollY)}px`, icon: "📜", color: "text-accent" },
    { label: "Last Key", value: keyPressed || "—", icon: "⌨️", color: "text-pink-400" },
  ];

  return (
    <div className="demo-container">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent/15 to-primary/10 px-3 py-1 text-xs font-semibold text-accent border border-accent/20">
          📡 Demo 2
        </span>
      </div>
      <h3 className="mb-1 font-display text-xl font-semibold">Window & Event Tracker</h3>
      <p className="mb-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Responsive layouts, analytics, infinite scroll, keyboard shortcuts
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {stats.map((s) => (
          <div key={s.label} className="demo-stat-card">
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className={`font-display text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* REACTIVE CODE */}
      <div className="code-window">
        <div className="code-window-header">
          <div className="code-window-dots">
            <span className="bg-destructive/60" />
            <span className="bg-accent/60" />
            <span className="bg-green-500/60" />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">🔴 Live — Move mouse, resize, press keys!</span>
        </div>
        <div className="code-window-body">
          <p><span className="text-primary">useEffect</span>(() =&gt; {"{"}</p>
          <p className="pl-4 text-muted-foreground">{"// All listeners registered on mount"}</p>
          <p className="pl-4">window.<span className="text-accent">addEventListener</span>(<span className="text-green-400">"resize"</span>, handler);</p>
          <p className="pl-4 text-muted-foreground">{"// → Current:"} <span className="text-primary font-bold">{windowSize.w}×{windowSize.h}</span></p>
          <p className="pl-4">window.<span className="text-accent">addEventListener</span>(<span className="text-green-400">"mousemove"</span>, handler);</p>
          <p className="pl-4 text-muted-foreground">{"// → Current:"} <span className="text-secondary font-bold">x:{mousePos.x}, y:{mousePos.y}</span></p>
          <p className="pl-4">window.<span className="text-accent">addEventListener</span>(<span className="text-green-400">"keydown"</span>, handler);</p>
          <p className="pl-4 text-muted-foreground">{"// → Last key:"} <span className="text-pink-400 font-bold">"{keyPressed || "none"}"</span></p>
          <p className="pl-4">window.<span className="text-accent">addEventListener</span>(<span className="text-green-400">"scroll"</span>, handler);</p>
          <p className="pl-4 text-muted-foreground">{"// → Scroll Y:"} <span className="text-accent font-bold">{Math.round(scrollY)}px</span></p>
          <p className="pl-4"><span className="text-secondary">return</span> () =&gt; {"{"} <span className="text-muted-foreground">{"// Cleanup all!"}</span></p>
          <p className="pl-8"><span className="text-destructive">removeEventListener</span>(...) × 6</p>
          <p className="pl-4">{"};"}</p>
          <p>{"}"}, <span className="text-accent">[]</span>); <span className="text-muted-foreground">{"// Empty = mount only, cleanup on unmount"}</span></p>
        </div>
      </div>

      <div className="tip-box mt-4">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Cleanup is critical:</strong> Without cleanup, event listeners stack up on every re-render, causing memory leaks. The empty dependency array <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-primary">[]</code> means "run once on mount, clean up on unmount."
        </p>
      </div>
    </div>
  );
}

const UseEffectPage = () => (
  <HookLayout
    title="useEffect"
    icon="⚡"
    whatIsIt="useEffect is React's way of handling side effects — any operation that reaches outside the component's pure rendering logic. This includes API calls, timers, DOM manipulation, event listeners, WebSockets, localStorage, and analytics. It unifies componentDidMount, componentDidUpdate, and componentWillUnmount from class components into one elegant API."
    howItWorks="After React renders your component to the DOM, it runs your effect function. If you provide a dependency array, React compares current deps with previous ones using Object.is(). If any dependency changed, React first runs the cleanup function from the previous effect, then runs the new effect. This cycle prevents memory leaks, stale data, and duplicate subscriptions."
    realLifeUses={[
      "Fetching data from REST APIs or GraphQL endpoints",
      "Setting up WebSocket or real-time connections",
      "Adding/removing event listeners (resize, scroll, keypress)",
      "Saving and loading from localStorage/sessionStorage",
      "Updating the document title or meta tags",
      "Running timers, intervals, and debounced operations",
      "Integrating with third-party libraries (charts, maps)",
      "Tracking analytics events and page views",
    ]}
    syntax={`// Runs after every render (rare):
useEffect(() => {
  console.log("Rendered!");
});

// Runs only on mount (empty deps):
useEffect(() => {
  fetchData();
  return () => cleanup(); // on unmount
}, []);

// Runs when specific value changes:
useEffect(() => {
  const results = filterData(search);
  setResults(results);
  return () => cancelPreviousRequest();
}, [search]);

// Async pattern (function inside):
useEffect(() => {
  const loadData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  };
  loadData();
}, [url]);

// Multiple effects (separation of concerns):
useEffect(() => { /* handle auth */ }, [user]);
useEffect(() => { /* handle theme */ }, [theme]);`}
    rules={[
      "Never make the effect callback async directly — create an async function inside it",
      "Always include values from component scope that the effect uses in the dependency array",
      "Return a cleanup function to prevent memory leaks (remove listeners, cancel requests, clear timers)",
      "Empty dependency array [] = runs once on mount, cleans up on unmount",
      "No dependency array = runs after every render — rarely what you want",
    ]}
    commonMistakes={[
      {
        wrong: `// ❌ Making the effect async directly
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);
// Returns a Promise, not a cleanup function!`,
        right: `// ✅ Async function inside the effect
useEffect(() => {
  const loadData = async () => {
    const data = await fetchData();
    setData(data);
  };
  loadData();
}, []);`,
        why: "useEffect expects the callback to return either nothing or a cleanup function. An async function returns a Promise, which React can't use as cleanup — causing potential memory leaks.",
      },
      {
        wrong: `// ❌ Missing dependency — stale closure bug
const [count, setCount] = useState(0);
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, []); // count is NOT in the dependency array!`,
        right: `// ✅ Include all dependencies
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // Now updates when count changes!`,
        why: "Without count in the dependency array, the effect captures the initial value of count (closure) and never sees updates. The title stays at 'Count: 0' forever — a classic stale closure bug.",
      },
    ]}
    interviewQuestions={[
      { q: "What is useEffect used for?", a: "useEffect handles side effects — operations outside React's rendering: API calls, subscriptions, DOM changes, timers. It runs after the component renders and can clean up before the next effect or on unmount." },
      { q: "Explain the three dependency array modes", a: "No array → runs after every render. Empty [] → runs once on mount, cleanup on unmount. [deps] → runs when any dependency changes, with cleanup before each re-run." },
      { q: "Why is cleanup important?", a: "Cleanup prevents memory leaks. Without removing event listeners, canceling requests, or clearing timers, resources accumulate — especially with rapid re-renders or navigation." },
      { q: "How does useEffect differ from componentDidMount?", a: "useEffect runs after paint (non-blocking), componentDidMount runs before. useEffect combines mount + update + unmount into one API. It runs after every render by default, not just mount." },
      { q: "Can you have multiple useEffects?", a: "Yes! It's recommended to split unrelated logic into separate useEffects. Each handles one concern — data fetching separate from event listeners, for example." },
    ]}
    codeExample={useEffectCode}
  >
    <LiveSearchDemo />
    <WindowTrackerDemo />
  </HookLayout>
);

export default UseEffectPage;
