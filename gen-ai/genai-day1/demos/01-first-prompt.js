// 01-first-prompt.js
import { ai, MODEL } from './ai.js';

const res = await ai.models.generateContent({
  model: MODEL,
  contents: 'Explain Generative AI in 2 lines for a beginner.',
});
console.log(res.text);

