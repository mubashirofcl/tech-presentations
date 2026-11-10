// 04-chatbot.js: support chatbot with memory
import readline from 'node:readline/promises';
import { ai, MODEL } from './ai.js';

const chat = ai.chats.create({
  model: MODEL,
  config: { systemInstruction: 'You are a friendly support bot for a coding institute.' },
});
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

while (true) {
  const msg = await rl.question('You: ');
  if (msg === 'exit') break;
  const res = await chat.sendMessage({ message: msg });
  console.log('Bot:', res.text);
}
rl.close();
