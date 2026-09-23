# JavaScript Complete Frontend & Core Module Presentation Deck

A modern, interactive, web-based presentation deck for teaching JavaScript from core fundamentals to practical DOM manipulation, API integration, asynchronous JavaScript, state-driven Event Loop simulation, and production project architecture.

---

## 🌟 Key Features

- **JavaScript Core Foundations Expansion**:
  - Variables (`var`, `let`, `const`), Data Types & `typeof null` historical bug.
  - Special Numbers (`NaN`, `Infinity`, `Number.isNaN()`), Type Coercion & Conversions.
  - Truthy / Falsy (6 falsy values), Conditions, Logical Operators & Short-circuit.
  - Execution Context, Call Stack LIFO Visual, Stack Overflow.
  - Hoisting, Temporal Dead Zone (TDZ) Timeline, Scope Chain, Closures & Memory Box.
  - Functions as First-Class Values, Higher-Order Functions (`map`, `filter`, `reduce`), Callbacks.
  - `this` Keyword & Arrow Functions, Objects & Memory References, Mutation, Shallow vs Deep Copying.
  - Optional Chaining (`?.`), Nullish Coalescing (`??`), Error Handling (`try/catch/finally/throw`), Error Types.
  - Modules (ESM vs CJS), Strict Mode, JSON, Date, DevTools Debugging.
  - Dual-Mode Definition Switcher (Simple vs Deep Dive Mode) & 100+ Question Revision Bank.
- **Full-Screen Interactive Presentation Deck**: 100vw × 100vh slides with hash navigation (`#slide-1`, `#session-js-event-loop`).
- **Interactive JavaScript Event Loop Simulator**:
  - Live animated state-driven simulation engine (`Call Stack`, `Web APIs`, `Microtask Queue`, `Task Queue`, `Event Loop wheel`).
  - Controls: **Run**, **Pause**, **Step Next**, **Step Prev**, **Reset**, and **Speed Control** (Slow, Normal, Fast).
  - 5 Executable Code Examples (Classic Timers+Promises, Simple Timers, Multiple Promises, Nested Microtasks, `async/await`).
  - Live Execution Log & Console Output.
- **Light Blue Educational Design System**: Designed using modern SaaS and developer documentation aesthetics (`#F5FAFF`, `#2563EB`, `#0EA5E9`).
- **Pure HTML5 / CSS3 / Vanilla JavaScript**: Built with zero frontend frameworks. Uses CDN libraries for Lucide Icons & Highlight.js.
- **Mentor Notes Drawer**: Hidden speaker notes toggleable for live classroom teaching.
- **Table of Contents Drawer**: Quick jump to any module or working session.

---

## 🚀 How to Run

1. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
2. Or serve via any local static server:
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

## 📚 Curriculum Roadmap & Comprehensive Module Coverage

- **CORE FOUNDATIONS**: Variables (`var`/`let`/`const`), Data Types, Coercion, Truthy/Falsy, Execution Context, Call Stack LIFO, Hoisting, TDZ, Scope Chain, Closures, Objects, References, Copying, Optional Chaining (`?.`), Nullish Coalescing (`??`), Error Handling (`try/catch/finally`), Buffer & Binary Streams, and 100+ Question Revision Bank.
- **DAY 1**: Overview of JavaScript, V8 Engine, Execution, JS vs HTML/CSS/Java, Environment Setup (Console, Script tag, Node.js).
- **DAY 2**: Operators (Arithmetic, Logical, Assignment, Comparison `==` vs `===`, Precedence), Control Structures (`if/else if/else`, `switch/case`).
- **DAY 3**: Loops (`for`, `while`, `do...while`), Loop Control (`break`, `continue`), Array Iteration (`for...of`).
- **DAY 4**: Functions (Declarations vs Expressions, Parameters, Arguments, Default parameters), Template Literals (`` `${var}` ``, Multiline HTML strings).
- **DAY 5**: Arrays & Core Mutation Methods (`push`, `pop`, `shift`, `unshift`, `slice` vs `splice`).
- **DAY 6**: Advanced Array Iteration (`forEach`, `map`, `filter`, `reduce`, Method Chaining pipeline & diagrams).
- **DAY 7**: ES6+ Features (Arrow Functions `=>`, Object & Array Destructuring, Spread `...` vs Rest `...`).
- **DAY 8**: DOM Manipulation (DOM Tree, `querySelector`, `querySelectorAll`, `innerHTML` vs `textContent`, `classList`, `createElement`, `appendChild`).
- **DAY 9**: Event Handling (`addEventListener`, click, form submit `preventDefault()`, keyboard/mouse events) & LocalStorage persistence (`setItem`, `getItem`, `JSON.stringify`, `JSON.parse`).
- **DAY 10**: Fetch API & Asynchronous Web Services (`fetch()`, Promises, `.then()/.catch()`, `async/await`, `response.ok`, JSON data parsing).
- **WORKING SESSION**: **JavaScript Event Loop Interactive Working Simulator** (`#session-js-event-loop`).
- **DAYS 11–13**: To-Do List Application Capstone (4-Step Breakdown: Data Model, Dynamic Render, Toggle/Edit/Delete, LocalStorage Persistence).
- **NODE.JS & EXPRESS BACKEND MASTERCLASS**:
  - **Overview & NPM**: Node.js V8 + Libuv, `package.json`, dependency management (`npm install`, `scripts`).
  - **Modules**: Built-in (`fs`, `path`, `http`), Local (`module.exports`/`require` vs ESM `import`), Third-party packages.
  - **Callbacks & Timers**: Timers, Error-First Callbacks `(err, data)`, Callback Hell / Pyramid of Doom.
  - **Custom Promises & Async**: Promise states (`Pending`, `Fulfilled`, `Rejected`), `new Promise()`, `Promise.all()`, backend `try/catch`.
  - **Express & REST APIs**: Express setup, REST HTTP verbs (GET, POST, PUT, DELETE), Postman testing, JSON formats.
  - **Request Parameters & CRUD**: Route Params (`req.params.id`), Query Params (`req.query`), Body (`req.body`), CRUD endpoints.
  - **Express Middleware**: `(req, res, next) => {}`, built-in, custom logger/auth middleware, error handlers.
  - **MVC Architecture**: Model-View-Controller pattern (`routes/`, `controllers/`, `models/`, `config/`).
  - **JWT Authentication**: Token structure, `jwt.sign()`, `jwt.verify()`, Bearer header protection middleware.
  - **Session Management**: Stateful sessions (`express-session`), HTTP cookies, Session vs JWT comparison.
  - **Multer, Axios & Dotenv**: Multipart file uploads (`multer`), environment secrets (`dotenv`), frontend-backend connection (`axios`).
  - **Movie Watchlist API Project (4-Step Breakdown)**: Schema & Architecture, Controller Logic, JWT Protection, Postman API Testing.
- **DAY 14**: *Day 14 — Topic to be added* (Placeholder slide ready for syllabus update).

---

## 📁 File Structure

```text
javascript-presentation/
│
├── index.html       # Full presentation deck & simulator markup
├── style.css        # Light Blue design system & simulator layout styles
├── script.js        # Navigation engine, Event Loop state machine & simulator runner
├── README.md        # Presentation guide & mentor documentation
└── assets/          # Icons & asset directory
```

