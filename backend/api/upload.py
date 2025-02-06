import pdfplumber
from fastapi import APIRouter, UploadFile, File
import openai

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = f"uploaded_files/{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"

    text_chunks = chunk_text(text)

    embeddings = openai.Embedding.create(input=text_chunks, model="text-embedding-ada-002")["data"]

    pinecone_data = [(f"{file.filename}_chunk_{i}", emb["embedding"], {"text": chunk}) for i, (chunk, emb) in enumerate(zip(text_chunks, embeddings))]

    index.upsert(vectors=pinecone_data)

    return {"message": f"{len(text_chunks)} chunks uploaded and indexed!"}
