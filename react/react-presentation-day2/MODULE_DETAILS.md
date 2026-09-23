# Module Details: React Day 2 — Components, Props & Todo Architecture

## Course Information
- **Course**: MERN Stack Web Development Masterclass
- **Module**: React.js Foundations (Day 2)
- **Target Audience**: Beginner React students with foundational JavaScript knowledge.
- **Estimated Duration**: 3.5 to 4 Hours (including live coding and exercises).

---

## 1. Syllabus & Topic Breakdown

### Section 1: React Project Setup (Slides 1–4)
- Prerequisites: Node.js (LTS), npm, VS Code, Browser.
- Verifying environment: `node -v` and `npm -v`.
- Scaffolding with Vite: `npm create vite@latest`.
- Selecting framework: React & JavaScript.
- Installing dependencies: `npm install`.
- Starting local dev server: `npm run dev` at `http://localhost:5173/`.

### Section 2: Project Structure & Rendering Flow (Slides 5–6)
- Vite project anatomy: `node_modules/`, `public/`, `src/`, `index.html`, `package.json`, `vite.config.js`.
- The 3 critical files: `index.html`, `src/main.jsx`, `src/App.jsx`.
- The execution flow: `index.html` → `main.jsx` (`createRoot`) → `App.jsx` → Child components → Browser DOM.

### Section 3: Components Concept (Slides 7–8)
- Definition: "A component is a reusable piece of UI."
- Component tree hierarchy (`App` → `Header`, `TodoForm`, `TodoList`, `Footer`).
- Why components matter: Reusability, Maintainability, Organization, and Separation of Concerns.
- Contrast: 800-line monolithic file vs modular components.

### Section 4: Functional Components (Slides 9–12)
- Function declaration syntax: `function Welcome() { return <h1>...</h1>; }`.
- Arrow function syntax: `const Welcome = () => { return <h1>...</h1>; };`.
- Importing and using components in JSX: `<Welcome />`.
- Component naming rules: PascalCase (capitalized) requirement to distinguish custom components from native HTML elements.

### Section 5: JSX (Slides 13–14)
- What JSX is: JavaScript XML (declarative syntax compiled to `React.createElement`).
- Single parent element rule / React Fragments `<>...</>`.
- `className` vs `class`, `htmlFor` vs `for`.
- Embedding JavaScript expressions using curly braces `{}`.

### Section 6: Class Components (Slides 15–16)
- Object-oriented syntax: `class Welcome extends React.Component`.
- The mandatory `render()` lifecycle method.
- Accessing data via `this.props.name`.

### Section 7: Functional vs Class Components (Slides 17–18)
- Technical comparison matrix (Syntax, JSX return, Props access, State management, Boilerplate, Modern usage).
- Why classes are not "bad", but functional components + Hooks are the modern industry standard.
- When students will encounter class components (legacy enterprise codebases, older tutorials, error boundaries).

### Section 8: Props (Slides 19–23)
- What Props are: Properties passed from parent to child.
- Real-world analogy: customized ID card (component is card template, props are employee data).
- Props destructuring: `function User({ name, age, role })`.
- Passing strings, numbers, booleans, arrays, and objects.
- Props are strictly read-only: Immutability principle and unidirectional data flow.

### Section 9: Function Props (Slides 24–25)
- Passing callback functions as props: `<Child onMessage={handleMessage} />`.
- Child-to-parent communication loop: Child invokes callback with arguments; parent handler executes.

### Section 10: Todo Application Architecture (Slides 26–34)
- Project goal and scope (no Redux, no Router, no DB).
- Component responsibility breakdown: `App`, `Header`, `TodoForm`, `TodoList`, `TodoItem`, `Footer`.
- Composing the static shell first in `App.jsx`.
- Creating `Header.jsx`.
- Hardcoded vs Dynamic `TodoItem.jsx`.
- Modeling the todo data array (`id`, `title`, `completed`).
- Mapping over arrays with `.map()` and the critical `key={todo.id}` prop.

### Section 11: State and Todo Interaction (Slides 35–42)
- Introducing dynamic state: `const [todos, setTodos] = useState([])`.
- Lifting state up to `App.jsx`.
- Adding tasks immutably: `setTodos(prev => [...prev, newTodo])`.
- Creating controlled inputs in `TodoForm.jsx` with `onChange` and `e.preventDefault()`.
- Deleting tasks immutably with `Array.filter()`.
- Passing `onDeleteTodo` handler down the hierarchy: `onClick={() => onDeleteTodo(todo.id)}`.
- Toggling task completion with `Array.map()` and object spread.
- Master Todo architecture diagram.

### Section 12: Complete Project Synthesis (Slides 43–44)
- File-by-file code map and responsibilities.
- End-to-end execution lifecycle.

### Section 13: Common Beginner Mistakes (Slide 45)
- 7 common mistakes: lowercase naming, prop mutation, missing keys, immediate function execution in `onClick`, missing exports/imports, broken relative paths, monolithic code.

### Section 14: Interactive Practice (Slides 46–48)
- Predict the output challenge.
- Spot the bug in lowercase naming.
- `ProductCard` props challenge.

### Section 15: Master Quiz (Slide 49)
- 15 comprehensive questions spanning all lecture topics with instant scoring and explanations.

### Section 16: Student Assignment (Slide 50)
- Mandatory features: Add, Display, Delete, Complete, Undo, Counters, Validation, Clean Props.
- Bonus challenges: Edit, Filters (All/Active/Completed), Search, Priority, localStorage.

### Section 17: Searchable Cheat Sheet & Final Takeaway (Slides 51–52)
- Quick reference snippets with one-click copy.
- The Core Philosophy: "Think in Components. Don't memorize React syntax. Understand the data flow."

---

## 2. Viva / Practical Exam Questions

### Conceptual Questions
1. **What is a React component?**
   - *Answer:* A component is a self-contained, reusable piece of UI that returns JSX markup.
2. **What is the difference between a functional component and a class component?**
   - *Answer:* Functional components are plain JS functions that use React Hooks for state; class components extend `React.Component`, use `this.state`/`this.setState`, and render markup via a `render()` method.
3. **What are props, and why are they called "read-only"?**
   - *Answer:* Props are properties passed from a parent component to a child component. They are read-only because data in React follows strict unidirectional flow; child components must never mutate props directly.
4. **Why must React component names start with an uppercase capital letter?**
   - *Answer:* React uses capitalization to distinguish custom user-defined components from built-in HTML tags (e.g. `<Header />` vs `<header>`).
5. **Why do we need a unique `key` prop when rendering lists with `.map()`?**
   - *Answer:* The unique key helps React's Virtual DOM reconciliation engine identify which specific items were added, modified, or removed, avoiding unnecessary re-renders of the whole list.

### Code-Based Questions
6. **What is wrong with writing `onClick={deleteTodo(todo.id)}`?**
   - *Answer:* Adding parentheses causes the function to execute immediately during the component's render phase instead of waiting for a user click. The correct syntax is `onClick={() => deleteTodo(todo.id)}`.
7. **How do you pass a number as a prop?**
   - *Answer:* You must wrap the number in curly braces: `<User age={22} />`. Passing `age="22"` passes a string.
8. **Explain the data flow from `App.jsx` to `TodoItem.jsx`:**
   - *Answer:* `App.jsx` passes the `todos` array and `deleteTodo` handler to `TodoList.jsx`. `TodoList` maps over each item and passes individual `todo` objects and the `deleteTodo` function down to each `TodoItem.jsx`.
