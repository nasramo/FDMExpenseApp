import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>
          <code>const title = 'FDM Expense App';</code>
        </h1>
        <p>Build your site with React, CSS, and custom SVG icons.</p>
      </header>

      <section className="content">
        <p>
          This page is ready for your custom SVG icons in <code>src/assets/icons/</code>.
        </p>
        <button onClick={() => setMessage("Your custom SVG icons can go in src/assets/icons/.")}>Show message</button>
        <div className="message">{message}</div>
      </section>
    </main>
  );
}
