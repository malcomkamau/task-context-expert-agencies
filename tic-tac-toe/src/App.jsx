import { useEffect, useState } from "react";

/**
 * Tic-Tac-Toe MVP
 * - Colors: accent #302f2c, background #efede3
 * - Modes: 2-player or vs CPU (easy)
 */

const ACCENT = "#302f2c";
const BG = "#efede3";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diags
];

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // null | 'X' | 'O'
  const [current, setCurrent] = useState("X");
  const [winner, setWinner] = useState(null); // 'X' | 'O' | 'draw' | null
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
  const [mode, setMode] = useState("pvp"); // 'pvp' | 'cpu'
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    checkWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  // Auto-run CPU move if mode=cpu and it's O's turn and no winner
  useEffect(() => {
    if (mode === "cpu" && current === "O" && !winner) {
      // small delay for realism
      setThinking(true);
      const t = setTimeout(() => {
        cpuMove();
        setThinking(false);
      }, 400);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, current, winner]);

  function makeMove(idx) {
    if (board[idx] || winner || (thinking && mode === "cpu")) return;
    const next = [...board];
    next[idx] = current;
    setBoard(next);
    setCurrent(current === "X" ? "O" : "X");
  }

  function cpuMove() {
    // Very simple CPU: pick first empty slot (MVP)
    const empty = board
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null);
    if (empty.length === 0) return;
    const idx = empty[0];
    makeMove(idx);
  }

  function checkWinner() {
    for (const [a, b, c] of WIN_LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        endRound(board[a]);
        return;
      }
    }
    if (board.every((c) => c !== null)) {
      endRound("draw");
    }
  }

  function endRound(result) {
    setWinner(result);
    setScores((prev) => ({
      X: prev.X + (result === "X" ? 1 : 0),
      O: prev.O + (result === "O" ? 1 : 0),
      draw: prev.draw + (result === "draw" ? 1 : 0),
    }));
  }

  function nextRound() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrent("X");
    setThinking(false);
    setScanned?.(); // no-op if undefined; keep safety if you copy code elsewhere
  }

  function resetAll() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrent("X");
    setScores({ X: 0, O: 0, draw: 0 });
    setThinking(false);
  }

  // UI helpers
  function renderCell(i) {
    const val = board[i];
    const isWinningCell =
      winner && winner !== "draw"
        ? WIN_LINES.some((line) => line.includes(i) && line.every((p) => board[p] === winner))
        : false;

    return (
      <button
        key={i}
        onClick={() => makeMove(i)}
        className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-3xl sm:text-4xl font-bold rounded transition ${val ? "cursor-default" : "hover:scale-105"
          }`}
        style={{
          backgroundColor: BG,
          color: ACCENT,
          border: `2px solid ${ACCENT}`,
          boxShadow: isWinningCell ? `0 0 0 4px rgba(48,47,44,0.08)` : "none",
        }}
        aria-label={`Cell ${i + 1}`}
      >
        {val}
      </button>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: BG, color: ACCENT }}
    >
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Tic-Tac-Toe</h1>

        {/* Mode + Controls */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMode("pvp");
                resetAll();
              }}
              className={`px-3 py-2 rounded font-semibold border ${mode === "pvp" ? "" : ""}`}
              style={{
                borderColor: ACCENT,
                backgroundColor: mode === "pvp" ? ACCENT : BG,
                color: mode === "pvp" ? BG : ACCENT,
              }}
            >
              2-Player
            </button>
            <button
              onClick={() => {
                setMode("cpu");
                resetAll();
              }}
              className="px-3 py-2 rounded font-semibold border"
              style={{
                borderColor: ACCENT,
                backgroundColor: mode === "cpu" ? ACCENT : BG,
                color: mode === "cpu" ? BG : ACCENT,
              }}
            >
              vs CPU
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={nextRound}
              className="px-3 py-2 rounded font-medium border"
              style={{ borderColor: ACCENT, backgroundColor: BG, color: ACCENT }}
            >
              Next Round
            </button>
            <button
              onClick={resetAll}
              className="px-3 py-2 rounded font-medium border"
              style={{ borderColor: ACCENT, backgroundColor: BG, color: ACCENT }}
            >
              Reset Scores
            </button>
          </div>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div className="p-2 rounded border" style={{ borderColor: ACCENT }}>
            <div className="text-sm">X</div>
            <div className="text-xl font-bold">{scores.X}</div>
          </div>
          <div className="p-2 rounded border" style={{ borderColor: ACCENT }}>
            <div className="text-sm">Draws</div>
            <div className="text-xl font-bold">{scores.draw}</div>
          </div>
          <div className="p-2 rounded border" style={{ borderColor: ACCENT }}>
            <div className="text-sm">O</div>
            <div className="text-xl font-bold">{scores.O}</div>
          </div>
        </div>

        {/* Board */}
        <div
          className="grid grid-cols-3 gap-2 mb-4 justify-center"
          style={{ maxWidth: 3 * 84 + 16 }} // approx width
        >
          {Array.from({ length: 9 }).map((_, i) => renderCell(i))}
        </div>

        {/* Status */}
        <div className="text-center">
          {winner ? (
            winner === "draw" ? (
              <div className="font-semibold">It's a draw.</div>
            ) : (
              <div className="font-semibold">{winner} wins!</div>
            )
          ) : thinking ? (
            <div className="font-medium">CPU thinking...</div>
          ) : (
            <div className="font-medium">Turn: {current}</div>
          )}
        </div>
      </div>
    </div>
  );
}
