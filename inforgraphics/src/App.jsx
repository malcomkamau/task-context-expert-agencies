import { useState, useRef } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const ACCENT = "#302f2c";
const BG = "#efede3";

export default function App() {
  const [chartType, setChartType] = useState("pie");
  const [datasets, setDatasets] = useState([{ label: "", values: "", color: ACCENT }]);
  const [labels, setLabels] = useState("");
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef();

  const handleGenerate = () => {
    const labelsArray = labels.split(",").map(l => l.trim());
    const dataSetsFormatted = datasets.map(ds => ({
      label: ds.label,
      data: ds.values.split(",").map(v => Number(v.trim())),
      backgroundColor: ds.color.split(",").map(c => c.trim())
    }));
    setChartData({ labels: labelsArray, datasets: dataSetsFormatted });
  };

  const addDataset = () => setDatasets([...datasets, { label: "", values: "", color: ACCENT }]);
  const updateDataset = (index, field, value) => {
    const newDatasets = [...datasets];
    newDatasets[index][field] = value;
    setDatasets(newDatasets);
  };
  const removeDataset = index => setDatasets(datasets.filter((_, i) => i !== index));

  const exportImage = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const exportPDF = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("chart.pdf");
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: BG, color: ACCENT }}>
      <h1 className="text-3xl font-bold text-center mb-6">Data Visualizer</h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        <select
          value={chartType}
          onChange={e => setChartType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
        </select>

        <input
          type="text"
          placeholder="Labels (comma separated)"
          value={labels}
          onChange={e => setLabels(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {datasets.map((ds, idx) => (
          <div key={idx} className="border p-4 rounded space-y-2 relative">
            {datasets.length > 1 && (
              <button
                onClick={() => removeDataset(idx)}
                className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-400 text-white rounded"
              >
                Remove
              </button>
            )}
            <input
              type="text"
              placeholder="Dataset label"
              value={ds.label}
              onChange={e => updateDataset(idx, "label", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Values (comma separated)"
              value={ds.values}
              onChange={e => updateDataset(idx, "values", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Colors (comma separated)"
              value={ds.color}
              onChange={e => updateDataset(idx, "color", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <button
          onClick={addDataset}
          className="w-full py-2 font-semibold rounded"
          style={{ backgroundColor: ACCENT, color: BG }}
        >
          Add Dataset
        </button>

        <button
          onClick={handleGenerate}
          className="w-full py-2 font-semibold rounded"
          style={{ backgroundColor: ACCENT, color: BG }}
        >
          Generate Chart
        </button>
      </div>

      {chartData && (
        <div ref={chartRef} className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
          {chartType === "pie" && <Pie data={chartData} />}
          {chartType === "bar" && <Bar data={chartData} />}
          {chartType === "line" && <Line data={chartData} />}
        </div>
      )}

      {chartData && (
        <div className="max-w-3xl mx-auto mt-4 flex gap-4">
          <button onClick={exportImage} className="py-2 px-4 rounded font-semibold" style={{ backgroundColor: ACCENT, color: BG }}>
            Export as PNG
          </button>
          <button onClick={exportPDF} className="py-2 px-4 rounded font-semibold" style={{ backgroundColor: ACCENT, color: BG }}>
            Export as PDF
          </button>
        </div>
      )}
    </div>
  );
}
