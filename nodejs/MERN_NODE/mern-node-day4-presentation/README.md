# Node.js Day 4 — Express Setup, API Development & Postman

> **Course:** Full-Stack MERN Development (Node.js Track — Day 4)  
> **Title:** Node.js Day 4: Express Setup, API Development & Postman  
> **Subtitle:** Building Web Servers, Designing REST Endpoints, and Testing with Postman  
> **Audience:** Beginner MERN Stack students learning backend API development.

A complete, production-grade, interactive slide deck built with **pure HTML5, CSS3, and Vanilla JavaScript** (zero external frameworks or runtime dependencies).

---

## 🌟 Key Features & Design Highlights

- **Developer-Focused Classroom Theme:** Professional light-blue and crisp white backgrounds with dark navy text (`#0f172a`), soft blue card accents (`#f0f9ff`), and high-contrast dark code blocks (`#0b1329`) with syntax highlighting.
- **Strict 15-Slide Pedagogy:** Exactly 15 slides covering the entire API lifecycle from Express setup to full CRUD implementation and Postman validation.
- **Visual Learning Diagrams:**
  - **Slide 5:** Full-Stack MERN API Communication Flow (React &rarr; Express &rarr; MongoDB).
  - **Slide 6:** Side-by-side URL vs API architectural comparison.
  - **Slide 8:** HTTP Request & Response anatomy cycle.
  - **Slide 9:** Postman 7-part interface diagram.
  - **Slide 13:** Visual comparison of JSON, XML, Plain Text, and HTML formats.
- **Interactive Educational Simulators:**
  - **Slide 4:** Live Browser Route Simulator testing `/` and `/about`.
  - **Slide 7:** Interactive HTTP Method Matcher (GET, POST, PUT, PATCH, DELETE).
  - **Slide 10–12:** Built-in Postman Mock Client that sends simulated GET, POST, PUT, and DELETE calls with live status codes (200, 201, 404) and response timing.
  - **Slide 14:** Live Data Format Inspector showing exact `Content-Type` headers and responses.
- **One-Click Code Copy:** Instant clipboard copy with animated visual feedback (`Copied!`) on every single code snippet.
- **Full Navigation Engine:**
  - Previous / Next buttons with automatic boundary states (Slide 1 and 15).
  - Slide counter (e.g. `01 / 15` to `15 / 15`).
  - Continuous top progress bar (`0%` to `100%`).
  - Section indicator pill synchronized to the active module.
  - Slide Table of Contents drawer with 1-click jump.
  - Keyboard shortcuts help modal (`?`).
  - Deep-linking & history syncing via URL hash (`#slide-1` to `#slide-15`).
- **Print / Handout Ready:** Clean `@media print` CSS format formats 1 slide per page for handouts or PDF export.

---

## 🗂️ Exact 15-Slide Syllabus

| Section | Slide # | Title & Topic |
|---|---|---|
| **Section 1: Setting Up Express & First Routes** | **01** | **Title Slide:** Node.js Day 4: Express Setup, API Development & Postman |
| | **02** | **Learning Objectives:** 7 core outcomes for the session |
| | **03** | **Setting Up an Express Project:** npm init, npm install express, server.js, app.listen() |
| | **04** | **Creating Your First API Route:** HTTP methods, URL paths, req, res, res.send() |
| **Section 2: API Architecture & HTTP Methods** | **05** | **What Is an API?:** Application Programming Interface & MERN data flow |
| | **06** | **API vs URL:** Resource locator vs communication interface & comparison table |
| | **07** | **Understanding HTTP Methods:** GET, POST, PUT, PATCH, DELETE and CRUD mapping |
| | **08** | **Understanding Request and Response:** req vs res, status codes, res.json() |
| **Section 3: Testing APIs with Postman** | **09** | **Introduction to Postman:** Why we use Postman and interface breakdown |
| | **10** | **Testing GET API in Postman:** Fetching student arrays & testing endpoints |
| | **11** | **Testing POST API in Postman:** express.json() middleware & sending JSON request bodies |
| | **12** | **Testing PUT and DELETE APIs:** Updating and deleting by dynamic route params (`:id`) |
| **Section 4: Data Formats & Student Management API** | **13** | **Understanding Data Formats:** JSON vs XML vs Plain Text vs HTML |
| | **14** | **Sending Different Formats from Express:** res.type(), res.json(), and Content-Type headers |
| | **15** | **Final Practical – Student Management API:** 5-endpoint CRUD API implementation & Postman testing |

---

## 🚀 How to Open the Presentation

No build tools, bundlers, or servers are required!

### Option 1: Direct File Open
1. Navigate to the `node-day4-express-presentation/` folder in your file explorer.
2. Double-click `index.html` or right-click and choose **Open with Google Chrome** (or Edge / Firefox / Safari).

### Option 2: Local Static Server (Optional)
```bash
# Using npx serve:
npx serve node-day4-express-presentation

# Or using Python:
python -m http.server 8000
# Then visit http://localhost:8000/node-day4-express-presentation/
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `Home` | First slide (Slide 1) |
| `End` | Last slide (Slide 15) |
| `F` | Toggle Fullscreen mode |
| `T` or `M` | Open/Close Table of Contents drawer |
| `?` or `H` | Open/Close Keyboard Shortcuts modal |
| `Esc` | Close any active modal or drawer |

*(Keyboard shortcuts are automatically bypassed when typing inside form inputs or editable controls).*

---

## 💻 Final Practical: Student Management API (Slide 15)

The final slide details a complete 5-endpoint Student Management API built in CommonJS Express:

### Endpoints Table
| Method | Endpoint | Status Code | Purpose |
|---|---|---|---|
| `GET` | `/api/students` | `200 OK` | Get all student records |
| `GET` | `/api/students/:id` | `200 OK` / `404 Not Found` | Get a single student by ID |
| `POST` | `/api/students` | `201 Created` | Create and register a new student |
| `PUT` | `/api/students/:id` | `200 OK` / `404 Not Found` | Update student name, email, or course |
| `DELETE` | `/api/students/:id` | `200 OK` / `404 Not Found` | Remove student record |

### Quick Start Code:
```bash
mkdir student-management-api
cd student-management-api
npm init -y
npm install express
# Paste server.js from Slide 15
node server.js
```
Test all 5 routes using Postman at `http://localhost:3000/api/students`.
