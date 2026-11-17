# Node.js GenAI – Day 7: Structured Output, JSON Schema & Zod Validation

> **Classroom Presentation & Code Companion**  
> **Course:** Node.js + Generative AI Full Stack  
> **Topic:** Structured Output, JSON Format, JSON Schema Standard, Zod Validation, Type Safety & Production AI Extraction  
> **Format:** 20-Slide Interactive Presentation + Live Browser Sandboxes + Production Express Backend

---

## 📖 Presentation Overview

In this class, students move beyond freeform conversational AI responses into deterministic, enterprise-grade software engineering. Students learn how to instruct LLMs to emit strict JSON, define structural contracts using JSON Schema, and validate runtime payloads using **Zod** in Node.js.

### 20-Slide Curriculum Outline

| Slide | Title | Focus & Core Concepts |
|---|---|---|
| **01** | Title: Structured Output & Data Validation | Course kickoff, agenda, learning objectives, and practical stack |
| **02** | Why Do We Need Structured Output? | Natural language inconsistency, why freeform text breaks backends, structured JSON solution |
| **03** | What Is JSON? | JavaScript Object Notation standard, 6 strict syntax rules, common data types |
| **04** | JSON vs JavaScript Object | In-memory heap objects vs serialized strings, `JSON.stringify()`, `JSON.parse()` |
| **05** | JSON Output from an LLM | Prompt design for JSON, required fields list, why prompt instructions alone cannot guarantee validity |
| **06** | Node.js Practical: Generate JSON Using Groq | Calling Groq SDK (`temperature: 0.2`), parsing response, property extraction |
| **07** | What Is JSON Schema? | The IETF structural contract standard, `properties`, `required`, `additionalProperties` |
| **08** | Practical: Understand JSON Schema Validation | Syntax validity vs structural validity, diagnosing type & required field mismatches |
| **09** | What Is Zod? | Runtime validation library for JS/TS, why use Zod, comparison with Python's Pydantic |
| **10** | Zod Schema: Define Student Data | Building chained schema rules: `.string().min()`, `.int().min().max()`, `.email()`, `.enum()`, `.array()` |
| **11** | Zod Parsing: What Is Parse? | Meaning of parsing, `.parse()` method, exception flow, and catching `ZodError` |
| **12** | Zod SafeParse: Validate Without Throwing | Safe evaluation, discriminated union return (`success: true/false`), clean error handling |
| **13** | Zod Validation Errors | Inspecting `result.error.issues`, path, message, error formatting for APIs |
| **14** | Practical: Zod Validation in Express API | Building a production `POST /students` endpoint with HTTP 400 & 201 handlers |
| **15** | Zod and Type Safety | Runtime validation vs TypeScript compile-time type checking |
| **16** | Zod with TypeScript: Infer Types | Deriving TypeScript types with `z.infer<typeof schema>`, eliminating code duplication |
| **17** | Zod Advanced Features: Defaults, Optional & Transform | `.optional()`, `.nullable()`, `.default()`, `.transform()`, data sanitization |
| **18** | Structured Output + JSON Schema + Zod in AI Applications | End-to-end architecture flowchart, component responsibility matrix |
| **19** | Practical: Validate AI-Generated Data Using Groq & Zod | End-to-end Node.js script combining Groq SDK, `JSON.parse`, and Zod validation |
| **20** | Final Practical Project: AI Student Extractor | Complete Express API (`POST /extract-student`) with Groq, Zod, and full HTTP status codes |

---

## 🚀 How to Open and Navigate the Presentation

### Running Locally
Simply open `index.html` in any modern web browser:
```bash
# On Windows PowerShell:
Start-Process "c:\Users\ADMIN\OneDrive\Desktop\HACA\Presentation\gen-ai\day-7-structured-output-zod\index.html"
```
Or double-click `index.html` from Windows File Explorer.

### Keyboard Shortcuts
- `→` / `Space` / `PageDown`: Next Slide
- `←` / `PageUp`: Previous Slide
- `Home`: Jump to Slide 1
- `End`: Jump to Slide 20
- `F`: Toggle Fullscreen Mode
- `T`: Toggle Table of Contents Sidebar
- `?`: Open Keyboard Shortcuts Help Modal
- `Esc`: Close open modals or sidebar

---

## 🛠️ Interactive Sandboxes Included in Slides

1. **Slide 2:** Unstructured vs Structured Format Comparator
2. **Slide 3:** Live JSON Syntax & Rules Inspector (single quotes, trailing commas, comments)
3. **Slide 4:** Live `JSON.stringify()` vs `JSON.parse()` Playground
4. **Slide 8:** JSON Schema Validation Diagnostic Tester (Valid vs Wrong Type vs Missing Fields)
5. **Slide 12:** Real-Time `safeParse()` Evaluator with issues inspector
6. **Slide 14:** Express `POST /students` API Client Simulator
7. **Slide 17:** Zod `.transform()` Trimming & Casing Tester
8. **Slide 20:** Live AI Student Information Extractor Simulator

---

## 💻 Running the Practical Code Examples

### 1. Prerequisites & Environment Setup

Create a new directory for Day 7 practical exercises:
```bash
mkdir ai-student-extractor && cd ai-student-extractor
npm init -y
```

Install the required production dependencies:
```bash
npm install express groq-sdk dotenv zod
```

### 2. Configure Environment Variables (`.env`)

Create a `.env` file in the root directory:
```env
PORT=3000
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

> **Note on Model ID:** `llama-3.3-70b-versatile` is Groq's high-speed production model. You can also use `llama-3.1-8b-instant` or check your current Groq console catalogue.

---

## 📦 Capstone Project: `ai-student-extractor`

### Project Structure
```text
ai-student-extractor/
├── .env
├── .gitignore
├── package.json
└── server.js
```

### Server Implementation (`server.js`)

```javascript
require("dotenv").config();
const express = require("express");
const Groq = require("groq-sdk");
const { z } = require("zod");

const app = express();
app.use(express.json());

// Initialize Groq Client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

// 1. Define Zod Validation Schema
const studentSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  age: z.number().int().min(16, "Minimum age is 16").max(60, "Maximum age is 60"),
  email: z.string().email("Invalid email address"),
  course: z.string().min(1, "Course name is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required")
});

// 2. Student Extraction Route
app.post("/extract-student", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate incoming HTTP request payload
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Student information message is required in request body"
      });
    }

    // Call Groq LLM with structured instruction
    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `You are a student information extractor.
Extract student data from the user message.
Return ONLY valid JSON with these fields:
- name (string)
- age (integer)
- email (string)
- course (string)
- skills (array of strings)

Do NOT include markdown backticks or conversational explanations.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.2,
      max_completion_tokens: 300
    });

    const aiText = response.choices[0].message.content;

    // Tier 1 Validation: Syntax Check
    let parsedData;
    try {
      parsedData = JSON.parse(aiText);
    } catch (parseErr) {
      return res.status(502).json({
        success: false,
        message: "AI returned invalid JSON syntax",
        rawOutput: aiText
      });
    }

    // Tier 2 Validation: Structure & Type Check
    const validation = studentSchema.safeParse(parsedData);
    if (!validation.success) {
      return res.status(422).json({
        success: false,
        message: "AI data schema validation failed",
        errors: validation.error.issues
      });
    }

    // Return Validated Data
    res.status(200).json({
      success: true,
      message: "Student information extracted successfully",
      data: validation.data
    });

  } catch (err) {
    console.error("AI Error:", err.message);
    res.status(502).json({
      success: false,
      message: "Unable to process AI request"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 🧪 Testing with Postman or cURL

### cURL Test Command
```bash
curl -X POST http://localhost:3000/extract-student \
  -H "Content-Type: application/json" \
  -d '{"message": "Rahul is 22 years old. His email is rahul@gmail.com. He is learning MERN Stack and knows JavaScript and React."}'
```

### Expected HTTP 200 Response
```json
{
  "success": true,
  "message": "Student information extracted successfully",
  "data": {
    "name": "Rahul",
    "age": 22,
    "email": "rahul@gmail.com",
    "course": "MERN Stack",
    "skills": [
      "JavaScript",
      "React"
    ]
  }
}
```

---

## 🎨 Classroom Design System & Palette

- **Background Canvas:** `#F3F8FF` (Light classroom blue gradient)
- **Slide Background:** `#FFFFFF` (Crisp white slide card with soft elevation)
- **Headings & Badges:** `#142B4D` (Deep navy blue)
- **Primary Accent:** `#3478F6` (Electric royal blue)
- **Light Accent:** `#DCEBFF` (Ice blue container chips)
- **Code Panel Background:** `#101827` (Charcoal terminal dark)
- **Code Text:** `#F1F5F9` (High contrast readable syntax)
- **Status Green:** `#059669` (Validated schemas)
- **Status Rose:** `#DC2626` (Validation errors)
