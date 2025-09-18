import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function App() {
  const [view, setView] = useState(null); // "generate" | "scan" | null
  const [text, setText] = useState("");
  const [scanned, setScanned] = useState(null);
  const qrRef = useRef(null);

  // Download QR as image
  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  // Copy scanned result
  const handleCopy = () => {
    if (scanned) {
      navigator.clipboard.writeText(scanned);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "#efede3", color: "#302f2c" }}
    >
      <h1 className="text-3xl font-bold mb-8">QR Code Tool</h1>

      {/* Menu */}
      {view === null && (
        <div className="flex flex-col gap-4">
          <button
            className="px-6 py-3 rounded-lg font-semibold"
            style={{ backgroundColor: "#302f2c", color: "#efede3" }}
            onClick={() => setView("generate")}
          >
            Generate QR
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold"
            style={{ backgroundColor: "#302f2c", color: "#efede3" }}
            onClick={() => setView("scan")}
          >
            Scan QR
          </button>
        </div>
      )}

      {/* Generator View */}
      {view === "generate" && (
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Enter text or URL"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="px-3 py-2 rounded-lg w-64 border"
            style={{
              borderColor: "#302f2c",
              backgroundColor: "#efede3",
              color: "#302f2c",
            }}
          />

          {text && (
            <div ref={qrRef} className="flex flex-col items-center gap-3">
              <QRCodeCanvas
                value={text}
                size={200}
                fgColor="#302f2c"
                bgColor="#efede3"
              />
              <button
                className="px-4 py-2 rounded-lg font-semibold"
                style={{ backgroundColor: "#302f2c", color: "#efede3" }}
                onClick={handleDownload}
              >
                Download QR
              </button>
            </div>
          )}

          <button
            className="mt-6 px-4 py-2 rounded-lg font-semibold"
            style={{ backgroundColor: "#302f2c", color: "#efede3" }}
            onClick={() => setView(null)}
          >
            Back
          </button>
        </div>
      )}

      {/* Scanner View */}
      {view === "scan" && (
        <div className="flex flex-col items-center gap-4">
          <BarcodeScannerComponent
            width={300}
            height={300}
            onUpdate={(err, result) => {
              if (result) setScanned(result.text);
            }}
          />

          {scanned && (
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold break-all">{scanned}</p>
              <button
                className="px-4 py-2 rounded-lg font-semibold"
                style={{ backgroundColor: "#302f2c", color: "#efede3" }}
                onClick={handleCopy}
              >
                Copy
              </button>
            </div>
          )}

          <button
            className="mt-6 px-4 py-2 rounded-lg font-semibold"
            style={{ backgroundColor: "#302f2c", color: "#efede3" }}
            onClick={() => {
              setScanned(null);
              setView(null);
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
