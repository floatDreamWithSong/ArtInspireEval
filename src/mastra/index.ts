
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { LibSQLStore } from '@mastra/libsql';
import { weatherAgent, testAgent, memoryAgent } from './agents';
import { ragWorkflow } from './workflow';
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_CONNECTION_STRING: string;
      QWEN_API_KEY: string;
      QWEN_BASE_URL: string;
      OPENAI_API_KEY: string;
      OPENAI_BASE_URL: string;
      OLLAMA_BASE_URL: string;
    }
  }
}

export const mastra = new Mastra({
  agents: { weatherAgent, testAgent, memoryAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
  workflows: { ragWorkflow },
});
