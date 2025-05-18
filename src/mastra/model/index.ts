import { createQwen } from 'qwen-ai-provider';

export const qwen = createQwen({
  // optional settings, e.g.
  apiKey: process.env.QWEN_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});