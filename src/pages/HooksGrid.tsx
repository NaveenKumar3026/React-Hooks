import { useNavigate } from "react-router-dom";

const hooks = [
  {
    name: "useState",
    icon: "🔄",
    description: "Store and update changing data inside components",
    path: "/hooks/usestate",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "useEffect",
    icon: "⚡",
    description: "Run side effects after rendering",
    path: "/hooks/useeffect",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    name: "useRef",
    icon: "🎯",
    description: "Access DOM elements & persist values",
    path: "/hooks/useref",
    color: "from-accent/30 to-accent/5",
  },
  {
    name: "useContext",
    icon: "🌐",
    description: "Share data across components without prop drilling",
    path: "/hooks/usecontext",
    color: "from-primary/20 to-accent/10",
  },
];

const HooksGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate("/")}
          className="mb-8 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to Home
        </button>
        <h1 className="mb-2 text-center font-display text-4xl font-bold">
          Choose a <span className="text-primary">Hook</span>
        </h1>
        <p className="mb-10 text-center text-muted-foreground">
          Click any card to explore with live demos
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {hooks.map((hook) => (
            <div
              key={hook.name}
              onClick={() => navigate(hook.path)}
              className="lightning-card group"
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${hook.color} opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className="relative z-10">
                <span className="mb-3 block text-4xl">{hook.icon}</span>
                <h2 className="mb-1 font-display text-2xl font-bold">{hook.name}</h2>
                <p className="font-body text-sm text-muted-foreground">{hook.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HooksGrid;
