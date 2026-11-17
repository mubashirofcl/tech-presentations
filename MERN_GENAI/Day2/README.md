# MERN Gen-AI – Day 2: Building AI-Powered Applications

A complete, production-grade, projector-friendly presentation and full-stack companion project for teaching structured outputs, Zod schema validation, function/tool calling, Retrieval-Augmented Generation (RAG), and React frontend integration in Node.js.

---

## 📋 Table of Contents
1. [Overview](#-overview)
2. [Quick Start](#-quick-start)
3. [Presentation Features](#-presentation-features)
4. [Keyboard & Navigation Shortcuts](#-keyboard--navigation-shortcuts)
5. [Slide Outline (18 Slides)](#-slide-outline-18-slides)
6. [Companion Practical Project (`mern-ai-assistant`)](#-companion-practical-project-mern-ai-assistant)
   - [Project Architecture](#project-architecture)
   - [Setup & Installation](#setup--installation)
   - [Environment Variables](#environment-variables)
   - [Knowledge Documents (`documents.js`)](#knowledge-documents-documentsjs)
   - [Calculator Tool (`tools/calculator.js`)](#calculator-tool-toolscalculatorjs)
   - [Complete `server.js` Code](#complete-serverjs-code)
   - [React Frontend Integration (`AIChat.jsx`)](#react-frontend-integration-aichatjsx)
   - [API Testing & Postman Queries](#api-testing--postman-queries)
7. [Interactive Labs in Presentation](#-interactive-labs-in-presentation)
8. [Instructor Teaching Tips](#-instructor-teaching-tips)

---

## 🎯 Overview
- **Course**: MERN Stack with Generative AI
- **Module**: Day 2
- **Focus**: Turning raw LLM prompts into deterministic, production-ready full-stack applications using Structured Outputs (`response_format: json_object`), Schema Validation (`zod`), Tool Calling (multi-turn function execution), and RAG (in-memory document retrieval).
- **Audience**: Full-stack MERN developers seeking to master backend AI orchestration.
- **Tech Stack**: HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript (Viewer); Node.js, Express, `openai`, `zod`, `dotenv`, `cors`, React (Backend & Client).

---

## 🚀 Quick Start
### 1. View Presentation
Double-click [index.html](file:///c:/Users/ADMIN/OneDrive/Desktop/HACA/Presentation/MERN_GENAI/Day2/index.html) or open it with any web browser (Chrome, Edge, Firefox, Safari). No web server, Node.js build step, or external CDN is required.

### 2. Run Companion Node.js Project
```bash
# Create project folder
mkdir mern-ai-assistant && cd mern-ai-assistant
npm init -y

# Install dependencies
npm install express openai dotenv zod cors

# Configure environment
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "PORT=5000" >> .env
```

---

## 🖥️ Presentation Features
- **Projector-Ready Palette**: Clean sky-blue palette (`#0284c7`), high-contrast slide containers (`#ffffff`), dark slate code cards (`#0b1329`), and legible typography (`Plus Jakarta Sans` & `JetBrains Mono`).
- **Zero External Dependencies**: Pure vanilla HTML5, CSS3, and JavaScript. Operates 100% offline.
- **1-Click Copy Buttons**: Every code snippet and terminal block has a hover copy button with instant visual feedback (`Copied!`).
- **4 Interactive Sandboxes**:
  1. *Zod Schema Validator* (Slide 6): Test JSON data against schemas live with `safeParse()` feedback and field error highlighting.
  2. *Tool Calling Simulator* (Slide 10): Type math questions and watch the 4-step tool loop execute in real time.
  3. *RAG Knowledge Search* (Slide 14): Enter student queries and inspect chunk relevance scoring against course policies.
  4. *React Assistant Simulator* (Slide 16): Interactive stateful chat UI testing tool calls, RAG lookup, and resume extraction.
- **Interactive Modals**:
  - **Table of Contents Modal** (`T` or click header button) for instant navigation to any of the 18 slides.
  - **Keyboard Help Modal** (`?` or click `?` button).
  - **Full Capstone Solution Modal** (Slide 18): Complete `server.js` reference with 1-click copy.

---

## ⌨️ Keyboard & Navigation Shortcuts
| Key / Gesture | Action |
| :--- | :--- |
| `→` (Right Arrow) / `Page Down` / `Space` | Next Slide |
| `←` (Left Arrow) / `Page Up` | Previous Slide |
| `Home` | First Slide (`#slide-1`) |
| `End` | Last Slide (`#slide-18`) |
| `T` | Toggle Table of Contents modal |
| `?` | Toggle Keyboard Shortcuts help modal |
| `Esc` | Close any active modal |
| `Swipe Left / Right` | Touch navigation for tablets and mobile devices |

---

## 📑 Slide Outline (18 Slides)

### Slide 1: From LLM to AI Application
- Moving beyond simple prompt-response wrappers.
- Traditional MERN (React &harr; Express &harr; MongoDB) vs AI-Powered MERN (React &harr; Express &harr; AI Services &harr; Tools &harr; Vector Knowledge).
- **Visual Diagram 1**: Normal MERN vs AI-Powered MERN Architecture.

### Slide 2: How Does an AI Application Work?
- The 5-stage request lifecycle: Client Request &rarr; Express Pipeline &rarr; Model Inference &rarr; Tool/Schema Execution &rarr; Client Response.
- **Visual Diagram 2**: End-to-End AI Request & Response Lifecycle.
- The 4 architectural pillars: Prompt Ingestion, Context Augmentation, Action Execution, and Schema Enforcement.

### Slide 3: Async/Await & LLM API Requests
- Why LLM calls are I/O bound (500ms–5s) and how to prevent blocking the Node.js event loop.
- Structuring robust `async/await` route handlers in Express.
- Explicit status code handling: 400 (Bad Request), 401 (Invalid Key), 429 (Rate Limits/Quota), 504 (Timeout).
- Preventing uncaught promise rejections from crashing the server.

### Slide 4: What Is Structured Output?
- The problem of unstructured conversational prose in automated pipelines.
- Why modern web applications require predictable JSON (state updates, DB persistence, React prop rendering).
- **Visual Diagram 3**: Unstructured Text to Validated Application State.

### Slide 5: Practical: Ask the LLM to Return JSON
- Native JSON mode with `response_format: { type: "json_object" }`.
- System instructions blueprinting expected property keys.
- Safely wrapping `JSON.parse()` in try/catch to catch stream truncation errors.

### Slide 6: What Is Zod? Schema Validation in Node.js
- Why JSON mode alone cannot prevent missing keys or invalid data types.
- Introducing Zod: TypeScript-first runtime schema validation for Node.js.
- `schema.safeParse(data)` vs `schema.parse(data)`.
- **Interactive Lab 1**: Live Zod Schema Validator simulator with preset test cases and error breakdown.

### Slide 7: Practical: AI Resume Information Extractor
- Complete Express endpoint: `POST /api/resume/extract`.
- Unstructured resume string &rarr; LLM extraction &rarr; Zod validation &rarr; Typed JSON response.
- Postman testing card with sample request and response payloads.

### Slide 8: What Is Function / Tool Calling?
- Moving from text prediction to autonomous agentic action.
- The 4-step loop: Prompt with tool definitions &rarr; Model selects tool & parameters &rarr; Backend runs function &rarr; Model synthesizes final response.
- **Visual Diagram 4**: The 4-Step Tool / Function Calling Loop.

### Slide 9: Practical: Build a Calculator Tool
- Writing deterministic JavaScript functions for arithmetic (`add`, `subtract`, `multiply`, `divide`).
- Guarding against division by zero and non-numeric operands.
- Returning structured objects: `{ success, result, error }`.

### Slide 10: Connect Calculator with an LLM
- Writing OpenAI-compliant JSON Schema function definitions in the `tools` array.
- Calling `openai.chat.completions.create({ tools, tool_choice: "auto" })`.
- Inspecting `message.tool_calls` in the response.
- **Interactive Lab 2**: Tool Calling Simulator with live multi-turn step log.

### Slide 11: Complete Tool Calling Flow
- Preserving the assistant message in the conversation array.
- Constructing tool messages with `role: "tool"` and matching `tool_call_id`.
- Returning final conversational synthesized response to the client.

### Slide 12: What Is RAG? (Retrieval-Augmented Generation)
- The 3 major limitations of base LLMs: Knowledge cutoff, zero private context, hallucinations.
- The RAG equation: Retrieval + Augmentation + Generation.
- Comprehensive comparison table: Fine-Tuning vs RAG Architecture across cost, freshness, and privacy.

### Slide 13: RAG Architecture (7-Step Pipeline)
- **Visual Diagram 5**: The 7-Step Pipeline (Raw Documents &rarr; Chunking &rarr; Embeddings &rarr; Vector DB &rarr; Semantic Retrieval &rarr; Prompt Injection &rarr; Generation).
- Explanation of chunking strategies (300–500 tokens with 10–20% overlap).
- Semantic coordinate spaces and cosine similarity scoring.

### Slide 14: Practical: Simple Keyword RAG in Node.js
- In-memory document collection without external cloud vector DBs.
- Writing `searchKnowledgeBase(query)` with term matching and relevance scoring.
- **Interactive Lab 3**: Knowledge Base Retrieval Sandbox with ranked chunk output.

### Slide 15: Practical: Send Retrieved Context to the LLM
- Constructing the augmented system prompt with delimited context tags.
- Adding the negative constraint: *"If not in context, reply 'I do not have information on that in the official handbook.'"*
- Complete `POST /api/rag/ask` Express route with document citation tracking.

### Slide 16: Connect React with an AI Backend
- **Visual Diagram 6**: Full-Stack React & Node.js AI Integration.
- Complete React client component (`AIChat.jsx`) using `useState`, `fetch`, and loading state.
- **Interactive Lab 4**: Full-Stack Assistant Simulator with quick prompt chips.

### Slide 17: Production Best Practices & Security
- 4 Critical Pillars:
  1. *Security & Defense*: Backend API key proxy, prompt injection delimiters, rate limiting (`express-rate-limit`).
  2. *Token Budgets*: Selecting efficient models (`gpt-4o-mini`), capping `max_tokens`, logging usage.
  3. *Latency & UX*: Server-Sent Events (SSE) streaming, optimistic state, fast timeouts.
  4. *Graceful Degradation*: Quota handling, schema retry loops, telemetry monitoring.

### Slide 18: Day 2 Practical Challenge: AI Assistant
- Capstone Lab requirements: Build `POST /api/assistant` unifying Zod, Calculator tool calling, and RAG handbook search.
- Review of Day 2 competencies.
- **Solution Modal**: Full, ready-to-run implementation with 1-click copy.

---

## 🛠️ Companion Practical Project (`mern-ai-assistant`)

### Project Architecture
```text
mern-ai-assistant/
├── client/
│   └── AIChat.jsx          # React chat component
├── tools/
│   └── calculator.js       # Arithmetic tool function
├── documents.js            # In-memory handbook document chunks
├── server.js               # Express application with all AI routes
├── package.json
├── .env.example
├── .env
└── .gitignore
```

### Setup & Installation
```bash
mkdir mern-ai-assistant && cd mern-ai-assistant
npm init -y
npm install express openai dotenv zod cors
```

### Environment Variables
`.env.example`:
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
```

### Knowledge Documents (`documents.js`)
```javascript
const documents = [
  {
    id: "DOC-01",
    title: "Course Attendance Policy",
    content: "Students are strictly required to maintain a minimum of 75% attendance in all lectures and practical lab sessions to be eligible for final semester examinations."
  },
  {
    id: "DOC-02",
    title: "Grading Criteria & Weightage",
    content: "Final grades consist of: 40% Continuous Internal Assessment (assignments, weekly lab challenges, quizzes) and 60% Final Practical Capstone Project."
  },
  {
    id: "DOC-03",
    title: "Late Submission Guidelines",
    content: "Late assignment submissions incur a deduction of 10% per calendar day. Submissions delayed by more than 3 calendar days will receive a score of zero unless supported by an official medical certificate."
  }
];

function searchKnowledgeBase(query) {
  const terms = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  return documents
    .map(doc => {
      let score = 0;
      const combined = (doc.title + " " + doc.content).toLowerCase();
      terms.forEach(term => {
        if (combined.includes(term)) score += 1;
      });
      return { ...doc, score };
    })
    .filter(doc => doc.score > 0)
    .sort((a, b) => b.score - a.score);
}

module.exports = { documents, searchKnowledgeBase };
```

### Calculator Tool (`tools/calculator.js`)
```javascript
function calculate(a, b, operation) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return { success: false, error: "Invalid numeric operands" };
  }

  switch (operation) {
    case "add":
      return { success: true, result: numA + numB };
    case "subtract":
      return { success: true, result: numA - numB };
    case "multiply":
      return { success: true, result: numA * numB };
    case "divide":
      if (numB === 0) return { success: false, error: "Division by zero is not allowed" };
      return { success: true, result: numA / numB };
    default:
      return { success: false, error: `Unsupported operation: ${operation}` };
  }
}

module.exports = { calculate };
```

### Complete `server.js` Code
```javascript
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { z } = require("zod");
const OpenAI = require("openai");

const { searchKnowledgeBase } = require("./documents");
const { calculate } = require("./tools/calculator");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) {
  console.error("FATAL: OPENAI_API_KEY is not defined in .env");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Zod Request Validation Schema
const assistantRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(1000, "Message too long")
});

// Tool Definitions for OpenAI
const assistantTools = [
  {
    type: "function",
    function: {
      name: "calculate",
      description: "Perform basic mathematical arithmetic on two numbers.",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "First number" },
          b: { type: "number", description: "Second number" },
          operation: {
            type: "string",
            enum: ["add", "subtract", "multiply", "divide"],
            description: "Arithmetic operation"
          }
        },
        required: ["a", "b", "operation"]
      }
    }
  }
];

// Unified AI Assistant Route (Capstone Lab)
app.post("/api/assistant", async (req, res) => {
  try {
    const valResult = assistantRequestSchema.safeParse(req.body);
    if (!valResult.success) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        issues: valResult.error.issues
      });
    }

    const userMessage = valResult.data.message;

    // 1. Perform RAG Knowledge Lookup
    const matchedDocs = searchKnowledgeBase(userMessage);
    const contextText = matchedDocs.map(d => `[${d.id}] ${d.content}`).join("\n\n");

    const systemPrompt = `You are a helpful college AI assistant.
Answer questions accurately. If answering about policies, strictly ground your response in the provided context below.
Always cite the document ID used (e.g. [DOC-01]).

CONTEXT:
${contextText || "NO CONTEXT AVAILABLE"}`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ];

    // 2. Call OpenAI with Function Tools
    const firstResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      tools: assistantTools,
      tool_choice: "auto"
    });

    const responseMsg = firstResponse.choices[0].message;

    // 3. Handle Tool Calls if Triggered
    if (responseMsg.tool_calls && responseMsg.tool_calls.length > 0) {
      const toolCall = responseMsg.tool_calls[0];
      if (toolCall.function.name === "calculate") {
        const args = JSON.parse(toolCall.function.arguments);
        const mathResult = calculate(args.a, args.b, args.operation);

        return res.status(200).json({
          success: true,
          mode: "tool",
          toolUsed: "calculate",
          args,
          reply: `Result: ${args.a} ${args.operation} ${args.b} = ${mathResult.result || mathResult.error}`,
          citations: []
        });
      }
    }

    // 4. Return Normal / RAG Response
    res.status(200).json({
      success: true,
      mode: matchedDocs.length > 0 ? "rag" : "chat",
      reply: responseMsg.content,
      citations: matchedDocs.map(d => d.id),
      usage: firstResponse.usage
    });

  } catch (error) {
    console.error("AI Assistant Route Error:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message || "Internal server error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 MERN AI Assistant Server running on http://localhost:${PORT}`);
});
```

### React Frontend Integration (`AIChat.jsx`)
```jsx
import React, { useState } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I am your AI MERN Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });
      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, {
          role: "assistant",
          text: data.reply,
          mode: data.mode,
          citations: data.citations
        }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", text: `Error: ${data.error}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", text: "Failed to connect to AI server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", border: "1px solid #cbd5e1", borderRadius: 8, padding: 16 }}>
      <h2>AI MERN Assistant</h2>
      <div style={{ height: 350, overflowY: "auto", marginBottom: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            background: m.role === "user" ? "#0284c7" : "#f1f5f9",
            color: m.role === "user" ? "#fff" : "#0f172a",
            padding: "8px 14px",
            borderRadius: 8,
            maxWidth: "80%"
          }}>
            {m.mode && <div style={{ fontSize: 10, color: "#0284c7", fontWeight: "bold" }}>[{m.mode.toUpperCase()}]</div>}
            <div>{m.text}</div>
            {m.citations && m.citations.length > 0 && (
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 4 }}>Sources: {m.citations.join(", ")}</div>
            )}
          </div>
        ))}
        {isLoading && <div style={{ color: "#64748b", fontStyle: "italic" }}>Assistant is thinking...</div>}
      </div>

      <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question or calculate..."
          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #cbd5e1" }}
        />
        <button type="submit" disabled={isLoading} style={{ padding: "8px 16px", background: "#0284c7", color: "#fff", border: "none", borderRadius: 6 }}>
          Send
        </button>
      </form>
    </div>
  );
}
```

### API Testing & Postman Queries

#### 1. Testing Tool Calling (Math)
```bash
curl -X POST http://localhost:5000/api/assistant \
  -H "Content-Type: application/json" \
  -d '{"message": "Please multiply 15 by 24"}'
```

#### 2. Testing RAG Knowledge Retrieval
```bash
curl -X POST http://localhost:5000/api/assistant \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the policy if I submit an assignment late?"}'
```

---

## 🧪 Interactive Labs in Presentation
1. **Slide 6 - Zod Schema Validator**: Test valid vs invalid data formats live and view error messages.
2. **Slide 10 - Tool Calling Simulator**: Step through the 4-phase tool lifecycle loop with live logs.
3. **Slide 14 - RAG Retrieval Simulator**: Query the course handbook knowledge base and view relevance scores.
4. **Slide 16 - React Assistant Simulator**: Experience full-stack state management directly in the presentation.

---

## 👨‍🏫 Instructor Teaching Tips
- **Hands-on Emphasis**: Emphasize that LLMs are reasoning engines, not databases. The backend must orchestrate tools and enforce validation.
- **Zod Defense**: Show students how `safeParse` prevents server crashes when models make minor formatting mistakes.
- **Tool Calling Architecture**: Reiterate that OpenAI returns JSON describing what tool to call; your Node.js server executes the code.
- **Pacing**: Dedicate ~35 minutes to Structured Outputs and Zod (Slides 1–7), ~35 minutes to Tool Calling (Slides 8–11), ~30 minutes to RAG Pipelines (Slides 12–15), and ~40 minutes to Full-Stack React Integration and the Capstone Challenge (Slides 16–18).
