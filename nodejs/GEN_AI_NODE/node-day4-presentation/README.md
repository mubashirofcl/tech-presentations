# Gen-AI Node.js — Day 4 Presentation: Streaming, File Upload & Document Processing

A beginner-friendly, trainer-focused interactive classroom presentation designed for beginner MERN Stack students. This deck avoids heavy theoretical jargon and teaches complex backend concepts through one unified, real-world narrative: **"Building an AI Document Assistant."**

Students learn how an Express backend receives uploaded documents (PDF, Word, CSV), manages raw binary data in memory using Node.js Buffers, extracts clean text using specialized parsing libraries, and streams real-time AI responses to the browser word by word.

---

## 📋 Course Overview & Metadata

- **Course:** MERN Stack & Generative AI Development
- **Module:** Gen-AI Node.js Architecture
- **Session:** Day 4 — Streaming (SSE), File Uploads (Multer), Buffers & Document Parsing
- **Format:** Single Page Application (Pure HTML5, CSS3, Vanilla JavaScript ES6+)
- **Zero Framework Overhead:** No React, Bootstrap, or Tailwind dependencies. Runs directly in any web browser.
- **Teaching Style:** Step-by-step trainer presentation with practical code snippets, visual data flow diagrams, Postman testing guides, and embedded live simulators.

---

## 🎯 The Central Story: "Building an AI Document Assistant"

```
User Uploads PDF / DOCX / CSV
              |
              v
        Express Server
              |
              v
        Multer Receives File (Multipart/Form-Data)
              |
              v
        Hold File in Memory as a Buffer
              |
              v
        Document Parser (pdf-parse / Mammoth / csv-parse)
              |
              v
        Send Extracted Text to AI
              |
              v
        AI Generates Answer
              |
              v
        Stream Answer Word by Word to Browser (SSE)
```

---

## 🗂️ 18-Slide Detailed Curriculum

| Slide # | Slide Title | Core Concept / Focus |
|:-------:|:------------|:---------------------|
| **01** | **Title Slide** | Gen-AI Node.js – Day 4: Streaming, File Upload & Document Processing |
| **02** | **What Are We Building Today?** | The central story: Building an AI Document Assistant and backend flow |
| **03** | **What Is Streaming?** | Normal API response (wait for full answer) vs Streaming response (word-by-word like ChatGPT) |
| **04** | **What Is SSE?** | Server-Sent Events simple definition, one-way server-to-browser pipe, and use cases |
| **05** | **Creating Our First SSE Server** | Express endpoint (`/stream`), `text/event-stream`, `no-cache`, `res.write()`, and `res.end()` |
| **06** | **How Does the Browser Read Streaming Data?** | `ReadableStream` simplified: `fetch()`, `response.body`, `getReader()`, `reader.read()`, and `TextDecoder()` |
| **07** | **Practical: Display Streaming Data in Browser** | Simple HTML & JS working demo with `while(true)` chunk reading and live simulator |
| **08** | **What Happens When We Upload a File?** | JSON (`application/json`) vs File uploads (`multipart/form-data`); Why `express.json()` is not enough |
| **09** | **What Is Multer?** | Installing Multer, `upload.single("file")`, and inspecting `req.file` (`originalname`, `mimetype`, `size`) |
| **10** | **Practical: Upload a File Using Postman** | 9-step Postman testing procedure (POST, form-data, file key, selecting files, and verifying 200 OK) |
| **11** | **What Is a Buffer?** | Simple explanation: Computer bytes, `Buffer.from("Hello")`, `buffer.toString()`, and interactive byte explorer |
| **12** | **Getting a Buffer from an Uploaded File** | `multer.memoryStorage()`, accessing `req.file.buffer`, `Buffer.isBuffer()`, and `buffer.length` |
| **13** | **What Is Document Parsing?** | Why raw PDF bytes look like gibberish; The 3 dedicated libraries (`pdf-parse`, `mammoth`, `csv-parse`) |
| **14** | **Reading PDF Files Using pdf-parse** | Installing `pdf-parse@1.1.1`, calling `await pdfParse(req.file.buffer)`, and inspecting `result.text` |
| **15** | **Reading DOCX Files Using Mammoth** | Calling `mammoth.extractRawText({ buffer: req.file.buffer })`, and reading `result.value` |
| **16** | **Reading CSV Files Using csv-parse** | Calling `parse(req.file.buffer, { columns: true })` and converting rows into JavaScript objects |
| **17** | **Final Practical: AI Document Reader** | Connecting the full pipeline: `POST /documents/upload`, clean architecture, and interactive runner |
| **18** | **Practical Questions & Recap** | 6 hands-on student lab challenges and quick reference summary table |

---

## 🚀 How to Open and Run the Presentation

### Option 1: Direct File Launch (No Server Required)
Simply double-click `index.html` or run:
```bash
# Windows PowerShell
Start-Process "index.html"

# Google Chrome / Microsoft Edge
chrome index.html
```

### Option 2: Run with a Local Static Server
```bash
# Using npx serve (recommended)
npx serve .

# Or using Python 3
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your browser.

---

## ⌨️ Keyboard Shortcuts & Interactive Controls

| Shortcut / Control | Action |
|:-------------------|:-------|
| `→` or `Space` or `Page Down` | Advance to the **Next Slide** |
| `←` or `Page Up` | Return to the **Previous Slide** |
| `Home` | Jump directly to **Slide 1 (Title Slide)** |
| `End` | Jump directly to **Slide 18 (Final Practical Lab)** |
| `F` | Toggle **Fullscreen Presentation Mode** |
| `T` or `M` | Open / Close the **Table of Contents Drawer** |
| `?` or `H` | Open / Close the **Keyboard Shortcuts Help Modal** |
| `Esc` | Close any open drawer or modal |
| **Copy Code Button** | Copies code snippet to clipboard with instant checkmark feedback |

---

## 🧪 Built-In Interactive Simulators

1. **Slide 7 — Live Browser Streaming Simulator:**
   - Click "Start Streaming" to simulate incoming SSE chunks arriving with 1-second delays and rendering in real time.
2. **Slide 11 — Interactive Buffer & Byte Explorer:**
   - Type any text string to inspect the exact Node.js hexadecimal Buffer representation, byte size, and UTF-8 decoded text.
3. **Slide 17 — Full Document Pipeline Simulator:**
   - Select PDF, Word, or CSV formats and watch the file traverse the 3-step backend pipeline (Multer Memory &rarr; RAM Buffer &rarr; Parser) to produce extracted JSON.

---

## 🛠️ Complete Student Server Implementation (`server.js`)

Students can test document parsing and streaming locally using this single-file Express `server.js`:

```javascript
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { parse } = require("csv-parse/sync");

const app = express();
const PORT = 3000;

// Configure Multer with in-memory storage (req.file.buffer)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// 1. SSE Streaming Endpoint
app.get("/stream", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");

    res.write("data: Hello Students!\n\n");
    await new Promise(r => setTimeout(r, 1000));

    res.write("data: Welcome to Node.js!\n\n");
    await new Promise(r => setTimeout(r, 1000));

    res.write("data: Streaming completed!\n\n");
    res.end();
});

// 2. Read PDF Endpoint
app.post("/read-pdf", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Please upload a PDF file" });
        const result = await pdfParse(req.file.buffer);
        res.json({ message: "PDF read successfully", text: result.text });
    } catch (err) {
        res.status(500).json({ message: "Unable to read PDF" });
    }
});

// 3. Read DOCX Endpoint
app.post("/read-docx", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Please upload a DOCX file" });
        const result = await mammoth.extractRawText({ buffer: req.file.buffer });
        res.json({ message: "DOCX read successfully", text: result.value });
    } catch (err) {
        res.status(500).json({ message: "Unable to read DOCX" });
    }
});

// 4. Read CSV Endpoint
app.post("/read-csv", upload.single("file"), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Please upload a CSV file" });
        const records = parse(req.file.buffer, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });
        res.json({ message: "CSV read successfully", data: records });
    } catch (err) {
        res.status(400).json({ message: "Unable to read CSV" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## 🧑‍💻 Student Practice Challenges

1. **Challenge 1 (SSE Heartbeat):** Modify the `/stream` endpoint to send 5 progressive messages with a 1-second delay between each.
2. **Challenge 2 (Word Counter):** In `/read-pdf`, calculate and return the total number of words in `result.text` (`text.split(/\s+/).length`).
3. **Challenge 3 (File Type Validation):** Check `req.file.mimetype` before parsing and reject unexpected file formats with a clear `400 Bad Request`.
4. **Challenge 4 (Tabular Filter):** In `/read-csv`, filter the parsed records array to only return students who belong to a specific course passed via query parameters (`?course=MERN`).
5. **Challenge 5 (Unified Ingestion Route):** Combine `/read-pdf`, `/read-docx`, and `/read-csv` into a single endpoint (`POST /documents/upload`) that checks the file extension and calls the appropriate parser dynamically.
