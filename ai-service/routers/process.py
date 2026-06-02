from fastapi import APIRouter, UploadFile, File
from services.transcription import transcribe
from services.claude import extract_job_notes, suggest_items, analyze_photo
from schemas.ai_schemas import (
    VoiceToJobResponse,
    SuggestItemsRequest,
    SuggestItemsResponse,
    AnalyzePhotoResponse,
    AnalyzePhotoRequest,
)

router = APIRouter()


@router.post("/voice", response_model=VoiceToJobResponse)
async def voice_to_job(audio: UploadFile = File(...)) -> VoiceToJobResponse:
    """
    Accepts an audio file (MP3/WEBM), transcribes it with Whisper,
    then passes the transcript to Claude to extract structured job note fields.
    Returns title, description, tasks, materials, priority, and an optional suggested date.
    """
    audio_bytes = await audio.read()
    transcript_payload = await transcribe(audio_bytes, audio.filename or "audio.webm")
    return await extract_job_notes(transcript_payload)


@router.post("/suggest-items", response_model=SuggestItemsResponse)
async def suggest_invoice_items(payload: SuggestItemsRequest) -> SuggestItemsResponse:
    """
    Accepts a job description and optional job type, passes them to Claude,
    and returns a list of suggested invoice line items with German units and realistic prices.
    """
    return await suggest_items(payload)


@router.post("/analyze-photo", response_model=AnalyzePhotoResponse)
async def analyze_job_photo(payload: AnalyzePhotoRequest) -> AnalyzePhotoResponse:
    """
    Accepts an image URL (MinIO) or base64 string, passes it to Claude vision,
    and returns a summary of visible conditions, detected issues, suggested tasks,
    and an estimated complexity rating for the job.
    """
    return await analyze_photo(payload)
