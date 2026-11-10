# Node.js – Gen-AI Day 1: Introduction to Generative AI & AI Application Architectures

> **20-Slide Interactive Classroom Presentation Deck & Workshop Project**  
> **Course:** Node.js + Generative AI Track  
> **Topic:** Introduction to Generative AI, LLMs, RAG, Agents, and Multimodal Architectures  
> **Tech Stack:** Node.js (CommonJS), Express.js, OpenAI SDK (`responses.create`), `dotenv`  
> **Project:** GenAI Assistant API (`genai-day1`)

---

## 📋 Table of Contents
1. [Overview & Presentation Structure](#-overview--presentation-structure)
2. [20-Slide Curriculum Breakdown](#-20-slide-curriculum-breakdown)
3. [How to Launch the Presentation Deck](#-how-to-launch-the-presentation-deck)
4. [Interactive Features & In-Deck Simulators](#-interactive-features--in-deck-simulators)
5. [Complete Runnable Project: `genai-day1`](#-complete-runnable-project-genai-day1)
   - [Project Directory Architecture](#project-directory-architecture)
   - [`package.json`](#packagejson)
   - [`.env` & `.gitignore`](#env--gitignore)
   - [`server.js`](#serverjs)
6. [Postman Step-by-Step Testing Guide](#-postman-step-by-step-testing-guide)
7. [Architectural Comparison Matrix (LLM vs RAG vs Agent)](#-architectural-comparison-matrix-llm-vs-rag-vs-agent)
8. [Student Practice Challenges](#-student-practice-challenges)

---

## 🎯 Overview & Presentation Structure

This slide deck introduces beginner Node.js students to the core principles of **Generative AI** and how developers build production-grade AI applications using modern backend architectures.

Students explore four core themes:
1. **Foundations of AI & GenAI (Slides 1–7):** Understanding AI, ML, DL, and GenAI hierarchy, Traditional AI vs Generative AI, modalities (text, image, audio, video, code), and industry use cases.
2. **LLMs & Prompt Engineering (Slides 8–11):** How Large Language Models work, token prediction, context windows, and crafting structured prompts with system instructions.
3. **Building GenAI APIs with Node.js (Slides 12–13):** 5-layer application architecture, hiding API keys in Express, and handling requests via the OpenAI SDK (`responses.create`).
4. **Advanced Architectures (Slides 14–20):** Retrieval-Augmented Generation (RAG) to prevent hallucination, Autonomous AI Agents with tool calling, and Multimodal AI (Text + Images).

---

## 📑 20-Slide Curriculum Breakdown

| Slide # | Slide Title | Type | Key Topics Covered |
| :---: | :--- | :---: | :--- |
| **01** | **Introduction to Generative AI** | Title | Course overview, objectives, tech stack, and module roadmap |
| **02** | **What Is Artificial Intelligence?** | Theory | Definition of AI, core capabilities, real-world examples table (Google Maps, Netflix, Face Unlock) |
| **03** | **What Is Generative AI?** | Theory | Definition, 4-step generation cycle, prompt mechanics, training data vs generation |
| **04** | **AI vs ML vs DL vs Generative AI** | Theory + Diagram | Hierarchy, definitions of AI, ML, DL, GenAI, and **Nested Concentric Circles Diagram** |
| **05** | **Traditional AI vs Generative AI** | Comparison | Classification ("Which one?") vs Creation ("Make one."), comparison table |
| **06** | **Types of Generative AI** | Modalities | Text, Image, Audio, Video, Code generation cards with real-world examples |
| **07** | **Real-World GenAI Applications** | Use Cases | Education, Healthcare, Business, Dev, Marketing, and automated email triage workflow |
| **08** | **What Is an LLM?** | Theory | Large Language Models (GPT, Claude, Gemini, Llama), tokens, prompts, context windows |
| **09** | **Connect Node.js with an LLM** | Practical | Project setup (`genai-day1`), npm install, `.env`, `.gitignore`, OpenAI SDK initialization |
| **10** | **Send a Prompt to an LLM** | Practical + Tool | Writing reusable `askAI()` function, calling `client.responses.create()`, **Interactive Prompt Sandbox** |
| **11** | **What Is Prompt Engineering?** | Theory + Code | Basic vs Engineered prompts, Roles, Tasks, Constraints, passing `instructions` parameter |
| **12** | **LLM-Based Applications** | Architecture | Why backends are required, 5-layer architecture diagram (User &rarr; Frontend &rarr; Backend &rarr; SDK &rarr; Model) |
| **13** | **Build a Basic GenAI API** | Practical | Express `POST /ask` endpoint, input validation, JSON formatting, Postman testing |
| **14** | **What Is RAG?** | Theory + Diagram | Retrieval-Augmented Generation, why base LLMs hallucinate, 2-phase RAG pipeline diagram |
| **15** | **Simple RAG Concept in Node.js** | Practical + Tool | Simulating retrieval with knowledge array, augmenting prompts, **Live RAG Retrieval Sandbox** |
| **16** | **What Is an AI Agent?** | Theory + Diagram | Definition of an Agent, Goal &rarr; Think &rarr; Tool &rarr; Result loop, scenario walk-through |
| **17** | **Understanding Tool Calling** | Practical + Tool | Writing a Node.js tool (`getStudentDetails`), tool execution dispatcher, **Live Tool Calling Sandbox** |
| **18** | **LLM vs RAG vs Agent** | Comparison | Comprehensive comparison matrix (Mechanism, Data, Role), real-world examples |
| **19** | **What Is Multimodal AI?** | Next-Gen AI | Definition, Text + Image visual reasoning with OpenAI SDK, provider capability notes |
| **20** | **Recap & Practical Challenge** | Summary | Key concepts recap table, student assignment, bonus tasks, and inspiring developer takeaway |

---

## 🚀 How to Launch the Presentation Deck

The presentation website has no build tools or bundler requirements.

### Option 1: Direct File Open
Double click `index.html` or open in terminal:
```bash
# Windows PowerShell
Start-Process "index.html"
```

### Option 2: Live Server (VS Code / npx)
```bash
npx serve .
# Or open with the VS Code Live Server extension
```

### Presenter Keyboard Shortcuts
- <kbd>→</kbd> or <kbd>Space</kbd> or <kbd>PageDown</kbd>: Next Slide
- <kbd>←</kbd> or <kbd>PageUp</kbd>: Previous Slide
- <kbd>Home</kbd>: Jump to Slide 1
- <kbd>End</kbd>: Jump to Slide 20
- <kbd>F</kbd>: Toggle Fullscreen Mode
- <kbd>T</kbd>: Toggle Table of Contents Drawer
- <kbd>?</kbd>: Open Keyboard Shortcuts Cheat Sheet
- Touch Swipe (Left / Right): Navigate on mobile / tablets

---

## 🎮 Interactive Features & In-Deck Simulators

### 1. Slide 10 & 13: Live LLM Responses Simulator
An embedded sandbox allowing students to test OpenAI API prompt generation:
- Type a custom prompt (e.g. *"Explain Node.js in simple words"* or *"What is Express middleware?"*).
- Switch persona roles between **Teacher Persona**, **Concise Summary**, and **Standard Reply**.
- Click **"Send to LLM"** to simulate the API call and view the formatted `response.output_text` JSON payload.

### 2. Slide 15: Live Context Retrieval (RAG) Sandbox
An interactive tool showing how RAG retrieves relevant facts before generating:
- Contains an in-memory knowledge base about Node.js, Express, and MongoDB.
- Enter a question (e.g. *"What is Node.js?"* or *"What is MongoDB?"*).
- Click **"Run Retrieval & Generate"**:
  - If a topic matches, displays the retrieved context and grounds the LLM answer strictly in that fact.
  - If an unlisted topic is asked (e.g. *"What is Python?"*), the model returns *"I do not have enough information in the provided context to answer."*

### 3. Slide 17: Live Tool Calling Simulator
Simulates how an autonomous AI Agent dispatches external functions:
- Select a student ID from the dropdown.
- Click **"Trigger Tool Call"** to see how the model requests `{ studentId: N }`, how Node.js executes `getStudentDetails()`, and how the result is packaged into the final answer.

---

## 💻 Complete Runnable Project: `genai-day1`

Below is the complete reference implementation of the Express GenAI API built in this lesson.

### Project Directory Architecture
```text
genai-day1/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

---

### `package.json`
```json
{
  "name": "genai-day1",
  "version": "1.0.0",
  "description": "GenAI Assistant API using Node.js, Express, and OpenAI SDK",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "openai": "^4.52.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

---

### `.env` & `.gitignore`

#### `.env`
```env
PORT=3000
OPENAI_API_KEY=your_actual_openai_api_key_here
```

#### `.env.example`
```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
```

#### `.gitignore`
```text
node_modules/
.env
```

---

### `server.js`
```javascript
// server.js
require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize OpenAI SDK client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ----------------------------------------------------
// 1. Basic GenAI Endpoint (Slide 13)
// POST /ask
// Body: { "question": "What is Generative AI?" }
// ----------------------------------------------------
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required in request body."
      });
    }

    // Call OpenAI Responses API
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: "You are a friendly, beginner-friendly Node.js teacher.",
      input: question
    });

    return res.status(200).json({
      success: true,
      answer: response.output_text
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({
      success: false,
      message: "AI generation request failed."
    });
  }
});

// ----------------------------------------------------
// 2. Simple Educational RAG Endpoint (Slide 15)
// POST /ask-rag
// Body: { "question": "What is Express?" }
// ----------------------------------------------------
const knowledgeBase = [
  "Node.js is an open-source, cross-platform JavaScript runtime environment.",
  "Express.js is a minimal and flexible Node.js web application framework.",
  "MongoDB is a source-available, cross-platform document-oriented database."
];

function retrieveContext(query) {
  const q = query.toLowerCase();
  return knowledgeBase.filter(item => {
    const itemLower = item.toLowerCase();
    if (q.includes("node") && itemLower.includes("node")) return true;
    if (q.includes("express") && itemLower.includes("express")) return true;
    if (q.includes("mongo") && itemLower.includes("mongo")) return true;
    return false;
  });
}

app.post("/ask-rag", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required." });
    }

    // Step 1: Retrieve context
    const context = retrieveContext(question);

    // Step 2: Augment prompt with context
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: `
        Answer the user's question using ONLY the provided context.
        If the answer cannot be found in the context, reply strictly:
        "I do not have enough information in the provided context to answer."
      `,
      input: `
        Context:
        ${context.length > 0 ? context.join("\n") : "None"}

        Question:
        ${question}
      `
    });

    return res.status(200).json({
      success: true,
      retrievedContext: context,
      answer: response.output_text
    });
  } catch (error) {
    console.error("RAG Error:", error);
    return res.status(500).json({ success: false, message: "RAG request failed." });
  }
});

// ----------------------------------------------------
// 3. Application Tool Function (Slide 17)
// ----------------------------------------------------
function getStudentDetails(studentId) {
  const students = [
    { id: 1, name: "Arun", course: "MERN Stack Development" },
    { id: 2, name: "Meera", course: "Generative AI Engineering" }
  ];
  return students.find(s => s.id === parseInt(studentId, 10)) || null;
}

app.get("/tools/student/:id", (req, res) => {
  const student = getStudentDetails(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  return res.json({ success: true, student });
});

app.listen(PORT, () => {
  console.log(`🚀 GenAI server running at http://localhost:${PORT}`);
});
```

---

## 📮 Postman Step-by-Step Testing Guide

### Test 1: Direct LLM Endpoint (`POST /ask`)
1. Set method to **`POST`**.
2. Enter URL: `http://localhost:3000/ask`.
3. In **Headers**, add: `Content-Type: application/json`.
4. In **Body** &rarr; select **raw** &rarr; **JSON**:
   ```json
   {
     "question": "What is the difference between Traditional AI and Generative AI?"
   }
   ```
5. Click **Send**.
6. **Expected Status:** `200 OK`.
7. **Expected JSON Response:**
   ```json
   {
     "success": true,
     "answer": "Traditional AI focuses on analyzing existing data to make predictions or classifications (e.g. spam detection), whereas Generative AI creates new, original content like text, code, or images based on learned patterns."
   }
   ```

### Test 2: RAG Grounded Endpoint (`POST /ask-rag`)
1. Set method to **`POST`**.
2. Enter URL: `http://localhost:3000/ask-rag`.
3. Body (raw JSON):
   ```json
   {
     "question": "What is Express.js?"
   }
   ```
4. Click **Send**.
5. Notice how `retrievedContext` contains only the matching Express sentence, and the model's answer is grounded exclusively in that fact!

---

## ⚖️ Architectural Comparison Matrix (LLM vs RAG vs Agent)

| Dimension | LLM Application | RAG Application | Agent Application |
| :--- | :--- | :--- | :--- |
| **Core Mechanism** | Direct prompt reasoning | Ingests & retrieves relevant facts first | Autonomous tool execution loop |
| **Data Scope** | Model training data & prompt | Private company docs & vector databases | External APIs, databases, and apps |
| **Hallucination Risk** | Moderate to High on private topics | **Very Low** (grounded in context) | Low (verified against tool outputs) |
| **Action Capability** | Read & write text only | Factual question answering | **Takes actions & updates records** |
| **Typical Use Case** | Content drafter, creative writer | Chat with PDF, HR policy assistant | Calendar scheduling bot, Automated triage |

---

## 🏆 Student Practice Challenges

### Challenge 1: Custom Persona Instructions
- **Goal:** Transform your GenAI endpoint into a specific persona (e.g., *A senior software architect reviewing junior developer pull requests*).
- **Instructions:** Pass custom `instructions` inside `client.responses.create()` and verify how the tone of output changes!

### Challenge 2: In-Memory Course Q&A (RAG)
- **Goal:** Add 5 sentences about your institute's syllabus and fees to `knowledgeBase`.
- **Instructions:** Update `retrieveContext()` and test asking questions about class timings, prerequisites, and certificates.

### Challenge 3: Agent Tool Dispatcher
- **Goal:** Connect a weather or currency conversion tool function to your backend.
- **Instructions:** Write an `executeTool(name, args)` function and return mock data for `{ city: 'Kochi' }` or `{ currency: 'USD' }`.

---

*Made with ❤️ for Node.js & Generative AI Developers.*
