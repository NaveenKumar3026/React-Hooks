import { createContext, useContext, useState } from "react";
import HookLayout from "@/components/HookLayout";

// ---- Theme + Language Context Demo ----
type Theme = "light" | "dark" | "ocean";
interface AppContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  language: string;
  toggleLanguage: () => void;
  user: { name: string; role: string } | null;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState("english");
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const toggleLanguage = () => setLanguage((p) => (p === "english" ? "tamil" : "english"));
  const login = () => setUser({ name: "John Doe", role: "Admin" });
  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ theme, setTheme, language, toggleLanguage, user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

const themeStyles: Record<Theme, { bg: string; text: string; accent: string }> = {
  light: { bg: "bg-white", text: "text-gray-900", accent: "border-amber-400" },
  dark: { bg: "bg-muted/40", text: "text-foreground", accent: "border-primary" },
  ocean: { bg: "bg-blue-950/40", text: "text-blue-100", accent: "border-blue-400" },
};

function DemoNavbar() {
  const { theme, language, user } = useContext(AppContext);
  const s = themeStyles[theme];
  return (
    <div className={`rounded-xl border ${s.accent} ${s.bg} px-4 py-3 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <p className={`font-display text-sm font-semibold ${s.text}`}>
          🧭 {language === "english" ? "Welcome to My Website" : "என் இணையதளத்திற்கு வரவேற்கிறோம்"}
        </p>
        {user && (
          <span className="rounded-full border border-border bg-primary/10 px-2 py-0.5 text-xs text-primary">
            {user.name}
          </span>
        )}
      </div>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        useContext(AppContext) → theme: <span className="text-primary">{theme}</span>
      </p>
    </div>
  );
}

function DemoContent() {
  const { theme, setTheme, language, toggleLanguage, user, login, logout } = useContext(AppContext);
  const s = themeStyles[theme];
  return (
    <div className={`rounded-xl border ${s.accent} ${s.bg} px-4 py-4 space-y-3 transition-all duration-300`}>
      <p className={`text-sm ${s.text}`}>
        {language === "english"
          ? "This website is currently in English."
          : "இந்த இணையதளம் தற்போது தமிழில் உள்ளது."}
      </p>

      <div className="flex gap-2 flex-wrap">
        <button onClick={toggleLanguage} className="glow-button text-sm px-4 py-2">
          🌐 {language === "english" ? "தமிழ்" : "English"}
        </button>
        {user ? (
          <button onClick={logout} className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/20 transition-all">
            🚪 Logout
          </button>
        ) : (
          <button onClick={login} className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400 hover:bg-green-500/20 transition-all">
            🔑 Login
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {(["light", "dark", "ocean"] as Theme[]).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
              theme === t ? "border-primary bg-primary/20 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            {t === "light" ? "☀️" : t === "dark" ? "🌙" : "🌊"} {t}
          </button>
        ))}
      </div>

      <p className="font-mono text-xs text-muted-foreground">
        All controls use the same context — <strong>no props passed!</strong>
      </p>
    </div>
  );
}

function DemoFooter() {
  const { theme, language, user } = useContext(AppContext);
  const s = themeStyles[theme];
  return (
    <div className={`rounded-xl border ${s.accent} ${s.bg} px-4 py-3 transition-all duration-300`}>
      <p className={`font-display text-sm font-semibold ${s.text}`}>
        📝 {language === "english" ? "© 2025 My Website" : "© 2025 என் இணையதளம்"}
        {user && ` • Logged in as ${user.role}`}
      </p>
    </div>
  );
}

function FullDemo() {
  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo: Multi-Feature Context</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Theme + Language + Auth — all via one Context
      </p>

      <AppProvider>
        <div className="space-y-3">
          <div className="text-center">
            <span className="font-mono text-xs text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/20">{"<AppProvider>"}</span>
          </div>
          <DemoNavbar />
          <DemoContent />
          <DemoFooter />
          <div className="text-center">
            <span className="font-mono text-xs text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/20">{"</AppProvider>"}</span>
          </div>
        </div>
      </AppProvider>

      <div className="mt-4 space-y-1 rounded-xl bg-muted/30 border border-border p-4 font-mono text-xs">
        <p className="text-muted-foreground">// Without Context (prop drilling):</p>
        <p className="text-destructive/70">&lt;App theme lang user&gt; → &lt;Layout theme lang user&gt; → &lt;Navbar theme lang user&gt;</p>
        <p className="text-muted-foreground mt-2">// With Context:</p>
        <p className="text-green-400">&lt;Provider&gt; → any child calls useContext() directly ✓</p>
      </div>

      <div className="tip-box mt-3">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Key Insight:</strong> "Three components (Navbar, Content, Footer) all access the same state. When Content changes the theme or language, Navbar and Footer update instantly. No props are passed down — Context eliminates prop drilling entirely."
        </p>
      </div>
    </div>
  );
}

const UseContextPage = () => (
  <HookLayout
    title="useContext"
    icon="🌐"
    whatIsIt="useContext lets you share data across the entire component tree without passing props manually at every level (prop drilling). It works like a broadcast system — any component inside the Provider can directly access the shared data. Combined with useState, it creates a lightweight global state management solution."
    howItWorks="Three steps: (1) createContext() creates a Context object with an optional default value. (2) A Provider component wraps the tree and passes the current value. (3) Any nested component calls useContext(MyContext) to read the value. When the Provider's value changes, all consumers re-render automatically."
    realLifeUses={[
      "Theme switching (dark/light/custom modes)",
      "Authentication state (logged-in user info)",
      "Language / internationalization (i18n)",
      "Shopping cart state across pages",
      "App-wide configuration & feature flags",
      "Notification/toast system",
      "Multi-step form data sharing",
      "Permission/role-based UI rendering",
    ]}
    syntax={`// Step 1: Create context
const MyContext = createContext(defaultValue);

// Step 2: Create a Provider component
function MyProvider({ children }) {
  const [state, setState] = useState(initial);
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
}

// Step 3: Consume in ANY child component
function ChildComponent() {
  const { state, setState } = useContext(MyContext);
  return <p>{state}</p>;
}

// Usage:
<MyProvider>
  <ChildComponent />  {/* Can access context */}
  <DeepNested />      {/* Also can access! */}
</MyProvider>`}
    rules={[
      "The component must be inside the Provider to access the context value",
      "When the Provider's value changes, ALL consumers re-render — be mindful of performance",
      "Don't overuse context for frequently changing values — consider state management libraries for complex apps",
      "The default value in createContext is only used when there's no Provider above in the tree",
      "Split contexts by concern (ThemeContext, AuthContext) rather than putting everything in one giant context",
    ]}
    commonMistakes={[
      {
        wrong: `// Component outside the Provider
<MyContext.Provider value={data}>
  <Inside />  {/* ✅ works */}
</MyContext.Provider>
<Outside />  {/* ❌ gets default value only */}`,
        right: `// Wrap all consumers inside Provider
<MyContext.Provider value={data}>
  <Inside />
  <Outside />  {/* ✅ now inside */}
</MyContext.Provider>`,
        why: "useContext looks UP the component tree for the nearest Provider. If there's no Provider above it, it falls back to the default value from createContext.",
      },
      {
        wrong: `// Creating new object every render
<MyContext.Provider value={{ theme, setTheme }}>
  {children}
</MyContext.Provider>
// ⚠️ New object reference on every render!`,
        right: `// Memoize the value
const value = useMemo(() => 
  ({ theme, setTheme }), [theme]
);
<MyContext.Provider value={value}>
  {children}
</MyContext.Provider>`,
        why: "Without useMemo, the value object is recreated on every render, causing all consumers to re-render even if the actual data hasn't changed.",
      },
    ]}
    interviewQuestions={[
      { q: "What problem does useContext solve?", a: "It solves prop drilling — the problem of passing data through many levels of components that don't need it, just to reach a deeply nested child. Context provides a direct tunnel from Provider to Consumer." },
      { q: "How is Context different from Redux?", a: "Context is built into React and great for low-frequency updates (theme, auth, locale). Redux is a separate library with middleware, devtools, and optimized selectors — better for complex, frequently-updating global state." },
      { q: "When should you NOT use Context?", a: "Avoid Context for high-frequency updates (mouse position, animations) as every consumer re-renders on change. Also avoid for data only needed by a few nearby components — regular props are simpler." },
      { q: "Can you have multiple Contexts?", a: "Yes! You can nest multiple Providers and consume multiple contexts in one component. It's recommended to split by concern: ThemeContext, AuthContext, CartContext, etc." },
      { q: "What happens when Context value changes?", a: "Every component that calls useContext(MyContext) will re-render. This is why performance-conscious apps use useMemo on the value and split contexts to minimize unnecessary re-renders." },
    ]}
  >
    <FullDemo />
  </HookLayout>
);

export default UseContextPage;
