# Intermediate AI/LLM – Day 1 Presentation
## AI Agent Fundamentals, State, Memory & Context

A technical classroom presentation designed for teaching students how AI agents work internally, how they make decisions, use tools, manage state, and retain multi-turn conversational context in Node.js.

---

## 🎯 Target Audience & Prerequisites
* **Audience:** Students who have completed foundational JavaScript, Node.js, Express.js, and introductory Generative AI modules.
* **Technology Stack:** Node.js, Express.js, Groq SDK (`groq-sdk`), JavaScript (CommonJS), dotenv.
* **Inference Model:** `openai/gpt-oss-120b` on Groq.
* **Total Slides:** Exactly 26 slides.

---

## 📚 26-Slide Curriculum Overview

### Section 1 – AI Agent Fundamentals (Slides 1–8)
1. **Slide 1 – Introduction to AI Agents:** Overview, roadmap, and learning objectives.
2. **Slide 2 – What is an AI Agent?:** Differences between static response generation and autonomous goal-seeking systems.
3. **Slide 3 – Chatbot vs AI Assistant vs AI Agent:** Detailed feature matrix and query evolution examples.
4. **Slide 4 – AI Agent Architecture:** The six core components (User Input, Instructions, LLM, Tools, State, Loop).
5. **Slide 5 – What is an Agent Loop?:** The 5-stage repeated cycle: *Decide &rarr; Tool &rarr; Observe &rarr; Decide Again &rarr; Answer*.
6. **Slide 6 – Decision Making and Tool Selection:** How LLMs match user intent to tool schemas and generate argument objects.
7. **Slide 7 – What is Autonomous Action?:** Multi-step sequencing, levels of autonomy, and critical safety guardrails.
8. **Slide 8 – Agent Instructions (System Prompt):** Defining persona, guidelines, boundaries, and anti-hallucination rules.

### Section 2 – Agent State, Memory & Context (Slides 9–14)
9. **Slide 9 – What is Agent State?:** Structured runtime snapshots of task execution and intermediate tool outputs.
10. **Slide 10 – State vs Memory vs Chat History vs RAG:** 4-quadrant comparative matrix and the concrete student scenario.
11. **Slide 11 – Short-Term Memory vs Long-Term Memory:** Ephemeral session caches vs durable persistent storage.
12. **Slide 12 – What is Context?:** Everything assembled and fed to the LLM; with vs without context demonstrations.
13. **Slide 13 – Context Window and Its Limits:** Token fundamentals, token budgeting, cost, and attention degradation.
14. **Slide 14 – Context Management Techniques:** 5 proven strategies (sliding window, compaction, RAG, output pruning, token caps).

### Section 3 – Practical Project 1: Tool-Using AI Agent (Slides 15–23)
15. **Slide 15 – Building a Tool-Using AI Agent:** Project overview, `calculate` and `get_student` tools, architecture.
16. **Slide 16 – Project Setup & Dependencies:** Terminal commands, project structure, `.env`, and security practices.
17. **Slide 17 – Understanding Tools and Tool Schemas:** Crafting JSON Schema contracts for the model.
18. **Slide 18 – Implementing Tools & The Tool Registry:** Writing JavaScript functions and registering them in a safe lookup map.
19. **Slide 19 – Sending Tools to the LLM:** Groq Chat Completions request with `tools` and `tool_choice: "auto"`.
20. **Slide 20 – Executing the Tool & Observing the Result:** Parsing arguments, running local code, and observing output.
21. **Slide 21 – Returning the Tool Result to the LLM:** Constructing `{ role: "tool" }` messages and synthesizing final answers.
22. **Slide 22 – The Complete Agent Loop Architecture:** Multi-step looping and the mandatory `MAX_STEPS = 3` guardrail.
23. **Slide 23 – Complete Tool-Using Agent Implementation:** Full `server.js` source code with an interactive live testing simulator.

### Section 4 – Practical Project 2: Conversational Agent with Session Memory (Slides 24–26)
24. **Slide 24 – Building a Conversational Agent:** Multi-turn conversational goals and session architecture.
25. **Slide 25 – Implementing Session Memory in Node.js:** JavaScript `Map` storage, session ID keys, and sliding windows.
26. **Slide 26 – Complete Conversational Agent & Final Recap:** Full `server.js` code, live memory chat sandbox, and key takeaways.

---

## 🛠️ Practical Projects Setup & Execution

### Project 1: Tool-Using AI Agent
1. **Navigate to project directory:**
   ```bash
   mkdir student-agent && cd student-agent
   npm init -y
   npm install express groq-sdk dotenv
   ```
2. **Configure `.env`:**
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   PORT=3000
   ```
3. **Run Server:**
   ```bash
   node server.js
   ```
4. **Test Endpoint with cURL / Postman:**
   ```bash
   curl -X POST http://localhost:3000/api/agent \
     -H "Content-Type: application/json" \
     -d '{"question": "Add 150 and 350"}'
   ```
   ```bash
   curl -X POST http://localhost:3000/api/agent \
     -H "Content-Type: application/json" \
     -d '{"question": "Find details for student 101"}'
   ```

### Project 2: Conversational Agent with Session Memory
1. **Test Multi-Turn Session:**
   ```bash
   # Turn 1: Introduce Name
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"sessionId": "session-101", "message": "My name is Ali."}'

   # Turn 2: Mention Topic
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"sessionId": "session-101", "message": "I am learning Node.js."}'

   # Turn 3: Ask Agent to Recall
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"sessionId": "session-101", "message": "What is my name and course?"}'
   ```
   **Expected Response:** *"Your name is Ali, and you are learning Node.js!"*

---

## 🖥️ Presentation Controls & Shortcuts
* `→` or `Space` / `PageDown`: Next Slide
* `←` or `PageUp`: Previous Slide
* `Home` / `End`: First / Last Slide
* `F`: Toggle Fullscreen Mode
* `T`: Table of Contents Drawer (Jump to any slide)
* `?`: Keyboard Help Overlay
* `Esc`: Close open drawers and modals

---

## 🚀 How to View the Presentation
Simply open `index.html` in any modern web browser:
```bash
# Windows
start index.html
```
No external servers, bundlers, or frameworks are required.
