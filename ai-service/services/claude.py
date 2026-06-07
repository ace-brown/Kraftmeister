from langchain.chat_models import init_chat_model
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage
import config  # noqa: F401 — ensures load_dotenv() runs before init_chat_model reads env vars
from tenacity import retry, stop_after_attempt, wait_exponential
import httpx
import base64
from schemas.ai_schemas import (
    TranscriptPayload,
    VoiceToJobResponse,
    SuggestItemsRequest,
    SuggestItemsResponse,
    AnalyzePhotoRequest,
    AnalyzePhotoResponse,
)

llm = init_chat_model("claude-sonnet-4-6", model_provider="anthropic")


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
async def extract_job_notes(payload: TranscriptPayload) -> VoiceToJobResponse:
    """Sends a Whisper transcript to Claude and extracts structured job note fields (title, tasks, materials, priority)."""
    prompt = ChatPromptTemplate.from_template(
        """You are an assistant for a German tradesperson (Handwerker).
        The user recorded a voice note about a job. Here is the transcript:

        "{transcript}"

        Extract the following information and return ONLY valid JSON, no extra text:
        {{
        "title": "short job title",
        "description": "full job description",
        "tasks": ["task 1", "task 2"],
        "materials": ["material 1", "material 2"],
        "priority": "low | medium | high",
        "suggestedDate": "YYYY-MM-DD or null"
        }}"""
    )

    chain = prompt | llm | JsonOutputParser()
    result = await chain.ainvoke({"transcript": payload.transcript})
    return VoiceToJobResponse(**result)


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
async def suggest_items(request: SuggestItemsRequest) -> SuggestItemsResponse:
    """Sends a job description to Claude and returns suggested invoice line items with German units and realistic prices."""
    prompt = f"""
            You are an assistant for a German tradesperson (Handwerker).
            Based on the job description below, suggest realistic invoice line items.

            Job description: "{request.jobDescription}"
            Job type: "{request.jobType or 'not specified'}"

            Return ONLY valid JSON, no extra text:
            {{
            "items": [
                {{
                "description": "item description",
                "quantity": 1.0,
                "unitPrice": 50.0,
                "unit": "Stk"
                }}
            ]
            }}

            Use German units where appropriate (Stk, m, m², h, pauschal).
            Prices should be realistic for the German market (net, excluding VAT).
            """
    chain = llm | JsonOutputParser()
    result = await chain.ainvoke(prompt)
    return SuggestItemsResponse(**result)


async def _fetch_image_as_base64(url: str) -> tuple[str, str]:
    """Downloads an image from MinIO (replacing localhost with the internal Docker hostname) and returns (base64, media_type)."""
    internal_url = url.replace("localhost:9000", "minio:9000")
    async with httpx.AsyncClient() as client:
        response = await client.get(internal_url)
        response.raise_for_status()
    media_type = response.headers.get("content-type", "image/jpeg").split(";")[0]
    return base64.standard_b64encode(response.content).decode("utf-8"), media_type


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
async def analyze_photo(request: AnalyzePhotoRequest) -> AnalyzePhotoResponse:
    """Downloads the image from MinIO internally, encodes it as base64, and sends it to Claude vision for job site analysis."""
    image_data, media_type = await _fetch_image_as_base64(request.imageUrl)
    message = HumanMessage(
        content=[
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": media_type,
                    "data": image_data,
                },
            },
            {
                "type": "text",
                "text": """You are an assistant for a German tradesperson (Handwerker).
                Analyze this job site photo and return ONLY valid JSON, no extra text:
                {
                "summary": "what is visible in the photo",
                "detectedIssues": ["issue 1", "issue 2"],
                "suggestedTasks": ["task 1", "task 2"],
                "estimatedComplexity": "low | medium | high"
                }""",
            },
        ]
    )

    chain = llm | JsonOutputParser()
    result = await chain.ainvoke([message])
    return AnalyzePhotoResponse(**result)
