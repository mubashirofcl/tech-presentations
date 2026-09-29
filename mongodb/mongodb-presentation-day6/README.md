# MongoDB Day 6 — Mongoose Middleware: Pre/Post Hooks, Validation & Timestamps

Interactive developer presentation and educational demonstration deck for MongoDB Day 6.

---

## 🎯 Main Topics Covered

1. **Pre Hooks (`schema.pre`)**: Intercepting operations before execution, modifying data, accessing `this`, and calling `next()`.
2. **Post Hooks (`schema.post`)**: Reacting to completed database operations, inspecting saved documents via `doc`, and logging results.
3. **Middleware for Validation**: Enforcing custom business rules and halting invalid operations with `next(new Error(...))`.
4. **Timestamps (`{ timestamps: true }`)**: Automatic tracking and management of `createdAt` and `updatedAt`.
5. **Practical Mini Project**: Clean Student model tying all three pillars together.

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

- **Slide 1:** Title — Mongoose Middleware, Pre/Post Hooks, Validation & Timestamps
- **Slide 2:** Learning Objectives
- **Slide 3:** What Is Mongoose Middleware? (Application → Mongoose → Middleware → MongoDB)
- **Slide 4:** What Is a Pre Hook? (`studentSchema.pre("save", ...)`)
- **Slide 5:** Understanding `pre()` (Operation, Middleware Function, `next()`)
- **Slide 6:** Why Use Pre Hooks? (Data trimming, validation, logging, preparation)
- **Slide 7:** Pre Save Hook Example: Data Cleanup (`"   Rahul   "` → `"Rahul"`)
- **Slide 8:** What Is `this` in a Pre Save Hook? (Normal functions vs Arrow functions)
- **Slide 9:** Pre Hook Execution Flow (Interactive Step-by-Step Flow Stepper)
- **Slide 10:** What Is a Post Hook? (`studentSchema.post("save", ...)`)
- **Slide 11:** Pre vs Post Hooks (Detailed Comparison Table)
- **Slide 12:** Post Save Example (What `doc` represents)
- **Slide 13:** Pre + Post Working Together (Complete execution chain)
- **Slide 14:** What Is Validation? (Data integrity, built-in validators)
- **Slide 15:** Built-in Validation vs Custom Validation (When to use which)
- **Slide 16:** Validation Middleware & Decision Flow (`next(new Error(...))`)
- **Slide 17:** How `next()` Works (Continue vs Stop with Error)
- **Slide 18:** Complete Validation Example (Interactive Live Testing Sandbox)
- **Slide 19:** Important Validation Best Practice (Built-in schema rules vs middleware)
- **Slide 20:** What Are Timestamps? (`createdAt` & `updatedAt`)
- **Slide 21:** Enabling Timestamps (`{ timestamps: true }`)
- **Slide 22:** Example Timestamp Data in MongoDB (Creation vs Modification)
- **Slide 23:** Why Are Timestamps Useful? (History, auditing, sorting, dashboards)
- **Slide 24:** Custom Timestamp Field Names (`created_at` / `updated_at`)
- **Slide 25:** Mini Project: Student Management System Overview
- **Slide 26:** Project Structure (`mongoose-day6/src/...`)
- **Slide 27:** Defining the Student Schema
- **Slide 28:** Adding a Pre Hook to Student Model
- **Slide 29:** Adding a Post Hook to Student Model
- **Slide 30:** Complete Student Model (`Student.js`)
- **Slide 31:** Creating a Student in `app.js` & Execution Flow
- **Slide 32:** Timestamp Behavior: Interactive Timeline & Simulator
- **Slide 33:** Complete Mongoose Execution Flow (Master architecture diagram)
- **Slide 34:** Pre vs Post vs Validation vs Timestamps Matrix
- **Slide 35:** Common Beginner Mistakes & Fixes
- **Slide 36:** Practical Hands-on Exercise (7-step student challenge)
- **Slide 37:** Quick Classroom Quiz (10 Interactive Questions with Show/Hide Answers)
- **Slide 38:** Final Syntax Cheat Sheet
- **Slide 39:** Interactive Concept Map (Clickable architectural nodes)
- **Slide 40:** Summary & Next Steps in MERN Development

---

## 🛠️ Interactive Features Built-In

1. **Student Validation Sandbox (Slide 18):** Enter test marks (e.g. `85` or `120`) to interactively trigger the pre-save decision branch.
2. **Timestamp Timeline Simulator (Slide 32):** Simulate updating a student's mark and witness how `createdAt` remains frozen while `updatedAt` updates in real-time.
3. **Pre-Hook Execution Stepper (Slide 9):** Step through memory initialization, pre-hook interception, data trimming, and MongoDB persistence.
4. **Interactive Quiz (Slide 37):** 10 collapsible questions with instant answer reveals.
5. **Interactive Concept Map (Slide 39):** Clickable architectural branches exploring Mongoose middleware layers.
6. **Code Copy Tooltips:** Every code snippet includes a 1-click clipboard copy button.
