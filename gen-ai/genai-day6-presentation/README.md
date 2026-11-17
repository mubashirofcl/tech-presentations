# Node.js GenAI – Day 6: LLM API Integration & Production Basics

A complete, projector-ready, interactive 20-slide classroom presentation and practical companion Node.js project demonstrating cloud LLM integration using the official Groq SDK (`groq-sdk`), Server-Sent Events (SSE) streaming, parameter control, automatic retry backoffs, and token usage accounting.

---

## 📋 Table of Contents
1. [Overview](#-overview)
2. [Quick Start (Presentation Viewer)](#-quick-start-presentation-viewer)
3. [Keyboard & Navigation Shortcuts](#-keyboard--navigation-shortcuts)
4. [Complete 20-Slide Outline](#-complete-20-slide-outline)
5. [Running the Practical Project (`groq-ai-app`)](#-running-the-practical-project-groq-ai-app)
   - [Project Structure](#project-structure)
   - [Setup & Installation](#setup--installation)
   - [Environment Variables (.env)](#environment-variables-env)
   - [Full `server.js` Code](#full-serverjs-code)
   - [Postman & cURL Testing](#postman--curl-testing)
6. [Interactive Labs in Presentation](#-interactive-labs-in-presentation)
7. [Instructor Teaching Tips](#-instructor-teaching-tips)

---

## 🎯 Overview
- **Course**: Node.js Generative AI
- **Session**: Day 6
- **Focus**: Transitioning from prompt engineering theory to production-grade backend integration with external LLM APIs using Express and `groq-sdk`.
- **Audience**: Full-stack MERN students with foundational knowledge of Node.js, Express routes, and asynchronous JavaScript.
- **Tech Stack**: HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript (Viewer); Node.js, Express, `groq-sdk`, `dotenv` (Backend).

---

## 🚀 Quick Start (Presentation Viewer)

1. Open [index.html](file:///c:/Users/ADMIN/OneDrive/Desktop/HACA/Presentation/gen-ai/day-6-llm-api-integration/index.html) directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari).
2. Runs 100% offline with zero build dependencies, external CDNs, or local web servers.

---

## ⌨️ Keyboard & Navigation Shortcuts

| Key / Action | Function |
| :--- | :--- |
| `→` / `Space` / `PageDown` | Next Slide |
| `←` / `PageUp` | Previous Slide |
| `Home` | First Slide (`#slide-1`) |
| `End` | Last Slide (`#slide-20`) |
| `F` | Toggle Fullscreen Mode |
| `T` | Toggle Table of Contents Modal |
| `?` | Toggle Keyboard Help Modal |
| `Esc` | Close any active modal |
| `Swipe Left / Right` | Mobile & Tablet Touch Navigation |

---

## 📑 Complete 20-Slide Outline

1. **Slide 1 – Title: LLM API Integration & Production Basics**
   - High-level overview of the 11 topics, learning objective, and the complete architecture pipeline.
2. **Slide 2 – How Does an LLM API Integration Work?**
   - The 5-stage request lifecycle: React UI &rarr; Express &rarr; Groq SDK &rarr; Groq Cloud &rarr; Client Response.
3. **Slide 3 – What Is an SDK? Introduction to Groq SDK**
   - Why developers use SDKs vs manual HTTP fetch, major LLM SDK catalog, installation, and CommonJS initialization.
4. **Slide 4 – API Keys and Environment Variables (.env)**
   - Secret credential hygiene, `dotenv` configuration, `process.env`, `.gitignore` rules, and preventing key leakage.
5. **Slide 5 – Practical: Make Your First Groq API Request**
   - Step-by-step 3-minute starter setup, minimal runnable script, `groq.chat.completions.create()`, and expected terminal output.
6. **Slide 6 – Understanding Chat Completion Messages**
   - Deconstructing the `messages` array: `system` (guardrails), `user` (prompt), and `assistant` (prior history).
7. **Slide 7 – Model Parameters: What Are They?**
   - The runtime inference control panel: `temperature`, `max_completion_tokens`, `top_p`, and `stream`.
8. **Slide 8 – Temperature: Control Response Randomness**
   - Tuning variance between low (0.2) deterministic answers and high (1.2) creative brainstorming. Interactive lab.
9. **Slide 9 – Maximum Completion Tokens**
   - Hard output token ceilings with `max_completion_tokens` (and deprecation of `max_tokens`). Interactive truncation lab.
10. **Slide 10 – Synchronous vs Asynchronous LLM Calls**
    - Why network I/O must never block the Node.js event loop. Synchronous vs asynchronous execution timeline.
11. **Slide 11 – Promises and async/await with LLM APIs**
    - The 3 states of a Promise (Pending, Fulfilled, Rejected) and writing clean linear async/await code. Interactive state simulator.
12. **Slide 12 – Error Handling in LLM API Integration**
    - Common HTTP status codes (400, 401, 403, 404, 429, 500+) and resilient `try/catch` error branching.
13. **Slide 13 – Retries, Timeouts and Rate Limits**
    - Exponential backoff with jitter, Groq SDK's automatic 2-retry policy, timeout caps, and RPM/TPM quotas.
14. **Slide 14 – What Is Streaming in LLM Applications?**
    - Normal blocking responses vs progressive token delivery. Dramatically reducing Time-To-First-Token (TTFT).
15. **Slide 15 – Server-Sent Events (SSE)**
    - Standard one-way HTTP streaming protocol, required response headers, `res.write()`, and the `[DONE]` termination marker.
16. **Slide 16 – Node.js Practical: Create a Streaming LLM API**
    - Building `POST /chat/stream` in Express using `stream: true` and `for await (const chunk of stream)`.
17. **Slide 17 – Practical: Receive Streaming Data in the Frontend**
    - Reading SSE streams in client-side JavaScript using `fetch()`, `ReadableStream`, `TextDecoder`, and multi-chunk event buffering.
18. **Slide 18 – Token Usage: Monitor Your API Usage**
    - Deconstructing `prompt_tokens`, `completion_tokens`, and `total_tokens` from `response.usage` for database auditing.
19. **Slide 19 – Cost Awareness: How to Control LLM Usage**
    - Mathematical pricing model (`Total Cost = Input Cost + Output Cost`), budgeting strategies, and interactive cost calculator.
20. **Slide 20 – Final Practical Project: AI Chat API**
    - Capstone architecture (`groq-ai-app`), complete runnable `server.js` code, Postman endpoints, and Solution Modal.

---

## 🛠️ Running the Practical Project (`groq-ai-app`)

### Project Structure
```text
groq-ai-app/
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

### Setup & Installation
```bash
# 1. Create project folder
mkdir groq-ai-app && cd groq-ai-app

# 2. Initialize npm package
npm init -y

# 3. Install production dependencies
npm install express groq-sdk dotenv
```

### Environment Variables (.env)
Create a `.env` file in the root directory:
```env
PORT=3000
GROQ_API_KEY=gsk_your_actual_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

Add `.env` to `.gitignore`:
```text
node_modules/
.env
.DS_Store
```

### Full `server.js` Code
```javascript
require("dotenv").config();
const express = require("express");
const Groq = require("groq-sdk");

const app = express();
app.use(express.json());

// Initialize Groq client with production timeouts & retries
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  maxRetries: 2,
  timeout: 20000
});

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

// 1. Health Check
app.get("/", (req, res) => {
  res.send("Groq AI Server is running!");
});

// 2. Normal Synchronous Chat Endpoint
app.post("/chat", async (req, res) => {
  try {
    const { question, temperature = 0.7 } = req.body;

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Valid question is required" });
    }

    if (typeof temperature !== "number" || temperature < 0 || temperature > 2) {
      return res.status(400).json({ error: "Temperature must be between 0 and 2" });
    }

    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: question }
      ],
      temperature,
      max_completion_tokens: 300
    });

    res.json({
      success: true,
      answer: response.choices[0].message.content,
      usage: response.usage
    });
  } catch (error) {
    console.error("Groq API Error:", error.message);
    const status = error.status === 429 ? 429 : 502;
    res.status(status).json({ success: false, error: "Unable to generate AI response" });
  }
});

// 3. Streaming SSE Endpoint
app.post("/chat/stream", async (req, res) => {
  try {
    const { question } = req.body;

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Valid question is required" });
    }

    // Set SSE Headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: question }],
      stream: true
    });

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content || "";
      if (token) {
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Streaming Error:", error.message);
    if (res.headersSent) {
      res.write(`event: error\ndata: ${JSON.stringify({ message: "Streaming failed" })}\n\n`);
      return res.end();
    }
    res.status(502).json({ error: "Unable to stream AI response" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Postman & cURL Testing

#### 1. Test Standard JSON Chat
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Explain async and await in JavaScript.",
    "temperature": 0.5
  }'
```

#### 2. Test Real-Time Token Streaming
```bash
curl -N -X POST http://localhost:3000/chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Explain how the Node.js event loop works."
  }'
```

---

## 🧪 Interactive Labs in Presentation
1. **Slide 8 – Temperature Simulator:** Adjust the slider between `0.0` and `1.5` to observe how creative startup names diverge from deterministic corporate titles.
2. **Slide 9 – Max Completion Tokens:** Test token ceilings of 12, 40, and 150 tokens to observe `finish_reason: "length"` truncation.
3. **Slide 11 – Promise State Simulator:** Watch the visual state machine move through Pending, Awaiting, and Fulfilled without blocking the UI.
4. **Slide 13 – Exponential Backoff Simulator:** Observe simulated 429 rate limit errors automatically triggering 1s and 2s backoff delays until recovery.
5. **Slide 17 – Live SSE Streaming Client:** Type custom prompts and watch tokens stream character-by-character with realistic network cadence.
6. **Slide 19 – Token Usage & Cost Calculator:** Input prompt and completion tokens to compute total usage and estimated dollar spend.

---

## 👨‍🏫 Instructor Teaching Tips
- **Consistent Provider:** Using Groq throughout Day 6 prevents students from getting lost in different client initialization syntaxes.
- **The Event Loop Misconception:** Make sure students understand that `await` pauses inside the async function, allowing Node.js to continue handling other HTTP requests concurrently.
- **The Buffering Trap:** Emphasize on Slide 17 that incoming network packets do not cleanly split on SSE lines; client applications must always maintain a buffer and split on `\n\n`.
- **Security Check:** Remind students before they commit any code to check `git status` and verify that `.env` is ignored.
