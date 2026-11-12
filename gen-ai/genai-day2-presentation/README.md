# Node.js – Gen-AI Day 2: LLM Fundamentals, Tokens, Model Parameters & Transformers

Interactive 20-slide HTML/CSS/Vanilla JS presentation and companion **LLM Playground API** project for beginner Node.js developers.

## Quick Start (Presentation)

1. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox) — no build tools required.
2. Navigate using:
   - `→`, `Space`, or `PageDown`: Next slide
   - `←` or `PageUp`: Previous slide
   - `Home` / `End`: Jump to Slide 1 / Slide 20
   - `T`: Open Table of Contents (all 20 slides)
   - `?`: Open Keyboard Shortcuts modal
   - `F`: Toggle Fullscreen mode
   - `Esc`: Close open modal

## Interactive Hands-On Labs Included

- **Slide 8 – Interactive Token Estimator Lab:** Test character counts, visual token-piece breakdown, `Math.ceil(text.length / 4)` approximation vs sample SDK `response.usage`.
- **Slide 13 – Temperature & Max Tokens Lab:** Slide temperature (`0.0` → `1.2`) and vary `max_output_tokens` to observe deterministic vs varied output and early truncation.
- **Slide 16 – Context Grounding Lab:** Compare ungrounded guessing against context-grounded prompts with fallback refusal (`"I do not know from the provided context."`).
- **Slide 20 – `POST /ask` Playground Simulator & Full Solution:** Simulate API requests live and inspect the complete `server.js` solution modal.

---

## 20-Slide Deck Outline

1. Introduction to LLMs
2. What Is an LLM? *(Diagram 1: LLM input-to-output flow)*
3. How Does an LLM Learn? *(Diagram 2: Training process)*
4. Training vs Inference *(Diagram 3: Training vs inference comparison)*
5. Practical: Make Your First LLM Inference Request
6. Practical: Send a Prompt to an LLM
7. What Are Tokens? *(Diagram 4: Tokenization example)*
8. Practical: Understanding Tokenization *(Interactive Token Lab)*
9. What Is a Context Window? *(Diagram 5: Context window & token budget)*
10. Practical: Context Window Management
11. Parameters and Model Weights *(Diagram 6: Weights vs API parameters)*
12. What Is Temperature? *(Diagram 7: Next-token probability comparison)*
13. Practical: Experiment with Temperature *(Interactive Temperature Lab)*
14. What Is Maximum Output Tokens?
15. What Is an LLM Hallucination? *(Diagram 8: Hallucination flow)*
16. Practical: Reduce Hallucinations Using Context *(Interactive Grounding Lab)*
17. Knowledge Cutoff and LLM Limitations *(Diagram 9: Knowledge cutoff timeline)*
18. Introduction to Transformers *(Diagram 10: Transformer pipeline)*
19. Attention, Self-Attention, Encoder and Decoder *(Diagrams 11 & 12)*
20. Recap and Practical Challenge *(Interactive Playground Simulator)*

---

## Companion Practical Project: `llm-playground/`

### Setup Commands

```bash
mkdir llm-playground
cd llm-playground
npm init -y
npm install express openai dotenv
```

### `package.json`

```json
{
  "name": "llm-playground",
  "version": "1.0.0",
  "description": "GenAI Day 2 LLM Playground API using Express and OpenAI SDK",
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

### `.env.example` (copy to `.env`)

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### `.gitignore`

```gitignore
node_modules/
.env
```

### `server.js`

```javascript
require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Approximate helper for quick pre-checks (NOT exact tokenization!)
function estimateTokensApprox(text) {
  return Math.ceil(text.length / 4);
}

app.get("/", (req, res) => {
  res.json({
    service: "LLM Playground API - GenAI Day 2",
    status: "running"
  });
});

app.post("/ask", async (req, res) => {
  try {
    const {
      question,
      temperature = 0.7,
      max_output_tokens = 150,
      context = ""
    } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "A non-empty question is required" });
    }

    const safeTemp = Number(temperature);
    if (Number.isNaN(safeTemp) || safeTemp < 0 || safeTemp > 2) {
      return res.status(400).json({ error: "temperature must be between 0 and 2" });
    }

    const safeMaxTokens = Number(max_output_tokens);
    if (Number.isNaN(safeMaxTokens) || safeMaxTokens < 16 || safeMaxTokens > 2000) {
      return res.status(400).json({ error: "max_output_tokens must be between 16 and 2000" });
    }

    const hasContext = typeof context === "string" && context.trim().length > 0;
    const promptInput = hasContext
      ? `Answer the question ONLY using the provided context. If the answer is not in the context, reply: "I do not know from the provided context."\n\nContext:\n${context.trim()}\n\nQuestion:\n${question.trim()}`
      : question.trim();

    const estimatedInputTokens = estimateTokensApprox(promptInput);
    if (estimatedInputTokens > 4000) {
      return res.status(400).json({ error: "Prompt exceeds Playground token budget." });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: promptInput,
      temperature: safeTemp,
      max_output_tokens: safeMaxTokens
    });

    res.json({
      answer: response.output_text,
      usage: response.usage,
      estimatedInputTokensApprox: estimatedInputTokens,
      groundedWithContext: hasContext,
      status: response.status
    });
  } catch (error) {
    console.error("Playground API Error:", error.message);
    res.status(500).json({ error: "Failed to process LLM request" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LLM Playground API listening on http://localhost:${PORT}`);
});
```

### Testing in Postman (`POST http://localhost:3000/ask`)

**Request Body (`raw` → `JSON`):**

```json
{
  "question": "How many days is the refund policy?",
  "temperature": 0.2,
  "max_output_tokens": 120,
  "context": "Course policy: Students may request a refund within 7 calendar days of enrollment."
}
```

**Expected Sample Response (`200 OK`):**

```json
{
  "answer": "According to the provided context, students may request a refund within 7 calendar days of enrollment.",
  "usage": {
    "input_tokens": 52,
    "output_tokens": 19,
    "total_tokens": 71
  },
  "estimatedInputTokensApprox": 53,
  "groundedWithContext": true,
  "status": "completed"
}
```
