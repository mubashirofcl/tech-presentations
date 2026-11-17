# Node.js GenAI – Day 8: Function Calling / Tool Calling

> **Classroom Presentation & Code Companion**  
> **Course:** Node.js + Generative AI Full Stack  
> **Topic:** Function Calling, Tool Calling, JSON Schema Tool Definitions, Zod Argument Validation, Groq SDK Orchestration  
> **Target Model:** `openai/gpt-oss-120b` (Groq Tool-Calling Engine)  
> **Format:** 20-Slide Interactive Presentation + Live Browser Sandboxes + Production Express Backend

---

## 📖 Presentation Overview

In Day 8, students transition from models that merely generate text to **agentic LLMs** that can request backend capabilities from a Node.js application. Through Groq's Chat Completions tool-calling flow, the model analyzes user intent, determines when external data is needed, and provides structured function arguments. Node.js validates those arguments using Zod, executes the actual database function, and returns the result to the model for final conversational synthesis.

### 20-Slide Curriculum Outline

| Slide | Title | Focus & Core Concepts |
|---|---|---|
| **01** | Introduction to Function Calling | Course kickoff, agenda, learning objectives, and practical stack |
| **02** | What Is Function Calling? | Requesting application actions, database queries, and external APIs |
| **03** | Normal LLM vs Function Calling | Visual workflow comparison: pre-trained generation vs dynamic tool execution |
| **04** | How Does Function Calling Work? | The 5-phase lifecycle: Query $\rightarrow$ Schemas $\rightarrow$ Tool Call $\rightarrow$ Execution $\rightarrow$ Final Response |
| **05** | What Is a Tool? | Tool definition, JavaScript function implementation, and orchestrator execution |
| **06** | What Is a Tool Schema? | Groq-compatible JSON Schema, `type`, `name`, `description`, `parameters`, `required` |
| **07** | Understanding JSON Schema for Tools | Primitive data types (`string`, `number`, `integer`, `boolean`, `array`, `object`) |
| **08** | What Are Tool Arguments? | Escaped JSON string parameters, `JSON.parse()`, and why raw arguments cannot be trusted |
| **09** | What Is Zod and Why Do We Need It? | Runtime argument validation, `z.number().int().positive()`, preventing database crashes |
| **10** | Connecting Tool Schema with Zod | Dual-schema architecture: JSON Schema for the LLM + Zod for Node.js execution |
| **11** | How Does the LLM Select a Tool? | Matching user queries to descriptions, `tool_choice: "auto"` vs `"required"` vs `"none"` |
| **12** | Practical: Sending Tools to Groq | Groq SDK setup, `chat.completions.create` with `model: "openai/gpt-oss-120b"` and `tools` array |
| **13** | Understanding the Tool Call Response | Inspecting `response.choices[0].message.tool_calls`, `id`, `function.name`, `function.arguments` |
| **14** | How to Execute a Tool in Node.js | Creating the tool registry map (`availableTools`), looking up functions, and running them safely |
| **15** | Tool Result: Sending Data Back to the LLM | Formatting `role: "tool"` messages with `tool_call_id` and requesting final synthesis |
| **16** | Tool Execution: Error Handling | Handling unknown tools, malformed arguments, missing records, and safe error payloads |
| **17** | The Complete Tool Calling Cycle | Large 9-stage visual workflow from user request to final synthesized output |
| **18** | Practical Project: AI Student Assistant | Capstone architecture: `get_student` and `get_attendance` over in-memory database |
| **19** | Practical Code: Setup & Tool Definitions (Part 1) | In-memory records, JavaScript functions, JSON Schema `tools`, and Zod `argumentSchemas` |
| **20** | Practical Code: Tool Execution & Express API (Part 2) | Safe `executeTool`, two-turn `runAssistant`, `POST /chat` Express route, and Postman testing |

---

## 🚀 How to Open and Navigate the Presentation

### Running Locally
Open `index.html` in any web browser:
```powershell
Start-Process "c:\Users\ADMIN\OneDrive\Desktop\HACA\Presentation\gen-ai\node-genai-day-8\index.html"
```

### Keyboard Shortcuts
- `→` / `Space` / `PageDown`: Next Slide
- `←` / `PageUp`: Previous Slide
- `Home`: Jump to Slide 1
- `End`: Jump to Slide 20
- `F`: Toggle Fullscreen Mode
- `T`: Toggle Table of Contents Sidebar
- `?`: Open Keyboard Shortcuts Help Modal
- `Esc`: Close open overlays or modals

---

## 🧪 Interactive Sandboxes in Slides

1. **Slide 3:** Interactive Normal LLM vs Tool-Calling Workflow Comparator
2. **Slide 6:** Live Tool Schema Inspector (`get_student` vs `get_attendance`)
3. **Slide 9:** Real-Time Zod Tool Argument Validator Simulator
4. **Slide 11:** Tool Selection Simulator with `tool_choice` mode switcher
5. **Slide 14:** Tool Registry & JavaScript Execution Sandbox
6. **Slide 16:** Defensive Error Handling & Failure Mode Simulator
7. **Slide 20:** Full AI Student Assistant Interactive Chat Simulator

---

## 💻 Running the Practical Code Project

### 1. Setup Project Folder
```bash
mkdir ai-student-assistant && cd ai-student-assistant
npm init -y
```

### 2. Install Dependencies
```bash
npm install express groq-sdk dotenv zod
```

### 3. Environment Configuration (`.env`)
Create a `.env` file in the project root:
```env
PORT=3000
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 4. Complete Server Code (`server.js`)

```javascript
require("dotenv").config();
const express = require("express");
const Groq = require("groq-sdk");
const { z } = require("zod");

const app = express();
app.use(express.json());

// Initialize Groq SDK
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = "openai/gpt-oss-120b";

// 1. In-Memory Student Database
const students = [
  { id: 101, name: "Arun", course: "MERN Stack", attendance: 85 },
  { id: 102, name: "Rahul", course: "Python", attendance: 72 }
];

// 2. Real Backend Functions
function getStudent(studentId) {
  return students.find(s => s.id === studentId) || null;
}

function getAttendance(studentId) {
  const student = getStudent(studentId);
  if (!student) return { error: "Student not found" };
  return { studentId, name: student.name, attendance: student.attendance };
}

// 3. Tool Schemas (Sent to LLM)
const tools = [
  {
    type: "function",
    function: {
      name: "get_student",
      description: "Get student details using student ID",
      parameters: {
        type: "object",
        properties: {
          studentId: { type: "integer", description: "Unique student ID" }
        },
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
        properties: {
          studentId: { type: "integer", description: "Unique student ID" }
        },
        required: ["studentId"]
      }
    }
  }
];

// 4. Zod Schemas for Runtime Argument Validation
const argumentSchemas = {
  get_student: z.object({ studentId: z.number().int().positive() }),
  get_attendance: z.object({ studentId: z.number().int().positive() })
};

// 5. Tool Registry Map
const availableTools = {
  get_student: getStudent,
  get_attendance: getAttendance
};

// 6. Safe Execution Helper
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

// 7. Orchestration Engine
async function runAssistant(question) {
  const messages = [
    {
      role: "system",
      content: "You are an AI Student Assistant. Use the available tools to answer questions about students. Do not invent student information."
    },
    { role: "user", content: question }
  ];

  // Request 1: Let the model evaluate the question and decide if tools are needed
  const response = await groq.chat.completions.create({
    model: MODEL,
    messages,
    tools,
    tool_choice: "auto"
  });

  const assistantMessage = response.choices[0].message;

  // If no tools are requested, return text response directly
  if (!assistantMessage.tool_calls?.length) {
    return assistantMessage.content;
  }

  // Record the model's tool-call request in the conversation history
  messages.push(assistantMessage);

  // Execute each requested tool call and append the result
  for (const toolCall of assistantMessage.tool_calls) {
    const result = executeTool(toolCall);
    messages.push({
      role: "tool",
      tool_call_id: toolCall.id,
      name: toolCall.function.name,
      content: JSON.stringify(result)
    });
  }

  // Request 2: Let the model synthesize a friendly human answer from tool results
  const finalResponse = await groq.chat.completions.create({
    model: MODEL,
    messages,
    tools,
    tool_choice: "none"
  });

  return finalResponse.choices[0].message.content;
}

// 8. Express API Route
app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;
    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }

    const answer = await runAssistant(question);
    res.json({ success: true, answer });
  } catch (error) {
    console.error("Assistant Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Student Assistant running on http://localhost:${PORT}`);
});
```

---

## 📡 Testing with Postman or cURL

### Query 1: Student Details
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Who is student 101?"}'
```
**Expected Response:**
```json
{
  "success": true,
  "answer": "Student 101 is Arun, who is enrolled in the MERN Stack course."
}
```

### Query 2: Student Attendance
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the attendance percentage of student 102?"}'
```
**Expected Response:**
```json
{
  "success": true,
  "answer": "Rahul's attendance is 72%."
}
```

---

## 🎨 Design System & Palette

- **Background:** `#F3F8FF` (Very light classroom blue)
- **Slide Surface:** `#FFFFFF` (Crisp elevated white card)
- **Primary Blue:** `#2563EB` (Electric royal blue)
- **Headings & Badges:** `#14213D` (Deep oxford navy)
- **Body Text:** `#475569` (Readable slate)
- **Code Background:** `#0F172A` (Charcoal terminal dark)
- **Accent Blue:** `#60A5FA` (Syntax keywords & pills)
- **Success Green:** `#059669` (Validated outputs)
