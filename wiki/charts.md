# Phase 8 — AI Service Architecture

## End-to-End Flow

```
Browser
  └── Next.js (:3000)
        └── POST /ai/voice-to-job     ─┐
            POST /ai/suggest-items     ├─► NestJS api-gateway (:4000)
            POST /ai/analyze-photo    ─┘        │
                                                │ proxies via HTTP
                                                ▼
                                        FastAPI ai-service (:8000)
                                                │
                                     ┌──────────┼──────────┐
                                     ▼          ▼          ▼
                                  Whisper    Claude      Claude
                                 (OpenAI)   (text)     (vision)
```

**Why does NestJS sit in the middle?** FastAPI is never exposed to the internet. NestJS handles auth, validation, and logging — then forwards to FastAPI.

---

## Inside the FastAPI Service

| `ai_schemas.py` | Pydantic models — typed shapes for every req/res |
| `transcription.py` | Calls OpenAI Whisper, returns a text transcript |
| `claude.py` | Calls Claude for each of the 3 features |
| `routers/process.py` | HTTP endpoints that wire the services together |

## Inside NestJS

An `AiModule` that receives requests from the browser and proxies them straight to FastAPI — no business logic, just pass-through.
