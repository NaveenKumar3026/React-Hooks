import { useState } from "react";
import HookLayout from "@/components/HookLayout";

function PasswordDemo() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getStrength = (p: string) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strength = getStrength(password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const strengthColors = ["bg-destructive", "bg-orange-500", "bg-accent", "bg-green-400", "bg-green-500"];

  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 1: Password with Strength Meter</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Login & Signup Forms — password validation
      </p>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password..."
        className="mb-3 w-full rounded-xl border border-input bg-muted/30 px-4 py-3 font-body text-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
      />

      {/* Strength meter */}
      {password && (
        <div className="mb-4 space-y-2">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < strength ? strengthColors[strength] : "bg-muted"}`} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Strength: <span className="font-semibold text-foreground">{strengthLabels[strength]}</span>
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`rounded-full px-2 py-0.5 border ${password.length >= 8 ? "border-green-500/30 text-green-400" : "border-border text-muted-foreground"}`}>8+ chars {password.length >= 8 ? "✓" : "✗"}</span>
            <span className={`rounded-full px-2 py-0.5 border ${/[A-Z]/.test(password) ? "border-green-500/30 text-green-400" : "border-border text-muted-foreground"}`}>Uppercase {/[A-Z]/.test(password) ? "✓" : "✗"}</span>
            <span className={`rounded-full px-2 py-0.5 border ${/[0-9]/.test(password) ? "border-green-500/30 text-green-400" : "border-border text-muted-foreground"}`}>Number {/[0-9]/.test(password) ? "✓" : "✗"}</span>
            <span className={`rounded-full px-2 py-0.5 border ${/[^A-Za-z0-9]/.test(password) ? "border-green-500/30 text-green-400" : "border-border text-muted-foreground"}`}>Symbol {/[^A-Za-z0-9]/.test(password) ? "✓" : "✗"}</span>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowPassword(!showPassword)}
        className="glow-button mb-4 w-full"
      >
        {showPassword ? "🙈 Hide Password" : "👁️ Show Password"}
      </button>

      <div className="space-y-1 rounded-xl bg-muted/30 border border-border p-4 font-mono text-xs">
        <p className="text-muted-foreground">// State values in real-time:</p>
        <p>password = <span className="text-primary">"{password}"</span></p>
        <p>showPassword = <span className="text-primary">{String(showPassword)}</span></p>
        <p>strength = <span className="text-accent">{strength}/4</span></p>
      </div>

      <div className="tip-box mt-3">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Seminar Explanation:</strong> "useState stores the password string, visibility boolean, and the strength is <em>derived</em> from state (computed on each render). When you type, setPassword triggers a re-render, and the strength meter updates automatically."
        </p>
      </div>
    </div>
  );
}

function ShoppingCartDemo() {
  const [cart, setCart] = useState<{ name: string; price: number; qty: number }[]>([]);

  const products = [
    { name: "🍕 Pizza", price: 12.99 },
    { name: "🍔 Burger", price: 8.99 },
    { name: "🌮 Taco", price: 6.99 },
    { name: "🍩 Donut", price: 3.99 },
  ];

  const addToCart = (product: { name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.name === name);
      if (item && item.qty > 1) {
        return prev.map((i) => (i.name === name ? { ...i, qty: i.qty - 1 } : i));
      }
      return prev.filter((i) => i.name !== name);
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="demo-container">
      <h3 className="mb-1 font-display text-xl font-semibold">✅ Demo 2: Shopping Cart</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> E-commerce — managing complex array state
      </p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {products.map((p) => (
          <button
            key={p.name}
            onClick={() => addToCart(p)}
            className="rounded-xl border border-border bg-muted/30 p-3 text-left transition-all hover:border-primary/40 hover:bg-primary/5"
          >
            <span className="text-lg">{p.name}</span>
            <p className="font-mono text-xs text-primary">${p.price}</p>
          </button>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mb-4 space-y-2 rounded-xl border border-border bg-muted/20 p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">🛒 Cart ({totalItems} items)</p>
          {cart.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <span>{item.name} × {item.qty}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-primary">${(item.price * item.qty).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.name)} className="rounded-md border border-destructive/30 px-2 py-0.5 text-xs text-destructive hover:bg-destructive/10">−</button>
              </div>
            </div>
          ))}
          <div className="border-t border-border pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span className="font-mono text-accent">${total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="space-y-1 rounded-xl bg-muted/30 border border-border p-4 font-mono text-xs">
        <p className="text-muted-foreground">// Complex state (array of objects):</p>
        <p>cart.length = <span className="text-primary">{cart.length}</span></p>
        <p>totalItems = <span className="text-primary">{totalItems}</span></p>
        <p>total = <span className="text-accent">${total.toFixed(2)}</span></p>
      </div>

      <div className="tip-box mt-3">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Key Concept:</strong> "useState can hold arrays and objects too! We use the functional updater <code className="rounded bg-muted px-1 font-mono text-primary">setState(prev =&gt; ...)</code> to safely update based on previous state. The spread operator <code className="rounded bg-muted px-1 font-mono text-primary">[...prev, newItem]</code> ensures immutability."
        </p>
      </div>
    </div>
  );
}

const UseStatePage = () => (
  <HookLayout
    title="useState"
    icon="🔄"
    whatIsIt="useState is the most fundamental React Hook. It lets you add state variables to functional components. When state changes, React re-renders the component to reflect the new data. Think of it as a 'memory' for your component."
    howItWorks="When you call useState(initialValue), React creates a slot in memory for that value. It returns a pair: the current value and a setter function. When you call the setter, React schedules a re-render and the component function runs again with the new value. State is preserved between renders — it doesn't reset when the function re-runs."
    realLifeUses={[
      "Password visibility toggle in login forms",
      "Like / unlike buttons on social media",
      "Shopping cart quantity management",
      "Modal open / close state",
      "Tab switching & navigation",
      "Form input values & validation",
      "Toggle dark/light mode",
      "Accordion expand/collapse",
    ]}
    syntax={`// Basic usage:
const [value, setValue] = useState(initialValue);

// With different types:
const [count, setCount] = useState(0);           // number
const [name, setName] = useState("");             // string
const [isOpen, setIsOpen] = useState(false);      // boolean
const [items, setItems] = useState([]);           // array
const [user, setUser] = useState({ name: "" });   // object

// Update state:
setValue(newValue);              // direct update
setValue(prev => prev + 1);     // functional update (safer)

// Lazy initialization (expensive computation):
const [data, setData] = useState(() => {
  return expensiveComputation();
});`}
    rules={[
      "Only call useState at the top level of your component — never inside loops, conditions, or nested functions",
      "State updates are asynchronous — you can't read the new value immediately after setting it",
      "When updating objects/arrays, always create a new reference (spread operator) — never mutate directly",
      "Use functional updates (prev => ...) when the new value depends on the previous value",
      "Initial value is only used on the first render — changing it later has no effect",
    ]}
    commonMistakes={[
      {
        wrong: `// Mutating state directly
const [items, setItems] = useState([1, 2]);
items.push(3); // ❌ Direct mutation!
setItems(items);`,
        right: `// Creating new array
const [items, setItems] = useState([1, 2]);
setItems([...items, 3]); // ✅ New reference`,
        why: "React uses reference equality to detect changes. Mutating the same array doesn't trigger a re-render because the reference hasn't changed.",
      },
      {
        wrong: `// Reading state right after setting
setCount(count + 1);
console.log(count); // Still old value!`,
        right: `// Use functional update + useEffect
setCount(prev => prev + 1);
// Use useEffect to react to changes`,
        why: "State updates are batched and asynchronous. The variable still holds the old value until the next render.",
      },
    ]}
    interviewQuestions={[
      { q: "What is useState and why do we need it?", a: "useState is a Hook that lets functional components have state. Without it, functional components would be stateless and couldn't track changing data. It returns a state variable and a setter function." },
      { q: "What happens when you call setState?", a: "React schedules a re-render. The component function runs again, useState returns the new value, and React updates the DOM to match. State updates are batched for performance." },
      { q: "Why use functional updates (prev => ...)?", a: "When the new state depends on the previous state (like incrementing a counter), functional updates ensure you're working with the latest value, especially important when multiple updates happen in the same render cycle." },
      { q: "Can you use useState with objects?", a: "Yes, but you must spread the previous state when updating: setState(prev => ({...prev, key: newValue})). Never mutate the object directly — always create a new reference." },
      { q: "What is lazy initialization in useState?", a: "Passing a function to useState: useState(() => compute()). The function only runs on the first render, which is useful for expensive computations like reading from localStorage." },
    ]}
  >
    <PasswordDemo />
    <ShoppingCartDemo />
  </HookLayout>
);

export default UseStatePage;
