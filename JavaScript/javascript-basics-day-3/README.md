# JavaScript Fundamentals – Day 3 Presentation

## DOM Manipulation, Event Handling, Asynchronous JavaScript & Modules

A comprehensive, interactive classroom presentation designed for teaching foundational browser programming, asynchronous patterns, and modern modular code organization to prepare students for React and Generative AI development.

---

## 🎯 Target Audience & Learning Objectives

* **Target Audience:** Students with basic programming foundations preparing for React and Generative AI development.
* **Total Slides:** Exactly 25 slides.
* **Technology Stack:** Pure HTML5, CSS3, and Vanilla JavaScript (No React, Node.js backend, or external CSS frameworks used).
* **Main Practical Projects:**
  1. **Interactive Student Profile:** DOM manipulation, input validation, and event handling.
  2. **User Explorer Application:** Modular web app fetching remote JSON records via Fetch API, handling async/await with try/catch/finally, and organizing logic into ES modules (`api.js`, `ui.js`, `main.js`).

---

## 📚 Complete 25-Slide Curriculum Overview

### SECTION 1 – DOM MANIPULATION (Slides 1–7)
1. **Slide 1 – Introduction to Day 3:** Overview, roadmap, and learning objectives across DOM, Events, Async JS, and Modules.
2. **Slide 2 – What is the DOM?:** Document Object Model tree hierarchy (`document` &rarr; `html` &rarr; `body` &rarr; elements) and dynamic capabilities.
3. **Slide 3 – Selecting HTML Elements:** `getElementById()`, `querySelector()`, and `querySelectorAll()` with CSS selector rules (`#`, `.`, tags).
4. **Slide 4 – Modifying HTML Content:** `textContent` (safe plain text) vs `innerHTML` (HTML markup parsing) and security risks (XSS).
5. **Slide 5 – Modifying CSS Using JavaScript:** Direct camelCase inline styles vs clean CSS class management with `classList` (`add`, `remove`, `toggle`, `contains`).
6. **Slide 6 – Creating HTML Elements Dynamically:** 3-step creation lifecycle: `createElement()` in memory &rarr; configure content/styles &rarr; `appendChild()` to live DOM.
7. **Slide 7 – Removing HTML Elements:** Modern `remove()`, parent `removeChild()`, and `replaceChildren()` for fast container clearing.

### SECTION 2 – EVENT HANDLING (Slides 8–11)
8. **Slide 8 – What are Browser Events?:** Signals, event flow diagram, and common triggers (`click`, `input`, `change`, `submit`, `keydown`).
9. **Slide 9 – Event Listeners and Event Handling:** `element.addEventListener("event", callback)` with click listeners and live typing watchers.
10. **Slide 10 – Event Object & Form Handling:** Inspecting `event.target`, `event.type`, and why `event.preventDefault()` is mandatory in single-page apps.
11. **Slide 11 – Practical: Interactive Student Profile:** Complete working interactive application featuring input reading, error validation, dynamic rendering, and input reset.

### SECTION 3 – ASYNCHRONOUS JAVASCRIPT (Slides 12–18)
12. **Slide 12 – Synchronous vs Asynchronous JavaScript:** Single-threaded execution, blocking vs non-blocking flows, and the background execution timeline.
13. **Slide 13 – What are Callbacks?:** Function arguments, synchronous callbacks, asynchronous timer callbacks, and common use cases.
14. **Slide 14 – The 'Callback Hell' Problem:** Nested asynchronous flows, the "Pyramid of Doom", readability challenges, and maintenance costs.
15. **Slide 15 – What is a Promise?:** Placeholder object representing eventual completion/failure with 3 states (`Pending`, `Fulfilled`, `Rejected`).
16. **Slide 16 – Promise Chaining:** Linear sequential asynchronous operations using chained `.then()` handlers and unified `.catch()` error handling.
17. **Slide 17 – What is async/await?:** Syntactic sugar over Promises, non-blocking execution semantics, and returning Promises from `async` functions.
18. **Slide 18 – Callbacks vs Promises vs Async/Await:** 3-way feature matrix and side-by-side code blocks solving the exact same delayed task.

### SECTION 4 – FETCH API, JSON AND ERROR HANDLING (Slides 19–22)
19. **Slide 19 – What is the Fetch API?:** Issuing HTTP requests, Promise resolution, and the critical `response.ok` status verification guardrail.
20. **Slide 20 – What is JSON?:** JavaScript Object Notation format, `JSON.stringify()` (serialization), and `JSON.parse()` (deserialization).
21. **Slide 21 – Handling API Requests Using Async/Await:** Modern idiomatic pattern combining `fetch()`, `response.ok`, and `await response.json()`.
22. **Slide 22 – Error Handling Using try/catch/finally:** Catching network dropouts, HTTP rejections, and utilizing `finally` for loading spinner/button cleanup.

### SECTION 5 – ES MODULES (Slides 23–24)
23. **Slide 23 – What are ES Modules?:** File organization, separation of concerns, `export`/`import` syntax, and `<script type="module">`.
24. **Slide 24 – Named Export vs Default Export:** Multiple named exports `{ add, subtract }` vs single default export and local development server requirements.

### SECTION 6 – PRACTICAL PROJECT: USER EXPLORER (Slide 25)
25. **Slide 25 – Practical Project: User Explorer Application:** Complete modular application fetching remote JSON user records:
    - Tabbed file inspector for `js/api.js`, `js/ui.js`, `js/main.js`, and `index.html`.
    - Live interactive sandbox with "Load Users" button, live loading indicators, and user card grid rendering!

---

## 🛠️ Practical Projects Setup & Architecture

### Practical Project 1: Student Profile (Slide 11)
```javascript
const input = document.getElementById("nameInput");
const button = document.getElementById("showButton");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  const name = input.value.trim();
  if (name === "") {
    result.textContent = "Please enter your name";
    result.style.color = "#DC2626";
    return;
  }
  result.textContent = `Welcome, ${name}!`;
  result.style.color = "#059669";
  input.value = "";
});
```

### Practical Project 2: User Explorer (Slide 25)
Project File Structure:
```
user-explorer/
├── index.html
├── style.css
└── js/
    ├── api.js     # export async function fetchUsers()
    ├── ui.js      # export function renderUsers() & showStatus()
    └── main.js    # application entry & event coordination
```

---

## 🖥️ Presentation Controls & Keyboard Shortcuts

* `→` or `Space` / `PageDown`: Next Slide
* `←` or `PageUp`: Previous Slide
* `Home` / `End`: First / Last Slide
* `F`: Toggle Fullscreen Mode
* `T`: Table of Contents Drawer (Jump to any slide)
* `?`: Keyboard Help Overlay
* `Esc`: Close open drawers and modals

---

## 🚀 How to Open the Presentation

Simply open `index.html` in any web browser:
```powershell
Start-Process "c:\Users\ADMIN\OneDrive\Desktop\HACA\Presentation\JavaScript\javascript-basics-day-3\index.html"
```
No external bundlers, servers, or libraries are required to run the slide deck.
