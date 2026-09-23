# React.js Week 1 — React Fundamentals, Vite, JSX, Components, Rendering, SPA/CSR, Props & State

A complete, interactive teaching presentation deck designed specifically for beginner MERN Stack developers and classroom instructors.

Part of the **HACA Developer Learning Platform** (alongside JavaScript Masterclass, MongoDB Masterclass, and Node.js + Express.js Masterclass).

---

## 🎯 Pedagogical Principles & Curriculum Flow

The presentation follows a strict, step-by-step foundation order so students understand what React is and how an application works before encountering hooks or advanced topics:

```
React Basics ➔ Environment ➔ Vite ➔ Project Structure ➔ JSX ➔ Components ➔ Rendering ➔ SPA/CSR ➔ Props ➔ State ➔ Re-rendering ➔ Lifting State
```

### Critical Teaching Rules Adhered To:
- **Zero advanced hooks in Week 1**: `useEffect`, `useRef`, `useMemo`, `useCallback`, `useContext`, Redux, React Router, and API calls are deliberately excluded to ensure students build a clean foundation first.
- **Pure JavaScript connection**: Reinforces that React does not replace JavaScript, but is built entirely on modern ES6+ concepts.
- **Component purity & immutability**: Teaches why props are read-only and why state must never be directly mutated.
- **Virtual DOM clarity**: Dispels the common misconception that state updates tear down the entire browser DOM.

---

## 🌟 Key Features

1. **Complete 21-Section Curriculum**:
   - **Section 1: Introduction to React** (Definition, Meta origin, Component architecture tree, Imperative vs Declarative UI).
   - **Section 2: React Environment** (Node.js runtime, npm package manager, package.json dependencies, version verification).
   - **Section 3: Introduction to Vite** (What is Vite, why created, Vite vs CRA comparison matrix, Native ES modules, HMR, production build with `dist/`, `vite.config.js`).
   - **Section 4: Project Setup** (`npm create vite@latest`, template selection, `npm install`, `npm run dev`).
   - **Section 5: Vite Project Structure** (File tree breakdown, `index.html` root, `main.jsx` createRoot flow, `App.jsx`, `components/` convention).
   - **Section 6: Understanding Components** (Functional components, function declaration vs arrow syntax, PascalCase naming rule vs HTML tags, component architecture, DRY reusability).
   - **Section 7: JSX (JavaScript XML)** (Definition, compilation to `React.createElement`, JSX vs HTML comparison, 5 golden rules, React Fragments, `{}` JavaScript expressions, renderable types vs plain objects).
   - **Section 8: Rendering and Re-rendering** (Initial render flow pipeline, re-render definition, triggers: state, parent render, changed props).
   - **Section 9: Virtual DOM and Reconciliation** (In-memory UI representation, diffing algorithm, minimal DOM patching flowchart).
   - **Section 10: Single Page Applications (SPA)** (Definition, MPA vs SPA visual comparison).
   - **Section 11: Client-Side Rendering (CSR)** (Browser download & execution flow, benefits, challenges, ecosystem solutions).
   - **Section 12: Props** (Definition, passing props, destructuring, prop data types, read-only immutability rule).
   - **Section 13: State** (Definition, `useState` hook syntax, state counter, updater function).
   - **Section 14: Props vs State** (Structured comparison matrix, simple memory rule).
   - **Section 15: State and Re-rendering** (State update lifecycle pipeline, no direct mutation, immutability with objects & spread operator).
   - **Section 16: Lifting State Up** (The sibling sharing problem, lifting to common parent, callback communication).
   - **Section 17: One-Way Data Flow** (Top-down props, bottom-up callback events).
   - **Section 18: Preventing Unnecessary Re-rendering** (State locality, component splitting, derived values).
   - **Section 19: Practical Exercises** (Practicals 1 to 5 with live interactive previews).
   - **Section 20: Common Beginner Mistakes** (Top 10 mistakes with bad vs good code comparisons).
   - **Section 21: Complete Architecture & Data Flow** (Global concept map + Technical application flow).
   - **Final Revision Section** (Grouped Q&A revision bank with interactive answer reveals).
   - **Final Slide** (Mastery checklist + Next Week preview).

2. **Interactive Teaching Sandboxes**:
   - **Interactive State Counter Sandbox**: Live button clicks trigger state updates, displaying the previous state value and counting re-renders with a visual DOM patch flash.
   - **Interactive Lifting State Up Sandbox**: Live keystrokes in `<InputChild />` update `<App />` state, which instantly flows down to update `<DisplayChild />`.
   - **Revision Accordion**: Click-to-reveal model answers for classroom quizzes.

3. **Teacher Speaker Notes Drawer**:
   - Press <kbd>S</kbd> or click **Speaker Notes** on any slide to slide out structured teacher guidance:
     - 🎤 **How to Introduce This Concept**
     - 💡 **Real-World Analogy**
     - ⚠️ **Common Student Misunderstanding**
     - 🗣️ **Short Verbal Demonstration**
     - ❓ **Question to Ask the Class**

4. **Light Blue Educational Design System**:
   - Matches the HACA educational platform aesthetics (`#F8FAFC`, `#2563EB`, `#0EA5E9`, `#00B4D8`, `#0F172A`).
   - Clean, high-readability typography (`Inter` and `JetBrains Mono`).
   - Responsive layout with dark-mode code editors and copy-to-clipboard buttons.

---

## ⌨️ Keyboard Shortcuts & Controls

| Shortcut | Action |
| :--- | :--- |
| `→` / `Space` / `PageDown` | Next Slide |
| `←` / `PageUp` | Previous Slide |
| `Home` | Jump to First Slide |
| `End` | Jump to Last Slide |
| `S` | Toggle Teacher Speaker Notes Drawer |
| `T` | Toggle Syllabus / Table of Contents Drawer |
| `F` | Toggle Fullscreen Presentation Mode |
| `Esc` | Close Open Drawers / Exit Fullscreen |
| `Swipe Left / Right` | Touch navigation for Tablets & Mobile Devices |

---

## 🚀 How to Run

1. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
2. Or serve via any local static server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```
