import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // Syntax highlighting theme

function App() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Previewer
Type some **Markdown** on the left and see the rendered **HTML** here.

## Example
- Easy lists
- Inline \`code\`
- Syntax highlighting:

\`\`\`javascript
function greet() {
  console.log("Hello, world!");
}
greet();
\`\`\`

> Blockquotes work too!

### Table Example
| Name   | Role    | Status |
|--------|---------|--------|
| Alice  | Dev     | Active |
| Bob    | Design  | Inactive |

[Visit OpenAI](https://openai.com)

#### Image Example
![OpenAI Logo](https://openai.com/favicon.ico)

---
`);

  const exportToHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Markdown Export</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: #efede3;
      color: #302f2c;
      padding: 2rem;
      line-height: 1.6;
    }

    /* Headings */
    h1 { font-size: 2.25rem; margin: 1.5rem 0 1rem; font-weight: 700; }
    h2 { font-size: 1.75rem; margin: 1.25rem 0 0.75rem; font-weight: 600; }
    h3 { font-size: 1.5rem; margin: 1rem 0 0.5rem; font-weight: 600; }
    h4 { font-size: 1.25rem; margin: 0.75rem 0; font-weight: 600; }
    h5 { font-size: 1.1rem; margin: 0.5rem 0; font-weight: 600; }
    h6 { font-size: 1rem; margin: 0.5rem 0; font-weight: 600; color: #555; }

    /* Text */
    p { margin: 0.75rem 0; }
    strong { font-weight: bold; }
    em { font-style: italic; }
    del { text-decoration: line-through; }

    /* Lists */
    ul { list-style-type: disc; margin: 0.75rem 1.25rem; }
    ol { list-style-type: decimal; margin: 0.75rem 1.25rem; }

    /* Blockquote */
    blockquote {
      border-left: 4px solid #302f2c;
      padding-left: 1rem;
      margin: 1rem 0;
      color: #555;
      font-style: italic;
      background: #f8f7f4;
    }

    /* Code blocks */
    pre {
      background: #f6f8fa;
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1rem 0;
    }
    code {
      font-family: monospace;
      background: #f1f1f1;
      padding: 2px 4px;
      border-radius: 4px;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 0.5rem 0.75rem;
      text-align: left;
    }
    th {
      background: #e2e0d8;
    }
    tr:nth-child(even) {
      background: #f8f7f4;
    }

    /* Horizontal rule */
    hr {
      border: none;
      border-top: 2px solid #ccc;
      margin: 2rem 0;
    }

    /* Links */
    a {
      color: #1a73e8;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }

    /* Images */
    img {
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
      border-radius: 0.25rem;
    }

    /* Highlight.js code syntax */
    .hljs {
      display: block;
      overflow-x: auto;
      padding: 1rem;
      border-radius: 0.5rem;
    }
  </style>
</head>
<body>
  ${document.querySelector(".preview").innerHTML}
</body>
</html>
  `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "export.html";
    link.click();
  };

  return (
    <div className="flex h-screen">
      {/* Markdown Input */}
      <div className="w-1/2 h-full flex flex-col">
        <h2 className="bg-[#302f2c] text-[#efede3] p-2 font-bold">Markdown Input</h2>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="flex-1 p-4 outline-none resize-none font-mono"
        />
      </div>

      {/* Preview */}
      <div className="w-1/2 h-full flex flex-col border-l border-[#302f2c]">
        <div className="flex items-center justify-between bg-[#302f2c] text-[#efede3] p-2">
          <h2 className="font-bold">Preview</h2>
          <button
            onClick={exportToHTML}
            className="bg-[#efede3] text-[#302f2c] px-3 py-1 rounded hover:bg-[#dcd9cf]"
          >
            Export
          </button>
        </div>
        <div
          className="flex-1 p-4 overflow-auto preview prose"
          style={{
            fontFamily: "system-ui, sans-serif",
            lineHeight: "1.6",
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default App;
