import React, { useEffect, useState } from "react";

// MVP Currency Converter (ExchangeRate API v6)
// - Fetches conversion rates dynamically from base currency
// - No /symbols endpoint, so we derive available currencies from API response
// - Swap button, basic validation, loading & error states

const API_KEY = "a7a2f3bf3519a2df1e22fbb6";
const API_BASE = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("KES");
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [date, setDate] = useState(null);

  // Popular currencies to show at top
  const POPULAR = ["USD", "EUR", "KES", "GBP", "JPY", "UGX", "TZS", "ZAR"];

  // fetch base rates whenever "from" changes
  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      setError("");
      setRates({});
      try {
        const res = await fetch(`${API_BASE}/latest/${from}`);
        const data = await res.json();
        if (!cancelled) {
          if (data && data.result === "success") {
            setRates(data.conversion_rates);
            setCurrencies(Object.keys(data.conversion_rates));
            setDate(data.time_last_update_utc);
          } else {
            setError("Failed to load currency rates.");
          }
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("Network error while fetching rates.");
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, [from]);

  const handleConvert = () => {
    setError("");
    setResult(null);
    setRate(null);

    const amt = parseFloat(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      setError("Enter a valid amount greater than 0.");
      return;
    }
    if (!rates[to]) {
      setError("Target currency not available.");
      return;
    }

    setLoading(true);
    try {
      const r = rates[to];
      setRate(r);
      setResult((amt * r).toFixed(4));
    } catch (e) {
      console.error(e);
      setError("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFrom((prev) => {
      setTo(prev);
      return to;
    });
    setResult(null);
    setRate(null);
  };

  // Render helpers
  const renderOptions = () => {
    if (currencies.length === 0) {
      return ["USD", "KES", "EUR", "GBP"].map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ));
    }

    const popularFiltered = POPULAR.filter((c) => currencies.includes(c));
    const rest = currencies
      .filter((c) => !popularFiltered.includes(c))
      .sort();

    return [...popularFiltered, ...rest].map((code) => (
      <option key={code} value={code}>
        {code}
      </option>
    ));
  };

  return (
    <div className="max-w-md mx-auto p-4 glass rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Currency Converter (Live)</h2>

      <label className="block text-xs mb-1">Amount</label>
      <input
        type="number"
        inputMode="decimal"
        step="any"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1">
          <label className="block text-xs mb-1">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {renderOptions()}
          </select>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleSwap}
            title="Swap currencies"
            className="mt-6 px-3 py-2 border rounded"
          >
            ⇆
          </button>
        </div>

        <div className="flex-1">
          <label className="block text-xs mb-1">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {renderOptions()}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleConvert}
          disabled={loading}
          className="flex-1 bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Converting..." : "Convert"}
        </button>

        <button
          onClick={() => {
            setAmount("");
            setResult(null);
            setRate(null);
            setError("");
          }}
          className="px-4 py-2 border rounded"
        >
          Clear
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="mt-4 p-3 rounded border">
          <div className="text-sm">
            {amount} {from} →
          </div>
          <div className="text-2xl font-bold my-1">
            {Number(result).toLocaleString(undefined, {
              maximumFractionDigits: 6,
            })}{" "}
            {to}
          </div>
          {rate && (
            <div className="text-xs text-gray-600">
              1 {from} = {rate} {to}
            </div>
          )}
          {date && (
            <div className="text-xs text-gray-500">Last updated: {date}</div>
          )}
        </div>
      )}
    </div>
  );
}
