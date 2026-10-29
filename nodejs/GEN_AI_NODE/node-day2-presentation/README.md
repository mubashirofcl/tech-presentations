# Node.js Day 2 — Asynchronous Programming & I/O

> **Title:** Node.js Day 2: Asynchronous Programming & I/O  
> **Subtitle:** Working with APIs, Promises, Files, and Errors  
> **Audience:** Beginners who have completed Day 1 (Node.js fundamentals, npm, modules, modern JS, arrays, .env, and watch mode).

A complete, production-grade, interactive slide presentation deck built with **pure HTML5, CSS3, and Vanilla JavaScript** (zero external frameworks or runtime dependencies).

---

## 🌟 Presentation Design & Features

- **Classroom Light Blue & White Design System:** High-contrast projector-ready typography, rounded cards, subtle shadows, deep navy terminal/code blocks with syntax highlighting tokens.
- **Strict 25-Slide Pedagogy:** Exactly 25 slides organized into 8 progressive teaching sections.
- **Copy Code Buttons:** One-click copy with instant visual checkmark feedback on all code blocks.
- **Interactive Educational Simulators:**
  - **Slide 4:** Event Loop Step-by-Step Simulator for `setTimeout(..., 0)`.
  - **Slide 10:** Concurrency Simulator comparing sequential vs `Promise.all` execution times.
  - **Slide 18:** Dynamic Exponential Backoff Calculator (`Formula: Base * 2^(Attempt - 1)`).
- **Navigation Engine:**
  - Previous / Next buttons with boundary disabling (at slide 1 and slide 25).
  - Progress bar dynamically tracking `0%` to `100%`.
  - Slide counter (e.g. `01 / 25` to `25 / 25`).
  - Table of Contents sidebar drawer with section headings and 1-click jump.
  - Keyboard shortcuts modal (`?`).
  - Direct URL hash syncing (`#slide-1` to `#slide-25`) enabling browser back/forward and bookmarking.
- **Print / PDF Ready:** Clean `@media print` CSS format for classroom handouts.

---

## 🗂️ Exact 25-Slide Structure

| Section | Slide # | Title & Topic |
|---|---|---|
| **Section 1: Understanding Asynchronous Programming** | 01 | **Title Slide:** Node.js Day 2: Asynchronous Programming & I/O |
| | 02 | **Learning Objectives:** 10 core backend capabilities |
| | 03 | **What Is Asynchronous Programming?** Non-blocking execution & `setTimeout` |
| | 04 | **Event Loop (High-Level Overview):** Call stack, libuv, task queue, 0ms timer simulator |
| **Section 2: Callbacks, Promises, and async/await** | 05 | **Understanding Callbacks:** Function passing & callback hell caution |
| | 06 | **Callback-Based Asynchronous Operations:** Reading files with `node:fs` error-first pattern |
| | 07 | **Understanding Promises:** 3 states (Pending, Fulfilled, Rejected) & `.then()/.catch()` |
| | 08 | **async/await:** Clean sequential async syntax & non-blocking runtime behavior |
| | 09 | **Callbacks vs Promises vs async/await:** Architectural comparison table |
| **Section 3: Parallel Operations and Error Handling** | 10 | **Promise.all for Parallel Calls:** Concurrent execution (~1s vs ~2s) & timing simulation |
| | 11 | **Promise.all: Important Behavior:** Fail-fast rejection & safe concurrency rules |
| | 12 | **Error Handling with try/catch:** Defending against errors & `response.ok` check |
| **Section 4: Fetch API in Node.js** | 13 | **Fetch API in Node.js:** Native global `fetch()`, `Response`, JSON parsing |
| | 14 | **Process API Data:** Transforming API responses with Day 1 `map()` method |
| **Section 5: Timeouts and AbortController** | 15 | **Why Do We Need Request Timeouts?** Preventing hanging requests and resource leaks |
| | 16 | **AbortController with Fetch:** Reusable `fetchWithTimeout` helper & `clearTimeout` in `finally` |
| **Section 6: Retry with Exponential Backoff** | 17 | **Why Retry Failed Requests?** Transient errors vs non-retryable 4xx client errors |
| | 18 | **Exponential Backoff:** Increasing delays (500ms, 1000ms, 2000ms) & interactive calculator |
| | 19 | **Retry a Fetch Request:** Combining `retryOperation` with API calls & `Retry-After` headers |
| **Section 7: File Operations with fs/promises and path** | 20 | **Understanding fs/promises:** Modern async file I/O (`readFile`, `writeFile`, `mkdir`) |
| | 21 | **Working with File Paths:** Cross-platform path safety with `node:path` |
| | 22 | **Practical File Report Generator:** Combining fetch, map, path, and file writes |
| **Section 8: Final Practical Project & Next Steps** | 23 | **Mini Project Overview:** User API Report Generator architecture & pipeline |
| | 24 | **Complete Mini Project Code:** Production `app.js`, `.env`, and npm scripts |
| | 25 | **Practice Tasks and Key Takeaways:** 8 student exercises and Day 2 architectural summary |

---

## 🚀 How to Open the Presentation

No build tools, bundlers, or servers are required!

### Option 1: Direct File Open
1. Navigate to the `node-day2-presentation/` folder in File Explorer.
2. Double-click `index.html` or right-click and choose **Open with Google Chrome** (or Edge, Safari, Firefox).

### Option 2: Local Static Server (Optional)
```bash
# Using npx:
npx serve node-day2-presentation

# Or using Python:
python -m http.server 8000
# Then visit: http://localhost:8000/node-day2-presentation/
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `Home` | First slide (Slide 1) |
| `End` | Last slide (Slide 25) |
| `F` | Toggle Fullscreen |
| `T` or `M` | Open/Close Table of Contents drawer |
| `?` or `H` | Open/Close Keyboard Shortcuts modal |
| `Esc` | Close any open drawer or modal |

> **Note:** Keyboard shortcuts are automatically bypassed when typing in input or select controls.

---

## 💻 Final Mini Project: User API Report Generator

The final project combines all Day 2 asynchronous concepts into a cohesive backend program.

### Project Files
- **`app.js`**: Main executable importing `dotenv/config`, `node:fs/promises`, and `node:path`.
- **`.env`**:
  ```env
  API_URL=https://jsonplaceholder.typicode.com/users
  TIMEOUT_MS=3000
  MAX_ATTEMPTS=3
  ```
- **`package.json`**:
  ```json
  {
    "name": "user-api-report-generator",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "start": "node app.js",
      "dev": "node --watch app.js"
    },
    "dependencies": {
      "dotenv": "^16.4.5"
    }
  }
  ```

### Running the Mini Project
```bash
npm install
npm start
```
The report is generated at `reports/users.txt`.

---

## 🧪 Student Practice Tasks (Slide 25)
1. Fetch posts instead of users (`https://jsonplaceholder.typicode.com/posts`).
2. Save the post titles to `reports/posts.txt`.
3. Change the timeout to one second (`TIMEOUT_MS=1000`) and observe network behavior.
4. Change the maximum retry count to 5 attempts.
5. Add a timestamp (`new Date().toISOString()`) to the report header.
6. Use `Promise.all()` to fetch users and posts concurrently.
7. Save two separate reports simultaneously.
8. Handle invalid API URLs gracefully with clear console output.

