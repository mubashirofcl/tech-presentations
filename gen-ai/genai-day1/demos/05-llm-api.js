// 05-llm-api.js
import express from 'express';
import { ai, MODEL } from './ai.js';

const app = express();
app.use(express.json());

app.post('/ask', async (req, res) => {
  const r = await ai.models.generateContent({ model: MODEL, contents: req.body.question });
  res.json({ answer: r.text });
});

app.listen(3000, () => console.log('http://localhost:3000'));
// Test: curl -X POST localhost:3000/ask -H "Content-Type: application/json" -d '{"question":"What is Node.js?"}'

