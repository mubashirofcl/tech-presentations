# JavaScript Basics – Day 1: Introduction to JavaScript
> **A Practical, Python-to-JavaScript Transition Course**  
> *Designed for Python developers preparing for modern React and Generative AI application development.*

---

## 🎯 Overview

This interactive classroom presentation is tailored specifically for students who already possess foundational knowledge in **Python**. Instead of teaching computational thinking from zero, it bridges Python concepts to JavaScript syntax, idioms, execution models, and modern ECMAScript standards (ES6+).

By completing Day 1, students build an intuitive understanding of JavaScript variables, memory scoping, first-class functions, closures, and arithmetic operations, paving the path toward **React component architectures** and **Node.js Generative AI tool integrations**.

---

## 📑 Slide Outline (18 Slides)

| Slide | Title | Key Concepts & Python Comparison |
| :---: | :--- | :--- |
| **01** | **Introduction to JavaScript** | Syllabus roadmap: Variables, Functions, Operators, Scope, Closures, and Final Project. |
| **02** | **What Is JavaScript?** | Web runtime, V8 engine, Node.js, and client vs server. Direct syntax comparison with Python. |
| **03** | **How to Run JavaScript Code** | Browser Developer Tools Console (`F12`), Node.js CLI (`node app.js`), and REPL. |
| **04** | **What Are Variables?** | Memory storage, naming conventions (camelCase vs snake_case), dynamic typing. |
| **05** | **`var`, `let`, and `const`** | Modern scoping rules: why `var` is legacy, why `let` is for reassignments, and why `const` is the default. |
| **06** | **Practical: Student Profile** | Hands-on variable declaration exercise storing name, age, enrolled course, and tuition. |
| **07** | **What Is a Function?** | Reusable blocks of logic. Comparing `def func():` in Python with `function func() {}` in JavaScript. |
| **08** | **Function Parameters and Arguments** | Positional parameters, default arguments (`tax = 0.05`), and rest parameters. |
| **09** | **The Return Statement** | Returning values, early exit execution, and JavaScript returning `undefined` vs Python's `None`. |
| **10** | **Types of Functions in JavaScript** | Function Declarations (hoisted), Function Expressions, and ES6 Arrow Functions (`=>`). |
| **11** | **Practical: Calculator Function** | Building a modular calculator handling addition, subtraction, multiplication, and division with error guarding. |
| **12** | **Arithmetic Operators** | `+`, `-`, `*`, `/`, `%`, `**`. Type coercion warnings when adding strings and numbers. |
| **13** | **Modulus and Increment** | Even/odd detection with `%`, and increment/decrement operators (`++`, `--`) which do not exist in Python. |
| **14** | **Operator Precedence** | Order of operations (PEMDAS), grouping expressions with parentheses `()`, and boolean short-circuiting. |
| **15** | **Practical: Build a Unit Converter** | Converting Celsius to Fahrenheit, Kilometers to Miles, and KG to Pounds. |
| **16** | **What Is Scope?** | Global Scope, Function Scope, and Block Scope (`{}`). Contrasting with Python's lack of block scope. |
| **17** | **What Is a Closure?** | Lexical environment preservation: inner functions retaining access to outer variables for private state. |
| **18** | **Final Practical: Calculator + Converter** | Full integrated utility tool combining arithmetic, closures, objects, and validation. |

---

## 🚀 How to Run the Presentation

You do not need to install local web servers or dependencies. The presentation is built entirely in vanilla HTML5, CSS3, and modern JavaScript.

### 1. Directly in Any Browser
- Double-click `index.html` or drag and drop it into **Google Chrome**, **Mozilla Firefox**, **Microsoft Edge**, or **Brave**.
- Or run in PowerShell:
  ```powershell
  Start-Process "index.html"
  ```

### 2. Using Live Server (VS Code / Antigravity)
- Open the workspace folder in your editor.
- Right-click `index.html` and choose **"Open with Live Server"**.

---

## ⌨️ Keyboard Shortcuts & Controls

The presentation includes an integrated navigation controller:

| Key / Control | Action |
| :--- | :--- |
| **`→` (Right Arrow) / `Page Down` / `Space`** | Advance to next slide |
| **`←` (Left Arrow) / `Page Up`** | Return to previous slide |
| **`Home`** | Jump to Slide 1 (Title) |
| **`End`** | Jump to Slide 18 (Final Practical) |
| **`F`** | Toggle Fullscreen Mode |
| **`T`** | Toggle Table of Contents Modal |
| **`?`** | Toggle Keyboard Shortcuts Help Overlay |
| **`Esc`** | Close Active Modal or Help Overlay |
| **Touch Swiping** | Swipe left/right on tablets and touch displays |

---

## 🐍 Python vs JavaScript Quick Reference Guide

| Feature | Python | JavaScript (Modern ES6+) |
| :--- | :--- | :--- |
| **Print Output** | `print("Hello World")` | `console.log("Hello World");` |
| **Variable Declaration** | `name = "Alex"` | `const name = "Alex";` or `let name = "Alex";` |
| **Constant** | `PI = 3.14` (by convention only) | `const PI = 3.14;` (enforced by runtime `TypeError`) |
| **Code Blocks** | Strict indentation (whitespace) | Curly braces `{ ... }` |
| **Statement Terminator** | Newline | Semicolon `;` (recommended) or newline |
| **Function Definition** | `def add(a, b):` | `function add(a, b) { ... }` or `const add = (a, b) => a + b;` |
| **Null Value** | `None` | `null` (intentional absence) and `undefined` (uninitialized) |
| **Booleans** | `True`, `False` | `true`, `false` |
| **Increment Operator** | `x += 1` (`x++` does not exist) | `x++` and `++x` and `x += 1` |
| **Exponentiation** | `2 ** 3` | `2 ** 3` or `Math.pow(2, 3)` |
| **String Interpolation** | `f"Hello {name}"` | `` `Hello ${name}` `` (template literals) |
| **Block Scoping** | No block scope inside `if` or `for` | Strict block scope with `let` and `const` inside `{}` |

---

## 🛠️ Interactive Sandboxes Included in Slides

1. **Slide 2**: Interactive Python vs JavaScript Syntax Switcher.
2. **Slide 5**: Live `var` vs `let` vs `const` Reassignment Playground (demonstrates runtime `TypeError`).
3. **Slide 6**: Live Student Profile Data Model Updater.
4. **Slide 10**: Function Declaration vs Expression vs Arrow Function Runner.
5. **Slide 11**: Real-Time Arithmetic Calculator with Zero-Division Guard.
6. **Slide 15**: Live Temperature and Metric Unit Converter.
7. **Slide 17**: Interactive Closure Counter Clicker (demonstrates encapsulated private state).
8. **Slide 18**: Final Mini-Project: Multi-Purpose Utility Tool Suite.

---

## 📚 Practice Exercises for Students

1. **BMI Calculator**: Write a function `calculateBMI(weightKg, heightM)` that returns the body mass index formatted to 2 decimal places using `.toFixed(2)`.
2. **Temperature Alert Closure**: Create a closure function `createTemperatureMonitor(threshold)` that remembers a limit and alerts whenever a new temperature exceeds it.
3. **Arrow Function Refactoring**: Take traditional functions written in Python syntax and convert them into one-liner JavaScript ES6 arrow functions with implicit returns.
