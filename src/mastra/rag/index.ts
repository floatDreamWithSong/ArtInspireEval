import { MDocument } from "@mastra/rag";
import { embed } from "ai";
import { story } from "../../common/constant";
import { openai } from "../model";
import { pgVector } from "../pg";

const indexName = 'story_index';
const embedder = openai.embedding('text-embedding-v2');

export const ragInitStory = async () => {
 
  const doc = MDocument.fromText(story);

  const chunks = await doc.chunk({
    strategy: "recursive",
    size: 512,
    overlap: 50,
  });
  console.log(`chunks.length: ${chunks.length}`);
  const embeddings: any[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const { embedding } = await embed({
      model: embedder,
      value: chunks[i].text,
    });
    embeddings.push(embedding);
    console.log(embedding);
  }

  await pgVector.createIndex({
    indexName: indexName,
    dimension: 1536,
  });
  console.log('创建索引成功');

  const result = await pgVector.upsert({
    indexName: indexName,
    vectors: embeddings,
    metadata: chunks?.map((chunk: any) => ({ text: chunk.text })),
  });
  console.log('创建表成功', result.length);
};

export const textRagQuery = async (ragQueryText: string) => {
  const { embedding } = await embed({
    model: embedder,
    value: ragQueryText,
  });
  console.log('创建查询embedding成功');
  console.log(embedding);
  console.log('开始查询');

  const result = await pgVector.query({
    indexName: indexName,
    queryVector: embedding,
    topK: 3,
  });
  console.log("Results:", result);
  return result;
}