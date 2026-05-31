from fastapi import FastAPI
from config import settings
from routers.process import router as process_router

app = FastAPI()

app.include_router(process_router, prefix="/process")

@app.get("/health")
def health_check():
    return {"status": "ok"}
