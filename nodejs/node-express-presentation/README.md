# Node.js & Express.js — Complete Backend Development Presentation

A modern, interactive, web-based presentation deck for teaching Node.js and Express.js backend development from beginner concepts to practical REST API development.

---

## 🌟 Key Features

- **Interactive Node.js Event Loop Simulator**:
  - Real state-driven working model (Call Stack, libuv Phase Ring, nextTick Queue, Microtask Queue, Console, Audit Log).
  - 5 executable scenarios (Basic Timers, nextTick vs Promise, setTimeout vs setImmediate, I/O Context fs.readFile, async/await).
  - Step Controls (Play, Pause, Step Prev, Step Next, Reset, Speed selector).
  - Phase Explorer, libuv Thread Pool visual, Blocking Event Loop demo, 7 Myth vs Truth cards, 15-Question Session Quiz, and Master Challenge.
- **Full-Screen Presentation Deck**: Clean 100vw × 100vh slides with smooth transitions and hash navigation (`#slide-1`, `#slide-2`).
- **Light Blue Professional Design System**: Built with modern SaaS aesthetic using custom CSS tokens (`#F4FAFF`, `#2563EB`, `#0EA5E9`).
- **Pure HTML5 / CSS3 / Vanilla JavaScript**: Zero frontend frameworks required. Uses CDN libraries for Lucide Icons & Highlight.js code highlighting.
- **Interactive Quiz & MCQ Scoring Engine**:
  - Interactive Output Prediction quiz cards with revealable explanations.
  - Interactive 20-Question MCQ Exam section with real-time score computation (`Score: X/20`) and evaluation badges (*Excellent*, *Good*, *Needs Revision*).
- **Mentor Notes Drawer**: Hidden speaker notes toggleable for live classroom teaching.
- **Table of Contents Drawer**: Jump to any day or slide instantly.
- **Code Copy-to-Clipboard**: One-click code copying with visual feedback.
- **Responsive Layout**: Designed for classroom projectors, desktops, laptops, and tablets.

---

## 🚀 How to Run

1. Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
2. Alternatively, serve using any local static HTTP server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

---

## ⌨️ Keyboard Shortcuts & Controls

| Key | Action |
| :--- | :--- |
| `ArrowRight` / `Space` | Next Slide |
| `ArrowLeft` | Previous Slide |
| `Home` | First Slide |
| `End` | Last Slide |
| `F` / `f` | Toggle Fullscreen Mode |
| `Esc` | Close Drawers / Exit Fullscreen |
| `Swipe Left / Right` | Touch navigation for Mobile / Tablet |

---

## 📚 13-Day Curriculum Overview & Working Sessions

- **DAY 1**: Overview of Node.js, V8 Engine, Architecture, libuv, Non-blocking I/O, npm
- **DAY 2**: Timer Functions (`setTimeout`, `setInterval`, `setImmediate`), Callbacks, Callback Hell & `call()` / `apply()` / `bind()`
- **DAY 3**: Promises, `async` / `await`, Promise Combinators (`Promise.all`, `Promise.race`), Event Loop Microtasks
- **WORKING SESSION**: **NODE.JS EVENT LOOP SIMULATOR** — Real State-Driven Working Model, libuv Event-Loop Phases (Timers, Pending, Poll, Check, Close), `process.nextTick()`, Microtasks, Thread Pool & 15-Question Quiz.
- **DAY 4**: Setting Up Express & Creating a Basic Server, HTTP Methods (GET, POST), `req` / `res` Pipeline
- **DAY 5**: Route Parameters (`req.params`) vs Query Parameters (`req.query`), Filtering & Pagination
- **DAY 6**: Implementing RESTful CRUD API, HTTP Status Codes, `express.json()` Middleware
- **DAY 7**: *Day 7 — Topic to be added* (Placeholder slide ready for syllabus update)
- **DAY 8**: Implementing User Sessions, Cookies (`HttpOnly`, `Secure`), `express-session`, Login / Logout, Protected Routes
- **DAY 9**: Handling File Uploads with Multer (`multipart/form-data`), Storage Engines, MIME Validation
- **DAY 10**: Buffer in Node.js, Binary Data Handling, UTF-8 / Hex / Base64 Encodings
- **DAY 11**: Building and Testing APIs with Postman, Response Assertions
- **DAY 12**: Advanced Production Architecture (`src/routes`, `controllers`, `services`, `models`), Centralized Error Handling
- **DAY 13**: Final Capstone Project — User Management REST API with Auth, Uploads, Search & Pagination

---

## 📁 File Structure

```text
node-express-presentation/
│
├── index.html       # Full presentation markup (~50 slides + drawers)
├── style.css        # Light Blue design system, simulator styles & responsive layout
├── script.js        # Navigation engine, Node Event Loop State Machine, quiz engine & drawers
├── assets/          # Icons & asset directory
└── README.md        # Presentation guide & mentor documentation
```

