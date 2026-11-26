# Intermediate AI/LLM – Day 2: Agent Workflows, RAG Fundamentals & Document Processing

A professional, classroom-ready interactive presentation designed for teaching advanced Node.js AI agent architectures and the foundational ingestion phase of Retrieval-Augmented Generation (RAG).

- **Destination Path:** `c:\Users\ADMIN\OneDrive\Desktop\HACA\Presentation\gen-ai\intermediate\genai-intermediate-day2`
- **Total Slides:** Exactly 28 slides
- **Technology Stack:** Node.js, Express.js, JavaScript (CommonJS `require()` / `module.exports`), HTML5, CSS3
- **Theme:** Clean Light Blue & White Theme (`#F3F8FF` background, `#FFFFFF` cards, `#172554` navy text/headings, `#2563EB` blue accent, `#0F172A` code panel)

---

## Curriculum Structure

### Section 1: Agent Workflows (Slides 1–12)
1. **Introduction to Agent Workflows:** The philosophy of dividing complex AI goals into distinct, coordinated steps. The 4 core patterns (Sequential, Parallel, Router, Human-in-the-Loop) and enterprise leave assistant walkthrough.
2. **Why Do We Need Agent Workflows?:** The failure modes of monolithic "do everything" single prompts vs the 4 pillars of structured workflows (validation boundaries, deterministic logic injection, auditability, modular iteration).
3. **Sequential Workflow (A → B → C):** Chaining linear operations where output N feeds directly into step N+1. Full employee leave request flow.
4. **Practical: Sequential Workflow in Node.js:** Async/await implementation with error handling, early guard exits, and clean JSON interfaces.
5. **Parallel Workflow:** Fan-out and fan-in architecture executing independent tasks concurrently via `Promise.all()` to achieve > 60% latency reductions.
6. **Practical: Promise.all() in Node.js:** CommonJS implementation analyzing ticket sentiment, topic extraction, and urgency concurrently with execution benchmarking.
7. **Sequential vs Parallel Workflow:** Direct comparison matrix across dependencies, latency, error blast radius, and API rate limits.
8. **Router Pattern:** Dynamic request dispatching using lightweight classification gates to send queries to specialized prompts and tools.
9. **Practical: Build a Simple Router in Node.js:** CommonJS routing map + **Live Interactive Router Simulator** with rule matching and confidence scoring.
10. **Human-in-the-Loop (HITL):** Safeguarding high-stakes financial, database, or legal actions with supervised approval checkpoints.
11. **Practical: Human Approval Using Express:** Express.js REST endpoints (`POST /expense`, `/approve`, `/reject`) + **Live Interactive Approval Simulator** with threshold triggers.
12. **Agent Workflow Recap:** Composing all four patterns into an enterprise production architecture with idempotency, timeouts, and structured observability.

### Section 2: RAG Fundamentals (Slides 13–19)
13. **What is RAG?:** Retrieval-Augmented Generation definition. Parametric (frozen model weights) vs Non-Parametric (external documents) memory.
14. **Why Do We Need RAG?:** Overcoming knowledge cutoffs, protecting proprietary private data, providing verifiable source citations, and eliminating retraining costs.
15. **What is Hallucination?:** Why statistical next-token prediction fabricates plausible falsehoods and how context-grounding prompts eliminate hallucinations.
16. **RAG Architecture: Retrieval, Augmentation, Generation:** The 3-stage pipeline connecting user queries to grounded responses.
17. **How Does RAG Work? (Employee Policy Walkthrough):** End-to-end scenario querying annual leave carry-forward rules from an employee handbook.
18. **RAG Architecture: Document Processing vs Question Answering:** The vital distinction between the offline Ingestion Pipeline and the real-time Online Query Pipeline.
19. **RAG vs Fine-Tuning:** In-depth trade-off matrix: cost, freshness, implementation speed, and the golden rule ("RAG for facts, Fine-Tuning for style/syntax").

### Section 3: Document Processing for RAG (Slides 20–28)
20. **What is Document Processing?:** Why raw PDFs cannot be fed directly to LLMs (token budgets, latency, "Lost in the Middle"). The 5 stages of ingestion.
21. **Node.js Document Processing Libraries:** CommonJS packages overview (`pdf-parse@1.1.1`, `fs`, `mammoth`, `csv-parse/sync`).
22. **Practical: Load PDF, TXT, DOCX and CSV:** Unified loader script (`documentLoader.js`) with format detection and buffer handling.
23. **Document Cleaning:** Sanitizing extracted text by stripping control characters, normalizing whitespace, and collapsing blank lines (`cleanText`).
24. **Text Splitting / Chunking:** Why chunking is mandatory for semantic search, prompt budgets, and preventing vector dilution.
25. **Chunk Size and Chunk Overlap:** Preserving semantic continuity across boundaries with sliding windows (step = chunkSize - overlap).
26. **Practical: Build a Text Chunking Function:** CommonJS sliding-window function + **Live Interactive Chunk Visualizer** with dynamic sliders and highlighted overlap words.
27. **Metadata in RAG:** Enriching chunks with attributes (`docId`, `source`, `pageNumber`, `chunkIndex`, `department`, `createdAt`) for filtered enterprise search and RBAC.
28. **Mini Project: RAG Document Processor Pipeline:** Complete end-to-end Node.js pipeline + **Live Interactive Document Pipeline Runner** with step-by-step progress and JSON inspector.

---

## Interactive Features & Simulators

- **Router Simulator (Slide 9):** Enter queries or click sample buttons to watch queries classify into Billing, Technical Support, or General Inquiries with confidence ratings.
- **Human-in-the-Loop Simulator (Slide 11):** Enter an expense amount. Expenses &le; $500 auto-approve; expenses &gt; $500 trigger a supervisory gate with interactive Approve and Reject buttons.
- **Live Chunking & Overlap Visualizer (Slide 26):** Modify Chunk Size and Overlap range sliders in real-time to watch text slice into color-coded cards with boundary overlap words highlighted in yellow.
- **RAG Document Pipeline Runner (Slide 28):** Choose between HR, Customer Care, or Tech Spec sample documents and watch the 4-stage pipeline animate (Load &rarr; Clean &rarr; Chunk &rarr; Tag) and generate structured JSON ready for vector storage.
- **Code Copy Buttons:** Every code block features a 1-click copy button with animated visual feedback and toast alerts.

---

## Keyboard Controls & Navigation

| Key | Action |
| :--- | :--- |
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `Home` | First slide (Slide 1) |
| `End` | Last slide (Slide 28) |
| `F` | Toggle Fullscreen |
| `T` | Toggle Table of Contents drawer |
| `?` | Toggle Keyboard Shortcuts help modal |
| `Esc` | Close drawers and modals |

---

## How to Run

1. Open `index.html` directly in any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Alternatively, serve via VS Code Live Server or Node.js `npx serve`.
3. No build tools, Webpack, or external bundlers are required—pure vanilla HTML5, CSS3, and JavaScript!
