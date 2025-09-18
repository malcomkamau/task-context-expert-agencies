import { useState, useEffect } from "react";

const ACCENT = "#302f2c";
const BG = "#efede3";

export default function App() {
  const [words, setWords] = useState([]);
  const [pattern, setPattern] = useState("");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");
  const [results, setResults] = useState([]);
  const [copiedWord, setCopiedWord] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/words.json")
      .then(res => res.json())
      .then(setWords)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => { // small delay to show loader
      const regex = new RegExp("^" + pattern.replace(/_/g, ".") + "$", "i");
      const filtered = words.filter((w) => {
        const word = w.toLowerCase();
        if (pattern && !regex.test(word)) return false;
        if (startsWith && !word.startsWith(startsWith.toLowerCase())) return false;
        if (endsWith && !word.endsWith(endsWith.toLowerCase())) return false;
        if (contains && !word.includes(contains.toLowerCase())) return false;
        return true;
      });
      setResults(filtered);
      setLoading(false);
    }, 200);
  };

  const copyToClipboard = async (word) => {
    try {
      await navigator.clipboard.writeText(word);
      setCopiedWord(word);
      setTimeout(() => setCopiedWord(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const highlightWord = (word) => {
    return word.split("").map((char, i) => {
      if (pattern[i] && pattern[i] !== "_" && pattern[i].toLowerCase() === char.toLowerCase()) {
        return (
          <span key={i} className="font-bold" style={{ color: ACCENT }}>
            {char}
          </span>
        );
      }
      return <span key={i}>{char}</span>;
    });
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: BG, color: ACCENT }}>
      <h1 className="text-3xl font-bold text-center mb-6">Crossword Helper</h1>

      {/* Search Controls */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        <input
          type="text"
          placeholder="Pattern (_ for unknown letters)"
          value={pattern}
          onChange={e => setPattern(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Starts with"
          value={startsWith}
          onChange={e => setStartsWith(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Ends with"
          value={endsWith}
          onChange={e => setEndsWith(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Contains"
          value={contains}
          onChange={e => setContains(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          className="w-full py-2 font-semibold rounded flex justify-center items-center gap-2"
          style={{ backgroundColor: ACCENT, color: BG }}
          disabled={loading}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <p className="col-span-full text-center italic">Loading...</p>
        ) : results.length > 0 ? (
          results.map((word, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-xl shadow-lg text-center font-semibold text-lg hover:scale-105 transition-transform relative"
            >
              <div>{highlightWord(word)}</div>
              <button
                onClick={() => copyToClipboard(word)}
                className="absolute top-2 right-2 text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Copy
              </button>
              {copiedWord === word && (
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-green-600">
                  Copied!
                </span>
              )}
            </div>
          ))
        ) : (
          (pattern || startsWith || endsWith || contains) && (
            <p className="text-center col-span-full mt-4 italic">No matching words found</p>
          )
        )}
      </div>
    </div>
  );
}
