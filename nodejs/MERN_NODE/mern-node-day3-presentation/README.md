# Node.js Day 3 — Promises & Async/Await

> **Course:** Day 3 — MERN Stack Development (Node.js Track)
> **Title:** Node.js Day 3: Promises & Async/Await
> **Subtitle:** Managing Asynchronous Operations in Node.js
> **Audience:** Beginner to intermediate students who completed Day 2 (timers, callbacks, callback hell).

An interactive 20-slide deck built with **HTML5, CSS3, and Vanilla JavaScript** only. No frameworks, no packages, no build step. It reuses the Day 2 light-blue and white theme.

---

## Files

```text
node-day3-presentation/
├── index.html   # All 20 slides (semantic HTML)
├── style.css    # Theme, layouts, code blocks, responsive and print styles
├── script.js    # Navigation, progress bar, keyboard controls, fullscreen, copy-code
└── README.md    # This file
```

---

## How to Open

Double-click `index.html`, or right-click and choose **Open with** Chrome, Edge, Firefox, or Safari.

Optional local server:

```bash
npx serve node-day3-presentation
# or
python -m http.server 8000
```

The code examples on the slides are for students to copy and run in Node.js. The presentation itself never executes them in the browser.

---

## Slide Index

| Section | Slide | Topic |
|---|---|---|
| **1: Introduction to Promises** | 01 | Title |
| | 02 | Learning Objectives |
| | 03 | Why Do We Need Promises? |
| **2: Understanding Promises** | 04 | What Is a Promise? |
| | 05 | Three Promise States |
| | 06 | Creating a Promise Using `resolve()` |
| | 07 | Creating a Promise Using `reject()` |
| **3: Handling Promises** | 08 | Understanding `then()` |
| | 09 | Understanding `catch()` |
| | 10 | Understanding `finally()` |
| | 11 | Promise Chaining |
| **4: Understanding async/await** | 12 | What Is async/await? |
| | 13 | Understanding `async` |
| | 14 | Understanding `await` |
| | 15 | Promise vs async/await |
| **5: Error Handling with async/await** | 16 | `try/catch` with async/await |
| | 17 | Practical Login Workflow (demonstration only) |
| **6: Final Practical Implementation** | 18 | Mini Project Overview |
| | 19 | Complete Practical Project (Student Enrollment System) |
| | 20 | Practice Tasks and Key Takeaways |

---

## Navigation

| Control | Action |
|---|---|
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `F` | Toggle fullscreen |
| `T` or `M` | Open the slide navigation panel (Contents) |
| `?` or `H` | Open the shortcuts list |
| `Esc` | Close the panel or list |

On screen: **Previous** / **Next** buttons, a slide counter (`01 / 20`), a progress bar along the top, a **Contents** drawer to jump to any slide, a **Fullscreen** button, and a **Copy Code** button on every code panel.

Shortcuts are ignored while typing in an input, textarea, or editable element, and when Ctrl, Cmd, or Alt is held. The URL hash (`#slide-1` to `#slide-20`) follows the current slide, so a slide can be linked directly.

Printing the page (Ctrl/Cmd + P) gives one slide per page for handouts or PDF export.

---

## Running the Examples

Each code panel shows its filename. Copy it into a file and run:

```bash
node order.js
```

The examples use plain JavaScript that works in Node.js with CommonJS or ES modules. They need no `npm install`.

---

## Notes

- Slide 12 shows a syntax pattern only (`somePromise()` is a placeholder). Every other code panel is runnable.
- Slide 15 shows `getUser()` in the first panel. The second panel reuses it.
- Slide 17 is a simulated login for teaching. It is not real authentication.
- On slide 19, `registerStudent()` performs the validation and the simulated save, and `enrollCourse()` performs the enrollment.
