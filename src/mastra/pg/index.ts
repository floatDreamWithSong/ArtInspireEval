import { PgVector, PostgresStore } from "@mastra/pg"

export const pgStore = new PostgresStore({
  connectionString: process.env.PG_VECTOR_CONNECTION_STRING??'',
});
export const pgVector = new PgVector({
  connectionString: process.env.PG_VECTOR_CONNECTION_STRING??'',
});
