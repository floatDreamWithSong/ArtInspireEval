import { Step, Workflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { textRagQuery } from '../rag';
import { qwen } from '../model';
import { Agent } from '@mastra/core/agent';

// 创建一个LLM助手Agent
const ragAssistant = new Agent({
  name: 'RAG Assistant',
  instructions: `你是一个有帮助的助手，会根据提供的上下文信息回答问题。`,
  model: qwen('qwen-turbo'),
});

// 创建RAG工作流
export const ragWorkflow = new Workflow({
  name: 'ragWorkflow',
  triggerSchema: z.object({
    userQuery: z.string().describe('用户的问题或查询'),
  }),
});

// 构建RAG工作流，使用内联定义步骤
ragWorkflow
  .step(
    new Step({
      id: 'retrieveContext',
      inputSchema: z.object({
        userQuery: z.string().describe('用户的问题或查询'),
      }),
      outputSchema: z.object({
        context: z.string().describe('从RAG系统检索到的相关上下文'),
      }),
      execute: async ({ context }) => {
        const userQuery = context.triggerData.userQuery;

        // 使用RAG系统检索相关信息
        const searchResults = await textRagQuery(userQuery);
        // 提取检索到的文本作为上下文
        const relevantTexts = searchResults.map((result, index) => `第${index + 1}段材料\n: ${result.metadata?.text || ""}`);
        const retrievedContext = relevantTexts.join('\n\n');

        return { context: retrievedContext };
      },
    }),
  )
  .then(
    new Step({
      id: 'generateResponse',
      outputSchema: z.object({
        answer: z.string().describe('基于上下文生成的回答'),
      }),
      execute: async ({ context }) => {
        const userQuery = context.triggerData.userQuery;

        // 检查上一步骤是否成功
        if (context.steps.retrieveContext.status !== 'success') {
          return { answer: '抱歉，我无法找到相关信息。' };
        }

        const retrievedContext = context.steps.retrieveContext.output.context;

        // 构建提示词，包含检索到的上下文和用户问题
        const prompt = `
你是一个童话故事《柳林风声》的故事讲解员，参考以下内容来回答用户的问题:

${retrievedContext}

用户问题: ${userQuery}

请根据提供的参考内容回答问题。如果参考内容中没有相关信息，请说明无法找到相关信息。
`;

        // 使用Agent生成回答
        const response = await ragAssistant.generate(prompt);

        return { answer: response.text };
      },
    }),
  );

// 提交工作流
ragWorkflow.commit();
