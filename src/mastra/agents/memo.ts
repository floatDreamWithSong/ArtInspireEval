import { Agent } from "@mastra/core/agent";
import { qwen } from "../model";
import { Memory } from "@mastra/memory";
import { fastembed } from "@mastra/fastembed";
import { pgStore, pgVector, } from "../pg";

export const memoryAgent = new Agent({
  name: "Memory Agent",
  instructions:
    "You are an AI agent with the ability to automatically recall memories from previous interactions.",
  model: qwen('qwen-turbo'),
  memory: new Memory({
    storage: pgStore,
    vector: pgVector,
    embedder: fastembed,
    options: {
      lastMessages: 5,
      semanticRecall:
        //  {
        //   topK: 3,
        //   messageRange: 1,
        // },
        false,
      threads:
      {
        generateTitle: false,
      },
    },

  })
});
