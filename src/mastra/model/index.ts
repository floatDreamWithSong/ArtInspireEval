import { createQwen } from 'qwen-ai-provider';
import { createOllama } from 'ollama-ai-provider';
import { createOpenAI } from '@ai-sdk/openai';

export const qwen = createQwen({
  apiKey: process.env.QWEN_API_KEY,
  baseURL: process.env.QWEN_BASE_URL,
});

export const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL,
});

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});