import React, { useState } from "react";

// Top rules from the project's Apriori output (mock survey selections).
const RULES = [
 {
  "Rule_Type": "Category bundle",
  "Antecedent": "Fresh_Produce_Meat + Groceries_Staples",
  "Consequent": "Baby_Kids",
  "support": 0.112,
  "confidence": 0.547,
  "lift": 2.723
 },
 {
  "Rule_Type": "Category bundle",
  "Antecedent": "Baby_Kids",
  "Consequent": "Fresh_Produce_Meat + Groceries_Staples",
  "support": 0.112,
  "confidence": 0.556,
  "lift": 2.723
 },
 {
  "Rule_Type": "Category bundle",
  "Antecedent": "Groceries_Staples + Household_Cleaning",
  "Consequent": "Fresh_Produce_Meat + Personal_Care",
  "support": 0.108,
  "confidence": 0.483,
  "lift": 2.697
 },
 {
  "Rule_Type": "Category bundle",
  "Antecedent": "Fresh_Produce_Meat + Personal_Care",
  "Consequent": "Groceries_Staples + Household_Cleaning",
  "support": 0.108,
  "confidence": 0.605,
  "lift": 2.697
 },
 {
  "Rule_Type": "Category bundle",
  "Antecedent": "Baby_Kids + Groceries_Staples",
  "Consequent": "Fresh_Produce_Meat",
  "support": 0.112,
  "confidence": 0.87,
  "lift": 2.643
 },
 {
  "Rule_Type": "Category bundle",
  "Antecedent": "Baby_Kids",
  "Consequent": "Fresh_Produce_Meat + Household_Cleaning",
  "support": 0.092,
  "confidence": 0.456,
  "lift": 2.536
 },
 {
  "Rule_Type": "Category bundle",
  "Antecedent": "Fresh_Produce_Meat + Household_Cleaning",
  "Consequent": "Baby_Kids",
  "support": 0.092,
  "confidence": 0.509,
  "lift": 2.536
 },
 {
  "Rule_Type": "Category bundle",
  "Antecedent": "Groceries_Staples + Personal_Care",
  "Consequent": "Fresh_Produce_Meat + Household_Cleaning",
  "support": 0.108,
  "confidence": 0.451,
  "lift": 2.508
 },
 {
  "Rule_Type": "Feature pairing",
  "Antecedent": "Building_Pooling + WhatsApp_Updates",
  "Consequent": "Consolidated_Delivery",
  "support": 0.114,
  "confidence": 0.862,
  "lift": 2.591
 },
 {
  "Rule_Type": "Feature pairing",
  "Antecedent": "Consolidated_Delivery + WhatsApp_Updates",
  "Consequent": "Building_Pooling",
  "support": 0.114,
  "confidence": 0.626,
  "lift": 2.391
 },
 {
  "Rule_Type": "Feature pairing",
  "Antecedent": "VAT_Invoice",
  "Consequent": "Supplier_Bid_Compare",
  "support": 0.113,
  "confidence": 0.814,
  "lift": 1.872
 },
 {
  "Rule_Type": "Feature pairing",
  "Antecedent": "Buyer_Approved_Price + Pay_After_Approval",
  "Consequent": "Refund_If_Campaign_Fails",
  "support": 0.142,
  "confidence": 0.891,
  "lift": 1.868
 },
 {
  "Rule_Type": "Feature pairing",
  "Antecedent": "Buyer_Approved_Price + Savings_Ledger",
  "Consequent": "Supplier_Bid_Compare",
  "support": 0.162,
  "confidence": 0.809,
  "lift": 1.86
 },
 {
  "Rule_Type": "Feature pairing",
  "Antecedent": "Building_Pooling + Consolidated_Delivery",
  "Consequent": "WhatsApp_Updates",
  "support": 0.114,
  "confidence": 0.749,
  "lift": 1.83
 },
 {
  "Rule_Type": "Feature pairing",
  "Antecedent": "Consolidated_Delivery",
  "Consequent": "Building_Pooling",
  "support": 0.152,
  "confidence": 0.459,
  "lift": 1.753
 },
 {
  "Rule_Type": "Feature pairing",
  "Antecedent": "Building_Pooling",
  "Consequent": "Consolidated_Delivery",
  "support": 0.152,
  "confidence": 0.583,
  "lift": 1.753
 }
];

const clean = (s) => s.replaceAll("_", " ");

export default function BundleTable() {
  const types = [...new Set(RULES.map((r) => r.Rule_Type))];
  const [type, setType] = useState(types[0]);
  return (
    <div className="card" style={{ marginTop: 14 }}>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
        <h2 style={{ margin: 0 }}>Best bundles (Apriori rules)</h2>
        <div className="row">
          {types.map((t) => <button key={t} className={t === type ? "on" : ""} onClick={() => setType(t)}>{t}</button>)}
        </div>
      </div>
      <div className="scroll">
        <table>
          <thead><tr><th>If a buyer wants</th><th>They also want</th><th className="n">Support</th><th className="n">Confidence</th><th className="n">Lift</th></tr></thead>
          <tbody>
            {RULES.filter((r) => r.Rule_Type === type).map((r) => (
              <tr key={r.Antecedent + r.Consequent}>
                <td>{clean(r.Antecedent)}</td><td>{clean(r.Consequent)}</td>
                <td className="n">{(r.support * 100).toFixed(1)}%</td><td className="n">{(r.confidence * 100).toFixed(0)}%</td><td className="n">{r.lift.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted">Lift above 1 means the items go together more often than chance. Rules reflect stated survey interest, not purchases.</p>
    </div>
  );
}
