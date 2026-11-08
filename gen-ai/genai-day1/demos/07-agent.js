// 07-agent.js
import { ai, MODEL } from './ai.js';

const tools = {
  getWeather: ({ city }) => ({ city, temp: '31°C', sky: 'Rainy' }), // fake tool
};

const config = {
  tools: [{
    functionDeclarations: [{
      name: 'getWeather',
      description: 'Get current weather for a city',
      parameters: { type: 'object', properties: { city: { type: 'string' } }, required: ['city'] },
    }],
  }],
};

const contents = [{ role: 'user', parts: [{ text: 'Should I carry an umbrella in Kochi today?' }] }];

while (true) {
  const res = await ai.models.generateContent({ model: MODEL, contents, config });
  if (!res.functionCalls?.length) { console.log('Agent:', res.text); break; }

  contents.push(res.candidates[0].content);
  for (const call of res.functionCalls) {
    console.log('🔧 Tool call:', call.name, call.args);
    const result = tools[call.name](call.args);
    contents.push({ role: 'user', parts: [{ functionResponse: { name: call.name, response: result } }] });
  }
}

