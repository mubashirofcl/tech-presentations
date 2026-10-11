# React Day 10 — Introduction to Redux & Setting Up Redux with React

Interactive educational developer presentation deck and classroom demonstration engine for **React Day 10: Introduction to Redux & Setting Up Redux with React**.

---

## 🎯 Main Topics Covered

1. **What is State in React:** Component memory, reactivity, and local state management with `useState()`.
2. **When State Management Becomes Difficult:** Multi-component state sharing in real applications (e.g., e-commerce cart badge, product page, cart view, checkout).
3. **What is Prop Drilling:** Passing props down multiple layers, why it leads to fragile code, and when it is acceptable vs problematic.
4. **What is Redux:** Predictable centralized state container, single source of truth, and separating state management from UI rendering.
5. **Why Use Redux:** Predictable state transitions, centralized updates, time-travel debugging, and when simple local state or Context API suffices.
6. **What is Redux Toolkit (RTK):** Modern, official, opinionated Redux standard. Eliminating boilerplate with `configureStore()` and `createSlice()`.
7. **Redux vs Redux Toolkit vs React Redux:** Deep dive into the distinct roles of the three packages and how they work in harmony.
8. **Redux Data Flow:** Unidirectional state cycle (User Interaction ➔ Action ➔ Reducer ➔ Store ➔ React UI Re-render).
9. **Core Concepts:** Store, Actions, and Reducers explained with concrete counter examples.
10. **Redux Slices & Immer:** Grouping initial state, reducers, and auto-generated action creators. Safe direct mutation syntax enabled by Immer.
11. **Project Setup & Dependencies:** Scaffolding with Vite, installing `@reduxjs/toolkit` and `react-redux`.
12. **Project Architecture:** Clean feature-based directory structure (`app/store.js`, `features/counter/counterSlice.js`, `components/Counter.jsx`).
13. **Step-by-Step Implementation:**
    - Step 1: Create `counterSlice.js`
    - Step 2: Configure store in `store.js`
    - Step 3: Wrap app with `<Provider store={store}>` in `main.jsx`
    - Step 4: Read state with `useSelector()` and dispatch actions with `useDispatch()` in `Counter.jsx`
    - Step 5: Mount in `App.jsx` and test expected behavior
14. **Summary, Classroom Q&A, and Practice Task:** 8 interactive question cards and the "Increment by 5" challenge.

---

## 🚀 How to Run the Presentation

The presentation is built with 100% pure **Vanilla HTML5, CSS3, and JavaScript**. No build steps, no npm packages, and no web server required!

### Option 1: Direct File Opening
Double-click `index.html` or drag it directly into any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Local HTTP Server (Optional)
If using VS Code / Antigravity IDE Live Server or Python:
```bash
python -m http.server 8080
# Open http://localhost:8080/react/react-presentation-day10/ in your browser
```

---

## ⌨️ Keyboard Shortcuts & Presentation Controls

| Key | Action |
| :--- | :--- |
| <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd> | Advance to Next Slide |
| <kbd>←</kbd> / <kbd>PageUp</kbd> | Return to Previous Slide |
| <kbd>Home</kbd> | Jump to Slide 1 (Title) |
| <kbd>End</kbd> | Jump to Slide 22 (Summary & Practice) |
| <kbd>T</kbd> | Toggle Slide Index Drawer (Table of Contents with live filter) |
| <kbd>F</kbd> | Toggle Fullscreen Mode |
| <kbd>?</kbd> | Open Keyboard Shortcuts Help Modal |
| <kbd>Esc</kbd> | Close any open drawer or modal |

---

## 🎮 Built-in Classroom Interactive Features

1. **Animated Redux Data Flow (Slide 10):** Step-by-step visual animation demonstrating user click ➔ dispatch ➔ reducer ➔ store update ➔ UI re-render.
2. **Interactive Redux Counter Sandbox (Slide 20):** Live demonstration of the counter app with real-time action dispatch logging (`dispatch(counter/increment)`) and state snapshots.
3. **Interactive Classroom Q&A (Slide 22):** 8 expandable question-and-answer cards designed for teacher-student classroom discussions.
4. **Copy-to-Clipboard Code Windows:** One-click copy buttons on all code examples with instant visual confirmation toast.
5. **Table of Contents Drawer:** Searchable slide drawer to jump directly to any topic.
