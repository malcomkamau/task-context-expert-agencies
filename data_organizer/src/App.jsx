import React, { useState, useMemo } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import "./index.css"; // custom scrollbar styles

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".csv")) {
      setError("Unsupported file type. Please upload a CSV file.");
      return;
    }

    setLoading(true);
    setError("");
    setData([]);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      worker: true,
      chunk: (results) => {
        setData((prev) => [...prev, ...results.data]);
      },
      complete: () => {
        setLoading(false);
        if (data.length === 0) {
          setError("The CSV file seems empty or malformed.");
        }
      },
      error: (err) => {
        setLoading(false);
        setError("Parsing failed: " + err.message);
      },
    });
  };

  const handleExportCSV = () => {
    try {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "export.csv";
      a.click();
    } catch (err) {
      setError("Export failed: " + err.message);
    }
  };

  const handleExportXLSX = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "export.xlsx");
    } catch (err) {
      setError("Export failed: " + err.message);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filtering + Sorting
  const filteredData = useMemo(() => {
    let filtered = data;

    if (search.trim() !== "") {
      const lower = search.toLowerCase();
      filtered = data.filter((row) =>
        Object.values(row).some(
          (val) => val && val.toString().toLowerCase().includes(lower)
        )
      );
    }

    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortConfig.key] || "";
        const bVal = b[sortConfig.key] || "";
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, search, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "#efede3", color: "#302f2c" }}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-extrabold tracking-tight">Data Organizer</h1>
        <p className="text-lg text-[#4a4945]">
          Upload your CSV, search, sort (click headers), edit inline, and export.
        </p>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* File Upload */}
        <label className="block">
          <span className="text-base font-semibold">Upload CSV File</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block w-full mt-2 text-sm 
                       file:mr-4 file:py-2 file:px-4 
                       file:rounded-md file:border-0 
                       file:text-sm file:font-semibold 
                       file:bg-[#302f2c] file:text-[#efede3] 
                       hover:file:bg-black transition"
          />
        </label>

        {/* Search + Rows per page */}
        {data.length > 0 && (
          <div className="flex flex-wrap gap-4 items-center mt-4">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 w-full max-w-xs border border-[#302f2c]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#302f2c]"
              style={{ backgroundColor: "#fff", color: "#302f2c" }}
            />

            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="px-3 py-2 border border-[#302f2c]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#302f2c]"
              style={{ backgroundColor: "#fff", color: "#302f2c" }}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n} rows
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div
              className="animate-spin rounded-full h-14 w-14 border-t-4 border-solid"
              style={{ borderColor: "#302f2c" }}
            ></div>
          </div>
        )}

        {/* Table */}
        {!loading && currentRows.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow-lg border border-[#302f2c]/20 bg-white max-h-[500px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-sm text-left border-collapse">
              <thead
                style={{ backgroundColor: "#302f2c", color: "#efede3" }}
                className="sticky top-0 z-10"
              >
                <tr>
                  {Object.keys(currentRows[0]).map((col, i) => (
                    <th
                      key={i}
                      onClick={() => handleSort(col)}
                      className="px-4 py-3 text-sm font-semibold border-b border-[#efede3]/30 select-none cursor-pointer hover:bg-[#4a4945]/70 transition"
                    >
                      <div className="flex items-center gap-1">
                        {col}
                        {sortConfig.key === col ? (
                          sortConfig.direction === "asc" ? (
                            <span>▲</span>
                          ) : (
                            <span>▼</span>
                          )
                        ) : (
                          <span className="opacity-50">⇅</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, i) => (
                  <tr
                    key={i}
                    className="odd:bg-[#efede3]/40 even:bg-white hover:bg-[#efede3]/70 transition-colors"
                  >
                    {Object.values(row).map((val, j) => (
                      <td
                        key={j}
                        contentEditable
                        suppressContentEditableWarning={true}
                        onFocus={(e) =>
                          e.target.classList.add("bg-yellow-50", "outline-none")
                        }
                        onBlur={(e) => {
                          const newData = [...data];
                          newData[(page - 1) * rowsPerPage + i][
                            Object.keys(row)[j]
                          ] = e.target.textContent;
                          setData(newData);
                          e.target.classList.remove("bg-yellow-50");
                          e.target.classList.add("bg-green-100");
                          setTimeout(
                            () => e.target.classList.remove("bg-green-100"),
                            600
                          );
                        }}
                        className="px-4 py-2 border-b border-[#302f2c]/20 cursor-text transition-colors"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No results */}
        {!loading && data.length > 0 && filteredData.length === 0 && (
          <div className="text-center text-lg font-medium text-[#4a4945]">
            No results found.
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md font-medium transition ${
                page === 1
                  ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                  : "bg-[#302f2c] text-[#efede3] hover:bg-black"
              }`}
            >
              Prev
            </button>
            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-md font-medium transition ${
                page === totalPages
                  ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                  : "bg-[#302f2c] text-[#efede3] hover:bg-black"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Export Buttons */}
        {data.length > 0 && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleExportCSV}
              className="px-5 py-2 rounded-md font-semibold shadow transition hover:bg-black"
              style={{ backgroundColor: "#302f2c", color: "#efede3" }}
            >
              Export CSV
            </button>
            <button
              onClick={handleExportXLSX}
              className="px-5 py-2 rounded-md font-semibold shadow transition hover:bg-black"
              style={{ backgroundColor: "#302f2c", color: "#efede3" }}
            >
              Export XLSX
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
