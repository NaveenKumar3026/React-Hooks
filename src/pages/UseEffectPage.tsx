import { useState, useEffect, useRef } from "react";
import HookLayout from "@/components/HookLayout";

function LiveSearchDemo() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<{ id: number; name: string; email: string; phone: string; company: { name: string } }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal });
        const data = await res.json();
        const filtered = data.filter((u: { name: string }) =>
          u.name.toLowerCase().includes(search.toLowerCase())
        );
        setUsers(filtered);
      } catch (e) {
        if (!(e instanceof DOMException)) setUsers([]);
      }
      setLoading(false);
    }, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 1: Live Search with API</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Search bars — debounced API calls with cleanup
      </p>
      <input
        type="text"
        placeholder="🔍 Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 w-full rounded-xl border border-input bg-muted/30 px-4 py-3 font-body text-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
      />

      <div className="flex gap-3 mb-3">
        <div className="rounded-lg bg-muted/30 border border-border px-3 py-1.5 font-mono text-xs">
          search = <span className="text-primary">"{search}"</span>
        </div>
        <div className="rounded-lg bg-muted/30 border border-border px-3 py-1.5 font-mono text-xs">
          renders = <span className="text-accent">{renderCount.current}</span>
        </div>
        <div className="rounded-lg bg-muted/30 border border-border px-3 py-1.5 font-mono text-xs">
          dep: <span className="text-primary">[search]</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Fetching from API...
        </div>
      ) : (
        <ul className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {users.map((u) => (
            <li
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm cursor-pointer transition-all ${
                selectedUser?.id === u.id ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/20"
              }`}
            >
              <div>
                <span className="font-semibold">{u.name}</span>
                <p className="text-xs text-muted-foreground">{u.company.name}</p>
              </div>
              <span className="text-xs text-muted-foreground">{u.email}</span>
            </li>
          ))}
          {users.length === 0 && <p className="text-sm text-muted-foreground p-4 text-center">No users found for "{search}"</p>}
        </ul>
      )}

      {selectedUser && (
        <div className="mt-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <p className="text-xs text-primary font-semibold mb-2">Selected User Details:</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <p>📧 {selectedUser.email}</p>
            <p>📱 {selectedUser.phone}</p>
            <p>🏢 {selectedUser.company.name}</p>
            <p>👤 {selectedUser.name}</p>
          </div>
        </div>
      )}

      <div className="tip-box mt-3">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Key Concepts:</strong> "This demo shows <strong>debouncing</strong> (400ms delay), <strong>cleanup</strong> (AbortController cancels pending requests), and <strong>dependency array</strong> ([search] means effect re-runs when search changes)."
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

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 2: Window & Event Tracker</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Responsive layouts, analytics, infinite scroll
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl border border-border bg-muted/20 p-4 text-center">
          <p className="text-3xl font-display font-bold text-primary">{windowSize.w}<span className="text-lg text-muted-foreground">×{windowSize.h}</span></p>
          <p className="text-xs text-muted-foreground mt-1">Window Size</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/20 p-4 text-center">
          <p className="text-3xl font-display font-bold text-secondary">{mousePos.x}<span className="text-lg text-muted-foreground">, {mousePos.y}</span></p>
          <p className="text-xs text-muted-foreground mt-1">Mouse Position</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/20 p-4 text-center">
          <p className={`text-3xl font-display font-bold ${isOnline ? "text-green-400" : "text-destructive"}`}>{isOnline ? "Online" : "Offline"}</p>
          <p className="text-xs text-muted-foreground mt-1">Network Status</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/20 p-4 text-center">
          <p className="text-3xl font-display font-bold text-accent">{Math.round(scrollY)}<span className="text-lg text-muted-foreground">px</span></p>
          <p className="text-xs text-muted-foreground mt-1">Scroll Position</p>
        </div>
      </div>

      <div className="space-y-1 rounded-xl bg-muted/30 border border-border p-4 font-mono text-xs">
        <p className="text-muted-foreground">// Multiple event listeners in one useEffect:</p>
        <p className="text-muted-foreground">// cleanup removes ALL listeners on unmount</p>
        <p>useEffect(() =&gt; {"{"}</p>
        <p className="pl-4">window.addEventListener(<span className="text-primary">"resize"</span>, handler);</p>
        <p className="pl-4 text-muted-foreground">// ...more listeners</p>
        <p className="pl-4">return () =&gt; window.removeEventListener(...);</p>
        <p>{"}"}, <span className="text-accent">[]</span>); <span className="text-muted-foreground">// empty array = mount only</span></p>
      </div>

      <div className="tip-box mt-3">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Cleanup is critical:</strong> "Without the cleanup function, event listeners would stack up every time the component re-renders, causing memory leaks. The empty dependency array <code className="rounded bg-muted px-1 font-mono text-primary">[]</code> means this runs once on mount and cleans up on unmount."
        </p>
      </div>
    </div>
  );
}

const UseEffectPage = () => (
  <HookLayout
    title="useEffect"
    icon="⚡"
    whatIsIt="useEffect is React's way of handling side effects — any operation that reaches outside the component's rendering logic. This includes API calls, timers, DOM manipulation, subscriptions, and localStorage. It replaces componentDidMount, componentDidUpdate, and componentWillUnmount from class components."
    howItWorks="After React renders your component to the DOM, it runs your effect function. If you provide a dependency array, React compares the current deps with the previous ones — if any changed, the effect runs again. Before re-running, React calls your cleanup function (the returned function) to tear down the previous effect. This prevents memory leaks and stale subscriptions."
    realLifeUses={[
      "Fetching data from REST APIs or GraphQL",
      "Setting up WebSocket connections",
      "Adding/removing event listeners (resize, scroll, keypress)",
      "Saving data to localStorage",
      "Updating the document title",
      "Running timers and intervals",
      "Integrating with third-party libraries",
      "Tracking analytics events",
    ]}
    syntax={`// Runs after every render:
useEffect(() => {
  console.log("rendered!");
});

// Runs only on mount (empty deps):
useEffect(() => {
  fetchData();
  return () => cleanup(); // runs on unmount
}, []);

// Runs when 'search' changes:
useEffect(() => {
  const results = filterData(search);
  setResults(results);
  return () => cancelRequest(); // cleanup previous
}, [search]);

// Common pattern — async inside effect:
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  };
  fetchData();
}, [url]);`}
    rules={[
      "Never make the effect callback itself async — create an async function inside it instead",
      "Always include values from the component scope that the effect uses in the dependency array",
      "Return a cleanup function to prevent memory leaks (remove listeners, cancel requests, clear timers)",
      "An empty dependency array [] means the effect runs once on mount and cleans up on unmount",
      "No dependency array means the effect runs after every single render — rarely what you want",
    ]}
    commonMistakes={[
      {
        wrong: `// Making the effect async directly
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);`,
        right: `// Async function inside the effect
useEffect(() => {
  const load = async () => {
    const data = await fetchData();
    setData(data);
  };
  load();
}, []);`,
        why: "useEffect expects the callback to return either nothing or a cleanup function. An async function returns a Promise, which React can't use as cleanup.",
      },
      {
        wrong: `// Missing dependency
const [count, setCount] = useState(0);
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, []); // count is missing!`,
        right: `useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // ✅ count included`,
        why: "Without count in the dependency array, the effect only runs once and the title never updates when count changes. This creates a stale closure bug.",
      },
    ]}
    interviewQuestions={[
      { q: "What is useEffect used for?", a: "useEffect handles side effects in functional components — API calls, subscriptions, DOM manipulation, timers. It runs after the component renders and can optionally clean up before the next effect or on unmount." },
      { q: "Explain the dependency array", a: "The dependency array controls when the effect re-runs. Empty [] = run once on mount. [value] = run when value changes. No array = run every render. React compares deps with Object.is() to determine changes." },
      { q: "Why is cleanup important?", a: "Cleanup prevents memory leaks. For example, if you add an event listener without removing it, every re-render adds another listener. Cleanup runs before the next effect and on unmount." },
      { q: "How does useEffect differ from componentDidMount?", a: "useEffect runs after paint (not blocking), while componentDidMount runs before paint. useEffect combines mount, update, and unmount lifecycle into one API. It also runs after every render by default, not just mount." },
      { q: "Can you have multiple useEffects?", a: "Yes! It's actually recommended to split unrelated logic into separate useEffects. Each one handles a specific concern, making code more readable and maintainable." },
    ]}
  >
    <LiveSearchDemo />
    <WindowTrackerDemo />
  </HookLayout>
);

export default UseEffectPage;
