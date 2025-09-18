import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.raw({ limit: "100mb", type: "*/*" })); // raw body to handle blobs

// Upload endpoint
app.post("/upload", express.raw({ limit: "100mb", type: "*/*" }), (req, res) => {
    const bytesReceived = req.body ? req.body.length || Buffer.byteLength(req.body) : 0;
    res.json({ receivedBytes: bytesReceived });
  });
  

app.listen(PORT, () => {
  console.log(`✅ Upload server running at http://localhost:${PORT}`);
});
