import React, { useState } from "react";

const aed = (v) => `AED ${Math.round(v).toLocaleString()}`;

export default function PitchDeck({ stats }) {
  const slides = [
    ["GroupBuy: collective demand, better deals", ["Buyers register demand first.", "Suppliers bid against the pooled quantity.", "Buyers approve the final delivered price before paying."]],
    ["The problem", ["Individual buyers lack negotiating volume.", "Equivalent offers are hard to compare.", "Discounts can vanish after delivery charges and fees."]],
    ["Business model", ["Assumed 7% supplier commission on fulfilled orders.", "Assumed 2% variable cost, leaving 5% contribution.", "AED 15,000 monthly fixed cost means about AED 300,000 monthly GMV to break even."]],
    ["Simulated Year 1", [`${aed(stats.gmv)} GMV and ${aed(stats.commission)} commission.`, `${stats.success} of campaigns completed; ${stats.conversion} of commitments paid.`, `Result after fixed costs: ${aed(stats.afterFixed)}.`, "Synthetic data: this shows the method, not real demand."]],
    ["What the analytics found", ["Bulk Value Seekers have the highest high-intent share (59%).", "Lead scoring finds 83% of high-intent leads at 57% precision.", "Baby and groceries interest strongly goes with fresh produce (lift 2.64).", "Eligible spend is the main driver of order value (R² 0.71)."]],
    ["Recommendations", ["Launch with Bulk Value Seekers in staples and household goods.", "Run SME buyers as a separate, high-value track.", "Lead with the refund-if-campaign-fails guarantee.", "Validate everything with paid pilots before scaling."]],
  ];
  const [i, setI] = useState(0);
  const [title, points] = slides[i];
  return (
    <div className="card slide">
      <h2>{title}</h2>
      <ul style={{ flex: 1 }}>{points.map((p) => <li key={p}>{p}</li>)}</ul>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <button disabled={i === 0} onClick={() => setI(i - 1)}>Previous</button>
        <span className="muted">{i + 1} / {slides.length}</span>
        <button disabled={i === slides.length - 1} onClick={() => setI(i + 1)}>Next</button>
      </div>
    </div>
  );
}
