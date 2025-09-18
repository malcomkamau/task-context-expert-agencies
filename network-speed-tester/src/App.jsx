import { useState } from "react";

const ACCENT = "#302f2c";
const BG = "#efede3";

const TEST_FILE =
  "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg"; // ~3MB

export default function App() {
  const [status, setStatus] = useState("");
  const [ping, setPing] = useState(null);
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);

  async function testPing() {
    setStatus("Testing ping...");
    const start = performance.now();
    try {
      await fetch("https://www.google.com", { mode: "no-cors" });
      const end = performance.now();
      setPing(Math.round(end - start));
      setStatus("Ping test completed.");
    } catch {
      setStatus("Ping test failed.");
    }
  }

  async function testDownload() {
    setStatus("Testing download speed...");
    const startTime = performance.now();

    try {
      const response = await fetch(TEST_FILE + "?cacheBust=" + Date.now());
      const reader = response.body.getReader();
      let received = 0;
      const contentLength = +response.headers.get("Content-Length") || 3 * 1024 * 1024;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.length;
        const duration = (performance.now() - startTime) / 1000;
        const speedMbps = ((received * 8) / duration / 1024 / 1024).toFixed(2);
        setDownloadSpeed(speedMbps);
      }

      setStatus("Download test completed.");
    } catch {
      setStatus("Download test failed.");
    }
  }

  async function testUpload() {
    setStatus("Testing upload speed...");
    const sizeMB = 5;
    const data = new Uint8Array(sizeMB * 1024 * 1024).fill(0);

    const startTime = performance.now();

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:4000/upload");
      xhr.setRequestHeader("Content-Type", "application/octet-stream");

      xhr.upload.onprogress = (e) => {
        const duration = (performance.now() - startTime) / 1000;
        const speedMbps = ((e.loaded * 8) / duration / 1024 / 1024).toFixed(2);
        setUploadSpeed(speedMbps);
      };

      xhr.onload = () => setStatus("Upload test completed.");
      xhr.onerror = () => setStatus("Upload test failed.");

      xhr.send(data);
    } catch {
      setStatus("Upload test failed.");
    }
  }

  async function runAll() {
    setPing(null);
    setDownloadSpeed(null);
    setUploadSpeed(null);
    await testPing();
    await testDownload();
    await testUpload();
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: BG, color: ACCENT }}
    >
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Network Speed Tester</h1>

        <button
          onClick={runAll}
          className="px-6 py-3 rounded font-semibold border mb-6"
          style={{ borderColor: ACCENT, backgroundColor: ACCENT, color: BG }}
        >
          Run Test
        </button>

        <div className="space-y-4">
          <div className="p-4 rounded border" style={{ borderColor: ACCENT }}>
            <div className="font-medium">Ping</div>
            <div className="text-xl font-bold">{ping !== null ? `${ping} ms` : "--"}</div>
          </div>

          <div className="p-4 rounded border" style={{ borderColor: ACCENT }}>
            <div className="font-medium">Download Speed</div>
            <div className="text-xl font-bold">
              {downloadSpeed !== null ? `${downloadSpeed} Mbps` : "--"}
            </div>
          </div>

          <div className="p-4 rounded border" style={{ borderColor: ACCENT }}>
            <div className="font-medium">Upload Speed</div>
            <div className="text-xl font-bold">
              {uploadSpeed !== null ? `${uploadSpeed} Mbps` : "--"}
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm italic">{status}</p>
      </div>
    </div>
  );
}
