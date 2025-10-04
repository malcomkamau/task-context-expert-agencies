import React from "react";

export default function StatsPanel({ history = [], clearHistory, rolling }) {
  const total = history.reduce((s, r) => s + (Number(r.value) || 0), 0);
  const count = history.length;
  const average = count ? (total / count).toFixed(2) : "-";
  const high = history.length ? Math.max(...history.map((h) => Number(h.value))) : "-";
  const low = history.length ? Math.min(...history.map((h) => Number(h.value))) : "-";

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">📊 Stats</h3>
        <div className="mt-2 text-sm text-[#4a4945] space-y-1">
          <div>Total rolls: <b>{count}</b></div>
          <div>Average: <b>{average}</b></div>
          <div>High: <b>{high}</b> · Low: <b>{low}</b></div>
          <div className="mt-2">Status: {rolling ? <span className="text-yellow-700">Rolling...</span> : <span className="text-green-700">Idle</span>}</div>
        </div>
      </div>

      <div className="mb-2 flex justify-between items-center">
        <h4 className="text-md font-semibold">📝 History</h4>
        <button onClick={clearHistory} className="text-sm px-2 py-1 rounded-md" style={{ background: "#302f2c", color: "#efede3" }}>Clear</button>
      </div>

      <div className="max-h-80 overflow-auto custom-scrollbar">
        <ul className="space-y-2">
          {history.length === 0 && <li className="text-sm text-[#4a4945]">No rolls yet — give it a toss.</li>}
          {history.map((h) => (
            <li key={h.id} className="p-2 bg-[#fffaf0] rounded-md border border-[#efe8db]">
              <div className="flex justify-between">
                <div><b>d{h.sides}</b> → <span className="text-xl">{h.value}</span></div>
                <div className="text-xs text-[#4a4945]">{new Date(h.displayTs || h.ts).toLocaleTimeString()}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
