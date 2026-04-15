import { useState } from "react";

const INITIAL_PENDING = [
  {
    id: 1,
    name: "Sarah Mitchell",
    initials: "SM",
    avatarColor: "#EAF3DE",
    avatarText: "#3B6D11",
    role: "Consultant",
    submitted: "Today, 09:14",
    amount: 187.5,
    currency: "GBP",
    category: "Travel",
    description: "Return train to Manchester client site (12 Apr)",
    hasReceipt: true,
  },
  {
    id: 2,
    name: "James Okafor",
    initials: "JO",
    avatarColor: "#FAECE7",
    avatarText: "#993C1D",
    role: "Analyst",
    submitted: "Today, 11:32",
    amount: 64.0,
    currency: "GBP",
    category: "Meals & Entertainment",
    description: "Team working lunch — 4 people, project kickoff",
    hasReceipt: true,
  },
  {
    id: 3,
    name: "Priya Sharma",
    initials: "PS",
    avatarColor: "#E6F1FB",
    avatarText: "#185FA5",
    role: "Senior Consultant",
    submitted: "Yesterday, 17:05",
    amount: 312.0,
    currency: "GBP",
    category: "Accommodation",
    description: "1 night hotel — London Marriott (client visit)",
    hasReceipt: false,
  },
];

const INITIAL_HISTORY = [
  {
    id: 101,
    name: "Tom Nguyen",
    initials: "TN",
    role: "Analyst",
    submitted: "08 Apr 2026",
    amount: 45.2,
    category: "Travel",
    description: "Taxi to client site",
    status: "approved",
    managerNote: "",
    decidedAt: "09 Apr 2026",
  },
  {
    id: 102,
    name: "Aisha Clarke",
    initials: "AC",
    role: "Consultant",
    submitted: "05 Apr 2026",
    amount: 230.0,
    category: "Software",
    description: "Annual subscription — data tool",
    status: "rejected",
    managerNote:
      "Not pre-approved by IT. Please raise through procurement.",
    decidedAt: "06 Apr 2026",
  },
];

function Avatar({ initials, bgColor, textColor }) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: bgColor || "#EEEDFE",
        color: textColor || "#534AB7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: { background: "#FAEEDA", color: "#854F0B" },
    approved: { background: "#EAF3DE", color: "#3B6D11" },
    rejected: { background: "#FCEBEB", color: "#A32D2D" },
  };
  const s = styles[status] || styles.pending;
  return (
    <span
      style={{
        ...s,
        padding: "3px 10px",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 500,
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
}

function Toast({ message, type, visible }) {
  if (!visible) return null;
  const bg = type === "approved" ? "#EAF3DE" : "#FCEBEB";
  const color = type === "approved" ? "#3B6D11" : "#A32D2D";
  const border = type === "approved" ? "#C0DD97" : "#F7C1C1";
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px 18px",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 500,
        background: bg,
        color,
        border: `0.5px solid ${border}`,
        zIndex: 99,
        whiteSpace: "nowrap",
      }}
    >
      {message}
    </div>
  );
}

function PendingCard({ expense, onDecide }) {
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");

  const handleReject = () => {
    if (!noteOpen) {
      setNoteOpen(true);
    } else {
      onDecide(expense.id, "rejected", note);
    }
  };

  return (
    <div style={cardStyle}>
      {/* Card header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Avatar
            initials={expense.initials}
            bgColor={expense.avatarColor}
            textColor={expense.avatarText}
          />
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>
              {expense.name}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary, #555)", marginTop: 1 }}>
              {expense.role} · Submitted {expense.submitted}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>
            £{expense.amount.toFixed(2)}
          </div>
          <div style={{ fontSize: 11, color: "var(--color-text-secondary, #777)" }}>{expense.currency}</div>
        </div>
      </div>

      {/* Pills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        <span style={{ ...pillStyle, background: "#E6F1FB", color: "#185FA5", border: "none" }}>
          {expense.category}
        </span>
        <span style={pillStyle}>{expense.description}</span>
        {expense.hasReceipt ? (
          <span style={{ ...pillStyle, background: "#EAF3DE", color: "#3B6D11", border: "none" }}>
            Receipt attached
          </span>
        ) : (
          <span style={{ ...pillStyle, background: "#FCEBEB", color: "#A32D2D", border: "none" }}>
            No receipt
          </span>
        )}
      </div>

      {/* Optional rejection note */}
      {noteOpen && (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Optional note to employee (e.g. reason for rejection)…"
          style={{
            width: "100%",
            fontSize: 13,
            padding: "8px 10px",
            border: "0.5px solid #ccc",
            borderRadius: 8,
            background: "var(--color-background-secondary, #f5f5f5)",
            color: "var(--color-text-primary, #111)",
            resize: "none",
            fontFamily: "inherit",
            marginBottom: 8,
          }}
        />
      )}

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: 8,
          borderTop: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
          paddingTop: 12,
          marginTop: 4,
        }}
      >
        <button
          onClick={() => onDecide(expense.id, "approved", "")}
          style={{ ...btnBase, background: "#EAF3DE", color: "#3B6D11", borderColor: "#C0DD97" }}
        >
          Approve
        </button>
        <button
          onClick={handleReject}
          style={{ ...btnBase, background: "#FCEBEB", color: "#A32D2D", borderColor: "#F7C1C1" }}
        >
          {noteOpen ? "Confirm rejection" : "Reject…"}
        </button>
      </div>
    </div>
  );
}

function HistoryCard({ entry }) {
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Avatar initials={entry.initials} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>
              {entry.name}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary, #555)", marginTop: 1 }}>
              {entry.role} · {entry.submitted}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>
            £{entry.amount.toFixed(2)}
          </div>
          <StatusBadge status={entry.status} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
        <span style={{ ...pillStyle, background: "#E6F1FB", color: "#185FA5", border: "none" }}>
          {entry.category}
        </span>
        <span style={pillStyle}>{entry.description}</span>
      </div>

      {entry.managerNote && (
        <div
          style={{
            fontSize: 12,
            color: "var(--color-text-secondary, #555)",
            padding: "8px 10px",
            background: "var(--color-background-secondary, #f5f5f5)",
            borderRadius: 8,
            marginBottom: 6,
          }}
        >
          Note: "{entry.managerNote}"
        </div>
      )}

      <div style={{ fontSize: 12, color: "var(--color-text-tertiary, #888)", marginTop: 4 }}>
        Decided {entry.decidedAt}
      </div>
    </div>
  );
}

export default function LineManagerApproval() {
  const [pending, setPending] = useState(INITIAL_PENDING);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [activeTab, setActiveTab] = useState("pending");
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

  const handleDecide = (id, status, note) => {
    const emp = pending.find((e) => e.id === id);
    if (!emp) return;

    setHistory((prev) => [
      {
        id: emp.id,
        name: emp.name,
        initials: emp.initials,
        role: emp.role,
        submitted: emp.submitted.replace("Today", today),
        amount: emp.amount,
        category: emp.category,
        description: emp.description,
        status,
        managerNote: note,
        decidedAt: today,
      },
      ...prev,
    ]);

    setPending((prev) => prev.filter((e) => e.id !== id));

    showToast(
      status === "approved"
        ? `Approved: ${emp.name}'s £${emp.amount.toFixed(2)} claim`
        : `Rejected: ${emp.name}'s claim${note ? " — note sent" : ""}`,
      status
    );
  };

  const approvedTotal = history
    .filter((h) => h.status === "approved")
    .reduce((s, h) => s + h.amount, 0);

  const rejectedCount = history.filter((h) => h.status === "rejected").length;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.5rem 0", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text-primary, #111)", margin: 0 }}>
            Expense approvals
          </h2>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary, #555)", marginTop: 2 }}>
            FDM Group — line manager portal
          </p>
        </div>
        <StatusBadge status="pending" />
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: "1.5rem" }}>
        {[
          { label: "Pending", value: pending.length, sub: "awaiting review" },
          { label: "Approved this month", value: `£${approvedTotal.toFixed(0)}`, sub: `${history.filter(h => h.status === "approved").length} claims` },
          { label: "Rejected this month", value: rejectedCount, sub: "claims rejected" },
        ].map((s) => (
          <div key={s.label} style={{ background: "var(--color-background-secondary, #f5f5f5)", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary, #666)", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-tertiary, #999)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, borderBottom: "0.5px solid var(--color-border-tertiary, #e5e5e5)", marginBottom: "1.25rem" }}>
        {["pending", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 14px",
              fontSize: 13,
              cursor: "pointer",
              border: "none",
              background: "none",
              color: activeTab === tab ? "var(--color-text-primary, #111)" : "var(--color-text-secondary, #777)",
              borderBottom: activeTab === tab ? "2px solid var(--color-text-primary, #111)" : "2px solid transparent",
              fontWeight: activeTab === tab ? 500 : 400,
              marginBottom: -1,
              fontFamily: "inherit",
            }}
          >
            {tab === "pending" ? `Pending (${pending.length})` : "History"}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "pending" && (
        <div>
          {pending.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--color-text-tertiary, #999)", fontSize: 14 }}>
              All caught up — no pending expense requests.
            </div>
          ) : (
            pending.map((e) => (
              <PendingCard key={e.id} expense={e} onDecide={handleDecide} />
            ))
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div>
          {history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--color-text-tertiary, #999)", fontSize: 14 }}>
              No past decisions yet.
            </div>
          ) : (
            history.map((e) => <HistoryCard key={e.id} entry={e} />)
          )}
        </div>
      )}

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}

/* Shared style objects */
const cardStyle = {
  background: "var(--color-background-primary, #fff)",
  border: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
  borderRadius: 12,
  padding: "1rem 1.25rem",
  marginBottom: 10,
};

const pillStyle = {
  fontSize: 11,
  padding: "3px 9px",
  borderRadius: 99,
  border: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
  color: "var(--color-text-secondary, #666)",
  background: "var(--color-background-secondary, #f5f5f5)",
};

const btnBase = {
  padding: "7px 16px",
  fontSize: 13,
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 500,
  border: "0.5px solid",
  flex: 1,
  fontFamily: "inherit",
};
