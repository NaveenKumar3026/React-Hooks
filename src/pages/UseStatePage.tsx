import { useState } from "react";
import HookLayout from "@/components/HookLayout";

function PasswordDemo() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 1: Show/Hide Password</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong>Real World:</strong> Login & Signup Forms
      </p>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className="mb-3 w-full rounded-lg border border-input bg-background px-4 py-2.5 font-body text-foreground outline-none focus:ring-2 focus:ring-primary/40"
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        className="glow-button mb-4 w-full text-base"
      >
        {showPassword ? "🙈 Hide Password" : "👁️ Show Password"}
      </button>
      <div className="space-y-1 rounded-lg bg-muted p-3 font-mono text-xs">
        <p>password = <span className="text-primary">"{password}"</span></p>
        <p>showPassword = <span className="text-primary">{String(showPassword)}</span></p>
      </div>
      <p className="mt-3 text-xs italic text-muted-foreground">
        🎤 "useState stores the password and visibility state. Clicking toggles the input type between password and text."
      </p>
    </div>
  );
}

function LikeDemo() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(120);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 2: Like Button</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong>Real World:</strong> Social Media / Posts / Reels
      </p>
      <button
        onClick={handleLike}
        className={`mb-4 w-full rounded-xl px-6 py-3 font-display text-lg font-semibold transition-all duration-300 ${
          liked
            ? "bg-pink-500 text-card shadow-lg shadow-pink-500/30"
            : "border-2 border-border bg-card text-foreground hover:border-pink-400"
        }`}
      >
        {liked ? "💖 Liked" : "🤍 Like"}
      </button>
      <div className="space-y-1 rounded-lg bg-muted p-3 font-mono text-xs">
        <p>liked = <span className="text-primary">{String(liked)}</span></p>
        <p>likes = <span className="text-primary">{likes}</span></p>
      </div>
    </div>
  );
}

const UseStatePage = () => (
  <HookLayout
    title="useState"
    icon="🔄"
    whatIsIt="useState lets you store and update changing data inside a component. When state changes, React re-renders the component."
    realLifeUses={[
      "Password visibility toggle",
      "Like / unlike buttons",
      "Modal open / close",
      "Tab switching",
      "Cart quantity management",
    ]}
    syntax={`const [value, setValue] = useState(initialValue);

// Update state:
setValue(newValue);

// Update based on previous:
setValue(prev => prev + 1);`}
  >
    <PasswordDemo />
    <LikeDemo />
  </HookLayout>
);

export default UseStatePage;
