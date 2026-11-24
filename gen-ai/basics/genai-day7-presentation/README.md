# Node.js GenAI – Day 7: Structured Output, Zod & Function Calling

> **Classroom Presentation & Code Companion**  
> **Course:** Node.js + Generative AI Full Stack  
> **Combined Masterclass:** Day 7 (Structured Output & Zod) + Day 8 (Function Calling / Tool Calling)  
> **Target Models:** `llama-3.3-70b-versatile` / `openai/gpt-oss-120b` (Groq Tool-Calling Engine)  
> **Length:** Exactly 23 Slides (Max 25 Pages, Zero Redundancy)

---

## 📖 Presentation Overview

This presentation unifies two essential pillars of building enterprise AI applications with Node.js:
1. **Data Predictability (Structured Output):** Getting reliable, typed JSON data out of LLMs instead of unpredictable natural language paragraphs, and validating it using JSON Schema and **Zod**.
2. **Agentic Execution (Function / Tool Calling):** Empowering the model to request real backend actions (database queries, calculations, external APIs), with your Node.js application securely validating arguments and executing code.

By combining these two topics into a single presentation, students learn to build resilient, agentic applications where LLMs reason and Node.js executes.

---

## 📋 23-Slide Curriculum Syllabus

| Slide | Title | Focus & Core Concepts |
|---|---|---|
| **01** | Title: Structured Output, Zod & Function Calling | Unified curriculum, learning objectives, and practical stack |
| **02** | The Problem with Unstructured LLM Text | Freeform text breakdown, property access failure, and structured JSON solution |
| **03** | JSON & Serialization in Node.js | In-memory heap objects vs serialized strings, `JSON.stringify()`, `JSON.parse()` |
| **04** | Generating JSON from an LLM | System prompts, low temperature (0.2), and why prompts alone cannot guarantee validity |
| **05** | What Is JSON Schema? | The IETF structural description standard, properties, required fields, additionalProperties |
| **06** | What Is Zod & Why Do We Need It? | Runtime validation in Node.js, comparison with Python's Pydantic |
| **07** | Defining Rich Zod Schemas | Chained methods: `.min()`, `.int()`, `.max()`, `.email()`, `.enum()`, `.array()`, `.optional()`, `.default()` |
| **08** | Zod parse() vs safeParse() | Exception throwing vs discriminated union return (`success: true/false`) |
| **09** | Handling Validation Errors | Inspecting `result.error.issues` and formatting user-friendly error objects |
| **10** | Practical: Validating AI Structured Output | Two-tier shield: `JSON.parse` (syntax) + `studentSchema.safeParse` (schema/types) |
| **11** | From Structured Output to Function Calling | Moving from passive data output to active backend capability requests |
| **12** | How Function Calling Works (The 5 Steps) | User query $\rightarrow$ Schemas $\rightarrow$ Model tool request $\rightarrow$ Node.js execution $\rightarrow$ Final synthesis |
| **13** | Defining Tool Schemas for Groq | Groq-compatible JSON Schema tool definitions (`get_student`, `get_attendance`) |
| **14** | Tool Selection & tool_choice | Matching user intent to descriptions; `tool_choice: "auto"` vs `"required"` vs `"none"` |
| **15** | Inspecting the Tool Call Response | Parsing `response.choices[0].message.tool_calls`, `id`, `function.name`, `function.arguments` |
| **16** | Validating Tool Arguments with Zod | Parsing stringified JSON arguments and validating with Zod before running database queries |
| **17** | Tool Execution via Tool Registry Map | Whitelisting functions in `availableTools` map without dangerous `eval()` |
| **18** | Sending Tool Results Back to the LLM | Appending `role: "tool"` messages with `tool_call_id` and generating final natural language response |
| **19** | Error Handling in Tool Calling | Handling unknown tools, invalid arguments, missing records, and returning safe error objects |
| **20** | The Complete Combined Architecture | Full system pipeline uniting Structured Output, JSON Schema, Zod, and Function Calling |
| **21** | Capstone Project: Setup & Schemas (Part 1) | In-memory student records, JavaScript functions, tools array, and Zod argument schemas |
| **22** | Capstone Project: Execution & API (Part 2) | Complete `executeTool`, two-turn `runAssistant`, Express `POST /chat` endpoint, and cURL tests |
| **23** | Key Takeaways & Production Checklist | 5 essential production rules + Live Interactive AI Student Assistant Simulator |

---

## 🚀 How to Open and Navigate the Presentation

### Running Locally
Open `index.html` in your browser:
```powershell
Start-Process "c:\Users\ADMIN\OneDrive\Desktop\HACA\Presentation\gen-ai\day7\index.html"
```

### Keyboard Shortcuts
- `→` / `Space`: Next Slide
- `←` / `PageUp`: Previous Slide
- `Home`: Jump to Slide 1
- `End`: Jump to Slide 23
- `F`: Toggle Fullscreen Mode
- `T`: Toggle Table of Contents Drawer
- `?`: Open Keyboard Shortcuts Help Modal
- `Esc`: Close open overlays or modals

---

## 🧪 Interactive Sandboxes in Slides

1. **Slide 2:** Unstructured vs Structured Format Comparator
2. **Slide 3:** Live JSON Syntax & Parse Inspector
3. **Slide 8:** Live Zod `parse()` vs `safeParse()` Evaluator
4. **Slide 11:** Normal LLM vs Function Calling Workflow Runner
5. **Slide 14:** Intent-to-Tool Selection Simulator
6. **Slide 16:** Zod Tool Argument Validator
7. **Slide 23:** Complete AI Student Assistant Live Chat Simulator

---

## 💻 Running the Capstone Project

### 1. Setup Project Folder
```bash
mkdir ai-student-assistant && cd ai-student-assistant
npm init -y
npm install express groq-sdk dotenv zod
```

### 2. Environment Configuration (`.env`)
```env
PORT=3000
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 3. Complete Server Code (`server.js`)
```javascript
require("dotenv").config();
const express = require("express");
const Groq = require("groq-sdk");
const { z } = require("zod");

const app = express();
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = "openai/gpt-oss-120b"; // Or "llama-3.3-70b-versatile"

// In-Memory Student Database
const students = [
  { id: 101, name: "Arun", course: "MERN Stack", attendance: 85 },
  { id: 102, name: "Rahul", course: "Python", attendance: 72 }
];

// Backend Functions
function getStudent(studentId) {
  return students.find(s => s.id === studentId) || null;
}

function getAttendance(studentId) {
  const student = getStudent(studentId);
  if (!student) return { error: "Student not found" };
  return { studentId, name: student.name, attendance: student.attendance };
}

// Tool Schemas for Groq
const tools = [
  {
    type: "function",
    function: {
      name: "get_student",
      description: "Get student details using unique student ID",
      parameters: {
        type: "object",
        properties: { studentId: { type: "integer", description: "Unique student ID" } },
        required: ["studentId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_attendance",
      description: "Get attendance percentage using student ID",
      parameters: {
        type: "object",
        properties: { studentId: { type: "integer", description: "Unique student ID" } },
        required: ["studentId"]
      }
    }
  }
];

// Zod Schemas for Runtime Argument Validation
const argumentSchemas = {
  get_student: z.object({ studentId: z.number().int().positive() }),
  get_attendance: z.object({ studentId: z.number().int().positive() })
};

// Safe Tool Registry Map
const availableTools = {
  get_student: getStudent,
  get_attendance: getAttendance
};

// Execution Helper
function executeTool(toolCall) {
  const toolName = toolCall.function.name;
  try {
    const tool = availableTools[toolName];
    const schema = argumentSchemas[toolName];
    if (!tool || !schema) throw new Error("Unknown tool: " + toolName);

    const args = JSON.parse(toolCall.function.arguments);
    const validated = schema.safeParse(args);
    if (!validated.success) throw new Error("Invalid tool arguments: " + JSON.stringify(validated.error.issues));

    return tool(validated.data.studentId);
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// Two-Turn Orchestration
async function runAssistant(question) {
  const messages = [
    {
      role: "system",
      content: "You are an AI Student Assistant. Use available tools to answer questions about students. Do not invent facts."
    },
    { role: "user", content: question }
  ];

  // Turn 1: Let model evaluate intent and select tool
  const res1 = await groq.chat.completions.create({
    model: MODEL,
    messages,
    tools,
    tool_choice: "auto"
  });

  const msg = res1.choices[0].message;
  if (!msg.tool_calls?.length) return msg.content;

  messages.push(msg);

  // Execute each requested tool
  for (const toolCall of msg.tool_calls) {
    const result = executeTool(toolCall);
    messages.push({
      role: "tool",
      tool_call_id: toolCall.id,
      name: toolCall.function.name,
      content: JSON.stringify(result)
    });
  }

  // Turn 2: Synthesize final answer from tool output
  const finalRes = await groq.chat.completions.create({
    model: MODEL,
    messages,
    tools,
    tool_choice: "none"
  });

  return finalRes.choices[0].message.content;
}

// Express Endpoint
app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Question string is required" });
    }
    const answer = await runAssistant(question);
    res.json({ success: true, answer });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Student Assistant running on http://localhost:${PORT}`);
});
```

---

## 📡 Testing with cURL

### Student Info Query
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Who is student 101?"}'
```
**Response:**
```json
{
  "success": true,
  "answer": "Student 101 is Arun, enrolled in the MERN Stack course."
}
```

### Attendance Query
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is Rahul's attendance percentage?"}'
```
**Response:**
```json
{
  "success": true,
  "answer": "Rahul's attendance is 72%."
}
```
