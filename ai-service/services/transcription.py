import openai
from config import settings
from schemas.ai_schemas import TranscriptPayload


client = openai.AsyncOpenAI(api_key=settings.open_api_key)

async def transcribe(audio_bytes: bytes, filename: str) -> TranscriptPayload:
    transcript_payload = await client.audio.transcriptions.create(model="whisper-1", file=(filename, audio_bytes))
    text = transcript_payload.text
    language = transcript_payload.language

    return TranscriptPayload(transcript=text, language=language)
