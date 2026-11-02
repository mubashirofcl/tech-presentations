# Gen-AI Node.js – Day 4 Presentation: SSE Streaming, File Uploads & Document Processing

An interactive, production-grade classroom presentation and lab environment built for MERN stack students and instructors. This slide deck covers the foundational backend patterns required for generative AI architectures: real-time token/text streaming via Server-Sent Events (SSE), binary file uploads using Multer in-memory storage, raw binary buffer inspection, multi-format document extraction (PDF, DOCX, CSV), and robust defensive validation.

---

## 📋 Course Overview & Metadata

- **Course:** MERN Stack & Generative AI Development
- **Module:** Gen-AI Node.js Engineering
- **Session:** Day 4 — SSE Streaming, File Uploads, Buffers & Document Parsing
- **Format:** Single Page Application (Pure HTML5, CSS3, Vanilla JavaScript ES6+)
- **No External UI Dependencies:** Zero Tailwind, Bootstrap, React, or heavy slide framework dependencies. Runs immediately in any modern browser.

---

## 🎯 Learning Objectives

By the end of this session, students will be able to:
1. **Explain and Implement SSE:** Configure Express HTTP response headers (`text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`) to push tokens and status updates incrementally.
2. **Stream in the Browser:** Ingest live chunks using the native `ReadableStream` (`fetch()`) and `TextDecoder` APIs with proper split-chunk line buffering.
3. **Handle Disconnections:** Bind to `req.on("close")` and clear active timers or abort generative LLM requests to avoid memory leaks.
4. **Buffer In-Memory Uploads:** Configure Multer with `multer.memoryStorage()` to keep incoming files in RAM (`req.file.buffer`) for zero-disk latency in cloud or serverless environments.
5. **Inspect & Manipulate Buffers:** Understand `Buffer.from()`, `buf.toString("utf-8")`, byte sizing (`byteLength`), and Base64 conversion for vision model payloads.
6. **Parse Heterogeneous Documents:**
   - **PDF:** Extract raw page text using CommonJS-compatible `pdf-parse@1.1.1`.
   - **DOCX:** Extract raw prose and text content using `mammoth.extractRawText()`.
   - **CSV:** Parse tabular structured records into JSON objects using `csv-parse/sync`.
7. **Defend File Endpoints:** Enforce strict MIME-type allowlists, size limits (`limits: { fileSize: 10 * 1024 * 1024 }`), and clean Express error handling.
8. **Assemble a Unified Document Ingestion API:** Build an end-to-end `POST /api/documents/upload` endpoint ready for downstream LLM chunking, vector embedding, and RAG pipelines.

---

## 🗂️ 18-Slide Detailed Curriculum

| Slide # | Slide Title | Core Concept / Focus |
|:-------:|:------------|:---------------------|
| **01** | Title Slide | Gen-AI Node.js Day 4: SSE Streaming, File Uploads & Document Processing |
| **02** | Learning Objectives | Complete breakdown of competencies: SSE, Streams, Multer, Buffers, PDF, DOCX, CSV |
| **03** | What Is Server-Sent Events (SSE)? | SSE vs Polling vs WebSockets; ASCII flow diagrams of traditional vs streaming LLM responses |
| **04** | Creating an SSE Endpoint in Express | HTTP response headers, formatting `data: ...\n\n`, flush intervals, and `res.write()` |
| **05** | Consuming SSE in the Browser | `fetch()` with `ReadableStreamDefaultReader`, `TextDecoder`, and handling partial chunk splits |
| **06** | Stream Disconnection & Cleanup | Client abort handling via `req.on("close")`, clearing intervals, and preventing resource leaks |
| **07** | Why File Uploads Matter in Gen-AI | Document Q&A, RAG ingestion pipelines, and multi-modal file intake patterns |
| **08** | Setting Up Multer for Memory Storage | `multer.memoryStorage()` vs disk storage, security advantages, and `req.file.buffer` |
| **09** | Handling Single and Multiple File Uploads | `upload.single("document")` vs `upload.array("documents", 5)` vs `upload.fields()` |
| **10** | What Is a Node.js Buffer? | Raw binary memory outside V8 heap, byte arrays, hex inspection, and encoding formats |
| **11** | Converting Buffers to Strings and Encodings | `buf.toString("utf-8")`, Base64 encoding for vision models (`data:image/png;base64,...`) |
| **12** | Extracting Text from PDF Documents | Setting up and utilizing `pdf-parse@1.1.1`, extracting metadata, page counts, and raw text |
| **13** | Extracting Text from DOCX Documents | Extracting Word document contents using `mammoth.extractRawText({ buffer })` |
| **14** | Parsing CSV Files for Tabular AI Ingestion | Converting tabular CSV streams/buffers into structured JSON using `csv-parse/sync` |
| **15** | Error Handling & File Validation | Enforcing MIME validation, file extension cross-checks, Multer file size limits, and 400 responses |
| **16** | Mini-Project Architecture | Flowchart and design of the Unified Document Ingestion Pipeline for RAG applications |
| **17** | Complete Express Server Implementation | Production-ready Express script combining Multer, PDF, DOCX, CSV parsers, and JSON response |
| **18** | Summary, Best Practices & Hands-On Exercises | Quick recap, production dos & don'ts, and 6 progressive student practice challenges |

---

## 🚀 How to Open and Run the Presentation

### Option 1: Direct File Launch (No Server Needed)
Simply double-click `index.html` or open it with your browser:
```bash
# Windows PowerShell
Start-Process "index.html"

# Or open directly in Chrome / Edge / Firefox
chrome index.html
```

### Option 2: Run with a Local Static Server
If you prefer running via HTTP (e.g. for testing live fetch calls or sharing across your local network):
```bash
# Using npx serve (recommended)
npx serve .

# Or using Python 3
python -m http.server 3000
```
Then navigate to `http://localhost:3000/`.

---

## ⌨️ Keyboard Shortcuts & Interactive Controls

| Shortcut / Button | Action |
|:------------------|:-------|
| `→` or `Space` or `Page Down` | Advance to the **Next Slide** |
| `←` or `Page Up` | Return to the **Previous Slide** |
| `Home` | Jump directly to **Slide 1 (Title)** |
| `End` | Jump directly to **Slide 18 (Summary & Lab)** |
| `F` or `F11` | Toggle **Fullscreen Presentation Mode** |
| `T` or `M` | Open/Close the **Table of Contents Drawer** |
| `Esc` | Close Table of Contents Drawer |
| `Copy Code` Button | Copies syntax-highlighted code blocks with visual feedback |
| Navigation Header | Shows current section pill, slide number, and live progress bar |

---

## 🧪 Built-In Interactive Live Simulators

The presentation includes 4 embedded interactive sandboxes directly within the slides:
1. **Slide 5: Live SSE Chatbot Simulator**
   - Click "Start SSE Stream" to watch simulated streaming tokens appear in real time with auto-scrolling terminal logs, demonstrating `ReadableStream` chunk assembly.
2. **Slide 10: Buffer & Hex Explorer**
   - Type any text string to inspect the exact byte length, hexadecimal representation, binary array, and UTF-8 round-trip string.
3. **Slide 14: Tabular CSV Parser Sandbox**
   - Edit sample CSV records directly and run the live in-browser parser to preview generated structured JSON records and row count metrics.
4. **Slide 17: Document Ingestion API Sandbox**
   - Simulate uploading PDF, DOCX, or CSV files to the `/api/documents/upload` endpoint and inspect the resulting metadata, word count, character count, and structured text payload.

---

## 🛠️ Complete Mini-Project Setup Guide

Students can run the complete Day 4 server locally to test uploads and streaming:

### Step 1: Initialize Project and Install Dependencies
```bash
mkdir gen-ai-node-day4
cd gen-ai-node-day4
npm init -y

# Install core Express, Multer, and document parsing libraries
npm install express multer pdf-parse mammoth csv-parse
```

### Step 2: Create `server.js`
Copy the code provided on **Slide 17** into `server.js`.

### Step 3: Run the Server
```bash
node server.js
```
The server will start on `http://localhost:3000`.

### Step 4: Test with cURL or Postman
```bash
# Test Document Upload Endpoint (PDF, DOCX, or CSV)
curl -X POST http://localhost:3000/api/documents/upload \
  -F "document=@sample.pdf"

# Test SSE Streaming Endpoint
curl -N http://localhost:3000/api/stream
```

---

## 🧑‍💻 Student Practice Exercises & Challenges

1. **Exercise 1 (SSE Heartbeat):** Modify the SSE endpoint in `server.js` to send a `: ping\n\n` comment event every 15 seconds to prevent NAT gateway timeouts.
2. **Exercise 2 (Multi-File Ingestion):** Upgrade the upload endpoint from `upload.single("document")` to `upload.array("documents", 5)` so users can upload up to 5 documents at once.
3. **Exercise 3 (Document Chunker):** Write a utility function that splits the parsed text into sliding window chunks of 500 characters with a 50-character overlap for RAG embeddings.
4. **Exercise 4 (Image Vision Payloads):** Add image upload validation (`image/png`, `image/jpeg`) and convert the image buffer to a base64 Data URI formatted for OpenAI or Gemini multimodal APIs.
5. **Exercise 5 (AbortController Integration):** Wire the SSE client's disconnect event (`req.on("close")`) to an `AbortController.signal` passed into an LLM call.
6. **Exercise 6 (Token Counter):** Add a rough token estimator function (`Math.ceil(text.length / 4)`) to the upload response JSON so frontend developers know prompt budget usage.

---

## 📂 Project Directory Structure

```
gen-ai-node-day4-presentation/
├── index.html          # Semantic HTML5 deck (all 18 slides with code, theory & diagrams)
├── style.css           # Modern developer presentation theme (light-blue & dark code styling)
├── script.js           # Navigation engine, keyboard shortcuts, TOC & interactive simulators
└── README.md           # Syllabus breakdown, setup manual, and hands-on exercises
```
