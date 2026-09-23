# React Day 2: Components & Props — Educational Masterclass Deck

> **"From React Setup to a Complete Todo Application"**  
> An interactive, developer-focused teaching presentation application built with pure HTML5, CSS3, and vanilla JavaScript.

---

## 🎯 Course Overview

This module is designed for beginner React students who already know foundational JavaScript (variables, arrow functions, template literals, array methods like `.map()` and `.filter()`). It systematically teaches:

1. **React Project Setup with Vite**: Scaffolding, dependency installation, and local dev server execution.
2. **Project Structure & Rendering Flow**: Understanding `index.html`, `src/main.jsx`, `createRoot`, and `src/App.jsx`.
3. **What is a Component?**: Breaking monolithic web pages into reusable, modular building blocks.
4. **Functional Components**: Modern function declarations and ES6 arrow function syntaxes.
5. **Component Naming Conventions**: PascalCase rules and why React requires uppercase capital letters.
6. **JSX & Expressions**: Writing HTML-like syntax inside JavaScript, embedding dynamic expressions with `{}`.
7. **Class Components & Comparison**: Understanding legacy `React.Component`, `render()`, and `this.props`.
8. **Props Mastery**: Unidirectional parent-to-child data flow, props destructuring, handling strings, numbers, booleans, arrays, and objects.
9. **Props Immutability**: Why props are read-only and child components must never mutate them.
10. **Function Props (Callbacks)**: Child-to-parent communication loop and event triggers.
11. **Hands-On Todo Application**: Architecture, step-by-step component building (`Header`, `TodoForm`, `TodoList`, `TodoItem`, `Footer`).
12. **State & Interactivity**: Managing dynamic data with `useState`, immutable addition (`...spread`), deletion (`.filter()`), and toggling (`.map()`).
13. **Common Beginner Traps**: 7 fatal beginner mistakes and their instant fixes.
14. **Interactive Practice & Quizzes**: Output prediction, error spotting, props coding challenge, and a 15-question interactive master quiz.
15. **Student Assignment**: Complete Todo Management Application specifications with mandatory and bonus criteria.
16. **Live Searchable Cheat Sheet**: Instant syntax lookup for everyday React development.

---

## 🚀 How to Run

No installations, build steps, or local servers required. Simply open `index.html` in any modern web browser:

```bash
# Double click index.html or open via terminal:
start index.html
```

Or serve with any static web server:

```bash
npx serve .
# or
python -m http.server 3000
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `→` or `Space` | Next Slide |
| `←` | Previous Slide |
| `Home` | First Slide |
| `End` | Last Slide |
| `T` | Toggle Syllabus / Table of Contents Drawer |
| `S` | Toggle Instructor Speaker Notes Drawer |
| `F` | Toggle Fullscreen Mode |
| `Esc` | Close all open drawers & search dropdowns |

---

## 📂 Project Architecture

```
react-presentation-day2/
├── index.html        # Complete 52-slide interactive educational deck
├── style.css         # React Dark Developer Studio CSS design system
├── script.js         # Navigation engine, sandboxes, quiz, and cheat sheet controller
├── README.md         # Documentation & quick start guide
└── MODULE_DETAILS.md # Complete curriculum lecture syllabus & speaker guide
```

---

## 💡 Educational Features

- **Interactive Vite Terminal Simulator (Slide 4)**: Lets students simulate terminal commands step-by-step.
- **Interactive Live Props Playground (Slide 20)**: Tweak props in real time and see both the rendered badge and the generated JSX update live.
- **Interactive Todo Data Flow Stepper (Slide 38)**: Visual step-through controller explaining how user typing triggers state update and DOM re-render.
- **Master Quiz (Slide 49)**: 15 questions with instant grading, score computation, and detailed explanations.
- **Searchable Cheat Sheet (Slide 51)**: Real-time search filter for essential React snippets with one-click code copy.
- **Instructor Speaker Notes (Drawer)**: Comprehensive teaching script, analogies, common pitfalls, and check-for-understanding questions for every slide.
