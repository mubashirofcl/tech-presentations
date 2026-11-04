# Node.js Day 5 — Query Parameters, Route Parameters & CRUD API

A production-grade, interactive educational presentation and lab environment designed for beginner MERN Stack students learning Express.js backend development. This presentation guides students through URL structure, reading query strings (`req.query`), capturing dynamic route parameters (`req.params`), understanding the architectural differences between them, and implementing a complete RESTful in-memory CRUD API.

---

## 📋 Course Overview & Metadata

- **Course:** MERN Stack Development
- **Module:** Node.js & Express.js Backend Architecture
- **Session:** Day 5 — Query Parameters, Route Parameters & CRUD API
- **Technology Stack:** Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Zero Framework Dependencies:** Runs directly in any modern web browser without React, Bootstrap, Tailwind, or complex build setups.
- **Design Theme:** Professional developer-focused light blue canvas (`#f0f6fc`, `#e0f2fe`, `#0284c7`), dark syntax-highlighted code blocks (`#0b1329`), responsive grid layouts, and projector-optimized typography.

---

## 🎯 Learning Objectives

By the end of this session, students will be able to:
1. **Dissect URL Anatomy:** Identify protocols, domains, path segments, route parameters, and query strings.
2. **Read Query Parameters:** Use `req.query` to access optional URL key-value pairs for searching, filtering, and pagination.
3. **Capture Dynamic Route Parameters:** Define dynamic route paths with a colon (`/students/:id`) and access them via `req.params`.
4. **Distinguish Query vs Route Parameters:** Understand when to use route parameters (identifying specific resources) vs query parameters (modifying or filtering resource collections), and combine both seamlessly.
5. **Implement RESTful CRUD APIs:** Build complete CREATE (`POST`), READ (`GET`), UPDATE (`PUT` and `PATCH`), and DELETE (`DELETE`) routes in Express.js.
6. **Handle Request Payloads:** Configure `express.json()` middleware to parse incoming JSON bodies into `req.body`.
7. **Return Accurate HTTP Status Codes:** Respond with `200 OK`, `201 Created`, `400 Bad Request`, and `404 Not Found`.
8. **Conduct Professional Postman Testing:** Test API endpoints sequentially, verify JSON payloads, and test edge cases like non-existent records.

---

## 🗂️ 18-Slide Detailed Curriculum

| Slide # | Slide Title | Key Concepts & Node.js Implementation |
|:-------:|:------------|:-------------------------------------|
| **01** | **Title Slide** | Node.js Day 5: Query Parameters, Route Parameters & CRUD API |
| **02** | **Learning Objectives** | 8 core competencies: URL structure, `req.query`, `req.params`, CRUD methods, HTTP status codes, and Postman |
| **03** | **Understanding URL Structure** | Anatomy of `https://example.com/api/students/101?course=MERN` (Protocol, Domain, Path, Route Param, Query Param) |
| **04** | **What Are Query Parameters?** | Query strings after `?`, ampersands `&`, `req.query`, string data types, and numeric conversions |
| **05** | **Practical: Filtering Students** | Implementing `GET /students?course=MERN` using JavaScript `Array.prototype.filter()` and `.toLowerCase()` |
| **06** | **Search, Filter & Pagination** | Combining multiple queries (`?course=MERN&search=anu&page=1&limit=5`), default parameters, and the pagination index formula |
| **07** | **What Are Route Parameters?** | Defining dynamic routes with colons (`/students/:id`), reading `req.params.id`, and identifying distinct resources |
| **08** | **Practical: Get a Student by ID** | `Number(req.params.id)`, `Array.prototype.find()`, returning 200 OK or 404 Not Found for missing students |
| **09** | **Query vs Route Parameters** | Comparison matrix, differences in purpose and necessity, and combined usage (`GET /students/101?include=course`) |
| **10** | **What Is CRUD?** | Conceptual definition: Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE); Student management mapping |
| **11** | **Setting Up the CRUD Project** | `npm init -y`, `npm install express`, directory layout, `express.json()` middleware, and in-memory state setup |
| **12** | **CREATE: Adding a New Student** | `POST /students`, body validation (400), auto-increment ID generation (`Math.max`), `students.push()`, and `201 Created` |
| **13** | **READ: Getting All and One Student** | `GET /students` (roster list & count) and `GET /students/:id` (individual profile lookup) |
| **14** | **UPDATE: Full Details with PUT** | `PUT /students/:id`, full representation replacement, strict validation of all fields, and `200 OK` |
| **15** | **PATCH: Updating Specific Fields** | `PATCH /students/:id`, delta/partial updates, allowed fields whitelist, `Object.assign()`, and `200 OK` |
| **16** | **DELETE: Removing a Student** | `DELETE /students/:id`, `findIndex()`, `splice()`, 404 check, and returning the deleted record |
| **17** | **Complete CRUD Testing in Postman** | Systematic 7-step test sequence, HTTP status codes reference, and request verification checklist |
| **18** | **Final Practical: Student Management API** | Unified specification, endpoint summary, and an embedded interactive CRUD console with live state inspection |

---

## 🚀 How to Open and Run the Presentation

### Option 1: Direct File Launch (No Server Required)
Simply double-click `index.html` or run:
```bash
# Windows PowerShell
Start-Process "index.html"

# Google Chrome / Microsoft Edge
chrome index.html
```

### Option 2: Run with a Local Static Server
```bash
# Using npx serve (recommended)
npx serve .

# Or using Python 3
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

---

## ⌨️ Keyboard Shortcuts & Interactive Controls

| Shortcut / Control | Action |
|:-------------------|:-------|
| `→` or `Space` or `Page Down` | Advance to the **Next Slide** |
| `←` or `Page Up` | Return to the **Previous Slide** |
| `Home` | Jump directly to **Slide 1 (Title Slide)** |
| `End` | Jump directly to **Slide 18 (Final Practical Lab)** |
| `F` | Toggle **Fullscreen Mode** |
| `T` or `M` | Open / Close the **Table of Contents Drawer** |
| `?` or `H` | Open / Close the **Keyboard Shortcuts Help Modal** |
| `Esc` | Close any open drawer or modal |
| **Copy Code Button** | Copies snippet to clipboard with instant checkmark feedback |

---

## 🧪 Built-In Interactive Simulators

1. **Slide 6 — Live Query Parameter & Pagination Simulator:**
   - Test queries like `/students?course=MERN&search=anu&page=1&limit=5` in real time.
   - Inspect parsed `req.query` object alongside simulated paginated array slices.
2. **Slide 8 — Dynamic Route Parameter Tester:**
   - Enter student IDs (e.g. `1`, `2`, `100`) to test string-to-number casting, array lookup, and `200 OK` vs `404 Not Found` responses.
3. **Slide 18 — Full Student Management CRUD Console:**
   - Execute live `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` requests directly inside the browser.
   - Inspect the in-memory array state in real time and reset state with one click.

---

## 🛠️ Complete Student Management Server Implementation

To run the complete API locally, create `server.js` with the following code:

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// In-memory student array
let students = [
    { id: 1, name: "Anu", email: "anu@gmail.com", course: "MERN" },
    { id: 2, name: "Rahul", email: "rahul@gmail.com", course: "Python" },
    { id: 3, name: "Neha", email: "neha@gmail.com", course: "React" }
];

// 1. GET /students (with course filter, search & pagination)
app.get("/students", (req, res) => {
    const { course, search, page = "1", limit = "5" } = req.query;
    let result = [...students];

    if (course) {
        result = result.filter(s => s.course.toLowerCase() === course.toLowerCase());
    }

    if (search) {
        result = result.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
    }

    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 5);
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedData = result.slice(startIndex, startIndex + pageSize);

    res.status(200).json({
        total: result.length,
        page: pageNumber,
        limit: pageSize,
        data: paginatedData
    });
});

// 2. GET /students/:id
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ data: student });
});

// 3. POST /students
app.post("/students", (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newStudent = {
        id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name,
        email,
        course
    };

    students.push(newStudent);
    res.status(201).json({ message: "Student created successfully", data: newStudent });
});

// 4. PUT /students/:id
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, email, course } = req.body;
    if (!name || !email || !course) {
        return res.status(400).json({ message: "All fields are required" });
    }

    student.name = name;
    student.email = email;
    student.course = course;

    res.status(200).json({ message: "Student updated successfully", data: student });
});

// 5. PATCH /students/:id
app.patch("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const allowedFields = ["name", "email", "course"];
    const updates = Object.keys(req.body);

    if (updates.length === 0 || updates.some(f => !allowedFields.includes(f))) {
        return res.status(400).json({ message: "Provide valid fields to update" });
    }

    Object.assign(student, req.body);
    res.status(200).json({ message: "Student partially updated", data: student });
});

// 6. DELETE /students/:id
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deleted = students.splice(index, 1)[0];
    res.status(200).json({ message: "Student deleted successfully", data: deleted });
});

app.listen(PORT, () => {
    console.log(`Student Management API running at http://localhost:${PORT}`);
});
```

---

## 🧑‍💻 Student Practice Challenges

1. **Challenge 1 (Case-Insensitive Search):** Ensure searching for `"anu"`, `"ANU"`, and `"AnU"` all match `"Anu"` and `"Ananya"`.
2. **Challenge 2 (Sorting Query Param):** Add support for `?sort=name` (ascending alphabetical) and `?sort=id` to the `GET /students` route.
3. **Challenge 3 (Email Uniqueness Validation):** Modify `POST /students` to verify that the submitted email does not already exist in the `students` array. If it does, return `400 Bad Request` with `"Email already registered"`.
4. **Challenge 4 (Soft Delete Flag):** Instead of removing the student from the array using `splice()`, add an `isActive: false` property and filter inactive students out of `GET /students`.
5. **Challenge 5 (Custom Pagination Metadata):** Add `totalPages: Math.ceil(total / pageSize)` and `hasNextPage: pageNumber * pageSize < total` to the paginated response object.
