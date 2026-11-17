# MERN Gen-AI – Day 1: Introduction to Generative AI & Prompt Engineering

A complete, production-grade, projector-friendly presentation and companion backend project for teaching the fundamentals of Generative AI, Large Language Models (LLMs), prompt engineering strategies, and Node.js backend integration.

---

## 📋 Table of Contents
1. [Overview](#-overview)
2. [Quick Start](#-quick-start)
3. [Presentation Features](#-presentation-features)
4. [Keyboard & Navigation Shortcuts](#-keyboard--navigation-shortcuts)
5. [Slide Outline (15 Slides)](#-slide-outline-15-slides)
6. [Companion Practical Project (`mern-genai-day1`)](#-companion-practical-project-mern-genai-day1)
   - [Project Structure](#project-structure)
   - [Setup & Installation](#setup--installation)
   - [Environment Variables](#environment-variables)
   - [Complete `server.js` Code](#complete-serverjs-code)
   - [API Endpoints & Testing](#api-endpoints--testing)
7. [Interactive Labs in Presentation](#-interactive-labs-in-presentation)
8. [Instructor Teaching Tips](#-instructor-teaching-tips)

---

## 🎯 Overview
- **Course**: MERN Stack with Generative AI
- **Module**: Day 1
- **Focus**: Introduction to Generative AI, LLM Architecture, Model Providers, Prompt Engineering Techniques (Role, Zero-shot, Few-shot), and building a secure Node.js Express AI Chat API.
- **Audience**: Full-stack MERN developers transitioning into Generative AI engineering.
- **Tech Stack**: HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript (Viewer); Node.js, Express, `openai`, `zod`, `dotenv` (Backend).

---

## 🚀 Quick Start
### 1. View Presentation
Double-click [index.html](file:///c:/Users/ADMIN/OneDrive/Desktop/HACA/Presentation/MERN_GENAI/Day1/index.html) or open it with any web browser (Chrome, Edge, Firefox, Safari). No web server, Node.js build step, or external CDN is required.

### 2. Run Companion Node.js Project
```bash
# Navigate to your workspace
mkdir mern-genai-day1 && cd mern-genai-day1
npm init -y

# Install dependencies
npm install express openai dotenv zod cors

# Create environment file
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "PORT=5000" >> .env
```

---

## 🖥️ Presentation Features
- **Projector Optimized Theme**: Clean sky-blue palette (`#0284c7`), high-contrast slide containers (`#ffffff`), dark slate code cards (`#0b1329`), and legible typography (Inter / system sans).
- **Zero External Dependencies**: Pure vanilla HTML5, CSS3, and JavaScript. Runs offline without CDNs.
- **1-Click Copy Buttons**: Every code snippet and terminal block has a hover copy button with immediate visual feedback (`Copied!`).
- **Interactive Sandboxes**:
  1. *Prompt Anatomy Sandbox* (Slide 10): Real-time prompt compiler combining Role, Context, Task, Instructions, and Constraints.
  2. *Classifier Sandbox* (Slide 12): Switch between Zero-shot and Few-shot modes with custom student reviews to view simulated LLM reasoning.
  3. *AI Chat API Simulator* (Slide 14): In-slide interactive REST client to test message payloads, view formatted responses, and inspect token analytics.
- **Interactive Modals**:
  - **Table of Contents Modal** (`T` or click header button) for instant navigation to any of the 15 slides.
  - **Keyboard Help Modal** (`?` or click `?` button).
  - **Full Solution Modal** (Slide 15): Complete `server.js` reference with 1-click copy.

---

## ⌨️ Keyboard & Navigation Shortcuts
| Key / Gesture | Action |
| :--- | :--- |
| `→` (Right Arrow) / `Page Down` / `Space` | Next Slide |
| `←` (Left Arrow) / `Page Up` | Previous Slide |
| `Home` | First Slide (`#slide-1`) |
| `End` | Last Slide (`#slide-15`) |
| `T` | Toggle Table of Contents modal |
| `?` | Toggle Keyboard Shortcuts help modal |
| `Esc` | Close any active modal |
| `Swipe Left / Right` | Touch navigation for tablets and mobile devices |

---

## 📑 Slide Outline (15 Slides)

### Slide 1: What Is Generative AI?
- Core definition of Generative AI (creating novel text, code, audio, video, images based on learned distributions).
- Contrast: Traditional Deterministic Software vs Generative AI.
- Real-world production examples (ChatGPT, GitHub Copilot, Midjourney, ElevenLabs).
- How Generative AI fits into modern MERN stack architecture.

### Slide 2: AI vs ML vs DL vs Generative AI
- **Visual Diagram 1**: Four concentric layers showing the relationship between Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI.
- Detailed conceptual breakdown for each layer with practical real-world examples.
- Key takeaway: Generative AI is a specialized subset of Deep Learning powered by Transformer neural networks.

### Slide 3: Traditional AI vs Generative AI
- **Visual Diagram 2**: Step-by-step workflow comparison:
  - *Traditional AI*: Fixed rules/trained models &rarr; classify, score, predict.
  - *Generative AI*: Complex context &rarr; synthesize new outputs (text, code, structured JSON).
- Comprehensive comparison table (Approach, Output Type, Training Mechanism, Primary Use Cases, Flexibility).

### Slide 4: Types & Applications of Generative AI
- 5 Core Modalities: Text, Code, Image, Audio, and Video generation.
- Production MERN Gen-AI applications:
  - Automated customer support copilots.
  - Natural language database query assistants.
  - Automated resume parsing and validation.
  - Dynamic personalized content generation.

### Slide 5: What Is a Large Language Model (LLM)?
- **Visual Diagram 3**: The Core LLM Inference Flow (`User Input` &rarr; `Prompt Template` &rarr; `LLM Weights & Compute` &rarr; `Generated Response`).
- How LLMs are trained on massive text corpora using next-token prediction.
- Why LLMs are probabilistic prediction engines, not traditional search engines or relational databases.

### Slide 6: How Does an LLM Work? Training vs Inference
- **Visual Diagram 4**: Dual-Phase Lifecycle:
  - *Phase 1: Pre-training & Fine-Tuning* (Months of GPU clusters, trillions of tokens, frozen weights).
  - *Phase 2: Real-Time Inference* (Sub-second token probability distribution calculation).
- Explanation of token scoring, softmax, and greedy vs temperature sampling.

### Slide 7: Tokens, Context Window & Hallucination
- **Tokens**: The fundamental currency of LLMs (~4 characters or 0.75 words per token in English).
- **Context Window**: Hard token limits for combined input + output (e.g., 8k, 32k, 128k, 1M+ tokens).
- **Hallucination**: Confident generation of plausible but factually incorrect information.
- Mitigation strategies for developers (strict temperature, system constraints, grounded RAG).

### Slide 8: LLM Models & Providers
- **Visual Diagram 5**: Architectural comparison between Cloud API LLMs (OpenAI, Gemini, Anthropic, Groq) and Local/Self-Hosted LLMs (Ollama, vLLM, Llama 3, Mistral).
- Tradeoff evaluation grid: Latency, Cost, Data Privacy, Hardware Requirements, Setup Complexity.

### Slide 9: What Is Prompt Engineering?
- Definition: The discipline of designing, structuring, and optimizing inputs to guide an LLM toward precise, reliable, and reproducible results.
- Weak Prompt vs Improved Prompt side-by-side comparison.
- Why developers cannot treat LLM calls as simple string concatenation.

### Slide 10: Anatomy of a Good Prompt
- The 5 Essential Components of a Production Prompt:
  1. **Role**: Who the model should act as.
  2. **Context**: Background knowledge and environment.
  3. **Task**: Direct, unambiguous action verb.
  4. **Instructions**: Step-by-step formatting guidelines.
  5. **Constraints**: What NOT to do.
- **Interactive Lab 1**: Real-time prompt anatomy builder where students can customize fields and see the generated prompt compile live.

### Slide 11: System Prompt vs User Prompt
- **Visual Diagram 6**: Dual-Channel Prompt Architecture.
  - *System Prompt*: Persistent persona, guardrails, output schemas, safety constraints.
  - *User Prompt*: Dynamic runtime input from the end-user.
- Security alert: Why user input should never overwrite system guardrails (Prompt Injection defense).

### Slide 12: Prompting Techniques: Role, Zero-Shot & Few-Shot
- **Visual Diagram 7**: Zero-shot (direct instruction) vs Few-shot (in-context exemplars) workflow.
- In-depth examples for:
  - Role Prompting ("Act as a Senior Node.js Code Reviewer...").
  - Zero-shot classification.
  - Few-shot sentiment & classification with labeled examples.
- **Interactive Lab 2**: Live classifier sandbox demonstrating zero-shot vs few-shot output fidelity.

### Slide 13: Practical: Connect Node.js with an LLM
- Setting up the project: `npm init`, installing `express`, `openai`, `dotenv`, `zod`.
- Secure environment configuration (`.env` + `.gitignore`). Never hardcode API keys!
- Minimal CommonJS client initialization script.

### Slide 14: Practical: Build an AI Chat API
- Building `POST /api/chat` using Express, Zod validation, and the OpenAI SDK.
- Complete request/response lifecycle flow.
- Postman testing card with sample JSON payload and response schema.
- **Interactive Lab 3**: Built-in REST client to test chat completions directly from the slide.

### Slide 15: Day 1 Practical Challenge
- Full review of Day 1 competencies.
- 5 Practical Challenge tasks for students:
  1. Add request validation for empty strings or >1000 characters.
  2. Add role-based system prompts (Tutor, Code Reviewer, Career Coach).
  3. Capture token usage from `response.usage`.
  4. Implement an in-memory conversation history buffer.
  5. Return appropriate HTTP status codes for missing API keys or validation errors.
- **Solution Modal**: Complete, ready-to-run reference implementation.

---

## 🛠️ Companion Practical Project (`mern-genai-day1`)

### Project Structure
```text
mern-genai-day1/
├── node_modules/
├── .env.example
├── .env
├── .gitignore
├── package.json
└── server.js
```

### Setup & Installation
```bash
# Clone or create directory
mkdir mern-genai-day1 && cd mern-genai-day1

# Initialize package
npm init -y

# Install dependencies
npm install express openai dotenv zod cors
```

### Environment Variables
Create `.env.example`:
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
```

Create `.gitignore`:
```text
node_modules
.env
.DS_Store
```

### Complete `server.js` Code
```javascript
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { z } = require("zod");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Check API key configuration
if (!process.env.OPENAI_API_KEY) {
  console.error("CRITICAL ERROR: OPENAI_API_KEY is not set in .env");
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Zod Schema for input validation
const chatRequestSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message cannot exceed 1000 characters"),
  role: z.enum(["tutor", "reviewer", "assistant"]).optional().default("assistant"),
});

// System prompts based on selected persona
const SYSTEM_PROMPTS = {
  assistant: "You are a helpful, precise full-stack developer assistant specializing in the MERN stack.",
  tutor: "You are an encouraging computer science instructor. Explain concepts clearly with simple real-world analogies and beginner-friendly examples.",
  reviewer: "You are a strict Senior Node.js Code Reviewer. Audit code for security, performance, clean architecture, and best practices. Point out edge cases.",
};

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "MERN GenAI Day 1 API",
    timestamp: new Date().toISOString(),
  });
});

// Main Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    // 1. Validate request payload with Zod
    const validationResult = chatRequestSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: validationResult.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }

    const { message, role } = validationResult.data;
    const systemPrompt = SYSTEM_PROMPTS[role] || SYSTEM_PROMPTS.assistant;

    // 2. Call OpenAI Chat Completions API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // 3. Extract reply and token usage
    const reply = completion.choices[0]?.message?.content || "No response received";
    const usage = completion.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };

    // 4. Return clean, structured response
    res.status(200).json({
      success: true,
      data: {
        role,
        reply,
        usage: {
          promptTokens: usage.prompt_tokens,
          completionTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
        },
      },
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);

    // Handle authentication or quota errors specifically
    if (error.status === 401) {
      return res.status(401).json({
        success: false,
        error: "Invalid OpenAI API key. Check your .env file.",
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        error: "OpenAI rate limit or quota exceeded.",
      });
    }

    res.status(500).json({
      success: false,
      error: "Internal server error while communicating with AI service.",
      message: error.message,
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 MERN GenAI Day 1 Server running at http://localhost:${PORT}`);
});
```

### API Endpoints & Testing

#### 1. Health Check
```bash
curl -X GET http://localhost:5000/api/health
```

#### 2. Chat Request (Default Assistant)
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explain what an Express middleware is in one sentence."
  }'
```

#### 3. Chat Request with Role Prompting (Tutor)
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Why do we use useEffect in React?",
    "role": "tutor"
  }'
```

---

## 🧪 Interactive Labs in Presentation
1. **Slide 10 - Prompt Anatomy Builder**: Allows students to select predefined personas, contexts, tasks, and constraints or type their own to observe how each element shapes the final prompt sent to the LLM.
2. **Slide 12 - Zero-Shot vs Few-Shot Classifier**: Students can compare classification consistency across zero-shot prompts and few-shot exemplars with sample student feedback.
3. **Slide 14 - AI Chat API Simulator**: Lets students interact with an Express-like mock API, adjust temperature and system persona, and review formatted JSON responses with token counters.

---

## 👨‍🏫 Instructor Teaching Tips
- **Pacing**: Dedicate ~35 minutes to foundational theory (Slides 1–8), ~30 minutes to prompt engineering and live sandbox demonstrations (Slides 9–12), and ~45 minutes to hands-on Node.js coding and the practical challenge (Slides 13–15).
- **Emphasize Probabilistic vs Deterministic**: Reinforce throughout that an LLM calculates likelihoods of tokens, which explains why identical prompts can return slightly different phrasing and why hallucinations occur.
- **Security Guardrails**: Stress that `process.env.OPENAI_API_KEY` must never be pushed to GitHub or exposed to the React frontend.
- **Active Participation**: Have students open the Slide 10 and Slide 12 interactive labs on their own laptops to test prompt variations before writing backend code.
