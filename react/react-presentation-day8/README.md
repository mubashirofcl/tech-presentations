# React Day 8 — Context API

Interactive educational developer presentation deck and demonstration studio for **React Day 8: Context API**.

---

## 🎯 Main Topics Covered

1. **Why Context API Is Needed**: The real architectural pain of prop drilling across deeply nested components.
2. **Prop Drilling**: Passing data through middle components that do not consume the props themselves.
3. **What Context API Is**: React's built-in mechanism for broadcasting state down a component tree without prop threading.
4. **Creating Context**: Using `createContext(defaultValue)` and setting fallback defaults.
5. **Provider Component**: Creating `<Context.Provider value={...}>`, broadcasting state, and controlling provider scope.
6. **Consuming Context**: Using the modern `useContext(Context)` Hook to read data without prop parameters.
7. **Multiple Values & Functions**: Supplying complex state objects and action handlers (e.g. login/logout).
8. **Theme Context Example**: Real-time reactive theme toggling (Dark Mode / Light Mode).
9. **Practical Project — User Dashboard**: Developing an organized, multi-file React application (`src/context/`, `src/components/`, `App.jsx`).
10. **Common Mistakes & Classroom Quiz**: 6 beginner traps and a 5-question interactive multiple-choice quiz.

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

## 🎮 5 Built-in Interactive Demonstrations

1. **Demo 1 — Prop Drilling Simulator (Slide 5):** Watch the user prop travel hand-to-hand down through App → Header → UserMenu → Profile → Avatar with step-by-step animations and quotes.
2. **Demo 2 — Context Direct Broadcast (Slide 6):** Visual proof showing `UserContext.Provider` transmitting data directly to `Profile` with zero props passed through intermediate nodes.
3. **Demo 3 — Create → Provide → Consume Stage Cards (Slide 24):** Clickable architectural pillars detailing syntax and purpose of each phase.
4. **Demo 4 — Live User Context Simulator (Slide 25):** Live inputs for Name, Role, and Email reactively updating the `<Profile />` consumer preview and Provider code in real time!
5. **Demo 5 — Theme Context Switcher (Slide 30):** Live Dark/Light mode theme toggle updating UI styles and displaying the active `<ThemeContext.Provider value={theme}>`.

---

## 📂 Slide Directory Overview (40 Slides)

### Section 1 — Introduction (Slides 1–6)
- **Slide 1:** Title — React Context API
- **Slide 2:** Learning Objectives
- **Slide 3:** Passing Data Between Components (Props Baseline)
- **Slide 4:** What Is Prop Drilling?
- **Slide 5:** Prop Drilling Problem *(with Interactive Demo 1)*
- **Slide 6:** The Solution: Context *(with Interactive Demo 2)*

### Section 2 — Context API (Slides 7–9)
- **Slide 7:** What Is Context API?
- **Slide 8:** Interactive Context Flow Diagram
- **Slide 9:** Context Is Not Automatically Global State

### Section 3 — Creating Context (Slides 10–12)
- **Slide 10:** The `createContext()` Function
- **Slide 11:** Creating Context With a Default Value
- **Slide 12:** Interactive Project File Structure

### Section 4 — Provider (Slides 13–16)
- **Slide 13:** What Is a Provider?
- **Slide 14:** Providing a Value (`value={user}`)
- **Slide 15:** The Provider Tree Hierarchy
- **Slide 16:** Provider Scope & Boundaries (Inside vs Outside)

### Section 5 — Consuming Context (Slides 17–20)
- **Slide 17:** What Is `useContext()`?
- **Slide 18:** Using `useContext()` in Components
- **Slide 19:** Context Flow Example
- **Slide 20:** Props vs Context (Comparison Table)

### Section 6 — Complete Basic Example (Slides 21–24)
- **Slide 21:** Step 1: UserContext.jsx
- **Slide 22:** Step 2: Provider in App.jsx
- **Slide 23:** Step 3: Consume in Profile.jsx
- **Slide 24:** Complete Flow: Create → Provide → Consume *(with Interactive Demo 3)*

### Section 7 — Multiple Values (Slides 25–26)
- **Slide 25:** Providing Multiple Values *(with Interactive Demo 4)*
- **Slide 26:** Context With Functions (Actions & Logout)

### Section 8 — Theme Example (Slides 27–30)
- **Slide 27:** The Classic Theme Context
- **Slide 28:** Create ThemeContext.jsx
- **Slide 29:** Provide Theme in App.jsx
- **Slide 30:** Consume Theme & Interactive Switcher *(with Interactive Demo 5)*

### Section 9 — Practical Project (Slides 31–36)
- **Slide 31:** Mini Project: User Dashboard
- **Slide 32:** Dashboard Project Structure
- **Slide 33:** Dashboard Architecture Flow
- **Slide 34:** Step 1: UserContext.jsx
- **Slide 35:** Step 2: Provider in App.jsx
- **Slide 36:** Step 3: Profile.jsx Consumer

### Section 10 — Review (Slides 37–40)
- **Slide 37:** Common Context Mistakes (6 Warning Cards)
- **Slide 38:** When to Use Context vs Props
- **Slide 39:** Quick Classroom Quiz (5 Questions with Instant Feedback)
- **Slide 40:** Summary & Key Takeaways (*Create → Provide → Consume*)
