import { useState } from "react";

const ACCENT = "#302f2c";
const BG = "#efede3";

export default function App() {
  const [color, setColor] = useState("#ffffff");
  const [status, setStatus] = useState("");

  async function pickColor() {
    if (!window.EyeDropper) {
      setStatus("EyeDropper API not supported in this browser.");
      return;
    }

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      setColor(result.sRGBHex);
      setStatus("Color selected!");
    } catch {
      setStatus("Color picking cancelled.");
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(color);
      setStatus("Color copied to clipboard!");
    } catch {
      setStatus("Failed to copy color.");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: BG, color: ACCENT }}
    >
      <h1 className="text-2xl font-bold mb-6">Screen Color Picker</h1>

      <button
        onClick={pickColor}
        className="px-6 py-3 rounded font-semibold mb-4 border"
        style={{ borderColor: ACCENT, backgroundColor: ACCENT, color: BG }}
      >
        Pick Color
      </button>

      <div className="flex items-center space-x-4 mb-4">
        <div
          className="w-16 h-16 rounded border"
          style={{ backgroundColor: color, borderColor: ACCENT }}
        ></div>
        <div className="font-mono text-lg">{color}</div>
      </div>

      <button
        onClick={copyToClipboard}
        className="px-4 py-2 rounded border font-medium"
        style={{ borderColor: ACCENT, color: ACCENT }}
      >
        Copy
      </button>

      <p className="mt-4 italic text-sm">{status}</p>
    </div>
  );
}
