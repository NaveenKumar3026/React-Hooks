import { createContext, useContext, useState } from "react";
import HookLayout from "@/components/HookLayout";

// Context
const LanguageContext = createContext<{
  language: string;
  toggleLanguage: () => void;
}>({ language: "english", toggleLanguage: () => {} });

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("english");
  const toggleLanguage = () => setLanguage((p) => (p === "english" ? "tamil" : "english"));
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

function DemoNavbar() {
  const { language } = useContext(LanguageContext);
  return (
    <div className="rounded-lg border border-border bg-muted/50 px-4 py-3">
      <p className="font-display text-sm font-semibold">
        🧭 Navbar: {language === "english" ? "Welcome to My Website" : "என் இணையதளத்திற்கு வரவேற்கிறோம்"}
      </p>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        {"const { language } = useContext(LanguageContext)"}
      </p>
    </div>
  );
}

function DemoContent() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  return (
    <div className="rounded-lg border border-border bg-muted/50 px-4 py-3">
      <p className="mb-2 font-body text-sm">
        {language === "english"
          ? "This website is currently in English."
          : "இந்த இணையதளம் தற்போது தமிழில் உள்ளது."}
      </p>
      <button onClick={toggleLanguage} className="glow-button w-full text-base">
        🌐 Switch to {language === "english" ? "Tamil" : "English"}
      </button>
      <p className="mt-2 font-mono text-xs text-muted-foreground">
        {"const { language, toggleLanguage } = useContext(LanguageContext)"}
      </p>
    </div>
  );
}

function DemoFooter() {
  const { language } = useContext(LanguageContext);
  return (
    <div className="rounded-lg border border-border bg-muted/50 px-4 py-3">
      <p className="font-display text-sm font-semibold">
        📝 Footer: {language === "english" ? "© 2025 My Website" : "© 2025 என் இணையதளம்"}
      </p>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        {"const { language } = useContext(LanguageContext)"}
      </p>
    </div>
  );
}

function LanguageDemo() {
  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo: Language Switcher</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong>Real World:</strong> Multi-language websites
      </p>
      <LanguageProvider>
        <div className="space-y-3">
          <p className="text-center font-mono text-xs text-primary">{"<LanguageProvider>"}</p>
          <DemoNavbar />
          <DemoContent />
          <DemoFooter />
          <p className="text-center font-mono text-xs text-primary">{"</LanguageProvider>"}</p>
        </div>
      </LanguageProvider>
      <div className="mt-4 rounded-lg bg-muted p-3 font-mono text-xs">
        <p className="text-muted-foreground">💡 All 3 components share the same language state — <strong>no prop drilling!</strong></p>
      </div>
      <p className="mt-3 text-xs italic text-muted-foreground">
        🎤 "useContext provides data to any nested component. The Navbar, Content, and Footer all access language without passing props."
      </p>
    </div>
  );
}

const UseContextPage = () => (
  <HookLayout
    title="useContext"
    icon="🌐"
    whatIsIt="useContext lets you share data across multiple components without prop drilling — like a global state that any child can access."
    realLifeUses={[
      "Theme (dark/light mode)",
      "Logged-in user information",
      "Language / i18n settings",
      "Shopping cart state",
      "App-wide configuration",
    ]}
    syntax={`// 1. Create context
const MyContext = createContext(defaultValue);

// 2. Provide value
<MyContext.Provider value={data}>
  <ChildComponent />
</MyContext.Provider>

// 3. Consume in any child
const data = useContext(MyContext);`}
  >
    <LanguageDemo />
  </HookLayout>
);

export default UseContextPage;
