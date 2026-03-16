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

// ✅ Demo 2: Notification System
const NotifContext = createContext();

function NotifProvider({ children }) {
  const [notifications, setNotifications] =
    useState([]);

  const addNotification = (msg, type) => {
    const id = Date.now();
    setNotifications((prev) => [
      ...prev,
      { id, msg, type },
    ]);
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((n) => n.id !== id)
      );
    }, 3000);
  };

  return (
    <NotifContext.Provider
      value={{ notifications, addNotification }}
    >
      {children}
    </NotifContext.Provider>
  );
}`;

// ===== DEMO 1: Theme + Language + Auth =====
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
    </div>
  );
}

function ContextCodeWindow() {
  const { theme, language, user } = useContext(AppContext);
  return (
    <div className="code-window mt-4">
      <div className="code-window-header">
        <div className="code-window-dots">
          <span className="bg-destructive/60" />
          <span className="bg-accent/60" />
          <span className="bg-green-500/60" />
        </div>
        <span className="font-mono text-xs text-muted-foreground ml-2">🔴 Live — Change theme/language/auth to see context update!</span>
      </div>
      <div className="code-window-body">
        <p className="text-muted-foreground">{"// ——— Context Provider value ———"}</p>
        <p>{"<"}AppContext.Provider value={"{"}{"{"}...</p>
        <p className="pl-4">theme: <span className={`font-bold ${theme === "dark" ? "text-primary" : theme === "light" ? "text-accent" : "text-blue-400"}`}>"{theme}"</span>,</p>
        <p className="pl-4">language: <span className="text-accent font-bold">"{language}"</span>,</p>
        <p className="pl-4">user: <span className={`font-bold ${user ? "text-green-400" : "text-destructive"}`}>{user ? `{ name: "${user.name}", role: "${user.role}" }` : "null"}</span>,</p>
        <p>{"}"}{"}"}&gt;</p>
        <p className="mt-2 text-muted-foreground">{"// ——— Consumers (all auto-update!) ———"}</p>
        <p>{"<"}<span className="text-primary">Navbar</span> /&gt; → reads: theme, language, user</p>
        <p>{"<"}<span className="text-secondary">Content</span> /&gt; → reads: ALL + controls</p>
        <p>{"<"}<span className="text-accent">Footer</span> /&gt; → reads: theme, language, user</p>
        <p className="mt-2 text-muted-foreground">{"// ⚡ No props passed! No prop drilling!"}</p>
        <p className="text-muted-foreground">{"// All 3 components read from the SAME context"}</p>
      </div>
    </div>
  );
}

function FullDemo() {
  return (
    <div className="demo-container">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500/15 to-secondary/10 px-3 py-1 text-xs font-semibold text-pink-400 border border-pink-500/20">
          🌐 Demo 1
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
          <ContextCodeWindow />
        </div>
      </AppProvider>

      <div className="mt-5 space-y-2">
        <div className="rounded-xl border border-destructive/20 p-4" style={{ background: "linear-gradient(135deg, hsl(0 84% 60% / 0.05), transparent)" }}>
          <p className="text-xs font-bold text-destructive mb-1">❌ Without Context (Prop Drilling):</p>
          <p className="font-mono text-xs text-muted-foreground">{"<App theme lang user>"} → {"<Layout theme lang user>"} → {"<Page theme lang user>"} → {"<Navbar theme lang user>"}</p>
        </div>
        <div className="rounded-xl border border-green-500/20 p-4" style={{ background: "linear-gradient(135deg, hsl(140 70% 50% / 0.05), transparent)" }}>
          <p className="text-xs font-bold text-green-400 mb-1">✅ With Context:</p>
          <p className="font-mono text-xs text-muted-foreground">{"<Provider>"} → any child calls <span className="text-primary">useContext()</span> directly ✓</p>
        </div>
      </div>

      <div className="tip-box mt-4">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Key Insight:</strong> "Three components (Navbar, Content, Footer) all read from the same Context. When Content changes the theme or language, Navbar and Footer update instantly — no props are passed between siblings!"
        </p>
      </div>
    </div>
  );
}

// ===== DEMO 2: Notification System =====
interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface NotifContextType {
  notifications: Notification[];
  addNotification: (msg: string, type: Notification["type"]) => void;
  clearAll: () => void;
}

const NotifContext = createContext<NotifContextType>({} as NotifContextType);

function NotifProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: Notification["type"]) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const clearAll = () => setNotifications([]);

  return (
    <NotifContext.Provider value={{ notifications, addNotification, clearAll }}>
      {children}
    </NotifContext.Provider>
  );
}

const notifStyles: Record<Notification["type"], { icon: string; border: string; bg: string; text: string }> = {
  success: { icon: "✅", border: "border-green-500/30", bg: "linear-gradient(135deg, hsl(140 70% 50% / 0.1), hsl(140 70% 50% / 0.03))", text: "text-green-400" },
  error: { icon: "❌", border: "border-destructive/30", bg: "linear-gradient(135deg, hsl(0 84% 60% / 0.1), hsl(0 84% 60% / 0.03))", text: "text-destructive" },
  info: { icon: "ℹ️", border: "border-primary/30", bg: "linear-gradient(135deg, hsl(193 92% 55% / 0.1), hsl(193 92% 55% / 0.03))", text: "text-primary" },
  warning: { icon: "⚠️", border: "border-accent/30", bg: "linear-gradient(135deg, hsl(51 97% 55% / 0.1), hsl(51 97% 55% / 0.03))", text: "text-accent" },
};

function NotifDisplay() {
  const { notifications } = useContext(NotifContext);
  if (notifications.length === 0) return null;
  return (
    <div className="space-y-2">
      {notifications.map((n) => {
        const s = notifStyles[n.type];
        return (
          <div key={n.id} className={`rounded-xl border ${s.border} px-4 py-3 flex items-center gap-3 transition-all duration-300 animate-in slide-in-from-right`} style={{ background: s.bg }}>
            <span className="text-lg">{s.icon}</span>
            <p className={`text-sm font-semibold ${s.text}`}>{n.message}</p>
            <span className="ml-auto text-[10px] text-muted-foreground/50">auto-dismiss 4s</span>
          </div>
        );
      })}
    </div>
  );
}

function NotifActions() {
  const { addNotification, clearAll, notifications } = useContext(NotifContext);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => addNotification("Order placed successfully!", "success")}
          className="rounded-xl border border-green-500/30 px-4 py-3 text-sm font-semibold text-green-400 transition-all hover:bg-green-500/10"
          style={{ background: "linear-gradient(135deg, hsl(140 70% 50% / 0.05), transparent)" }}
        >
          ✅ Success Toast
        </button>
        <button
          onClick={() => addNotification("Payment failed! Try again.", "error")}
          className="rounded-xl border border-destructive/30 px-4 py-3 text-sm font-semibold text-destructive transition-all hover:bg-destructive/10"
          style={{ background: "linear-gradient(135deg, hsl(0 84% 60% / 0.05), transparent)" }}
        >
          ❌ Error Toast
        </button>
        <button
          onClick={() => addNotification("New update available!", "info")}
          className="rounded-xl border border-primary/30 px-4 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
          style={{ background: "linear-gradient(135deg, hsl(193 92% 55% / 0.05), transparent)" }}
        >
          ℹ️ Info Toast
        </button>
        <button
          onClick={() => addNotification("Storage almost full!", "warning")}
          className="rounded-xl border border-accent/30 px-4 py-3 text-sm font-semibold text-accent transition-all hover:bg-accent/10"
          style={{ background: "linear-gradient(135deg, hsl(51 97% 55% / 0.05), transparent)" }}
        >
          ⚠️ Warning Toast
        </button>
      </div>
      {notifications.length > 0 && (
        <button onClick={clearAll} className="w-full rounded-xl border border-border px-4 py-2 text-xs text-muted-foreground hover:bg-muted/20 transition-colors">
          Clear All ({notifications.length})
        </button>
      )}
    </div>
  );
}

function NotifCodeWindow() {
  const { notifications } = useContext(NotifContext);
  return (
    <div className="code-window mt-4">
      <div className="code-window-header">
        <div className="code-window-dots">
          <span className="bg-destructive/60" />
          <span className="bg-accent/60" />
          <span className="bg-green-500/60" />
        </div>
        <span className="font-mono text-xs text-muted-foreground ml-2">🔴 Live — Click buttons to see notifications in context!</span>
      </div>
      <div className="code-window-body">
        <p className="text-muted-foreground">{"// ——— NotifContext state ———"}</p>
        <p><span className="text-secondary">const</span> {"{"} notifications {"}"} = <span className="text-primary">useContext</span>(NotifContext);</p>
        <p className="mt-2">notifications = [</p>
        {notifications.length === 0 && <p className="pl-4 text-muted-foreground/50">{"// empty — click a button to add!"}</p>}
        {notifications.map((n, i) => (
          <p key={n.id} className="pl-4">
            {"{"} id: <span className="text-muted-foreground">{n.id}</span>, type: <span className={notifStyles[n.type].text}>"{n.type}"</span>, msg: <span className="text-accent">"{n.message.slice(0, 30)}"</span> {"}"}{i < notifications.length - 1 ? "," : ""}
          </p>
        ))}
        <p>];</p>
        <p className="mt-2 text-muted-foreground">{"// ——— How it works ———"}</p>
        <p>notifications.<span className="text-accent">length</span> = <span className="text-primary font-bold">{notifications.length}</span></p>
        <p className="text-muted-foreground">{"// addNotification() → updates context → "}</p>
        <p className="text-muted-foreground">{"// NotifDisplay re-renders automatically!"}</p>
        <p className="text-muted-foreground">{"// setTimeout(4s) → auto-removes from array"}</p>
      </div>
    </div>
  );
}

function NotificationDemo() {
  return (
    <div className="demo-container">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-500/15 to-primary/10 px-3 py-1 text-xs font-semibold text-green-400 border border-green-500/20">
          🔔 Demo 2
        </span>
      </div>
      <h3 className="mb-1 font-display text-xl font-semibold">Notification / Toast System</h3>
      <p className="mb-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Toast notifications in apps — any component can trigger, one component displays
      </p>

      <NotifProvider>
        <div className="space-y-4">
          <NotifDisplay />
          <NotifActions />
          <NotifCodeWindow />
        </div>
      </NotifProvider>

      <div className="tip-box mt-4">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Why Context?</strong> "The action buttons and the notification display are separate components — they don't share any parent props. Context lets the buttons <em>write</em> notifications and the display <em>read</em> them, without any prop drilling. This is exactly how real toast libraries work!"
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
    <NotificationDemo />
  </HookLayout>
);

export default UseContextPage;
