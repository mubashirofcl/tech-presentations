# React Day 5: React Hooks, State, useState & Controlled Components

A complete, beginner-friendly interactive educational presentation deck covering **React Hooks, State vs Props, the `useState()` Hook, Re-rendering cycles, and Controlled Form Components**.

---

## 🎯 Educational Focus & Core Idea

Day 5 centers on two practical capabilities students must master in React:
1. **Component State (`useState`)** — Giving functional components memory so they can store and update changing data over time.
2. **Controlled Components** — Managing user form input (text inputs, textareas, selects, checkboxes) through React state as the single source of truth.

### Core Mental Model
```text
User Action / Input
       ↓
  Event Trigger (onChange / onClick)
       ↓
  Setter Function (setState)
       ↓
  React State Updates
       ↓
  Component Re-renders
       ↓
  Screen UI Updates
```

---

## 📂 Project Structure

```text
react-presentation-day5/
│
├── index.html       # 40 Complete Educational Slides + Interactive Demos + Form Sandbox Modal + TOC Drawer
├── style.css        # Modern React Dark Developer Theme (React Cyan & Slate Palette)
├── script.js        # Slide Navigation Engine, Keyboard Controller, Live Demos & Form Sandbox
└── README.md        # Syllabus Breakdown & Classroom Guide
```

---

## 🚀 How to Launch

1. Open `index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Brave, Firefox, Safari).
2. **No build tools, no npm install, no dev servers required.** Runs 100% locally with pure HTML5, CSS3, and Vanilla JavaScript.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `ArrowRight` / `Space` / `PageDown` | Next Slide |
| `ArrowLeft` / `PageUp` | Previous Slide |
| `Home` | First Slide (Title Screen) |
| `End` | Last Slide (Summary & Recap) |
| `F` | Toggle Fullscreen Mode |
| `P` | Toggle Interactive Form Sandbox Modal |
| `T` or `M` | Toggle Slide Index Drawer (40 Slides) |
| `?` | Keyboard Shortcuts Help |
| `Esc` | Close any active modal or drawer |

---

## 🛠️ Interactive Features

1. **Interactive Form Sandbox (`P` or header button):**
   - Live client-side simulation of a multi-input controlled form.
   - Shows form fields and live JSON representation of the React state object in real time.
2. **In-Slide `useState` Syntax Inspector (Slide 10):**
   - Clickable interactive buttons to inspect the 3 parts: `count` (current state), `setCount` (updater function), and `0` (initial value).
3. **In-Slide Live Counter (Slide 11):**
   - Real-time increment, decrement, and reset buttons simulating React state re-renders.
4. **Animated State Update Flow (Slide 12):**
   - Step-by-step visual animation demonstrating the 5 phases of a state update.
5. **Live State Type Demonstrations:**
   - **String State Demo (Slide 15):** Changes student name dynamically.
   - **Boolean State Toggle (Slide 16):** Shows and hides secret course details.
   - **Array State Updater (Slide 17):** Appends skills dynamically using the spread operator.
   - **Controlled Text Input Demo (Slide 24):** Real-time greeting synchronization as you type.
   - **Controlled Textarea Demo (Slide 27):** Real-time character counter (`0 / 100`).
   - **Controlled Select Dropdown (Slide 28):** Real-time course selection.
   - **Controlled Checkbox Demo (Slide 29):** Toggles boolean `e.target.checked`.
6. **Student Registration Form Mini-Project (Slide 35):**
   - Full student registration form with name, email, age, course, and gender.
   - Renders a styled student profile card upon submission using `e.preventDefault()`.
7. **Interactive Classroom Quiz (Slide 39):**
   - 10 quiz questions with individual "Show Answer" toggle buttons.
8. **One-Click Code Copy:**
   - Every code block has a copy button with visual `"Copied!"` feedback and toast notifications.
9. **Slide Index Drawer (`T`):**
   - Instant drawer access to all 40 slides with progress tracking.

---

## 📚 40-Slide Complete Syllabus Breakdown

1. **Slide 1 — Title Screen:** React Hooks — State, useState & Controlled Components
2. **Slide 2 — Learning Objectives:** 8 core mastery checkpoints
3. **Slide 3 — What Are React Hooks?:** Built-in functions that give functional components state & lifecycle capabilities
4. **Slide 4 — Why Were Hooks Introduced?:** Replacing class component boilerplate with clean functional code
5. **Slide 5 — Functional Components Before State:** Why static props are not enough when data needs to change
6. **Slide 6 — What Is State in React?:** Component memory and the State &rarr; Re-render &rarr; UI cycle
7. **Slide 7 — Props vs State:** Clean comparison table and side-by-side code example
8. **Slide 8 — Why Do We Need State?:** Why plain variables (`let count = 0`) fail to re-render React components
9. **Slide 9 — What Is `useState()`?:** Visual syntax breakdown of array destructuring: `[count, setCount]`
10. **Slide 10 — Understanding `useState()` Parts:** Interactive inspector for state, setter, and initial value
11. **Slide 11 — First Counter Example & Live Demo:** Full code and functional interactive counter
12. **Slide 12 — How State Updates Work:** 5-phase re-rendering lifecycle animation
13. **Slide 13 — Separating Handlers from JSX:** Best practices for writing clean named handler functions
14. **Slide 14 — Different Types of State:** Numbers, strings, booleans, arrays, and objects
15. **Slide 15 — Updating String State Demo:** Interactive name changer demo
16. **Slide 16 — Updating Boolean State Demo:** Inverting booleans (`!isOpen`) for show/hide toggles
17. **Slide 17 — Updating Array State Demo:** Using the spread operator (`[...skills, "React"]`) to avoid direct mutation
18. **Slide 18 — Updating Object State:** Copying existing properties with spread (`{ ...user, name: "Arun" }`)
19. **Slide 19 — Functional State Updates:** Passing callbacks `prev => prev + 1` for guaranteed state synchronization
20. **Slide 20 — Common useState Mistakes:** Direct mutation vs setter function comparison
21. **Slide 21 — The Two Rules of Hooks:** Top-level calling only, and React functions only
22. **Slide 22 — What Is a Controlled Component?:** Form inputs whose values are governed by React state
23. **Slide 23 — Normal vs Controlled Inputs:** DOM-managed uncontrolled vs state-managed controlled inputs
24. **Slide 24 — Basic Controlled Input Live Demo:** Interactive greeting input typing in real time
25. **Slide 25 — Understanding `onChange` & `e.target.value`:** Step-by-step event object breakdown
26. **Slide 26 — Controlled Input Data Flow Diagram:** The circular state &rarr; value &rarr; DOM &rarr; onChange &rarr; state loop
27. **Slide 27 — Controlled Textarea & Char Counter:** Measuring `.length` with live interactive demo
28. **Slide 28 — Controlled Select Dropdowns:** Setting active selected options via React state
29. **Slide 29 — Controlled Checkbox & `e.target.checked`:** Why checkboxes use `checked` instead of `value`
30. **Slide 30 — Multiple Form Fields in One State:** Managing form state objects cleanly with spread updates
31. **Slide 31 — Handling Form Submit & `preventDefault()`:** Stopping full browser page reloads
32. **Slide 32 — Complete Controlled Form Code:** Full working code for `StudentForm` with live preview
33. **Slide 33 — Mini Project: Student Registration:** Requirements and skills practiced
34. **Slide 34 — Mini Project Data Flow:** Complete data movement diagram from typing to card render
35. **Slide 35 — Display Submitted Data Sandbox:** Live form demo rendering submitted profile cards
36. **Slide 36 — Common Form & State Mistakes:** 6 critical errors with red/green visual badges
37. **Slide 37 — useState & Forms Cheat Sheet:** Fast syntax reference for state declarations and updates
38. **Slide 38 — Key Concepts & Architecture Map:** Master diagrams for React State Cycle & Controlled Loop
39. **Slide 39 — Quick Classroom Quiz:** 10 questions with interactive "Show Answer" buttons
40. **Slide 40 — Final Summary & Takeaway:** Core summary and the master rule: *"State makes React interfaces interactive."*
