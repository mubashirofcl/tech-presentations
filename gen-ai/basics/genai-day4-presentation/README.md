# Node.js GenAI – Day 4: Prompt Engineering

Interactive 18-slide classroom presentation and companion **Prompt Playground API** (`prompt-playground/`) project for beginner Node.js developers.

## Quick Start (Presentation)

1. Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox, Brave) — zero build steps or local web servers required.
2. Navigate using:
   - `→`, `Space`, or `PageDown`: Next slide
   - `←` or `PageUp`: Previous slide
   - `Home` / `End`: Jump to Slide 1 / Slide 18
   - `T`: Open Table of Contents (jump to any of the 18 slides)
   - `?`: Open Keyboard Shortcuts help modal
   - `F`: Toggle Fullscreen mode
   - `Esc`: Close open modal

---

## Interactive Hands-On Labs Included

- **Slide 3 – Prompt Anatomy Builder (Lab 1):** Interactively assemble Role, Task, Context, Instructions, and Constraints, and see the formatted prompt specification update in real time.
- **Slide 10 – Role Prompting Simulator (Lab 2):** Test how changing roles (Senior Developer, Programming Teacher, Technical Interviewer, Database Administrator) completely alters the model's tone, focus, and depth for the same question.
- **Slide 16 – Zero-Shot vs Few-Shot Live Comparison (Lab 3):** Test nuanced or mixed reviews live side-by-side to observe how demonstration shots anchor strict classification boundaries.
- **Slide 18 – Prompt Playground API Simulator (Lab 4):** Live simulator testing `POST /ask`, `POST /role`, `POST /zero-shot`, and `POST /few-shot` with Postman payload previews.
- **Slide 18 – Complete Project Solution Modal:** One-click modal containing the full, copy-ready `prompt-playground/server.js` implementation.

---

## 18-Slide Deck Outline

1. **What Is Prompt Engineering?:** Definition, input prompts, weak vs improved prompt contrast.
2. **Why Is Prompt Engineering Important?:** 5 factors determining response quality, prompt engineering workflow cycle. *(Diagram 3)*
3. **Anatomy of a Good Prompt:** Role, Task, Context, Instructions, Constraints breakdown. *(Diagram 1 & Interactive Lab 1)*
4. **System Prompt vs User Prompt:** Persona/rules vs user input, combined message pipeline. *(Diagram 2)*
5. **Context, Instructions and Constraints:** Solving distinct problems, unified prompt specification.
6. **Practical 1: Create a Basic Prompt API:** Project setup, folder structure, `.env`, `.gitignore`.
7. **Practical 2: Send a Prompt to an AI Model:** Building `POST /ask`, Postman visual card, 5-step lifecycle.
8. **Practical 3: Add System Instructions:** Adding `instructions` parameter to `client.responses.create`, behavioral comparison.
9. **Role Prompting:** Perspective conditioning (Senior dev, teacher, interviewer, DBA) and caveats.
10. **Practical 4: Implement Role Prompting in Node.js:** Dynamic `POST /role` endpoint and testing. *(Interactive Lab 2)*
11. **Zero-Shot Prompting:** In-context classification without demonstration examples.
12. **Few-Shot Prompting:** Pattern matching with 2–5 curated demonstration shots.
13. **Zero-Shot vs Few-Shot Prompting:** Comparison matrix and prompt structure. *(Diagram 4)*
14. **Practical 5: Implement Zero-Shot Prompting:** Building `POST /zero-shot` for review sentiment.
15. **Practical 6: Implement Few-Shot Prompting:** Building `POST /few-shot` with 3 demonstration shots.
16. **Practical Comparison: Zero-Shot vs Few-Shot:** Testing conflicting/mixed sentiment reviews. *(Interactive Lab 3)*
17. **Common Prompt Engineering Mistakes:** 7 classic traps to avoid and professional checklist.
18. **Day 4 Practical Challenge:** Complete Prompt Playground API requirements, outcomes, simulator, and solution modal. *(Interactive Lab 4)*

---

## Companion Practical Project: `prompt-playground/`

### 1. Setup & Installation

```bash
mkdir prompt-playground
cd prompt-playground
npm init -y
npm install express openai dotenv
```

### 2. `package.json`

```json
{
  "name": "prompt-playground",
  "version": "1.0.0",
  "description": "Prompt Engineering Playground API - GenAI Day 4",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "openai": "^4.96.0"
  }
}
```

### 3. `.env.example` (copy to `.env`)

```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

### 4. `.gitignore`

```gitignore
node_modules/
.env
```

### 5. `server.js` (Complete Multi-Endpoint API)

```javascript
require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 1. Basic Prompt with System Instructions
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL,
      instructions: `
        You are a beginner-friendly Node.js teacher.
        Explain technical concepts using simple English.
        Always include a practical example.
      `,
      input: question
    });

    res.json({ answer: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI request failed" });
  }
});

// 2. Role Prompting
app.post("/role", async (req, res) => {
  try {
    const { role, question } = req.body;
    if (!role || !question) {
      return res.status(400).json({ message: "Role and question are required" });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL,
      instructions: `Act as a ${role}. Explain clearly and provide practical examples.`,
      input: question
    });

    res.json({ role, answer: response.output_text });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// 3. Zero-Shot Prompting
app.post("/zero-shot", async (req, res) => {
  try {
    const { review } = req.body;
    if (!review) {
      return res.status(400).json({ message: "Review is required" });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL,
      instructions: `
        Classify the review as Positive, Negative, or Neutral.
        Return only one category.
      `,
      input: review
    });

    res.json({ result: response.output_text.trim() });
  } catch (error) {
    res.status(500).json({ message: "Classification failed" });
  }
});

// 4. Few-Shot Prompting
app.post("/few-shot", async (req, res) => {
  try {
    const { review } = req.body;
    if (!review) {
      return res.status(400).json({ message: "Review is required" });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL,
      instructions: `
        Classify reviews as Positive, Negative, or Neutral.
        Follow the same pattern as the examples.
        Return only one category.
      `,
      input: `
        Review: The product is amazing.
        Category: Positive

        Review: The delivery was terrible.
        Category: Negative

        Review: The product arrived yesterday.
        Category: Neutral

        Review: ${review}
        Category:
      `
    });

    res.json({ result: response.output_text.trim() });
  } catch (error) {
    res.status(500).json({ message: "Classification failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Prompt Playground server running on port ${PORT}`);
});
```

---

### 6. Testing Endpoints with Postman

#### Route 1: `POST /ask`
- **URL:** `http://localhost:3000/ask`
- **Body (`raw` JSON):**
  ```json
  {
    "question": "What is Express middleware?"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "answer": "Hello! Express middleware is like a helpful assistant that stands between incoming web requests and your final route handler..."
  }
  ```

#### Route 2: `POST /role`
- **URL:** `http://localhost:3000/role`
- **Body (`raw` JSON):**
  ```json
  {
    "role": "Senior Node.js Developer",
    "question": "Explain Express middleware"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "role": "Senior Node.js Developer",
    "answer": "In production Node.js services, middleware functions have access to the req, res, and next function..."
  }
  ```

#### Route 3: `POST /zero-shot`
- **URL:** `http://localhost:3000/zero-shot`
- **Body (`raw` JSON):**
  ```json
  {
    "review": "The delivery was very fast and the product is excellent."
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "result": "Positive"
  }
  ```

#### Route 4: `POST /few-shot`
- **URL:** `http://localhost:3000/few-shot`
- **Body (`raw` JSON):**
  ```json
  {
    "review": "The customer support was extremely helpful."
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "result": "Positive"
  }
  ```
