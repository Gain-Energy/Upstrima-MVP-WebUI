import openai
import pinecone
from fastapi import APIRouter, HTTPException, Request
from starlette.responses import StreamingResponse
import asyncio
import os

router = APIRouter()

# Available AI Agents
AGENTS = {
    "default": "gpt-4",
    "drilling-expert": "deepseek-drilling",
    "compliance-ai": "upstrima-compliance-model",
    "merlin-erd": "merlin-erd-custom-model"
}

pinecone.init(api_key=os.getenv("PINECONE_API_KEY"), environment="us-west1-gcp")
index = pinecone.Index("upstrima-docs")

async def openai_stream(query, model):
    """Streams OpenAI's response word-by-word."""
    response = openai.ChatCompletion.create(
        model=model,
        messages=[{"role": "user", "content": query}],
        stream=True
    )
    for chunk in response:
        if "delta" in chunk["choices"][0]:
            yield chunk["choices"][0]["delta"]["content"]

@router.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message")
    agent = data.get("agent", "default")

    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    model = AGENTS.get(agent, "gpt-4")

    response = openai.Embedding.create(input=user_message, model="text-embedding-ada-002")
    query_embedding = response["data"][0]["embedding"]
    search_results = index.query(query_embedding, top_k=3, include_metadata=True)
    context = "\n".join([match["metadata"]["text"] for match in search_results["matches"]])

    async def event_stream():
        async for word in openai_stream(f"Context:\n{context}\n\nUser: {user_message}", model):
            yield f"{word} "

    return StreamingResponse(event_stream(), media_type="text/event-stream")
