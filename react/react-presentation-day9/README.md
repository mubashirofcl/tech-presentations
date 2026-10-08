# React Day 9 — React Router

Interactive educational developer presentation deck and demonstration studio for **React Day 9: React Router**.

---

## 🎯 Main Topics Covered

1. **What is React Router**: Client-side routing vs full page reloads, Single Page Application (SPA) architecture.
2. **Setting Up Routing**: Installing `react-router-dom`, configuring `<BrowserRouter>` at the application root.
3. **Creating Routes**: Structuring `<Routes>` and `<Route path="..." element={<Component />} />`.
4. **Navigation**: Declarative navigation with `<Link>` vs `<a>`, and active styling with `<NavLink>`.
5. **Route Parameters**: Dynamic URL segments (`/products/:id`) and reading parameters with `useParams()`.
6. **Query Strings**: Handling search, filter, and sort parameters (`?category=shoes`) with `useSearchParams()`.
7. **Programmatic Navigation**: Imperative redirects and history stepping (`navigate(-1)`) with `useNavigate()`.
8. **Protected Routes**: Gating private views (e.g. `/dashboard`) behind auth checks using `<Navigate to="/login" />`.
9. **Mini Project — DevStore**: Complete architectural blueprint of a multi-route React application.
10. **Common Mistakes & Classroom Quiz**: 7 beginner pitfalls, side-by-side comparison tables, and a 5-question interactive quiz.

---

## 🚀 How to Run the Presentation

The presentation is built with 100% pure **Vanilla HTML5, CSS3, and JavaScript**. No build step, no npm packages, and no web server required!

### Option 1: Direct File Opening
Double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Local HTTP Server (Optional)
If using VS Code / Antigravity IDE Live Server or Python:
```bash
python -m http.server 8080
# Open http://localhost:8080/react/react-presentation-day9/ in your browser
```

---

## ⌨️ Keyboard Shortcuts & Presentation Controls

| Key | Action |
| :--- | :--- |
| <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd> | Advance to Next Slide |
| <kbd>←</kbd> / <kbd>PageUp</kbd> | Return to Previous Slide |
| <kbd>Home</kbd> | Jump to Slide 1 (Title) |
| <kbd>End</kbd> | Jump to Slide 40 (Summary & Golden Rule) |
| <kbd>T</kbd> | Toggle Slide Index Drawer (Table of Contents with live filter) |
| <kbd>F</kbd> | Toggle Fullscreen Mode |
| <kbd>?</kbd> | Open Keyboard Shortcuts Help Modal |
| <kbd>Esc</kbd> | Close any open drawer or modal |

---

## 🎮 Built-in Interactive Demonstrations

1. **Demo 1 — Routing Simulator (Slide 10):** Real-time interactive browser window with address bar updating dynamically across Home, About, Products, and Contact routes with zero page reload.
2. **Demo 2 — Route Parameters Studio (Slide 18):** Select different product catalog cards to watch the dynamic URL segment (`/products/101`) get extracted into `id = "101"` via `useParams()`.
3. **Demo 3 — Query Strings Generator (Slide 22):** Live search, category, and sort controls that dynamically construct query URLs and parse tokens with `useSearchParams()`.
4. **Demo 4 — Protected Route Simulator (Slide 29):** Interactive authentication toggle (OFF / ON) simulating private dashboard protection with animated redirects to `/login`.
5. **Bonus — DevStore Architecture Explorer (Slide 30):** Clickable route map visualizing the rendered views and purpose of each project route.
6. **Classroom Quiz (Slide 37):** 5-question interactive quiz with immediate visual feedback, detailed explanations, and score tracking.

---

## 📚 The Golden Flow

$$\textbf{ROUTE} \longrightarrow \textbf{NAVIGATE} \longrightarrow \textbf{READ} \longrightarrow \textbf{PROTECT}$$
