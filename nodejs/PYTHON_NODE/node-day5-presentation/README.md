# Gen-AI Node.js — Day 5: MySQL CRUD, Reusable Database Functions & NPM SDK Integration

> **GenAI Node.js Curriculum · Backend Foundation Track**  
> Complete interactive educational slide presentation, reference architecture, and runnable Node.js/Express starter template for beginner to intermediate students.

---

## 📋 Course Overview

In **Day 5**, students learn how to connect Node.js applications to relational databases (MySQL), build clean and reusable database layers, integrate third-party AI SDKs (OpenAI, Anthropic, Ollama, ChromaDB), validate incoming request bodies using Zod, and stream responses to the client.

### Core Learning Objectives:
1. Connect Node.js with MySQL using the promise-based interface of `mysql2`.
2. Implement CRUD operations (Create, Read, Update, Delete) using async/await and parameterized queries.
3. Decouple SQL queries from Express routes by creating reusable database functions (`studentModel.js`).
4. Install and understand npm AI SDKs (`openai`, `@anthropic-ai/sdk`, `ollama`, `chromadb`).
5. Read official documentation and initialize SDK clients cleanly.
6. Manage sensitive API keys and database credentials securely using `.env` and `dotenv`.
7. Validate API payloads using Zod schemas (`safeParse`).
8. Consume third-party APIs with built-in Node.js `fetch()`.
9. Implement Server-Sent Events (SSE) streaming with `res.write()`.
10. Build a reusable **GenAI Node.js Starter Template** (`genai-node-starter`).

---

## 🗂️ Presentation Contents (20 Slides)

| Slide # | Slide Title | Category | Key Concept & Learning Objective |
|---|---|---|---|
| **01** | **Introduction: MySQL CRUD &amp; SDK Integration** | Welcome & Agenda | Overview of technologies, prerequisites, and learning goals. |
| **02** | **What Are We Building?** | Project Roadmap | The GenAI Starter API architecture: Client &rarr; Express &rarr; Zod &rarr; MySQL / AI SDK. |
| **03** | **What Is MySQL2?** | Database Fundamentals | Why Node.js needs MySQL2, installation, and benefits of `mysql2/promise`. |
| **04** | **Connecting Node.js with MySQL** | Database Setup | Schema creation (`students` table) and initializing a high-performance connection pool. |
| **05** | **What Is CRUD?** | Core Concepts | Defining Create (INSERT), Read (SELECT), Update (UPDATE), and Delete (DELETE). |
| **06** | **Practical: CREATE &amp; READ with Async Queries** | Hands-on Implementation | Executing parameterized queries, `insertId`, and interactive query runner sandbox. |
| **07** | **Practical: UPDATE &amp; DELETE with Async Queries** | Hands-on Implementation | Modifying and deleting records safely using `affectedRows` and `?` placeholders. |
| **08** | **Why Reusable Database Functions?** | Architectural Design | Why raw SQL in route handlers is an anti-pattern; introducing the Model layer. |
| **09** | **Practical: Create Reusable Database Functions** | Hands-on Implementation | Building `config/db.js` and modular CRUD functions in `models/studentModel.js`. |
| **10** | **Using Reusable Functions in Express Routes** | Express Integration | Calling model methods from Express endpoints without leaking SQL into controllers. |
| **11** | **What Is an NPM SDK?** | SDK Foundations | Definition of an SDK, manual HTTP vs. ready-made SDK methods. |
| **12** | **Installing AI SDK Packages** | SDK Ecosystem | Installing `openai`, `@anthropic-ai/sdk`, `ollama`, and `chromadb`. |
| **13** | **Reading SDK Docs &amp; Initializing OpenAI** | SDK Implementation | Official documentation links, client initialization, and OpenAI Responses API. |
| **14** | **Understanding Other SDKs** | SDK Comparison | Anthropic, Ollama, and ChromaDB client setups; cloud vs. local servers. |
| **15** | **Why Should API Keys Be Stored in .env?** | Security Best Practices | Dangers of hardcoded secrets, `dotenv` configuration, and `.gitignore`. |
| **16** | **What Is Zod &amp; Why Do We Need It?** | Input Validation | Defining schemas with `z.object()`, `z.string()`, and interactive live validator sandbox. |
| **17** | **What Is Fetch in Node.js?** | HTTP &amp; External APIs | Built-in Node 18+ `fetch()`, checking `response.ok`, and consuming external REST APIs. |
| **18** | **What Is Streaming?** | GenAI Core Concepts | Normal responses vs. continuous token streams; why GenAI relies on streaming. |
| **19** | **Practical: Express Streaming API using SSE** | Hands-on Implementation | Server-Sent Events headers, `res.write('data: ...\n\n')`, and live SSE console sandbox. |
| **20** | **Mini Project: GenAI Node.js Starter Template** | Capstone Template | Complete project structure, interactive API console, and 5 student challenges. |

---

## 🚀 How to Launch the Presentation

The presentation is built with pure HTML5, modern CSS3, and Vanilla JavaScript—no build tools, compilers, or external frameworks needed.

### Quick Start:
1. Navigate to the `genai-node-day5-presentation/` directory.
2. Open `index.html` directly in any web browser.
3. **Keyboard Controls**:
   - `Right Arrow` / `Down Arrow` / `Space` / `Page Down`: Next slide
   - `Left Arrow` / `Up Arrow` / `Page Up`: Previous slide
   - `Home`: Jump to first slide
   - `End`: Jump to last slide
   - `T`: Toggle Table of Contents drawer
   - `F`: Toggle Fullscreen mode
   - `?` or `H`: View keyboard shortcut help
   - `Esc`: Close any open drawer or modal

---

## 🛠️ Complete Project Code: `genai-node-starter`

Below is the complete, runnable code for the GenAI Node.js Starter Template demonstrated in Slide 20.

### 1. `package.json`
```json
{
  "name": "genai-node-starter",
  "version": "1.0.0",
  "description": "Express + Zod + MySQL + OpenAI SDK Starter Template",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mysql2": "^3.9.7",
    "openai": "^4.38.3",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

### 2. `.env`
```ini
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=genai_node
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. `.gitignore`
```
node_modules/
.env
```

### 4. Database Setup (`schema.sql`)
```sql
CREATE DATABASE IF NOT EXISTS genai_node;
USE genai_node;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  course VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. `config/db.js`
```javascript
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "genai_node",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

### 6. `models/studentModel.js`
```javascript
const pool = require("../config/db");

// 1. Get all students
async function getAllStudents() {
  const [rows] = await pool.execute("SELECT * FROM students ORDER BY id DESC");
  return rows;
}

// 2. Get student by ID
async function getStudentById(id) {
  const [rows] = await pool.execute(
    "SELECT * FROM students WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

// 3. Create student
async function createStudent(data) {
  const [result] = await pool.execute(
    "INSERT INTO students (name, email, course) VALUES (?, ?, ?)",
    [data.name, data.email, data.course]
  );
  return result.insertId;
}

// 4. Update student
async function updateStudent(id, data) {
  const [result] = await pool.execute(
    "UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?",
    [data.name, data.email, data.course, id]
  );
  return result.affectedRows;
}

// 5. Delete student
async function deleteStudent(id) {
  const [result] = await pool.execute(
    "DELETE FROM students WHERE id = ?",
    [id]
  );
  return result.affectedRows;
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
```

### 7. `routes/studentRoutes.js`
```javascript
const express = require("express");
const { z } = require("zod");
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../models/studentModel");

const router = express.Router();

// Define Zod Schema for validation
const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  course: z.string().min(2, "Course must be at least 2 characters")
});

// GET /students — Retrieve all students
router.get("/", async (req, res, next) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// GET /students/:id — Retrieve single student
router.get("/:id", async (req, res, next) => {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// POST /students — Validate & create student
router.post("/", async (req, res, next) => {
  try {
    const validation = studentSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Invalid student data",
        errors: validation.error.issues
      });
    }

    const newId = await createStudent(validation.data);
    res.status(201).json({
      message: "Student created successfully",
      id: newId
    });
  } catch (error) {
    // Handle MySQL unique duplicate email error (ER_DUP_ENTRY)
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email already registered" });
    }
    next(error);
  }
});

// PUT /students/:id — Update student
router.put("/:id", async (req, res, next) => {
  try {
    const validation = studentSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Invalid student data",
        errors: validation.error.issues
      });
    }

    const affected = await updateStudent(req.params.id, validation.data);
    if (affected === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student updated successfully" });
  } catch (error) {
    next(error);
  }
});

// DELETE /students/:id — Delete student
router.delete("/:id", async (req, res, next) => {
  try {
    const affected = await deleteStudent(req.params.id);
    if (affected === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

### 8. `services/aiService.js`
```javascript
const OpenAI = require("openai");

// Initialize once and reuse across requests
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate non-streamed response
async function generateAnswer(prompt) {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt
  });
  return response.output_text;
}

// Generate streamed response (SSE)
async function streamAnswer(prompt, onChunk) {
  const stream = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
    stream: true
  });

  for await (const chunk of stream) {
    if (chunk.delta) {
      onChunk(chunk.delta);
    }
  }
}

module.exports = {
  generateAnswer,
  streamAnswer
};
```

### 9. `server.js`
```javascript
// 1. MUST load environment variables first
require("dotenv").config();

const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const { generateAnswer } = require("./services/aiService");

const app = express();

// Body Parser Middleware
app.use(express.json());

// 2. Mount student database routes
app.use("/students", studentRoutes);

// 3. AI Endpoint: GET /ai?prompt=...
app.get("/ai", async (req, res, next) => {
  try {
    const prompt = req.query.prompt;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt query parameter is required" });
    }

    const answer = await generateAnswer(prompt);
    res.json({ prompt, answer });
  } catch (error) {
    next(error);
  }
});

// 4. Server-Sent Events (SSE) Streaming Endpoint
app.get("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const messages = ["Hello", "Welcome", "To GenAI Node.js"];

  for (const message of messages) {
    res.write(`data: ${message}\n\n`);
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  res.write("data: [DONE]\n\n");
  res.end();
});

// 5. Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 GenAI Starter Server running at http://localhost:${PORT}`);
});
```

---

## 🧪 Testing with Postman & cURL

### 1. Create a Student (POST `/students`)
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Sarah Connor","email":"sarah@college.edu","course":"GenAI Development"}'
```
**Expected Response:** `201 Created`
```json
{
  "message": "Student created successfully",
  "id": 1
}
```

### 2. Get All Students (GET `/students`)
```bash
curl -X GET http://localhost:3000/students
```
**Expected Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Sarah Connor",
    "email": "sarah@college.edu",
    "course": "GenAI Development"
  }
]
```

### 3. Trigger Zod Validation Error
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"S","email":"invalid-email","course":""}'
```
**Expected Response:** `400 Bad Request` with Zod issues array.

### 4. Query AI Model (GET `/ai`)
```bash
curl -X GET "http://localhost:3000/ai?prompt=Explain%20Node.js%20in%20simple%20words"
```
**Expected Response:** `200 OK` with AI answer.

### 5. Test SSE Streaming (GET `/stream`)
```bash
curl -N -X GET http://localhost:3000/stream
```
**Expected Output:** Real-time incoming chunks separated by double newlines.

---

## 🎯 5 Student Practice Challenges

1. **Add Full CRUD Support**:
   - Implement `updateStudent(id, data)` and `deleteStudent(id)` in `studentModel.js` and test them using Postman.
2. **Partial Updates with Zod**:
   - Use `studentSchema.partial()` to create a `PATCH /students/:id` route that allows updating just the course or name.
3. **Database-Augmented AI Prompt**:
   - Create an endpoint `POST /students/:id/recommend-course` that queries the student from MySQL, passes their current course into the OpenAI prompt, and returns personalized course recommendations!
4. **SSE AI Streaming**:
   - Upgrade the `/stream` endpoint to stream actual tokens generated by `client.responses.create({ stream: true })`.
5. **Add Environment Validation**:
   - Use Zod to validate `process.env` at startup to ensure `DB_HOST`, `DB_NAME`, and `OPENAI_API_KEY` are all present before starting Express!

---

## 📄 License & Attribution
Prepared for the **GenAI Node.js Curriculum**. Free for educational, classroom, and training use.
