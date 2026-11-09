import React from "react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const aed = (v) => `AED ${Math.round(v).toLocaleString()}`;
const short = (v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v);
const grid = <CartesianGrid stroke="#eeece5" vertical={false} />;

function HBar({ title, data, color }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={Math.max(220, data.length * 30)}>
        <BarChart data={data} layout="vertical" margin={{ left: 30, right: 16 }}>
          <XAxis type="number" tickFormatter={short} tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12 }} interval={0} />
          <Tooltip formatter={(v) => aed(v)} />
          <Bar dataKey="value" name="GMV" fill={color} radius={[0, 4, 4, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ChartSection({ monthly, byCategory, bySegment }) {
  return (
    <div className="charts">
      <div className="card" style={{ gridColumn: "1 / -1" }}>
        <h2>Monthly GMV (AED)</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthly} margin={{ right: 16 }}>
            {grid}
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={short} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => aed(v)} />
            <Line dataKey="value" name="GMV" stroke="#2a78d6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <HBar title="GMV by category (AED)" data={byCategory} color="#2a78d6" />
      <HBar title="GMV by buyer segment (AED)" data={bySegment} color="#1baf7a" />
    </div>
  );
}
