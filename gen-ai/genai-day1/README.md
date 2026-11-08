# Node.js + Generative AI — Day 1: Foundations of GenAI

> **Day 1 Curriculum Presentation & Hands-On Demo Suite**  
> **Course:** Node.js + Generative AI Track  
> **Topic:** Foundations of GenAI, Architecture Patterns, and the Google GenAI SDK  
> **Tech Stack:** Node.js (ES Modules), `@google/genai`, Express.js, `dotenv`  
> **Model:** `gemini-2.5-flash`

---

## 📋 Table of Contents
1. [Overview & Presentation Structure](#-overview--presentation-structure)
2. [12-Slide Curriculum Breakdown](#-12-slide-curriculum-breakdown)
3. [How to Launch the Presentation Deck](#-how-to-launch-the-presentation-deck)
4. [Quickstart Setup for Demos](#-quickstart-setup-for-demos)
5. [Runnable Demos Reference (`demos/`)](#-runnable-demos-reference-demos)
6. [3 Core GenAI Architectures](#-3-core-genai-architectures)
7. [Student Hands-On Practice Task](#-student-hands-on-practice-task)

---

## 🎯 Overview & Presentation Structure

This slide deck introduces students to the foundations of **Generative AI** and how to engineer scalable backends using **Node.js** and the official **Google GenAI SDK** (`@google/genai`).

Built strictly with **pure HTML5, CSS3, and Vanilla JavaScript** (zero build step or frontend framework dependencies), the presentation is optimized for 1080p classroom projectors with high-contrast dark-mode typography, line-numbered syntax highlighting via Prism.js, copy-paste buttons, interactive modals, and architectural diagrams.

---

## 📑 12-Slide Curriculum Breakdown

| Slide # | Slide Title | Type | Key Topics Covered |
| :---: | :--- | :---: | :--- |
| **01** | **Title Slide** | Intro | Course metadata, stack overview, and objectives |
| **02** | **Agenda & Setup** | Theory + Setup | 7 core topics, npm package setup, and shared client `ai.js` |
| **03** | **What is Generative AI?** | Theory + Code | Definitions (Model, Prompt, Token, LLM), token prediction, and `01-first-prompt.js` |
| **04** | **AI vs ML vs DL vs GenAI** | Theory + Diagram | Hierarchy, definitions, memory trick, and nested concentric circle diagram |
| **05** | **Traditional AI vs GenAI** | Theory + Code | Classification vs Creation, comparison table, context-awareness in `02-traditional-vs-genai.js` |
| **06** | **Types of GenAI** | Theory + Code | Text, Image, Audio, Video, Code; modalities table and `03-types.js` |
| **07** | **Real-World Applications** | Theory + Code | 7 real-world use cases (support, content, coding, search) and memory chatbot `04-chatbot.js` |
| **08** | **Architecture 1: Direct LLM App** | Architecture + Code | Simplest pattern, API key security, data flow diagram, and Express API `05-llm-api.js` |
| **09** | **Architecture 2: RAG Pipeline** | Architecture + Code | Embeddings, vector search, cosine similarity, grounding, and `06-rag.js` |
| **10** | **Architecture 3: Autonomous AI Agent** | Architecture + Code | Tool use, function calling, agent loop, and Kochi umbrella helper `07-agent.js` |
| **11** | **Multimodal AI** | Theory + Code | Vision + text inputs, unified embedding space, and photo inspector `08-multimodal.js` |
| **12** | **Recap & Practice Task** | Summary + Homework | One-line takeaways summary table and student personal RAG homework task |

---

## 🚀 How to Launch the Presentation Deck

The presentation website has no build tools or bundler requirements.

### Option 1: Direct File Open
Double click `index.html` or run:
```bash
# Windows PowerShell
Start-Process "index.html"
```

### Option 2: Local HTTP Server (VS Code / npx)
```bash
npx serve .
# Or open in VS Code with the Live Server extension
```

### Keyboard Shortcuts
- <kbd>→</kbd> or <kbd>Space</kbd> or <kbd>PageDown</kbd>: Next Slide
- <kbd>←</kbd> or <kbd>PageUp</kbd>: Previous Slide
- <kbd>Home</kbd>: Jump to Slide 1
- <kbd>End</kbd>: Jump to Slide 12
- <kbd>F</kbd>: Toggle Fullscreen Mode
- <kbd>T</kbd>: Toggle Table of Contents Drawer
- <kbd>?</kbd>: Open Keyboard Shortcuts Cheat Sheet
- Touch Swipe (Left / Right): Navigate on mobile / tablets

---

## ⚙️ Quickstart Setup for Demos

All 8 runnable code demonstrations are located inside the `demos/` directory.

### 1. Install Dependencies
```bash
cd demos
npm install
```

### 2. Configure Your Gemini API Key
Create a `.env` file in the `demos/` folder:
```bash
# In demos/.env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
> [!NOTE]
> Get your free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

---

## 💻 Runnable Demos Reference (`demos/`)

| Script | Concept | How to Run |
| :--- | :--- | :--- |
| `01-first-prompt.js` | First Gemini call explaining GenAI | `node 01-first-prompt.js` |
| `02-traditional-vs-genai.js` | Semantic sentiment ("not bad") vs regex | `node 02-traditional-vs-genai.js` |
| `03-types.js` | Generating text, code, and image binary | `node 03-types.js` |
| `04-chatbot.js` | Interactive CLI chatbot with message history | `node 04-chatbot.js` |
| `05-llm-api.js` | Express.js REST API with `/ask` endpoint | `node 05-llm-api.js` |
| `06-rag.js` | Vector embeddings & cosine similarity | `node 06-rag.js` |
| `07-agent.js` | Function calling & autonomous loop | `node 07-agent.js` |
| `08-multimodal.js` | Vision input parsing (JPEG image + prompt) | `node 08-multimodal.js` |

### Testing `05-llm-api.js` with cURL / Postman:
```bash
curl -X POST http://localhost:3000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the difference between synchronous and asynchronous code in Node.js?"}'
```

---

## 🏛️ 3 Core GenAI Architectures

### 1. Direct LLM App (Slide 8)
- **Pipeline:** `Client → Express Backend → LLM API → Response`
- **Key Advantage:** Keeps API credentials secret; handles rate limiting.
- **Use Cases:** Copywriting, translation, code refactoring.

### 2. Retrieval-Augmented Generation (RAG) (Slide 9)
- **Pipeline:** `Docs → Embeddings → Vector DB | Question → Search → Prompt + Context → LLM`
- **Key Advantage:** Grounds model in private company data; eliminates hallucinations.
- **Use Cases:** Internal knowledge bases, HR bots, customer documentation Q&A.

### 3. Autonomous AI Agent (Slide 10)
- **Pipeline:** `Goal → LLM Thinks → Calls Tool → Observes Result → Loop → Final Answer`
- **Key Advantage:** Acts upon external APIs, executes SQL queries, books tickets.
- **Use Cases:** Autonomous support agents, personal assistants, database report bots.

---

## 🏆 Student Hands-On Practice Task

**Assignment:**
1. Open [`demos/06-rag.js`](file:///c:/Users/ADMIN/OneDrive/Desktop/HACA/Presentation/gen-ai/genai-day1/demos/06-rag.js).
2. Replace the sample `docs` array with **5 factual statements about yourself**:
   - Your university or current educational program
   - Your favorite programming languages and frameworks
   - A project you built recently
   - Your hobby or personal interest
   - Your primary career aspiration
3. Formulate **3 distinct questions** to query your custom knowledge base.
4. Run `node 06-rag.js` and verify that the Gemini model answers strictly from your context without hallucinating!

---

*Made with ❤️ for Node.js & Generative AI Educators.*

