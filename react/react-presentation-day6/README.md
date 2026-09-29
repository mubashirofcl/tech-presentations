# React Day 6 — React Forms: Form Submission, Validation & Import/Export

Interactive developer presentation and educational demonstration deck for React Day 6.

---

## 🎯 Main Topics Covered

1. **Form Submission in React**: `<form>`, `onSubmit`, `handleSubmit`, `event.preventDefault()`, and controlled inputs.
2. **Form Validation**: Checking required fields with `.trim()`, verifying email patterns with Regex, numeric age comparisons with `Number()`, and managing validation errors in state.
3. **Importing & Exporting**: Default exports (`export default`) vs Named exports (`export function`), importing components, exporting utility functions (`utils/validation.js`), and standard project organization.
4. **Interactive Working Student Registration Form**: Live student registration sandbox with inline validation errors and success summary display.

---

## 🚀 How to Run the Presentation

The presentation is built with 100% pure **Vanilla HTML5, CSS3, and JavaScript**. No build step, no npm packages, and no web server required!

### Option 1: Direct File Opening
Double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Local HTTP Server (Optional)
If using VS Code / Antigravity IDE Live Server or python:
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

- **Slide 1:** Title — React Forms: Form Submission, Validation & Import/Export
- **Slide 2:** Learning Objectives
- **Slide 3:** What Happens When a Form Is Submitted? (Browser default vs React handling)
- **Slide 4:** Basic React Form (`<form>`, `<input>`, `<button type="submit">`)
- **Slide 5:** Using the `onSubmit` Event
- **Slide 6:** Understanding `onSubmit` Flow (`onSubmit` belongs on the `<form>`)
- **Slide 7:** Why Do We Use `preventDefault()`? (Stopping unwanted page reload)
- **Slide 8:** Complete Basic Submission Example
- **Slide 9:** Getting Form Values (Controlled Inputs with `useState`)
- **Slide 10:** Form Submission Flow (Interactive 8-Stage Stepper)
- **Slide 11:** Multiple Form Fields in One State Object (`[name]: value`)
- **Slide 12:** What Is Form Validation? (Data rules & integrity)
- **Slide 13:** Why Validate Forms? (Immediate user feedback)
- **Slide 14:** Required Field Validation & `.trim()`
- **Slide 15:** Email Validation & Pattern Matching
- **Slide 16:** Number Validation & String Conversion (`Number(form.age) >= 18`)
- **Slide 17:** The Dedicated `validateForm` Function
- **Slide 18:** Handling Validation Errors (`Object.keys(errors).length > 0`)
- **Slide 19:** Displaying Error Messages in JSX (`{errors.name && <p>...}`)
- **Slide 20:** Complete Validation Flow Diagram (Interactive Decision Tree)
- **Slide 21:** Comprehensive `validateForm` Example
- **Slide 22:** Interactive Working Student Registration Form Demo
- **Slide 23:** Form State Architecture (`form` vs `errors` state)
- **Slide 24:** Handling Input Changes Dynamically (`[name]: value`)
- **Slide 25:** Complete `handleSubmit` Function
- **Slide 26:** Complete `StudentForm.jsx` Component
- **Slide 27:** Why Import and Export? (Modularity & reusability)
- **Slide 28:** Exporting a Component (`export default Header`)
- **Slide 29:** Importing a Default Export (`import Header from "./Header"`)
- **Slide 30:** Named Exports (`export function Header`)
- **Slide 31:** Multiple Named Exports in One File (`import { Header, Footer }`)
- **Slide 32:** Default vs Named Exports Comparison Matrix
- **Slide 33:** Exporting Reusable Utility Functions (`utils/validation.js`)
- **Slide 34:** Organizing a Small React Project (`components/`, `utils/`, `App.jsx`)
- **Slide 35:** Mini Project Requirements (Student Registration App)
- **Slide 36:** Complete Mini Project Directory Layout
- **Slide 37:** Interactive Project Architecture & Module Linker
- **Slide 38:** Common Beginner Mistakes & Fixes (6 critical traps)
- **Slide 39:** Quick Classroom Quiz (10 Interactive Questions with Show/Hide Answers)
- **Slide 40:** Final Summary & Master React Form Lifecycle
