from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import chat, chat_memory, upload, train

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")
app.include_router(chat_memory.router, prefix="/api")
app.include_router(upload.router, prefix="/api")
app.include_router(train.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Upstrima WebUI Backend is Running!"}
