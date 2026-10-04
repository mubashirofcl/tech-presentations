# MongoDB Day 8 — Search, Indexing & Pagination

Interactive educational developer presentation deck and demonstration studio for **MongoDB Day 8**.

---

## 🎯 Main Topics Covered

1. **Full-Text Search with `$text`**: Creating text indexes, querying words, exact phrases, and multi-word OR searches.
2. **Relevance Ranking with `textScore`**: Extracting `$meta: "textScore"`, projecting scores, and sorting results by relevance.
3. **Partial Search with `$regex`**: Substring matching with `$options: "i"`, regex anchors (`^`, `$`), and why unanchored regex can trigger expensive collection scans (`COLLSCAN`).
4. **Atlas Search & Autocomplete**: Search-as-you-type autocomplete architecture, Lucene EdgeGram tokenizers, and comparison with `$text`.
5. **Database Indexing Strategies**: B-Tree index anatomy, ascending vs descending direction (`1` vs `-1`), compound indexes, the ESR rule (Equality, Sort, Range), write/storage overhead, and auditing query performance with `.explain("executionStats")`.
6. **Pagination Fundamentals**: Why pagination is necessary, `limit()`, `skip()`, page-offset calculation formulas, and Express/Mongoose API implementations.
7. **The Problem with Large `skip()`**: Why deep offset pagination becomes O(N) slow as MongoDB scans and discards thousands of preceding documents.
8. **Cursor-Based / Range-Based Pagination**: Scalable O(1) pagination using immutable keys (`_id: { $gt: lastId }`), nextCursor tokens, and when to choose offset vs cursor pagination.
9. **Real-World Product Search API**: End-to-end e-commerce search architecture, hybrid query builder, sorting, and pagination response schemas.
10. **Common Mistakes & Classroom Quiz**: 8 critical pitfalls and a 7-question interactive classroom quiz.

---

## 🚀 How to Run the Presentation

The presentation is built with 100% pure **Vanilla HTML5, CSS3, and JavaScript**. No build step, no npm packages, and no frontend framework required!

### Option 1: Direct File Opening
Double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Local HTTP Server (Optional)
If using VS Code / Antigravity IDE Live Server or Python:
```bash
python -m http.server 8080
# Open http://localhost:8080 in your browser
```

---

## ⌨️ Keyboard Shortcuts & Presentation Controls

| Key | Action |
| :--- | :--- |
| <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd> | Advance to Next Slide |
| <kbd>←</kbd> / <kbd>PageUp</kbd> | Return to Previous Slide |
| <kbd>Home</kbd> | Jump to Slide 1 (Title) |
| <kbd>End</kbd> | Jump to Slide 53 (Summary) |
| <kbd>T</kbd> | Toggle Slide Index Drawer (Table of Contents) |
| <kbd>F</kbd> | Toggle Fullscreen Mode |
| <kbd>?</kbd> | Open Keyboard Shortcuts Help Modal |
| <kbd>Esc</kbd> | Close any open drawer or modal |

---

## 🎮 8 Built-in Interactive Demonstrations

1. **Demo 1 — `$text` Search Simulation (Slide 7):** Live keyword search through mock products with real-time word boundary matching and pipeline diagram.
2. **Demo 2 — `textScore` Ranking (Slide 10):** Real-time relevance score calculation and 5-star rating visualization.
3. **Demo 3 — `$regex` Partial Search (Slide 15):** Substring filtering with live toggle between Contains, Starts-with (`^`), and Ends-with (`$`).
4. **Demo 4 — Atlas Search Autocomplete (Slide 21):** Search-as-you-type dropdown suggestion simulator.
5. **Demo 5 — Index Visualizer (Slide 25):** Step-by-step animated comparison between `COLLSCAN` (checking 12 docs sequentially) vs `IXSCAN` (instant 1-step B-tree jump).
6. **Demo 6 — Pagination Table (Slide 33):** Slicing 50 products into 10-item pages with working page buttons and state.
7. **Demo 7 — skip + limit Visualizer (Slide 37):** Live calculation of `skip = (page - 1) * limit` with visual memory block highlights.
8. **Demo 8 — Cursor Pagination Simulator (Slide 42):** Range querying with `_id: { $gt: lastId }` showing zero skipped documents.

---

## 📂 Slide Directory Overview (53 Slides)

### Section 1 — Search & Pagination Fundamentals (Slides 1–3)
- **Slide 1:** Title — MongoDB Search & Pagination
- **Slide 2:** Learning Objectives
- **Slide 3:** What Is Search? Exact vs Partial vs Word vs Autocomplete

### Section 2 — Full-Text Search (Slides 4–9)
- **Slide 4:** What Is Full-Text Search?
- **Slide 5:** Why Not Use Normal Find?
- **Slide 6:** Create a Text Index
- **Slide 7:** Using `$text` (with Interactive Demo 1)
- **Slide 8:** Searching Multiple Words
- **Slide 9:** Text Search vs Exact Search Comparison Table

### Section 3 — textScore (Slides 10–13)
- **Slide 10:** What Is `textScore`? (with Interactive Demo 2)
- **Slide 11:** Getting `textScore` with `$meta` Projection
- **Slide 12:** Sorting by `textScore`
- **Slide 13:** Real-World `$text` Example

### Section 4 — Partial Search with $regex (Slides 14–19)
- **Slide 14:** What Is Partial Search?
- **Slide 15:** Basic `$regex` (with Interactive Demo 3)
- **Slide 16:** Common Regex Patterns (`^`, `$`, contains)
- **Slide 17:** Practical `$regex` Example
- **Slide 18:** `$text` vs `$regex` Comparison Table
- **Slide 19:** `$regex` Performance Warning (Leading Wildcard & COLLSCAN)

### Section 5 — Atlas Search & Autocomplete (Slides 20–24)
- **Slide 20:** What Is Atlas Search?
- **Slide 21:** What Is Autocomplete? (with Interactive Demo 4)
- **Slide 22:** Autocomplete Architecture Flow
- **Slide 23:** Atlas Search Autocomplete Concept (`$search`)
- **Slide 24:** Search Strategy: Choosing the Right Tool

### Section 6 — Database Indexing (Slides 25–32)
- **Slide 25:** What Is an Index? (with Interactive Demo 5)
- **Slide 26:** Simple Index Example
- **Slide 27:** Index Direction: `1` vs `-1`
- **Slide 28:** Common Index Types Overview
- **Slide 29:** Compound Indexes & The ESR Rule
- **Slide 30:** 5-Step Indexing Strategy
- **Slide 31:** Too Many Indexes? Write Overhead & Storage
- **Slide 32:** Check Query Performance with `.explain("executionStats")`

### Section 7 — Pagination (Slides 33–39)
- **Slide 33:** What Is Pagination? (with Interactive Demo 6)
- **Slide 34:** Why Pagination? Network & Memory Architecture
- **Slide 35:** Understanding `limit()`
- **Slide 36:** Understanding `skip()`
- **Slide 37:** Page-Based Pagination Formula (with Interactive Demo 7)
- **Slide 38:** Mongoose API Pagination in Express
- **Slide 39:** The Problem With Large `skip()` Values

### Section 8 — Cursor Pagination (Slides 40–43)
- **Slide 40:** Better Approach: Cursor / Range-Based Pagination
- **Slide 41:** Cursor Pagination API Example & `nextCursor`
- **Slide 42:** Cursor Query Concept (`$gt` with `_id`, with Interactive Demo 8)
- **Slide 43:** Offset vs Cursor Pagination Comparison Table

### Section 9 — Real-World Application (Slides 44–45)
- **Slide 44:** Product Search & Pagination API Contract
- **Slide 45:** Complete Search Flow Architecture

### Section 10 — Practical Project (Slides 46–49)
- **Slide 46:** Mini Project: Product Search & Pagination API
- **Slide 47:** Product Search Endpoint Implementation
- **Slide 48:** Pagination API Endpoint Implementation
- **Slide 49:** Practical Indexes for the Project

### Section 11 — Review (Slides 50–53)
- **Slide 50:** Common Mistakes & Anti-Patterns (8 Warning Cards)
- **Slide 51:** Quick Concept Comparison Matrix
- **Slide 52:** Interactive Classroom Quiz (7 Questions)
- **Slide 53:** Summary & Final Takeaways
