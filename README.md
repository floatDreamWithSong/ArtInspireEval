# ArtInspire模型评估框架

## 使用

克隆到本地，然后`pnpm i`，配置环境变量后，`pnpm dev`

## 环境变量

根目录创建`.env`文件，示例：

```
PG_VECTOR_CONNECTION_STRING=postgresql://pgvector:pgvector@localhost:5432/pgvector
QWEN_API_KEY=
QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
OPENAI_API_KEY=
OPENAI_BASE_URL=
OLLAMA_BASE_URL=http://localhost:11434/api
PORT=3000
```

## PgVector安装

拉取镜像

``` cmd
docker pull pgvector/pgvector:pg17
```

创建容器

``` cmd
docker run --name pgvector --restart=always -e POSTGRES_USER=pgvector -e POSTGRES_PASSWORD=pgvector -v /srv/tlw/pgvectordata:/var/lib/postgresql/data -p 5432:5432 -d pgvector/pgvector:pg17
```

创建vector扩展

``` sql
CREATE EXTENSION vector;
``` 

按照上述方式后，配置连接字符串

``` ts
postgresql://pgvector:pgvector@localhost:5432/pgvector
```