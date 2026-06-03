from langchain.chat_models import init_chat_model
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, SystemMessage
import config  # ensures load_dotenv() runs before init_chat_model reads env vars
from tenacity import retry, stop_after_attempt, wait_exponential
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


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
async def analyze_photo(request: AnalyzePhotoRequest) -> AnalyzePhotoResponse:
    """Sends a job site photo to Claude vision and returns detected issues, suggested tasks, and complexity rating."""
    message = HumanMessage(
        content=[
            {
                "type": "image_url",
                "image_url": {"url": request.imageUrl},
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
