import React from "react";

export default function StatCard({ label, value, note }) {
  return (
    <div className="card">
      <div className="muted">{label}</div>
      <div style={{ fontSize: 25, fontWeight: 650, marginTop: 4 }}>{value}</div>
      {note && <div className="muted" style={{ marginTop: 4 }}>{note}</div>}
    </div>
  );
}
