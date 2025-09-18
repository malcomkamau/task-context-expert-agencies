import { useState, useEffect, useRef } from "react";

const ACCENT = "#302f2c";
const BG = "#efede3";

// Example cards (emojis for simplicity)
const cardValues = ["🍎", "🍌", "🍇", "🍒", "🥝", "🍑"];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const doubled = [...cardValues, ...cardValues];
    setCards(shuffleArray(doubled));
  }, []);

  useEffect(() => {
    if (flipped.length === 1 && moves === 0) {
      // Start timer on first flip
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
  }, [flipped, moves]);

  useEffect(() => {
    if (matched.length === cards.length && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [matched, cards.length]);

  const handleCardClick = (index) => {
    if (flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const resetGame = () => {
    setCards(shuffleArray([...cardValues, ...cardValues]));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: BG, color: ACCENT }}
    >
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Memory Card Game</h1>

        <div className="flex justify-between mb-4">
          <div>Moves: {moves}</div>
          <div>Time: {time}s</div>
        </div>

        <div className="grid grid-cols-3 gap-4 perspective-1000">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className="h-24 cursor-pointer"
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front */}
                  <div
                    className="absolute w-full h-full flex items-center justify-center rounded bg-[#302f2c]"
                    style={{
                      backfaceVisibility: "hidden",
                      color: BG,
                      fontSize: "2rem",
                    }}
                  >
                    ❓
                  </div>

                  {/* Back */}
                  <div
                    className="absolute w-full h-full flex items-center justify-center rounded bg-white"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      color: ACCENT,
                      fontSize: "2rem",
                    }}
                  >
                    {card}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {matched.length === cards.length && (
          <div className="mt-6 text-xl font-semibold">
            🎉 You won in {moves} moves and {time} seconds! 🎉
          </div>
        )}

        <button
          onClick={resetGame}
          className="mt-6 px-6 py-3 rounded font-semibold border"
          style={{ borderColor: ACCENT, backgroundColor: ACCENT, color: BG }}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
