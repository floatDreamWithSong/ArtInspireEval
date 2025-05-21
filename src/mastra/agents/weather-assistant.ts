import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from '../tools';
import { qwen } from '../model';

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `

`,
  model: 
  // ollama('qwen3:4b')
  qwen('qwen-turbo')
  // openai('qwen-turbo')
  ,
  tools: { weatherTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
    options: {
      lastMessages: 3,
      semanticRecall: false,
      threads: {
        generateTitle: false,
      },
    },
  }),
});