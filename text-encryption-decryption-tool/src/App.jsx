import { useState } from "react";
import CryptoJS from "crypto-js";

const ACCENT = "#302f2c";
const BG = "#efede3";

export default function App() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");

  const handleEncryptDecrypt = () => {
    if (!text || !key) {
      setStatus("Please enter both text and key.");
      return;
    }

    try {
      // Try to decrypt first
      const bytes = CryptoJS.AES.decrypt(text, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (decrypted) {
        setOutput(decrypted);
        setStatus("Decryption successful.");
      } else {
        // If decryption failed, encrypt
        const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        setOutput(encrypted);
        setStatus("Encryption successful.");
      }
    } catch {
      // Fallback to encryption if anything fails
      const encrypted = CryptoJS.AES.encrypt(text, key).toString();
      setOutput(encrypted);
      setStatus("Encryption successful.");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setStatus("Output copied to clipboard.");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: BG, color: ACCENT }}
    >
      <div className="w-full max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold mb-4">Text Encryption/Decryption</h1>

        <textarea
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded border"
          style={{ borderColor: ACCENT, backgroundColor: BG, color: ACCENT }}
        />

        <input
          type="password"
          placeholder="Enter key/password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full p-3 rounded border"
          style={{ borderColor: ACCENT, backgroundColor: BG, color: ACCENT }}
        />

        <div className="flex justify-between space-x-4">
          <button
            onClick={handleEncryptDecrypt}
            className="flex-1 px-4 py-2 rounded font-semibold border"
            style={{ borderColor: ACCENT, backgroundColor: ACCENT, color: BG }}
          >
            Encrypt / Decrypt
          </button>
          {output && (
            <button
              onClick={copyOutput}
              className="flex-1 px-4 py-2 rounded font-semibold border"
              style={{ borderColor: ACCENT, backgroundColor: ACCENT, color: BG }}
            >
              Copy Output
            </button>
          )}
        </div>

        <textarea
          readOnly
          placeholder="Output will appear here"
          value={output}
          className="w-full p-3 rounded border"
          style={{ borderColor: ACCENT, backgroundColor: BG, color: ACCENT }}
        />

        {status && <p className="mt-2 text-sm italic">{status}</p>}
      </div>
    </div>
  );
}
