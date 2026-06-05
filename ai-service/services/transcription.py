import openai
from config import settings
from schemas.ai_schemas import TranscriptPayload


async def transcribe(audio_bytes: bytes, filename: str) -> TranscriptPayload:
    """
    Sends raw audio bytes to OpenAI Whisper for transcription.
    Client is created per-call so a missing API key only fails at call time, not startup.
    """
    client = openai.AsyncOpenAI(api_key=settings.open_api_key)
    transcript_payload = await client.audio.transcriptions.create(
        model="whisper-1", file=(filename, audio_bytes)
    )
    return TranscriptPayload(transcript=transcript_payload.text, language=getattr(transcript_payload, "language", None))
