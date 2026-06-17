from fastapi import FastAPI
from routers.process import router as process_router
from routers.agent import router as agent_router

app = FastAPI()

app.include_router(process_router, prefix="/process")

app.include_router(agent_router, prefix="/agent")


@app.get("/health")
def health_check():
    return {"status": "ok"}
