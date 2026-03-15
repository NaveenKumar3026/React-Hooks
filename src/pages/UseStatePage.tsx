import { useState } from "react";
import HookLayout from "@/components/HookLayout";

const useStateCode = `import React, { useState } from "react";

// ✅ Demo 1: Password Toggle with Strength Meter
function PasswordToggleDemo() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getStrength = (p) => {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  return (
    <div>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
      </button>
      <p>Strength: {getStrength(password)} / 4</p>
    </div>
  );
}

// ✅ Demo 2: Shopping Cart
function ShoppingCartDemo() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.name === product.name
      );
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (name) => {
    setCart((prev) => {
      const item = prev.find((i) => i.name === name);
      if (item && item.qty > 1) {
        return prev.map((i) =>
          i.name === name
            ? { ...i, qty: i.qty - 1 }
            : i
        );
      }
      return prev.filter((i) => i.name !== name);
    });
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );
}`;

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
  const strengthGlows = [
    "shadow-[0_0_15px_hsl(0_84%_60%/0.3)]",
    "shadow-[0_0_15px_hsl(30_90%_50%/0.3)]",
    "shadow-[0_0_15px_hsl(51_97%_55%/0.3)]",
    "shadow-[0_0_15px_hsl(140_70%_50%/0.3)]",
    "shadow-[0_0_20px_hsl(140_70%_50%/0.4)]",
  ];

  return (
    <div className="demo-container">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/15 to-secondary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
          🔐 Demo 1
        </span>
      </div>
      <h3 className="mb-1 font-display text-xl font-semibold">Password with Strength Meter</h3>
      <p className="mb-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> Login & Signup forms with validation feedback
      </p>

      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Try typing a strong password..."
        className="demo-input mb-4"
      />

      {password && (
        <div className="mb-5 space-y-3">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  i < strength ? `${strengthColors[strength]} ${strengthGlows[strength]}` : "bg-muted/50"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Strength: <span className="font-bold text-foreground">{strengthLabels[strength]}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "8+ chars", check: password.length >= 8 },
              { label: "Uppercase", check: /[A-Z]/.test(password) },
              { label: "Number", check: /[0-9]/.test(password) },
              { label: "Symbol", check: /[^A-Za-z0-9]/.test(password) },
            ].map((rule) => (
              <span
                key={rule.label}
                className={`rounded-full px-3 py-1 text-xs font-semibold border transition-all duration-300 ${
                  rule.check
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-border bg-muted/20 text-muted-foreground/60"
                }`}
              >
                {rule.check ? "✓" : "✗"} {rule.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <button onClick={() => setShowPassword(!showPassword)} className="glow-button mb-5 w-full">
        {showPassword ? "🙈 Hide Password" : "👁️ Show Password"}
      </button>

      {/* Live state display */}
      <div className="code-window">
        <div className="code-window-header">
          <div className="code-window-dots">
            <span className="bg-destructive/60" />
            <span className="bg-accent/60" />
            <span className="bg-green-500/60" />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">Live State Values</span>
        </div>
        <div className="code-window-body">
          <p><span className="text-secondary">const</span> [password, setPassword] = <span className="text-primary">useState</span>(<span className="text-accent">"{password}"</span>);</p>
          <p><span className="text-secondary">const</span> [showPassword, setShowPassword] = <span className="text-primary">useState</span>(<span className="text-accent">{String(showPassword)}</span>);</p>
          <p className="text-muted-foreground">// Derived value (computed, not stored):</p>
          <p><span className="text-secondary">const</span> strength = getStrength(password); <span className="text-muted-foreground">// → </span><span className="text-accent">{strength}/4</span></p>
        </div>
      </div>

      <div className="tip-box mt-4">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Seminar Point:</strong> "useState stores the password string and a visibility boolean. The strength is <em>derived</em> from state — computed on each render, not stored separately. This is a key React pattern!"
        </p>
      </div>
    </div>
  );
}

function ShoppingCartDemo() {
  const [cart, setCart] = useState<{ name: string; price: number; qty: number }[]>([]);

  const products = [
    { name: "🍕 Pizza", price: 12.99, tag: "Popular" },
    { name: "🍔 Burger", price: 8.99, tag: "Classic" },
    { name: "🌮 Taco", price: 6.99, tag: "New" },
    { name: "🍩 Donut", price: 3.99, tag: "Sweet" },
    { name: "🥗 Salad", price: 9.99, tag: "Healthy" },
    { name: "🍜 Ramen", price: 11.99, tag: "Hot" },
  ];

  const addToCart = (product: { name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) return prev.map((item) => item.name === product.name ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.name === name);
      if (item && item.qty > 1) return prev.map((i) => (i.name === name ? { ...i, qty: i.qty - 1 } : i));
      return prev.filter((i) => i.name !== name);
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="demo-container">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-secondary/15 to-primary/10 px-3 py-1 text-xs font-semibold text-secondary border border-secondary/20">
          🛒 Demo 2
        </span>
      </div>
      <h3 className="mb-1 font-display text-xl font-semibold">Shopping Cart with Complex State</h3>
      <p className="mb-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Real World:</strong> E-commerce — managing arrays of objects immutably
      </p>

      <div className="grid grid-cols-3 gap-2 mb-5">
        {products.map((p) => (
          <button
            key={p.name}
            onClick={() => addToCart(p)}
            className="relative rounded-xl border border-border p-3 text-left transition-all duration-300 hover:border-primary/40 group overflow-hidden"
            style={{ background: "linear-gradient(145deg, hsl(225 25% 10% / 0.6), hsl(225 30% 8% / 0.8))" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-2xl block mb-1">{p.name.split(" ")[0]}</span>
            <p className="relative text-xs font-semibold">{p.name.split(" ")[1]}</p>
            <div className="relative flex items-center justify-between mt-1">
              <span className="font-mono text-xs text-primary">${p.price}</span>
              <span className="text-[10px] text-muted-foreground/50">{p.tag}</span>
            </div>
          </button>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mb-5 rounded-xl border border-border overflow-hidden" style={{ background: "linear-gradient(145deg, hsl(225 25% 9% / 0.8), hsl(225 30% 7%))" }}>
          <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
            <p className="text-xs font-bold text-muted-foreground">🛒 Cart</p>
            <span className="rounded-full bg-primary/15 text-primary px-2 py-0.5 text-xs font-bold">{totalItems} items</span>
          </div>
          <div className="p-3 space-y-2">
            {cart.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm rounded-lg px-3 py-2 hover:bg-muted/20 transition-colors">
                <span>{item.name} <span className="text-muted-foreground">× {item.qty}</span></span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-primary text-sm">${(item.price * item.qty).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.name)} className="rounded-md border border-destructive/30 bg-destructive/5 px-2 py-0.5 text-xs text-destructive hover:bg-destructive/15 transition-colors">−</button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-border flex justify-between font-bold">
            <span>Total</span>
            <span className="font-mono text-lg bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">${total.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Live state */}
      <div className="code-window">
        <div className="code-window-header">
          <div className="code-window-dots">
            <span className="bg-destructive/60" />
            <span className="bg-accent/60" />
            <span className="bg-green-500/60" />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">State Inspector</span>
        </div>
        <div className="code-window-body">
          <p><span className="text-secondary">const</span> [cart, setCart] = <span className="text-primary">useState</span>([]);</p>
          <p className="text-muted-foreground">// Current state:</p>
          <p>cart.length = <span className="text-accent">{cart.length}</span></p>
          <p>totalItems = <span className="text-accent">{totalItems}</span></p>
          <p>total = <span className="text-primary">${total.toFixed(2)}</span></p>
          {cart.length > 0 && <p className="text-muted-foreground">// cart = [{cart.map(i => `{name:"${i.name}",qty:${i.qty}}`).join(", ")}]</p>}
        </div>
      </div>

      <div className="tip-box mt-4">
        <p className="text-xs text-muted-foreground">
          🎤 <strong className="text-foreground">Key Concept:</strong> "We use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-primary">setState(prev =&gt; ...)</code> for safe updates based on previous state. The spread operator <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-primary">[...prev, newItem]</code> ensures immutability — React can detect the change!"
        </p>
      </div>
    </div>
  );
}

const UseStatePage = () => (
  <HookLayout
    title="useState"
    icon="🔄"
    whatIsIt="useState is the most fundamental React Hook. It lets you add state variables to functional components — giving them 'memory'. When state changes, React automatically re-renders the component to reflect the new data. Without useState, functional components would be completely stateless and couldn't track any changing information."
    howItWorks="When you call useState(initialValue), React creates a slot in memory for that value. It returns a pair: [currentValue, setterFunction]. When you call the setter, React schedules a re-render — the component function runs again, useState returns the new value, and React updates the DOM. State is preserved between renders and doesn't reset when the function re-executes."
    realLifeUses={[
      "Password visibility toggle in login forms",
      "Like / unlike buttons on social media posts",
      "Shopping cart quantity and item management",
      "Modal, dropdown, and accordion open/close",
      "Tab switching & multi-step navigation",
      "Form input values, validation & error display",
      "Toggle dark/light mode themes",
      "Notification badge counts",
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

// Update objects (spread required!):
setUser(prev => ({ ...prev, name: "John" }));

// Lazy initialization (expensive computation):
const [data, setData] = useState(() => {
  return JSON.parse(localStorage.getItem("data"));
});`}
    rules={[
      "Only call useState at the top level — never inside loops, conditions, or nested functions",
      "State updates are asynchronous — you can't read the new value immediately after setting it",
      "When updating objects/arrays, always create a new reference (spread operator) — never mutate directly",
      "Use functional updates (prev => ...) when new value depends on the previous value",
      "Initial value is only used on the first render — changing props later won't reset state",
    ]}
    commonMistakes={[
      {
        wrong: `// ❌ Mutating state directly
const [items, setItems] = useState([1, 2]);
items.push(3);      // Direct mutation!
setItems(items);    // Same reference — no re-render!`,
        right: `// ✅ Creating new array (immutable update)
const [items, setItems] = useState([1, 2]);
setItems([...items, 3]);  // New reference → re-render!

// Or with functional update:
setItems(prev => [...prev, 3]);`,
        why: "React compares references (Object.is) to detect changes. Mutating the same array keeps the same reference, so React thinks nothing changed and skips re-rendering.",
      },
      {
        wrong: `// ❌ Reading state right after setting it
setCount(count + 1);
console.log(count);  // Still the OLD value!
setCount(count + 1); // Both use the same old count!`,
        right: `// ✅ Use functional updates for sequential updates
setCount(prev => prev + 1);
setCount(prev => prev + 1); // Now correctly +2!

// ✅ Use useEffect to react to changes
useEffect(() => {
  console.log("Count is now:", count);
}, [count]);`,
        why: "setState is batched and asynchronous. The count variable still holds the old value within the same render cycle. Functional updates always receive the latest pending value.",
      },
    ]}
    interviewQuestions={[
      { q: "What is useState and why do we need it?", a: "useState is a Hook that lets functional components have state — persistent memory across renders. It returns a [value, setter] pair. Without it, components couldn't track changing data and would be purely presentational." },
      { q: "What happens when you call setState?", a: "React schedules a re-render (batched for performance). On the next render, the component function runs again, useState returns the new value, and React diffs the virtual DOM to update only what changed in the real DOM." },
      { q: "Why use functional updates (prev => ...)?", a: "When the new state depends on the previous value (like incrementing), functional updates ensure you get the latest value — critical when multiple updates happen in the same render cycle or in async callbacks." },
      { q: "Can you use useState with objects and arrays?", a: "Yes, but you must create new references when updating. Use spread: setState(prev => ({...prev, key: val})) for objects, setState(prev => [...prev, item]) for arrays. Never mutate directly." },
      { q: "What is lazy initialization?", a: "Passing a function to useState: useState(() => compute()). The function runs only on the first render. Useful for expensive operations like parsing localStorage or computing derived initial values." },
    ]}
    codeExample={useStateCode}
  >
    <PasswordDemo />
    <ShoppingCartDemo />
  </HookLayout>
);

export default UseStatePage;
