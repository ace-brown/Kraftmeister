from config import settings  # also runs load_dotenv() before init_chat_model reads env vars
import httpx
from langchain.chat_models import init_chat_model
from langchain_core.tools import tool
from langchain.agents import create_agent
from langchain_core.messages import HumanMessage

llm = init_chat_model("claude-sonnet-4-6", model_provider="anthropic")


async def fetch_from_api(url: str, token: str, params: dict | None = None) -> str:
    """Sends an authenticated GET request to the api-gateway and always returns a string — the response body on success, or an LLM-readable error message on failure — so agent tools never crash the agent loop."""
    async with httpx.AsyncClient() as client:
        try:
            res = await client.get(
                url,
                params=params,
                headers={"Authorization": token},
            )
            res.raise_for_status()
            return res.text
        except httpx.HTTPStatusError as e:
            if res.status_code == 403:
                return f"Error 403: The user is not allowed to access resources. Tell the user they dont have permission for this. Error: {e}"
            elif res.status_code == 404:
                return f"Error 404: tell user requested resource not found. Error: {e}"
            elif res.status_code == 500:
                return f"Error 500: tell user an Internal server error occured and they need to retry again later. Error: {e}"
            elif res.status_code == 502:
                return f"Error 502: Bad gateway. Tell user to retry later. Error: {e}"
            else:
                return f"Error {res.status_code}: An unexpected error from API. Do not retry and do not make guess or make up any data. Tell user that data could not be loaded right now and they should try again later. Error: {e}"
        except httpx.RequestError:
            return "Server not responding. Tell user that API could not be reached right now and they should try again later. Do not make up any data"


async def run_agent(message: str, token: str) -> str:
    """Runs the LangChain ReAct agent with the user's message, calling NestJS tools as needed, and returns a natural-language answer."""

    @tool
    async def get_jobs(status: str = "") -> str:
        """Fetches the list of jobs from the Kraftmeister API. Use this to answer questions about jobs.
        Pass status to filter: OPEN (not started), IN_PROGRESS (ongoing), DONE (completed), CANCELLED.
        Leave status empty to get all jobs regardless of status."""

        return await fetch_from_api(
            f"{settings.api_gateway_url}/jobs",
            token,
            params={"status": status} if status else None,
        )

    @tool
    async def get_customers() -> str:
        """Fetches the list of customers from the Kraftmeister API. Use this to answer questions about customers."""

        return await fetch_from_api(f"{settings.api_gateway_url}/customers", token)

    @tool
    async def get_invoices() -> str:
        """Fetches the list of invoices from the Kraftmeister API. Use this to answer questions about invoices,
        payments, or revenue. Each invoice includes status (DRAFT, SENT, PAID, CANCELLED) and total amounts.
        """

        return await fetch_from_api(f"{settings.api_gateway_url}/invoices", token)

    tools = [get_jobs, get_customers, get_invoices]

    agent = create_agent(
        llm,
        tools,
        system_prompt="You are a helpful assistant for a German tradesperson (Handwerker). You help them by answering questions about their jobs, customers, and invoices using the available tools. Always use the tools to fetch real data before answering — never guess or make up numbers.",
    )

    result = await agent.ainvoke({"messages": [HumanMessage(content=message)]})
    return result["messages"][-1].content
