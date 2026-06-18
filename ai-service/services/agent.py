import config  # noqa: F401 — ensures load_dotenv() runs before init_chat_model reads env vars
import httpx
from langchain.chat_models import init_chat_model
from langchain_core.tools import tool
from langchain.agents import create_agent
from langchain_core.messages import HumanMessage

llm = init_chat_model("claude-sonnet-4-6", model_provider="anthropic")


async def run_agent(message: str, token: str) -> str:
    """Runs the LangChain ReAct agent with the user's message, calling NestJS tools as needed, and returns a natural-language answer."""

    @tool
    async def get_jobs(status: str = "") -> str:
        """Fetches the list of jobs from the Kraftmeister API. Use this to answer questions about jobs.
        Pass status to filter: OPEN (not started), IN_PROGRESS (ongoing), DONE (completed), CANCELLED.
        Leave status empty to get all jobs regardless of status."""

        async with httpx.AsyncClient() as client:
            response = await client.get(
                "http://api-gateway:4000/jobs",
                params={"status": status} if status else {},
                headers={"Authorization": token},
            )
            return response.text

    @tool
    async def get_customers() -> str:
        """Fetches the list of customers from the Krafmeister API. Use this to answer questions about customers."""

        async with httpx.AsyncClient() as client:
            response = await client.get(
                "http://api-gateway:4000/customers",
                headers={"Authorization": token},
            )

            return response.text

    @tool
    async def get_invoices() -> str:
        """Fetches the list of invoices from the Kraftmeister API. Use this to answer questions about invoices,
        payments, or revenue. Each invoice includes status (DRAFT, SENT, PAID, CANCELLED) and total amounts.
        """

        async with httpx.AsyncClient() as client:
            response = await client.get(
                "http://api-gateway:4000/invoices", headers={"Authorization": token}
            )

            return response.text

    tools = [get_jobs, get_customers, get_invoices]

    agent = create_agent(
        llm,
        tools,
        system_prompt="You are a helpful assistant for a German tradesperson (Handwerker). You help them by answering questions about their jobs, customers, and invoices using the available tools. Always use the tools to fetch real data before answering — never guess or make up numbers.",
    )

    result = await agent.ainvoke({"messages": [HumanMessage(content=message)]})
    return result["messages"][-1].content
