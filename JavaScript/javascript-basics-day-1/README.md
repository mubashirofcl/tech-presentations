# JavaScript Fundamentals – Day 1, 2 & 3 (Combined)
> **Core JavaScript Concepts Before React and Generative AI**  
> *A comprehensive, beginner-friendly classroom presentation combining Days 1, 2, and 3 into one modular 30-slide curriculum.*

---

## 🎯 Course Overview

This presentation is designed specifically for students who are beginners in JavaScript. It provides a step-by-step foundation covering language execution, variables, functions, ES6 features, operators, conditionals, data structures (Arrays & Objects), memory scoping, closures, and the asynchronous JavaScript Event Loop.

Every topic includes simple explanations, runnable code snippets, and explicit expected outputs, directly preparing learners for **React component development** and **Node.js Generative AI integrations**.

---

## 📑 Complete 30-Slide Curriculum

### Section 1 – Introduction and Variables
| Slide | Title | Key Learning Concepts & Examples |
| :---: | :--- | :--- |
| **01** | **Introduction to JavaScript** | What JavaScript is, why we use it, 4 domains (Frontend, Backend, Mobile, GenAI), and the 6-section course roadmap. |
| **02** | **What Is JavaScript?** | High-level, dynamically typed, single-threaded language with non-blocking I/O. The 3 pillars of web tech: HTML, CSS, JavaScript. |
| **03** | **How to Run JavaScript** | Running code in the Browser Developer Console (`F12`) vs Node.js CLI (`node app.js`). `console.log("Hello JavaScript"); console.log(10 + 20);` $\rightarrow$ Output: `Hello JavaScript`, `30`. |
| **04** | **Variables – var, let and const** | Reassignment, redeclaration in same scope, and block scoping. Comparison table. Best practice: use `const` by default, `let` when reassigned, avoid `var`. |
| **05** | **Practical: Student Profile** | Hands-on code storing `studentName`, `course` with `const`, and `age`, `marks` with `let`. Updating `marks = 85`. |

### Section 2 – Functions and ES6 Basics
| Slide | Title | Key Learning Concepts & Examples |
| :---: | :--- | :--- |
| **06** | **What Are Functions?** | Reusable blocks of logic. Eliminating repetition (DRY), modularity, function declaration, and invoking with `()`. |
| **07** | **Function Parameters and Arguments** | Parameters (placeholders) vs Arguments (real passed values). Dynamic greeting function: `greet("Arun")`, `greet("Rahul")`. |
| **08** | **Return Statement** | Producing output values. Difference between `return` (passes data back to program) and `console.log()` (screen display only). Reusing returned values: `result * 2`. |
| **09** | **Types of Functions** | 1. Function Declaration (hoisted), 2. Function Expression (variable-assigned), 3. Arrow Function (ES6 concise syntax). |
| **10** | **ES6: Arrow Functions** | Fat arrow `=>` syntax, block body vs single-line implicit returns: `const add = (a, b) => a + b;`. Why arrow functions are standard in React. |
| **11** | **ES6: Template Literals** | String interpolation using backticks (`` ` ``) and `${}` expressions. Multiline strings without `\n`. |

### Section 3 – Operators and Conditional Statements
| Slide | Title | Key Learning Concepts & Examples |
| :---: | :--- | :--- |
| **12** | **Arithmetic Operators** | `+` (addition), `-` (subtraction), `*` (multiplication), `/` (division), `%` (remainder), `**` (exponentiation), `++` (increment), `--` (decrement). String concatenation warning. |
| **13** | **Comparison Operators – == vs ===** | Loose equality (`==`) coerces types (`10 == "10"` is true) vs Strict equality (`===`) checks value and type (`10 === "10"` is false). Best practice: always use `===` and `!==`. |
| **14** | **Logical Operators – &&, ||, !** | `&&` (AND: all must be true), `||` (OR: at least one true), `!` (NOT: reverses boolean). React conditional rendering preview (`{isLoggedIn && <Profile />}`). |
| **15** | **Truthy and Falsy Values** | The 7 falsy values: `false`, `0`, `-0`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy (`"hello"`, `[]`, `{}`). Automatic boolean context conversion. |
| **16** | **Conditional Statements: if and else** | Sequential decision branching with `if`, `else if`, `else`. Practical Student Grade Checker (90 $\rightarrow$ A, 75 $\rightarrow$ B, 50 $\rightarrow$ C, else Failed). |
| **17** | **switch and Ternary Operator** | Switch matching against cases with `break` and `default`. Ternary operator (`age >= 18 ? "Eligible" : "Not Eligible"`) for clean inline decisions in React JSX. |

### Section 4 – Arrays and Objects
| Slide | Title | Key Learning Concepts & Examples |
| :---: | :--- | :--- |
| **18** | **Introduction to Arrays** | Ordered collections in `[ ]`. Zero-based indexing (`fruits[0]`), updating elements (`fruits[1] = "Orange"`), and reading array length (`fruits.length`). |
| **19** | **Basic Array Operations** | Mutating methods: `push()` (add to end), `pop()` (remove from end), `unshift()` (add to beginning), `shift()` (remove from beginning). |
| **20** | **Introduction to Objects** | Structuring real-world entities with `{ key: value }` property pairs. Objects represent entities with descriptive attributes. |
| **21** | **Accessing and Modifying Properties** | Dot notation (`student.name`), Bracket notation (`student["course"]`), modifying properties, adding `email`, and deleting with `delete student.age`. |
| **22** | **Object.keys, values, entries** | `Object.keys()` (property names), `Object.values()` (property values), `Object.entries()` (`[key, value]` pairs) for mapping over object records. |
| **23** | **Nested Objects** | Embedding objects inside objects (`course: { title, duration }`, `address: { city, state }`). Chained dot navigation (`student.course.title`). |
| **24** | **JSON-Style Objects** | JavaScript Object Notation. Serialization with `JSON.stringify()` (Object $\rightarrow$ String) and Deserialization with `JSON.parse()` (String $\rightarrow$ Object) for web APIs. |

### Section 5 – Scope and Closures
| Slide | Title | Key Learning Concepts & Examples |
| :---: | :--- | :--- |
| **25** | **Understanding Scope** | Variable lifetime and accessibility: 1. Global Scope, 2. Function Scope, 3. Block Scope (`{ }` with `let` and `const`). Preventing naming collisions. |
| **26** | **Introduction to Closures** | An inner function retaining access to outer lexical scope variables after the outer function has returned. `outerFunction()` returning `innerFunction()`. |
| **27** | **Practical Closure: Counter** | Counter factory function preserving private `count` state across invocations (`1`, `2`, `3`). Connection to how React's `useState` hook works. |

### Section 6 – JavaScript Event Loop
| Slide | Title | Key Learning Concepts & Examples |
| :---: | :--- | :--- |
| **28** | **What Is the JavaScript Event Loop?** | The single-threaded concurrency model. Why long tasks don't freeze the browser. The 5 core pillars: Call Stack, Web APIs, Microtask Queue, Callback Queue, Event Loop. |
| **29** | **Call Stack and Web APIs** | LIFO execution stack (`first()`, `second()`). Delegating background operations (`setTimeout`, `fetch`, DOM clicks) to browser Web APIs. |
| **30** | **Callback Queue, Microtask Queue & Loop** | Priority scheduling: Microtask Queue (`Promise.then`) has higher scheduling priority than Callback Queue (`setTimeout`). Canonical code puzzle (`Start`, `End`, `Promise`, `Timeout`). Interactive step simulator. |

---

## 🚀 How to Run the Presentation

You do not need to install complex build tools or local servers. The presentation is built entirely with clean vanilla HTML5, CSS3, and JavaScript.

### Option 1: Direct in Any Browser
- Double-click `index.html` or open in **Chrome**, **Edge**, **Firefox**, or **Brave**.
- Or launch via PowerShell:
  ```powershell
  Start-Process "index.html"
  ```

### Option 2: Live Server (VS Code / Antigravity)
- Right-click `index.html` $\rightarrow$ **Open with Live Server**.

---

## ⌨️ Keyboard Navigation & Controls

| Shortcut / Button | Action |
| :--- | :--- |
| **`→` / `Space` / `Page Down`** | Advance to next slide |
| **`←` / `Page Up`** | Return to previous slide |
| **`Home` / `End`** | Jump to Slide 1 / Slide 30 |
| **`F`** | Toggle Fullscreen mode |
| **`T`** | Open Table of Contents drawer (Jump to any of the 30 slides) |
| **`?`** | Toggle Keyboard Navigation help modal |
| **`Esc`** | Close active modals and overlays |
| **Slide Dropdown** | Instant numeric selection from toolbar |
| **Copy Button** | 1-click clipboard copy for code snippets |

---

## 🔄 Event Loop: Technical Accuracy & Architecture

```
          JavaScript Code
                 |
                 v
          +-------------+
          |  Call Stack |  <=== Synchronous Code (LIFO)
          +-------------+
                 |
          Async operation
                 |
                 v
          +-------------+
          |   Web APIs  |  <=== Browser Timers, DOM, Fetch
          +-------------+
                 |
          Callback ready
                 |
          +------+------+
          |             |
          v             v
   +-------------+ +---------------+
   | Microtask   | | Callback/Task |
   | Queue       | | Queue         |
   | (Promises)  | | (Timers, UI)  |
   +-------------+ +---------------+
    HIGHEST PRIORITY   LOWEST PRIORITY
          |             |
          +------+------+
                 |
                 v
             Event Loop
                 |
                 v
          Empty Call Stack?
                 |
                 v
         Execute callbacks
```

### The Canonical Event Loop Puzzle:
```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

### Expected Output Order:
```
Start
End
Promise
Timeout
```

### Why this happens:
1. `console.log("Start")` runs synchronously on the Call Stack $\rightarrow$ prints `"Start"`.
2. `setTimeout(..., 0)` registers a timer with the browser Web API. The timer completes immediately (0ms) and queues its callback into the **Callback Queue (Task Queue)**.
3. `Promise.resolve().then(...)` resolves immediately and queues its `.then()` handler into the **Microtask Queue**.
4. `console.log("End")` runs synchronously on the Call Stack $\rightarrow$ prints `"End"`.
5. The Call Stack is now empty!
6. The Event Loop checks the **Microtask Queue** first because microtasks receive higher scheduling priority at the checkpoint $\rightarrow$ executes Promise callback $\rightarrow$ prints `"Promise"`.
7. Once all microtasks are exhausted, the Event Loop takes the next task from the **Callback Queue** $\rightarrow$ executes timeout callback $\rightarrow$ prints `"Timeout"`.
8. `setTimeout(..., 0)` does **not** mean immediate execution; it schedules the callback to run after synchronous code and all microtasks finish.
