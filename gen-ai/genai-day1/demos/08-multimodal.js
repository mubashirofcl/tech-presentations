// 08-multimodal.js
import fs from 'node:fs';
import { ai, MODEL } from './ai.js';

const image = fs.readFileSync('photo.jpg').toString('base64');

const res = await ai.models.generateContent({
  model: MODEL,
  contents: [
    { inlineData: { mimeType: 'image/jpeg', data: image } },
    { text: 'Describe this image and list the objects in it.' },
  ],
});
console.log(res.text);

