// 02-traditional-vs-genai.js
import { ai, MODEL } from './ai.js';

const review = "The food was not bad at all, I'd definitely come back!";

// Traditional: fixed rule
const rule = review.includes('bad') ? 'Negative' : 'Positive';
console.log('Rule-based:', rule); // Wrong → Negative

// GenAI: understands context
const res = await ai.models.generateContent({
  model: MODEL,
  contents: `Reply only Positive or Negative. Sentiment of: "${review}"`,
});
console.log('GenAI:', res.text); // Positive

