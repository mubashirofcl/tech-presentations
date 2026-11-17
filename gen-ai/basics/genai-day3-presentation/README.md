# Node.js – Gen-AI Day 3: LLM Providers, Model Selection & Node.js Integration

Interactive 20-slide technology presentation and companion **Multi-Provider AI Playground API** (`multi-provider-ai/`) project for beginner Node.js developers.

## Quick Start (Presentation)

1. Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox, Brave) — zero build steps or local servers required.
2. Navigate using:
   - `→`, `Space`, or `PageDown`: Next slide
   - `←` or `PageUp`: Previous slide
   - `Home` / `End`: Jump to Slide 1 / Slide 20
   - `T`: Open Table of Contents (jump to any of the 20 slides)
   - `?`: Open Keyboard Shortcuts help modal
   - `F`: Toggle Fullscreen mode
   - `Esc`: Close open modal

---

## Interactive Hands-On Labs Included

- **Slide 5 – Offline & Privacy Simulator (Lab 1):** Toggle between local Ollama and cloud providers with a simulated disconnected network to understand when local LLMs are required.
- **Slide 7 – Model Selection Wizard (Lab 2):** Explore Quality vs Latency vs Cost priorities and receive optimal architecture recommendations (e.g. Groq for ultra-low latency, Ollama for zero cost/privacy, Claude 3.5 Sonnet for deep logic).
- **Slide 14 – OpenAI SDK `baseURL` Switcher (Lab 3):** Simulate how setting `baseURL` routes requests to Groq, Ollama, Together AI, or DeepSeek without changing SDK packages.
- **Slide 18 & 20 – `POST /ask/:provider` API Simulator (Lab 4):** Test live dynamic routing across `openai`, `gemini`, `claude`, `groq`, and `ollama`, with response latency and normalized JSON payloads.
- **Slide 20 – Complete Project Solution Modal:** One-click modal revealing the complete, tested `server.js` and `services/aiService.js` source code.

---

## 20-Slide Deck Outline

1. **Introduction to LLM Providers:** Course roadmap, local vs cloud, selection criteria, practical project preview.
2. **Closed-Source vs Open-Source Models:** Proprietary APIs vs open-weight models (Llama, Gemma, Qwen) and license restrictions. *(Diagram 1)*
3. **Local LLM vs Cloud LLM:** Privacy, hardware, RAM/VRAM, cost, and latency comparisons. *(Diagrams 2 & 3)*
4. **Ollama: Run LLMs Locally:** Local runtime architecture, daemon on `localhost:11434`, CLI commands. *(Diagram 4)*
5. **Practical: Connect Ollama with Node.js:** Dynamic ESM import in CommonJS, `ollama.chat()` call, offline lab. *(Interactive Lab 1)*
6. **What Is Llama?:** Meta's open-weight family, parameter sizes (1B to 70B), Llama vs Ollama distinction.
7. **Model Selection: Quality vs Latency vs Cost:** The developer's trilemma and decision matrix. *(Diagram 5 & Interactive Lab 2)*
8. **Small vs Large Models:** 1B–8B edge models vs 70B+ frontier reasoning models. *(Diagram 6)*
9. **General vs Specialized Models:** Whisper, embeddings, and LLMs chained into composite pipelines. *(Diagram 7)*
10. **What Are Multimodal Models?:** Vision, audio, and video processing in Gemini 2.5 and GPT-4o. *(Diagram 8)*
11. **Introduction to Cloud LLM Providers:** The Big 4 cloud providers, provider vs SDK vs model distinction. *(Diagram 9)*
12. **OpenAI and Gemini:** `openai` (`client.responses.create`) and `@google/genai` (`GoogleGenAI` dynamic import).
13. **Claude and Groq:** `@anthropic-ai/sdk` (`messages.create`) and `groq-sdk` (`chat.completions.create` on LPUs).
14. **What Are OpenAI-Compatible APIs?:** Standardizing on `baseURL` to connect third-party providers. *(Diagram 10 & Interactive Lab 3)*
15. **Practical: Multiple LLM Providers in One Node.js Project:** Architecture, `package.json`, `.env` template. *(Diagram 11)*
16. **Practical: Create a Common AI Service:** The Provider Adapter Pattern normalizing responses into plain text. *(Diagram 12)*
17. **Practical: Add Gemini and Ollama:** Dynamic imports in CommonJS, local daemon pre-requisites.
18. **Practical: Create the Multi-Provider Express API:** `POST /ask/:provider` dispatcher, validation, error shielding. *(Diagram 13 & Interactive Lab 4)*
19. **How to Choose the Right Provider?:** 8-point production checklist and scenario decision matrix.
20. **Recap and Practical Challenge:** Concept master table, playground challenge, full solution modal.

---

## Companion Practical Project: `multi-provider-ai/`

### 1. Setup & Installation

```bash
mkdir multi-provider-ai
cd multi-provider-ai
npm init -y

# Install Express, dotenv, and all 5 AI Provider SDKs
npm install express dotenv openai
npm install @anthropic-ai/sdk @google/genai
npm install groq-sdk ollama
```

### 2. `package.json`

```json
{
  "name": "multi-provider-ai",
  "version": "1.0.0",
  "description": "Multi-Provider AI Playground API - GenAI Day 3",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.39.0",
    "@google/genai": "^0.1.1",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "groq-sdk": "^0.15.0",
    "ollama": "^0.5.14",
    "openai": "^4.96.0"
  }
}
```

### 3. `.env.example` (copy to `.env`)

```env
PORT=3000

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Anthropic Claude
ANTHROPIC_API_KEY=your_anthropic_api_key_here
CLAUDE_MODEL=claude-3-5-sonnet-latest

# Groq
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Ollama Local (no API key needed)
OLLAMA_MODEL=llama3.2

# Optional OpenAI-Compatible endpoint
COMPATIBLE_API_KEY=your_key
COMPATIBLE_BASE_URL=https://api.groq.com/openai/v1
COMPATIBLE_MODEL=llama-3.3-70b-versatile
```

### 4. `.gitignore`

```gitignore
node_modules/
.env
```

### 5. `services/aiService.js` (Unified Provider Adapters)

```javascript
const OpenAI = require("openai");
const Anthropic = require("@anthropic-ai/sdk");
const Groq = require("groq-sdk");

// 1. Initialize reusable cloud clients once at startup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Adapter 1: OpenAI
async function askOpenAI(question) {
  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    input: question
  });
  return response.output_text;
}

// Adapter 2: Anthropic Claude
async function askClaude(question) {
  const response = await anthropic.messages.create({
    model: process.env.CLAUDE_MODEL || "claude-3-5-sonnet-latest",
    max_tokens: 300,
    messages: [{ role: "user", content: question }]
  });

  return response.content
    .filter((item) => item.type === "text")
    .map((item) => item.text)
    .join("\n");
}

// Adapter 3: Groq
async function askGroq(question) {
  const response = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: question }]
  });
  return response.choices[0].message.content;
}

// Adapter 4: Google Gemini (Dynamic ESM import inside CommonJS)
async function askGemini(question) {
  const { GoogleGenAI } = await import("@google/genai");
  const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  const response = await client.interactions.create({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    input: question
  });
  return response.output_text;
}

// Adapter 5: Local Ollama (Dynamic ESM import, runs against http://localhost:11434)
async function askOllama(question) {
  const { default: ollama } = await import("ollama");

  const response = await ollama.chat({
    model: process.env.OLLAMA_MODEL || "llama3.2",
    messages: [{ role: "user", content: question }]
  });
  return response.message.content;
}

module.exports = {
  askOpenAI,
  askClaude,
  askGroq,
  askGemini,
  askOllama
};
```

### 6. `server.js` (Express Multi-Provider API)

```javascript
require("dotenv").config();
const express = require("express");
const {
  askOpenAI,
  askClaude,
  askGroq,
  askGemini,
  askOllama
} = require("./services/aiService");

const app = express();
app.use(express.json());

// Dictionary mapping route params to adapter functions
const providers = {
  openai: askOpenAI,
  claude: askClaude,
  groq: askGroq,
  gemini: askGemini,
  ollama: askOllama
};

app.get("/", (req, res) => {
  res.json({
    service: "Multi-Provider AI Playground API - GenAI Day 3",
    supportedProviders: Object.keys(providers),
    status: "running"
  });
});

app.post("/ask/:provider", async (req, res) => {
  const startTime = Date.now();
  try {
    const { provider } = req.params;
    const { question } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required"
      });
    }

    const selectedProvider = providers[provider.toLowerCase()];
    if (!selectedProvider) {
      return res.status(400).json({
        success: false,
        message: `Unsupported provider: ${provider}. Supported providers: ${Object.keys(providers).join(", ")}`
      });
    }

    // Call chosen adapter uniformly
    const answer = await selectedProvider(question.trim());
    const latencyMs = Date.now() - startTime;

    res.json({
      success: true,
      provider: provider.toLowerCase(),
      latencyMs,
      answer
    });
  } catch (error) {
    console.error(`Error on provider ${req.params.provider}:`, error.message);
    res.status(500).json({
      success: false,
      provider: req.params.provider,
      message: "AI request failed",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Multi-provider AI server running on http://localhost:${PORT}`);
});
```

---

### 7. Testing Endpoints with Postman or Curl

#### Test 1: OpenAI
- **URL:** `POST http://localhost:3000/ask/openai`
- **Body (`raw` JSON):**
  ```json
  { "question": "Explain the Node.js event loop in one sentence." }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "provider": "openai",
    "latencyMs": 420,
    "answer": "The Node.js event loop coordinates asynchronous non-blocking I/O operations by delegating tasks to the operating system kernel and executing callbacks on the single thread."
  }
  ```

#### Test 2: Google Gemini
- **URL:** `POST http://localhost:3000/ask/gemini`
- **Body:** `{ "question": "Explain the Node.js event loop." }`

#### Test 3: Anthropic Claude
- **URL:** `POST http://localhost:3000/ask/claude`
- **Body:** `{ "question": "Explain the Node.js event loop." }`

#### Test 4: Groq
- **URL:** `POST http://localhost:3000/ask/groq`
- **Body:** `{ "question": "Explain the Node.js event loop." }`

#### Test 5: Local Ollama (Offline)
- **URL:** `POST http://localhost:3000/ask/ollama`
- **Body:** `{ "question": "Explain the Node.js event loop." }`

