// 06-rag.js
import { ai, MODEL } from './ai.js';

const docs = [
  'Classes run Monday to Friday, 10 AM to 1 PM.',
  'Placement support starts after course completion.',
  'Students get lifetime access to recorded sessions.',
];

const embed = async (texts) =>
  (await ai.models.embedContent({ model: 'gemini-embedding-001', contents: texts }))
    .embeddings.map(e => e.values);

const cosine = (a, b) => {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] ** 2; nb += b[i] ** 2; }
  return dot / Math.sqrt(na * nb);
};

const question = 'What time are the classes?';
const docVecs = await embed(docs);           // 1. Index
const [qVec] = await embed([question]);      // 2. Embed question
const scores = docVecs.map(v => cosine(qVec, v));
const best = docs[scores.indexOf(Math.max(...scores))]; // 3. Retrieve
console.log('Retrieved:', best);

const res = await ai.models.generateContent({  // 4. Generate
  model: MODEL,
  contents: `Answer only from this context:\n${best}\n\nQuestion: ${question}`,
});
console.log('Answer:', res.text);
