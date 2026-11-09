import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import csv from "./groupbuy_synthetic_sales_data.csv?raw";
import StatCard from "./StatCard.jsx";
import ChartSection from "./ChartSection.jsx";
import BundleTable from "./BundleTable.jsx";
import PitchDeck from "./PitchDeck.jsx";

const NUM = ["Quantity", "Committed_Value_AED", "Net_Discount_Pct", "Paid", "GMV_AED", "Savings_AED", "Commission_AED", "Variable_Cost_AED", "Dispute"];
const [head, ...lines] = csv.trim().split(/\r?\n/);
const keys = head.split(",");
const DATA = lines.map((l) => {
  const row = Object.fromEntries(l.split(",").map((v, i) => [keys[i], v]));
  NUM.forEach((k) => (row[k] = Number(row[k])));
  return row;
});

const sum = (a, k) => a.reduce((t, r) => t + r[k], 0);
const aed = (v) => (Math.abs(v) >= 1e6 ? `AED ${(v / 1e6).toFixed(2)}M` : `AED ${Math.round(v).toLocaleString()}`);
const pct = (v) => `${Math.round(v * 100)}%`;
const label = (s) => s.replaceAll("_", " ");
const unique = (k) => [...new Set(DATA.map((r) => r[k]))].sort();

function totals(rows) {
  const camps = new Map(rows.map((r) => [r.Campaign_ID, r.Campaign_Status]));
  const done = [...camps.values()].filter((s) => s === "Completed").length;
  return { gmv: sum(rows, "GMV_AED"), commission: sum(rows, "Commission_AED"), variable: sum(rows, "Variable_Cost_AED"), savings: sum(rows, "Savings_AED"), paid: sum(rows, "Paid"), success: pct(done / Math.max(camps.size, 1)), conversion: pct(sum(rows, "Paid") / Math.max(rows.length, 1)) };
}
function group(rows, key, sorted) {
  const m = {};
  rows.forEach((r) => (m[r[key]] = (m[r[key]] || 0) + r.GMV_AED));
  const out = Object.entries(m).map(([name, value]) => ({ name: label(name), value }));
  return sorted ? out.sort((a, b) => b.value - a.value) : out.sort((a, b) => a.name.localeCompare(b.name));
}

function App() {
  const [view, setView] = useState("Dashboard");
  const [cat, setCat] = useState("All");
  const [seg, setSeg] = useState("All");
  const rows = useMemo(() => DATA.filter((r) => (cat === "All" || r.Category === cat) && (seg === "All" || r.Segment === seg)), [cat, seg]);
  const t = totals(rows);
  const all = totals(DATA);
  const deck = { ...all, afterFixed: all.commission - all.variable - 15000 * 12 };
  return (
    <div className="wrap">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div><h1>GroupBuy Analytics</h1><div className="muted">Collective demand. Better deals.</div></div>
        <div className="row">{["Dashboard", "Pitch deck"].map((v) => <button key={v} className={v === view ? "on" : ""} onClick={() => setView(v)}>{v}</button>)}</div>
      </div>
      <div className="note">All figures are synthetic (simulated Jan to Dec 2027), built from a mock survey and the deck's assumptions. They are not real sales.</div>
      {view === "Pitch deck" ? <PitchDeck stats={deck} /> : (
        <>
          <div className="row">
            <select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)}><option value="All">All categories</option>{unique("Category").map((c) => <option key={c} value={c}>{label(c)}</option>)}</select>
            <select aria-label="Segment" value={seg} onChange={(e) => setSeg(e.target.value)}><option value="All">All segments</option>{unique("Segment").map((c) => <option key={c} value={c}>{c}</option>)}</select>
          </div>
          <div className="grid">
            <StatCard label="GMV" value={aed(t.gmv)} />
            <StatCard label="Commission (7%)" value={aed(t.commission)} />
            <StatCard label="Contribution" value={aed(t.commission - t.variable)} note="Before fixed costs" />
            <StatCard label="Buyer savings" value={aed(t.savings)} />
            <StatCard label="Commitment to paid" value={t.conversion} note={`${t.paid.toLocaleString()} paid orders`} />
            <StatCard label="Campaign success" value={t.success} />
          </div>
          <ChartSection monthly={group(rows, "Month")} byCategory={group(rows, "Category", true)} bySegment={group(rows, "Segment", true)} />
          <BundleTable />
        </>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
