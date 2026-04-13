import { useState } from "react";
import TrackpointLight from "./assets/TrackpointLight.svg";

export default function App() {
  const [message, setMessage] = useState("");

  return (
    <main className="page-shell">
      <header className="page-header">
        <img src={TrackpointLight} alt="Trackpoint Light" className="header-icon" />
        <h1>
          <code>const title = 'FDM Expense App';</code>
        </h1>
      </header>
    </main>
  );
}
