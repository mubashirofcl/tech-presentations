# Intermediate AI/LLM – Day 2: Agent Workflows, RAG Fundamentals & Document Processing (Simplified)

A clean, beginner-friendly, visual classroom presentation designed to explain **Retrieval-Augmented Generation (RAG)** and **Document Processing** using intuitive everyday analogies (Open-Book Exam, Factory Assembly Line, Index Cards, Sticky Notes) and clean, practical Node.js code.

- **Presentation Folder:** `c:\Users\ADMIN\OneDrive\Desktop\HACA\Presentation\gen-ai\intermediate\genai-intermediate-day2`
- **Total Slides:** Exactly 24 slides
- **Focus:** 85% focused on RAG & Document Processing; Workflows summarized into 4 easy-to-understand concept slides.
- **Technology Stack:** Node.js, JavaScript (CommonJS), HTML5, CSS3
- **Theme:** Clean Light Blue & White Classroom Theme (`#F3F8FF` background, `#FFFFFF` cards, `#172554` navy headings, `#2563EB` blue accent, `#0F172A` code panel)

---

## 🎯 Syllabus Structure (24 Slides)

### Section 1: Quick Look at Workflows (Slides 1–4)
1. **Introduction & Today's Roadmap:** Agenda breakdown: 10-minute overview of Workflows, followed by a deep dive into RAG and hands-on Document Processing.
2. **What is an Agent Workflow?:** The factory assembly line analogy: why asking an AI to do everything in one giant prompt fails, and how combining AI with simple JavaScript code creates reliable software.
3. **Sequential vs Parallel Workflows:** Putting on socks before shoes (Sequential) vs 3 friends checking an email at the same time using `Promise.all()` (Parallel).
4. **The Router Pattern & Human-in-the-Loop:** The hospital receptionist directing queries to specialist doctors (Router) and getting a manager's signature before spending money over $500 (Human-in-the-Loop).

### Section 2: RAG Fundamentals (Slides 5–12)
5. **What is RAG? (The Open-Book Exam):** Plain English breakdown of Retrieval-Augmented Generation. Closed-book exam (AI guesses from old internet training) vs Open-book exam (you give the AI the exact company document).
6. **Why LLMs Need RAG:** 4 clear reasons: AI knowledge is frozen in time, company data is private, real verifiable citations, and instant $0 updates when policies change.
7. **What is Hallucination?:** Why AI is a word-guessing machine that bluffs with confidence when it doesn't know facts, and how RAG's strict grounding prompt eliminates hallucinations.
8. **The 3 Steps of RAG: Retrieve → Augment → Generate:** Step 1 (Search files) &rarr; Step 2 (Paste paragraphs into prompt) &rarr; Step 3 (AI reads and writes answer).
9. **Real-World Example: Employee Leave Policy:** Step-by-step walkthrough of an employee asking about carrying forward leave days, showing the exact retrieved text, augmented prompt, and grounded response with citation.
10. **The Two Halves of RAG: Ingestion vs Question Answering:** Organizing the library ahead of time (Ingestion) vs asking the librarian in real time (Question Answering).
11. **RAG vs Fine-Tuning Made Simple:** Open-book exam vs studying for 6 months. When to use RAG (facts, policies, documents) vs Fine-Tuning (specialized tone or syntax).
12. **Why RAG is the #1 Skill in Enterprise AI:** Real-world demand across healthcare, legal, finance, and 24/7 customer support.

### Section 3: Document Processing for RAG (Slides 13–24)
13. **What is Document Processing?:** Why you cannot dump a 200-page PDF into an AI prompt (slow, expensive, "Lost in the Middle"). The Index Card solution.
14. **The Ingestion Pipeline: Load → Clean → Chunk → Tag:** The 4 simple steps to prepare any file for an AI search engine.
15. **Step 1: Loading Documents in Node.js:** Reading plain text with `fs.readFileSync()` and PDF files with `pdf-parse` into clean JavaScript strings.
16. **Step 2: Cleaning the Text:** Stripping weird symbols, standardizing newlines, and removing excess whitespace to save 20% of tokens.
17. **Step 3: What is Text Chunking?:** The index card concept: splitting a 100-page book into 300-to-500 character cards for laser-focused search.
18. **Step 4: Chunk Size & Chunk Overlap:** Why hard splitting cuts sentences in half, and how overlapping cards by 10%–20% preserves complete sentences.
19. **Practical: Writing a Simple Chunking Function:** Short, readable 15-line JavaScript sliding-window function with clear arithmetic comments.
20. **Interactive Tool: Live Chunk & Overlap Visualizer:** Move the Chunk Size (80–280 chars) and Overlap (10–60 chars) sliders in real time to see how text splits and watch overlapping words highlighted in yellow!
21. **Step 5: Adding Metadata to Chunks:** Labeling each card with file name, page number, and department for citations and security permissions.
22. **Putting It All Together: Complete Document Processor:** A clean, production-ready 15-line JavaScript function that takes any file and returns a structured array of chunks.
23. **Mini Project: Run the Document Processor Live!:** Choose a sample file (HR Leave Policy, Customer Support FAQ, Engineering Handbook), click "Process Document", watch the 4 stages animate, and inspect the resulting JSON chunks.
24. **Summary & What's Coming Next:** Key takeaways from today and a sneak peek into Vector Embeddings and Vector Databases for Day 3!

---

## 🧪 Interactive Tools & Simulators

- **Slide 20: Live Text Chunking Visualizer:**
  - Dynamic sliders for **Chunk Size** and **Overlap**.
  - Slices text in real time into visual index cards.
  - Highlights overlapping text across consecutive cards in yellow (`<mark class="chunk-overlap-highlight">`).
- **Slide 23: Live Document Processor Runner:**
  - Select sample company documents (PDF, CSV, TXT).
  - Step-by-step execution animation (Load &rarr; Clean &rarr; Chunk &rarr; Tag).
  - Clean formatted JSON output viewer with a 1-click copy button.
- **Copy Code Buttons:**
  - Available on all code panels with animated feedback ("Copied!") and toast notices.

---

## ⌨️ Navigation Controls

| Key | Action |
| :--- | :--- |
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `Home` / `End` | First slide / Last slide |
| `F` | Toggle Fullscreen |
| `T` | Toggle Table of Contents drawer (24 slides) |
| `?` | Toggle Keyboard Shortcuts help modal |
| `Esc` | Close drawers or modals |

---

## 🚀 How to Run

Simply double-click `index.html` or open it with any web browser (Chrome, Edge, Firefox, Safari). No npm build, webpack, or external web server is required!
