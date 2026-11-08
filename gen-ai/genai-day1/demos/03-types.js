// 03-types.js
import fs from 'node:fs';
import { ai, MODEL } from './ai.js';

// Text
const text = await ai.models.generateContent({ model: MODEL, contents: 'Write a 1-line tagline for a coffee shop.' });
console.log('TEXT:', text.text);

// Code
const code = await ai.models.generateContent({ model: MODEL, contents: 'Write a JS function isPalindrome(str). Code only.' });
console.log('CODE:\n', code.text);

// Image (may need a paid-tier key)
const img = await ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: 'Cartoon robot teaching in a classroom' });
const part = img.candidates[0].content.parts.find(p => p.inlineData);
fs.writeFileSync('robot.png', Buffer.from(part.inlineData.data, 'base64'));
console.log('IMAGE: saved robot.png');

