import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "21", value: 30000 },
  { name: "25", value: 28000 },
  { name: "32", value: 35000 },
  { name: "44", value: 32000 },
  { name: "50", value: 38000 },
  { name: "56", value: 37000 },
  { name: "63", value: 47000 },
];

const GraphVisuals = () => {


    //fetch from redux using use selector later on
    
  return (
    <div className="bg-[#f9fafb] p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Product Ventory</h2>
      <p className="text-sm text-gray-500 mb-4">Overall sales target and inventory report</p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
          <YAxis tickFormatter={(val) => `$${val / 1000}k`} tick={{ fill: '#6B7280', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'white', borderRadius: '12px', fontSize: '14px' }}
            formatter={(value) => [`$${value}`, "Engagement"]}
          />
          <Line type="monotone" dataKey="value" stroke="#111827" strokeWidth={2.5} dot={{ r: 5 }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphVisuals;
