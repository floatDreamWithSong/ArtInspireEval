import { createQwen } from 'qwen-ai-provider';
import { createOllama } from 'ollama-ai-provider';

export const qwen = createQwen({
  // optional settings, e.g.
  apiKey: process.env.QWEN_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});


export const ollama = createOllama({
  // optional settings, e.g.
  baseURL: 'http://localhost:11434/api',
});