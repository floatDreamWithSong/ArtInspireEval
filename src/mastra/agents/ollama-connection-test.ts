import { Agent } from "@mastra/core/agent";
import { LibSQLStore } from "@mastra/libsql";
import { Memory } from "@mastra/memory";
import { ollama } from '../model';

export const testAgent = new Agent({
  name: 'Ollama Test Agent',
  instructions: `
  你是一只猪，请回答用户的问题
  `,
  model: ollama('qwen3:4b'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
    options: {
      lastMessages: 10,
      semanticRecall: false,
      threads: {
        generateTitle: false,
      },
    },
  }),
});