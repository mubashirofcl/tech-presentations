# Node.js Asynchronous Programming — Timers, Callbacks & Callback Hell

> **Course:** Day 2 — MERN Stack Development (Node.js Track)  
> **Title:** Node.js Asynchronous Programming: Timers, Callbacks & Callback Hell  
> **Subtitle:** Understanding Asynchronous Code Through Practical Examples  
> **Audience:** Beginners learning Node.js within a full-stack MERN curriculum.

A complete, interactive slide deck built with **pure HTML5, CSS3, and Vanilla JavaScript** (zero external frameworks or runtime dependencies).

---

## 🌟 Presentation Features & Highlights

- **Professional Classroom Theme:** Light-blue accents, crisp white slide surfaces, deep navy text (`#0f172a`), and dark terminal code blocks (`#0b1329`) with syntax-highlighted tokens.
- **Strict 15-Slide Structure:** Exactly 15 slides covering the three foundational topics:
  1. Timer Functions (`setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`)
  2. Callbacks (synchronous vs asynchronous, parameters, and error-first pattern)
  3. Callback Hell (the problem, pyramid of doom, and conceptual alternatives)
- **Interactive Simulators:**
  - **Slide 3:** `setTimeout` non-blocking stepper demo
  - **Slide 6:** Live Digital Counter (`setInterval` from 1 to 5 with `clearInterval`)
  - **Slide 13:** Nested Order Pipeline Simulator (`getOrder` → `getPayment` → `shipOrder`)
- **One-Click Code Copy:** Instant clipboard copy with visual feedback on every code example.
- **Full Navigation Engine:**
  - Previous / Next buttons with boundary states.
  - Slide counter (e.g. `01 / 15` to `15 / 15`).
  - Top progress bar (`0%` to `100%`).
  - Slide Table of Contents drawer with 1-click jump.
  - Keyboard shortcuts modal (`?`).
  - Deep-linking & history syncing via URL hash (`#slide-1` to `#slide-15`).
- **Print / Handout Ready:** Clean `@media print` CSS formats 1 slide per page for student handouts or PDF export.

---

## 🗂️ Exact 15-Slide Index

| Section | Slide # | Title & Topic |
|---|---|---|
| **Section 1: Timer Functions in Node.js** | **01** | **Title Slide:** Node.js Asynchronous Programming: Timers, Callbacks & Callback Hell |
| | **02** | **Learning Objectives:** 8 core asynchronous learning outcomes |
| | **03** | **Synchronous vs Asynchronous:** Execution order & non-blocking execution |
| | **04** | **setTimeout():** Syntax, delayed callbacks, and real-world backend uses |
| | **05** | **clearTimeout():** Cancelling a pending timeout before execution |
| | **06** | **setInterval():** Repeated execution & digital counter example |
| | **07** | **clearInterval() & Timer Comparison:** 4-timer matrix and classroom task |
| **Section 2: Understanding Callbacks** | **08** | **What Is a Callback Function?** Passing function references vs invoking |
| | **09** | **Callback with Parameters:** Receiving data & anonymous arrow callbacks |
| | **10** | **Asynchronous Callbacks:** Simulating an order with `setTimeout` & non-blocking flow |
| | **11** | **Error-First Callbacks in Node.js:** The `(error, data)` pattern with `node:fs` |
| **Section 3: Callback Hell & Solutions** | **12** | **What Is Callback Hell?** Definition, pyramid of doom, and dependent task tree |
| | **13** | **Callback Hell (Practical Example):** 3-stage order pipeline & maintenance issues |
| | **14** | **How to Avoid Callback Hell:** Named callbacks, Promises, and async/await |
| **Section 4: Practice & Revision** | **15** | **Practical Exercises & Key Takeaways:** 8 student lab tasks & Day 2 summary |

---

## 🚀 How to Open the Presentation

No build tools, bundlers, or servers are required!

### Option 1: Direct File Open
1. Navigate to the `mern-node-day2-presentation/` (or `node-day2-timers-presentation/`) folder.
2. Double-click `index.html` or right-click and choose **Open with Google Chrome** (or Edge / Firefox / Safari).

### Option 2: Local Static Server (Optional)
```bash
# Using npx:
npx serve mern-node-day2-presentation

# Or using Python:
python -m http.server 8000
# Then visit: http://localhost:8000/mern-node-day2-presentation/
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `Home` | First slide (Slide 1) |
| `End` | Last slide (Slide 15) |
| `F` | Toggle Fullscreen |
| `T` or `M` | Open/Close Table of Contents drawer |
| `?` or `H` | Open/Close Keyboard Shortcuts modal |
| `Esc` | Close any active modal or drawer |

*(Keyboard shortcuts are automatically bypassed when typing in form inputs or editable controls).*

---

## 🛠️ Student Lab Exercises (Slide 15)

1. **Delayed Message:** Display `"Welcome"` after 3 seconds using `setTimeout()`.
2. **Countdown Timer:** Count down from 5 to 1 using `setInterval()`, then stop the timer with `clearInterval()`.
3. **Cancel a Timer:** Create a timeout scheduled for 5 seconds and cancel it after 2 seconds using `clearTimeout()`.
4. **Callback Greeting:** Create a function accepting a name and a callback; display a greeting then invoke the callback.
5. **Calculate Marks:** Accept marks and a callback; pass `"Passed"` (>= 50) or `"Failed"` to the callback.
6. **Simulate an Order:** Use `setTimeout()` and callbacks to simulate order placement and delayed completion.
7. **Read a File:** Use `node:fs`'s `fs.readFile()` with an error-first callback `(error, data)` to read a text file.
8. **Identify Callback Hell:** Study a nested callback workflow and trace the dependent execution tree.
