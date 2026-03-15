import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-secondary/8 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent/5 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 flex flex-col items-center">
        <div className="animate-float mb-6 text-8xl drop-shadow-[0_0_30px_hsl(193_92%_55%/0.3)]">⚛️</div>

        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs text-primary">Interactive Learning Platform</span>
        </div>

        <h1 className="mb-4 text-center font-display text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
          React <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Hooks</span>
        </h1>
        <p className="mb-4 max-w-lg text-center font-body text-lg text-muted-foreground leading-relaxed">
          Master the 4 essential React Hooks with interactive live demos, real-world examples, and interview-ready explanations
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {["useState", "useEffect", "useRef", "useContext"].map((hook) => (
            <span key={hook} className="rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
              {hook}
            </span>
          ))}
        </div>

        <button
          onClick={() => navigate("/hooks")}
          className="glow-button animate-pulse-glow text-lg px-10 py-4"
        >
          ⚡ Tap Here to Learn
        </button>

        <p className="mt-8 max-w-sm text-center font-body text-xs text-muted-foreground/60">
          Built for seminar presentations • Each hook includes live demos, code walkthroughs, and interview tips
        </p>
      </div>
    </div>
  );
};

export default Index;
