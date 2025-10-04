import React, { useState } from "react";
import { motion } from "framer-motion";

export default function DiceRoller() {
  const [results, setResults] = useState([]);
  const [rolling, setRolling] = useState(false);

  const rollDice = (sides) => {
    setRolling(true);
    setTimeout(() => {
      const value = Math.floor(Math.random() * sides) + 1;
      const timestamp = new Date().toLocaleTimeString();
      setResults((prev) => [{ sides, value, timestamp }, ...prev]);
      setRolling(false);
    }, 1000); // animation duration
  };

  const total = results.reduce((sum, r) => sum + r.value, 0);
  const average = results.length > 0 ? (total / results.length).toFixed(2) : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#efede3] text-[#302f2c] p-6">
      <h1 className="text-4xl font-extrabold mb-6">Dice Roller</h1>

      {/* Dice Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {[4, 6, 8, 10, 12, 20, 100].map((sides) => (
          <button
            key={sides}
            onClick={() => rollDice(sides)}
            disabled={rolling}
            className={`px-5 py-3 rounded-xl font-semibold shadow-lg transition ${rolling
                ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                : "bg-[#302f2c] text-[#efede3] hover:bg-black"
              }`}
          >
            Roll d{sides}
          </button>
        ))}
      </div>

      {/* Animated Dice Result */}
      {results[0] && (
        <motion.div
          key={results[0].value}
          initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 360, scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-7xl font-extrabold mb-6"
        >
          {results[0].value}
        </motion.div>
      )}

      {/* Stats */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mb-6">
        <h2 className="text-lg font-bold mb-2">Stats</h2>
        <div className="flex justify-between">
          <p>Total Rolls: {results.length}</p>
          <p>Average: {average}</p>
        </div>
      </div>

      {/* History */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 max-h-64 overflow-y-auto custom-scrollbar">
        <h2 className="text-lg font-bold mb-2">Roll History</h2>
        <ul className="space-y-1">
          {results.map((r, i) => (
            <li
              key={i}
              className="flex justify-between text-sm border-b border-[#302f2c]/20 py-1"
            >
              <span>d{r.sides}: <b>{r.value}</b></span>
              <span className="text-gray-500">{r.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset Button */}
      {results.length > 0 && (
        <button
          onClick={() => setResults([])}
          className="mt-6 px-5 py-2 rounded-md font-semibold shadow transition hover:bg-black"
          style={{ backgroundColor: "#302f2c", color: "#efede3" }}
        >
          Clear History
        </button>
      )}
    </div>
  );
}
