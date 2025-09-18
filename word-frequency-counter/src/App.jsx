import { useState } from "react";

const ACCENT = "#302f2c";
const BG = "#efede3";
const HIGHLIGHT = "#ffd700"; // highlight color

export default function App() {
  const [text, setText] = useState("");
  const [frequencies, setFrequencies] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  function analyzeText() {
    if (!text) return;

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    const freqMap = {};
    words.forEach(word => {
      if (word) freqMap[word] = (freqMap[word] || 0) + 1;
    });

    const sorted = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => ({ word, count }));

    setFrequencies(sorted);
    setSearchResult(null);
  }

  function searchWordFrequency() {
    if (!searchWord) return;

    const wordLower = searchWord.toLowerCase();
    const result = frequencies.find(f => f.word === wordLower);
    setSearchResult(result ? result.count : 0);
  }

  function getHighlightedText() {
    if (!searchWord) return text;

    const regex = new RegExp(`(${searchWord})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          style={{ backgroundColor: HIGHLIGHT, color: ACCENT, fontWeight: "bold" }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: BG, color: ACCENT }}
    >
      <div className="w-full max-w-xl text-center">
        <h1 className="text-2xl font-bold mb-6">Word Frequency Counter</h1>

        <textarea
          className="w-full p-4 rounded border mb-4 resize-none"
          style={{ borderColor: ACCENT, backgroundColor: BG, color: ACCENT }}
          rows={6}
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyzeText}
          className="px-6 py-3 rounded font-semibold border mb-4"
          style={{ borderColor: ACCENT, backgroundColor: ACCENT, color: BG }}
        >
          Analyze Text
        </button>

        <div className="flex justify-center items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter word to search"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="p-2 rounded border"
            style={{ borderColor: ACCENT, backgroundColor: BG, color: ACCENT }}
          />
          <button
            onClick={searchWordFrequency}
            className="px-4 py-2 rounded font-semibold border"
            style={{ borderColor: ACCENT, backgroundColor: ACCENT, color: BG }}
          >
            Search
          </button>
        </div>

        {searchResult !== null && (
          <div className="mb-6">
            <span className="font-medium">
              "{searchWord}" occurs {searchResult} {searchResult === 1 ? "time" : "times"}
            </span>
          </div>
        )}

        {text && (
          <div
            className="mb-6 p-4 rounded border text-left whitespace-pre-wrap"
            style={{ borderColor: ACCENT, backgroundColor: BG }}
          >
            {getHighlightedText()}
          </div>
        )}

        {frequencies.length > 0 && (
          <div className="text-left">
            <h2 className="text-xl font-bold mb-2">All Words:</h2>
            <ul className="space-y-1 max-h-64 overflow-auto">
              {frequencies.map(({ word, count }, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b pb-1"
                  style={{
                    backgroundColor:
                      searchWord.toLowerCase() === word ? HIGHLIGHT : "transparent",
                    padding: "0 0.5rem",
                  }}
                >
                  <span>{word}</span>
                  <span>{count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
