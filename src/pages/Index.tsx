import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="animate-float mb-4 text-8xl">⚛️</div>
      <h1 className="mb-4 text-center font-display text-5xl font-bold md:text-7xl">
        React <span className="text-primary">Hooks</span>
      </h1>
      <p className="mb-10 max-w-md text-center font-body text-lg text-muted-foreground">
        Master the 4 essential React Hooks with interactive live demos
      </p>
      <button
        onClick={() => navigate("/hooks")}
        className="glow-button animate-pulse-glow"
      >
        ⚡ Tap Here to Learn
      </button>
      <p className="mt-6 font-mono text-xs text-muted-foreground">
        useState • useEffect • useRef • useContext
      </p>
    </div>
  );
};

export default Index;
