from fastapi import APIRouter
from schemas.ai_schemas import AgentResponse, AgentRequest
from services.agent import run_agent

router = APIRouter()


@router.post("/", response_model=AgentResponse)
async def agent_chat(payload: AgentRequest):
    """Receives a natural-language question, runs it through the ReAct agent, and returns the answer."""
    answer = await run_agent(payload.message)
    return AgentResponse(answer=answer)
