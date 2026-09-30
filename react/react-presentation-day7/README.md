# React Day 7 — React Lifecycle, useEffect & Creating Custom Hooks

Interactive developer presentation and educational demonstration deck for React Day 7.

---

## 🎯 Main Topics Covered

1. **React Component Lifecycle**: Understanding how components are created, re-rendered, and destroyed (Mounting, Updating, Unmounting).
2. **Side Effects**: Why web applications require external synchronization (data fetching, timers, document titles, window event listeners).
3. **`useEffect` Hook**: Syntax, execution timing after render, and synchronization mental models.
4. **The Dependency Array**: How React determines when to re-execute effects (`no array`, empty array `[]`, and reactive dependencies `[count]`).
5. **Effect Cleanup**: Preventing memory leaks and stopping intervals/listeners via `return () => { ... }`.
6. **Common useEffect Pitfalls**: Missing dependencies, forgetting cleanup, and unintended infinite re-render loops.
7. **Custom Hooks**: Encapsulating and reusing stateful logic across multiple components (`useCounter`, `useDocumentTitle`).
8. **Practical Mini Project: Counter Dashboard**: Complete application combining `useCounter` and `useDocumentTitle`.
9. **Common Beginner Mistakes & Classroom Quiz**: 6 common mistakes and 10 interactive review questions.

---

## 🚀 How to Run the Presentation

The presentation is built with 100% pure **Vanilla HTML5, CSS3, and JavaScript**. No build step, no npm packages, and no web server required!

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
| <kbd>End</kbd> | Jump to Slide 40 (Summary) |
| <kbd>T</kbd> | Toggle Slide Index Drawer (Table of Contents) |
| <kbd>F</kbd> | Toggle Fullscreen Mode |
| <kbd>?</kbd> | Open Keyboard Shortcuts Help Modal |
| <kbd>Esc</kbd> | Close any open drawer or modal |

---

## 📂 Slide Directory Overview (40 Slides)

- **Slide 1:** Title — React Lifecycle & useEffect (Lifecycle, Effects & Custom Hooks)
- **Slide 2:** Learning Objectives
- **Slide 3:** Section 1 — What Is the React Lifecycle?
- **Slide 4:** Three Main Lifecycle Stages (Mounting, Updating, Unmounting)
- **Slide 5:** Stage 1: Mounting (Creation & DOM Insertion)
- **Slide 6:** Stage 2: Updating (State & Prop Changes)
- **Slide 7:** Stage 3: Unmounting (Teardown & Cleanup)
- **Slide 8:** Interactive Lifecycle Diagram (Clickable Mount, Update, Unmount Tabs)
- **Slide 9:** Section 2 — What Is a Side Effect?
- **Slide 10:** Why Do We Need useEffect? (Synchronizing with External Systems)
- **Slide 11:** What Is useEffect? (Basic Hook Syntax)
- **Slide 12:** Basic useEffect (No Dependencies — Runs After Every Render)
- **Slide 13:** useEffect with Empty Dependency Array (`[]` — Runs on Mount)
- **Slide 14:** useEffect with Dependencies (`[count]` — Runs on Value Change)
- **Slide 15:** The Dependency Array Rules
- **Slide 16:** Three Common useEffect Patterns (Side-by-side comparison)
- **Slide 17:** Section 3 — Updating Document Title (Live Interactive Counter & Tab Sync Demo)
- **Slide 18:** useEffect with a Timer (`setInterval` & `clearInterval`)
- **Slide 19:** What Is Effect Cleanup?
- **Slide 20:** Cleanup in Action (Live Mount/Unmount Timer Simulator)
- **Slide 21:** Cleaning Up Event Listeners (`window.addEventListener("resize", ...)`)
- **Slide 22:** Section 4 — Common useEffect Mistakes
- **Slide 23:** The Infinite Effect Loop (`setCount(count + 1)` Inside Dependencies)
- **Slide 24:** useEffect Decision Guide (Interactive Synchronization Tree)
- **Slide 25:** Section 5 — What Is a Custom Hook?
- **Slide 26:** Why Create Custom Hooks? (Eliminating Duplicated Logic)
- **Slide 27:** Rules for Custom Hooks (`use` Prefix, Top-level Calls)
- **Slide 28:** Creating the `useCounter` Hook (`src/hooks/useCounter.js`)
- **Slide 29:** Using `useCounter` in a Component (Live Demo)
- **Slide 30:** Custom Hook Data Flow (Hook = Brain, Component = Face)
- **Slide 31:** Custom Hooks with useEffect (`useDocumentTitle`)
- **Slide 32:** Custom Hook Project Structure (`src/components/`, `src/hooks/`)
- **Slide 33:** Section 6 — Practical Project: Counter Dashboard
- **Slide 34:** Dashboard Architecture
- **Slide 35:** Step 1: `useCounter` Code Implementation
- **Slide 36:** Step 2: `useDocumentTitle` Code Implementation
- **Slide 37:** Step 3: Using Both Hooks Together (Live Counter Dashboard Simulation)
- **Slide 38:** Section 7 — Common Mistakes to Avoid
- **Slide 39:** Quick Classroom Quiz (10 Interactive Questions)
- **Slide 40:** Final Summary & Key Takeaways

---

## 🎨 Theme & Technology Stack

- **Theme:** Modern React Developer Studio (Obsidian Canvas `#060A12`, Surface `#0B1322`, React Cyan `#00D8FF`, Sky Cyan `#38BDF8`, Emerald `#10B981`, Amber `#F59E0B`, Purple `#A855F7`).
- **Typography:** `Inter` for clean presentation text; `JetBrains Mono` and `Fira Code` for code blocks and lifecycle diagrams.
- **Interactive Demos:**
  1. Clickable Lifecycle Diagram (Mounting, Updating, Unmounting breakdown).
  2. Live Counter & Document Title Synchronizer with simulated browser tab and real-time effect execution logger.
  3. Live Component Mount/Unmount Timer Simulator with visual cleanup verification.
  4. Live `useCounter` and `Counter Dashboard` mini-project demonstration.
  5. 10-Question Classroom Quiz with individual toggle buttons and bulk reveal/hide controls.
