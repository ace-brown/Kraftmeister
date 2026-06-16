import config  # noqa: F401 — ensures load_dotenv() runs before init_chat_model reads env vars
import httpx
from langchain.chat_models import init_chat_model
from langchain_core.tools import tool
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.agents import AgentExecutor, create_tool_calling_agent

llm = init_chat_model("claude-sonnet-4-6", model_provider="anthropic")


@tool
async def get_jobs(status: str = "") -> str:
    """Fetches the list of jobs from the Kraftmeister API. Use this to answer questions about jobs.
    Pass status to filter: OPEN (not started), IN_PROGRESS (ongoing), DONE (completed), CANCELLED.
    Leave status empty to get all jobs regardless of status."""

    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://api-gateway:4000/jobs", params={"status": status} if status else {}
        )
        return response.text


@tool
async def get_customers() -> str:
    """Fetches the list of customers from the Krafmeister API. Use this to answer questions about customers."""

    async with httpx.AsyncClient() as client:
        response = await client.get("http://api-gateway:4000/customers")

        return response.text


@tool
async def get_invoices() -> str:
    """Fetches the list of invoices from the Kraftmeister API. Use this to answer questions about invoices,
    payments, or revenue. Each invoice includes status (DRAFT, SENT, PAID, CANCELLED) and total amounts.
    """

    async with httpx.AsyncClient() as client:
        response = await client.get("http://api-gateway:4000/invoices")

        return response.text


async def run_agent(message: str) -> str:
    """Runs the LangChain ReAct agent with the user's message, calling NestJS tools as needed, and returns a natural-language answer."""
    tools = [get_jobs, get_customers, get_invoices]

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a helpful assistant for a German tradeperson.You help them by answering questions about their jobs, customers, and invoices uisng the avaliable tools.",
            ),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )

    agent = create_tool_calling_agent(llm, tools, prompt)

    executor = AgentExecutor(agent=agent, tools=tools)

    result = await executor.ainvoke({"input": message})

    return result["output"]
