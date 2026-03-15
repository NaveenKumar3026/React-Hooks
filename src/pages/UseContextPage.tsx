import { createContext, useContext, useState } from "react";
import HookLayout from "@/components/HookLayout";

const useContextCode = `import React, {
  createContext, useContext, useState
} from "react";

// ✅ Step 1: Create the Context
const AppContext = createContext();

// ✅ Step 2: Create a Provider Component
function AppProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("english");
  const [user, setUser] = useState(null);

  const toggleLanguage = () =>
    setLanguage((prev) =>
      prev === "english" ? "tamil" : "english"
    );

  const login = () =>
    setUser({ name: "John", role: "Admin" });
  const logout = () => setUser(null);

  return (
    <AppContext.Provider
      value={{
        theme, setTheme,
        language, toggleLanguage,
        user, login, logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ✅ Step 3: Consume in ANY child component
function Navbar() {
  // No props needed! Direct access!
  const { theme, language, user } =
    useContext(AppContext);

  return (
    <nav>
      <h3>
        {language === "english"
          ? "Welcome to My Website"
          : "என் இணையதளத்திற்கு வரவேற்கிறோம்"}
      </h3>
      {user && <span>{user.name}</span>}
    </nav>
  );
}

function Content() {
  const { language, toggleLanguage, user, login } =
    useContext(AppContext);

  return (
    <div>
      <p>
        {language === "english"
          ? "This is in English."
          : "இது தமிழில் உள்ளது."}
      </p>
      <button onClick={toggleLanguage}>
        Switch Language
      </button>
      <button onClick={user ? logout : login}>
        {user ? "Logout" : "Login"}
      </button>
    </div>
  );
}

function Footer() {
  const { language, user } = useContext(AppContext);
  return (
    <footer>
      {language === "english"
        ? "© 2025 My Website"
        : "© 2025 என் இணையதளம்"}
      {user && \` • \${user.role}\`}
    </footer>
  );
}

// ✅ Step 4: Wrap with Provider
function App() {
  return (
    <AppProvider>
      <Navbar />
      <Content />
      <Footer />
    </AppProvider>
  );
}`;

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

const themeStyles: Record<Theme, { bg: string; border: string; label: string }> = {
  light: { bg: "linear-gradient(135deg, hsl(45 30% 95% / 0.9), hsl(45 20% 90% / 0.8))", border: "border-amber-400/40", label: "☀️ Light" },
  dark: { bg: "linear-gradient(135deg, hsl(225 25% 10% / 0.9), hsl(225 30% 8% / 0.8))", border: "border-primary/40", label: "🌙 Dark" },
  ocean: { bg: "linear-gradient(135deg, hsl(210 60% 12% / 0.9), hsl(210 50% 8% / 0.8))", border: "border-blue-400/40", label: "🌊 Ocean" },
};

const textColors: Record<Theme, string> = {
  light: "text-gray-900",
  dark: "text-foreground",
  ocean: "text-blue-100",
};

function DemoNavbar() {
  const { theme, language, user } = useContext(AppContext);
  const s = themeStyles[theme];
  return (
    <div className={`rounded-xl border ${s.border} px-5 py-3.5 transition-all duration-500`} style={{ background: s.bg }}>
      <div className="flex items-center justify-between">
        <p className={`font-display text-sm font-semibold ${textColors[theme]}`}>
          🧭 {language === "english" ? "Welcome to My Website" : "என் இணையதளத்திற்கு வரவேற்கிறோம்"}
        </p>
        {user && (
          <span className="rounded-full border border-primary/30 bg-gradient-to-r from-primary/15 to-secondary/10 px-3 py-1 text-xs text-primary font-semibold">
            👤 {user.name}
          </span>
        )}
      </div>
      <p className="mt-1.5 font-mono text-[10px] text-muted-foreground/60">
        {"<Navbar />"} → useContext(AppContext) → theme: {theme}, lang: {language}
      </p>
    </div>
  );
}

function DemoContent() {
  const { theme, setTheme, language, toggleLanguage, user, login, logout } = useContext(AppContext);
  const s = themeStyles[theme];
  return (
    <div className={`rounded-xl border ${s.border} px-5 py-5 space-y-4 transition-all duration-500`} style={{ background: s.bg }}>
      <p className={`text-sm font-body ${textColors[theme]}`}>
        {language === "english"
          ? "This website is currently in English. Click below to switch!"
          : "இந்த இணையதளம் தற்போது தமிழில் உள்ளது. மாற்ற கீழே கிளிக் செய்யவும்!"}
      </p>

      <div className="flex gap-2 flex-wrap">
        <button onClick={toggleLanguage} className="glow-button text-sm px-4 py-2.5">
          🌐 {language === "english" ? "Switch to தமிழ்" : "Switch to English"}
        </button>
        {user ? (
          <button onClick={logout} className="rounded-xl border border-destructive/30 px-4 py-2.5 text-sm font-semibold text-destructive transition-all" style={{ background: "linear-gradient(135deg, hsl(0 84% 60% / 0.08), hsl(0 84% 60% / 0.03))" }}>
            🚪 Logout ({user.name})
          </button>
        ) : (
          <button onClick={login} className="rounded-xl border border-green-500/30 px-4 py-2.5 text-sm font-semibold text-green-400 transition-all" style={{ background: "linear-gradient(135deg, hsl(140 70% 50% / 0.08), hsl(140 70% 50% / 0.03))" }}>
            🔑 Login as Admin
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {(["light", "dark", "ocean"] as Theme[]).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`rounded-xl px-4 py-2 text-xs font-bold border transition-all duration-300 ${
              theme === t ? "border-primary bg-gradient-to-r from-primary/20 to-secondary/10 text-primary scale-105" : "border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            {themeStyles[t].label}
          </button>
        ))}
      </div>

      <p className="font-mono text-[10px] text-muted-foreground/60">
        {"<Content />"} → useContext(AppContext) → All controls, no props passed!
      </p>
    </div>
  );
}

function DemoFooter() {
  const { theme, language, user } = useContext(AppContext);
  const s = themeStyles[theme];
  return (
    <div className={`rounded-xl border ${s.border} px-5 py-3.5 transition-all duration-500`} style={{ background: s.bg }}>
      <p className={`font-display text-sm font-semibold ${textColors[theme]}`}>
        📝 {language === "english" ? "© 2025 My Website" : "© 2025 என் இணையதளம்"}
        {user && ` • Logged in as ${user.role}`}
      </p>
      <p className="mt-1.5 font-mono text-[10px] text-muted-foreground/60">
        {"<Footer />"} → useContext(AppContext) → reads theme, lang, user
      </p>
    </div>
  );
}

function FullDemo() {
  return (
    <div className="demo-container">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500/15 to-secondary/10 px-3 py-1 text-xs font-semibold text-pink-400 border border-pink-500/20">
          🌐 Live Demo
        </span>
      </div>
      <h3 className="mb-1 font-display text-xl font-semibold">Multi-Feature Context: Theme + Language + Auth</h3>
      <p className="mb-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Global app state — theme, language, authentication shared across all components
      </p>

      <AppProvider>
        <div className="space-y-3">
          <div className="text-center">
            <span className="font-mono text-xs text-primary/60 bg-primary/5 px-4 py-1.5 rounded-full border border-primary/15">{"<AppProvider>"} — wraps all children</span>
          </div>
          <DemoNavbar />
          <DemoContent />
          <DemoFooter />
          <div className="text-center">
            <span className="font-mono text-xs text-primary/60 bg-primary/5 px-4 py-1.5 rounded-full border border-primary/15">{"</AppProvider>"}</span>
          </div>
        </div>
      </AppProvider>

      {/* Comparison */}
      <div className="mt-5 space-y-2">
        <div className="rounded-xl border border-destructive/20 p-4" style={{ background: "linear-gradient(135deg, hsl(0 84% 60% / 0.05), transparent)" }}>
          <p className="text-xs font-bold text-destructive mb-1">❌ Without Context (Prop Drilling):</p>
          <p className="font-mono text-xs text-muted-foreground">{"<App theme lang user>"} → {"<Layout theme lang user>"} → {"<Page theme lang user>"} → {"<Navbar theme lang user>"}</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Every intermediate component must pass props it doesn't use!</p>
        </div>
        <div className="rounded-xl border border-green-500/20 p-4" style={{ background: "linear-gradient(135deg, hsl(140 70% 50% / 0.05), transparent)" }}>
          <p className="text-xs font-bold text-green-400 mb-1">✅ With Context:</p>
          <p className="font-mono text-xs text-muted-foreground">{"<Provider>"} → any child calls <span className="text-primary">useContext()</span> directly ✓</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Components only access what they need. No unnecessary prop passing!</p>
        </div>
      </div>

      <div className="tip-box mt-4">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Key Insight:</strong> "Three components (Navbar, Content, Footer) all read from the same Context. When Content changes the theme or language, Navbar and Footer update instantly — no props are passed between siblings. Context eliminates prop drilling entirely."
        </p>
      </div>
    </div>
  );
}

const UseContextPage = () => (
  <HookLayout
    title="useContext"
    icon="🌐"
    whatIsIt="useContext lets you share data across the entire component tree without passing props manually through every level (prop drilling). It works like a broadcast system — a Provider wraps the tree and any component inside can directly access the shared data. Combined with useState, it creates a lightweight global state management solution built right into React."
    howItWorks="Three steps: (1) createContext() creates a Context object. (2) A Provider component wraps the tree and passes the current value via the value prop. (3) Any nested component — no matter how deep — calls useContext(MyContext) to read the value. When the Provider's value changes, all consumers automatically re-render with the new data."
    realLifeUses={[
      "Theme switching (dark/light/custom modes)",
      "Authentication state (logged-in user, role, permissions)",
      "Language / internationalization (i18n) switching",
      "Shopping cart state shared across pages",
      "App-wide configuration & feature flags",
      "Notification/toast system management",
      "Multi-step form data sharing between steps",
      "Permission & role-based UI rendering",
    ]}
    syntax={`// Step 1: Create context
const MyContext = createContext(defaultValue);

// Step 2: Create Provider with state
function MyProvider({ children }) {
  const [state, setState] = useState(initial);
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
}

// Step 3: Consume in ANY child
function ChildComponent() {
  const { state, setState } = useContext(MyContext);
  return <p>{state}</p>;
}

// Step 4: Wrap with Provider
<MyProvider>
  <ChildComponent />  {/* ✅ Can access */}
  <DeepNested />      {/* ✅ Also can! */}
</MyProvider>

// Custom hook pattern (recommended):
function useMyContext() {
  const ctx = useContext(MyContext);
  if (!ctx) throw new Error("Must be inside Provider");
  return ctx;
}`}
    rules={[
      "Components must be inside the Provider to access context — otherwise they get the default value",
      "When Provider's value changes, ALL consumers re-render — be mindful of performance",
      "Don't overuse context for frequently changing values — consider state libraries for complex apps",
      "The default value in createContext is only used when there's no Provider above in the tree",
      "Split contexts by concern (ThemeContext, AuthContext) rather than one giant context",
    ]}
    commonMistakes={[
      {
        wrong: `// ❌ Component outside the Provider
<MyContext.Provider value={data}>
  <Inside />   {/* ✅ works */}
</MyContext.Provider>
<Outside />    {/* ❌ gets default only! */}`,
        right: `// ✅ All consumers inside the Provider
<MyContext.Provider value={data}>
  <Inside />
  <Outside />  {/* ✅ now has access */}
</MyContext.Provider>`,
        why: "useContext looks UP the component tree for the nearest Provider. If there's no Provider above, it falls back to the default value from createContext — usually undefined.",
      },
      {
        wrong: `// ❌ New object reference every render
<MyContext.Provider value={{ theme, setTheme }}>
  {children}
</MyContext.Provider>
// Creates a new object each render → all consumers
// re-render even when data hasn't changed!`,
        right: `// ✅ Memoize the context value
const value = useMemo(
  () => ({ theme, setTheme }),
  [theme]
);
<MyContext.Provider value={value}>
  {children}
</MyContext.Provider>`,
        why: "Without useMemo, JavaScript creates a new object on every render. React sees a new reference and re-renders all consumers — even if theme hasn't actually changed. Memoizing prevents this.",
      },
    ]}
    interviewQuestions={[
      { q: "What problem does useContext solve?", a: "Prop drilling — passing data through many component levels that don't use it, just to reach a deep child. Context creates a direct tunnel: Provider → Consumer, skipping all intermediate components." },
      { q: "How is Context different from Redux?", a: "Context is built-in and great for low-frequency updates (theme, auth, locale). Redux is external with middleware, devtools, selectors, and optimized re-renders — better for complex, frequently-updating global state." },
      { q: "When should you NOT use Context?", a: "For high-frequency updates (mouse position, animations) as every consumer re-renders. Also avoid when data is only needed by a few nearby components — regular props are simpler and more explicit." },
      { q: "Can you have multiple Contexts?", a: "Yes! Nest multiple Providers and consume multiple contexts in one component. Best practice: split by concern — ThemeContext, AuthContext, CartContext — for better performance and maintainability." },
      { q: "What happens when the Context value changes?", a: "Every component calling useContext(MyContext) re-renders. This is why you should memoize the value, split contexts, and avoid putting rapidly-changing data in context." },
    ]}
    codeExample={useContextCode}
  >
    <FullDemo />
  </HookLayout>
);

export default UseContextPage;
