import { useState, useEffect } from "react";
import HookLayout from "@/components/HookLayout";

function LiveSearchDemo() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        const filtered = data.filter((u: { name: string }) =>
          u.name.toLowerCase().includes(search.toLowerCase())
        );
        setUsers(filtered);
      } catch {
        setUsers([]);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 1: Live Search</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong>Real World:</strong> Search bars in websites
      </p>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 w-full rounded-lg border border-input bg-background px-4 py-2.5 font-body text-foreground outline-none focus:ring-2 focus:ring-primary/40"
      />
      <div className="rounded-lg bg-muted p-3 font-mono text-xs mb-3">
        <p>search = <span className="text-primary">"{search}"</span></p>
        <p>useEffect dependency: <span className="text-primary">[search]</span></p>
      </div>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <ul className="space-y-2 max-h-48 overflow-y-auto">
          {users.map((u) => (
            <li key={u.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
              <span className="font-semibold">{u.name}</span>
              <span className="text-xs text-muted-foreground">{u.email}</span>
            </li>
          ))}
          {users.length === 0 && <p className="text-sm text-muted-foreground">No users found</p>}
        </ul>
      )}
      <p className="mt-3 text-xs italic text-muted-foreground">
        🎤 "When search changes, useEffect runs again because search is in the dependency array."
      </p>
    </div>
  );
}

function ThemeDemo() {
  const [theme, setTheme] = useState(() => localStorage.getItem("demo-theme") || "light");

  useEffect(() => {
    localStorage.setItem("demo-theme", theme);
  }, [theme]);

  return (
    <div
      className="demo-container transition-colors duration-300"
      style={{
        backgroundColor: theme === "light" ? "hsl(0 0% 100%)" : "hsl(222 47% 11%)",
        color: theme === "light" ? "hsl(222 47% 11%)" : "hsl(210 40% 98%)",
      }}
    >
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 2: Theme Persistence</h3>
      <p className="mb-4 text-sm opacity-70">
        <strong>Real World:</strong> Dark/Light mode in websites
      </p>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="glow-button mb-4 w-full text-base"
      >
        {theme === "light" ? "🌙 Switch to Dark" : "☀️ Switch to Light"}
      </button>
      <div className="rounded-lg p-3 font-mono text-xs" style={{ background: theme === "light" ? "hsl(210 40% 96%)" : "hsl(217 33% 17%)" }}>
        <p>theme = <span style={{ color: "hsl(193 92% 67%)" }}>"{theme}"</span></p>
        <p>localStorage = <span style={{ color: "hsl(193 92% 67%)" }}>saved ✓</span></p>
      </div>
      <p className="mt-3 text-xs italic opacity-60">
        🎤 "useEffect saves the theme to localStorage whenever it changes. Refresh and it persists!"
      </p>
    </div>
  );
}

const UseEffectPage = () => (
  <HookLayout
    title="useEffect"
    icon="⚡"
    whatIsIt="useEffect runs code after rendering — perfect for side effects like API calls, timers, and localStorage."
    realLifeUses={[
      "Fetching data from APIs",
      "Setting up timers / intervals",
      "Saving to localStorage",
      "Updating document title",
      "Adding event listeners",
    ]}
    syntax={`useEffect(() => {
  // runs after render
  fetchData();

  return () => {
    // cleanup (optional)
  };
}, [dependency]); // runs when dependency changes`}
  >
    <LiveSearchDemo />
    <ThemeDemo />
  </HookLayout>
);

export default UseEffectPage;
