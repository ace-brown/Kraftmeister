from pydantic import BaseModel


class TranscriptPayload(BaseModel):
    """
    Internal model — the raw text transcript produced by Whisper.
    Passed to Claude to extract structured job note fields.
    language is the detected language code (e.g. "de", "en"), if available.
    """

    transcript: str
    language: str | None = None


class VoiceToJobResponse(BaseModel):
    """
    Returned by Claude after processing a voice transcript.
    Contains the structured job note: what the job is (title, description),
    what needs to be done (tasks), what materials are needed (materials),
    how urgent it is (priority), and an optional suggested date.
    """

    title: str
    description: str
    tasks: list[str]
    materials: list[str]
    priority: str
    suggestedDate: str | None = None


class SuggestItemsRequest(BaseModel):
    """
    Sent to Claude to generate invoice line item suggestions.
    jobDescription is the main input — what the job involves.
    jobType (e.g. "Elektrik", "Sanitär") helps Claude pick more relevant items.
    """

    jobDescription: str
    jobType: str | None = None


class SuggestItemsItem(BaseModel):
    """
    A single line item suggested by Claude.
    description is what the work/material is, quantity and unitPrice are used
    to compute the total, and unit is the measurement (e.g. "Stk", "m", "h").
    """

    description: str
    quantity: float
    unitPrice: float
    unit: str


class SuggestItemsResponse(BaseModel):
    """
    Returned by Claude after receiving a job description.
    Contains a list of suggested line items ready to populate the quote builder.
    """

    items: list[SuggestItemsItem]


class AnalyzePhotoRequest(BaseModel):
    """
    Sent to Claude vision to analyze a job site photo.
    imageUrl is either a MinIO URL or a base64-encoded image string.
    """

    imageUrl: str


class AnalyzePhotoResponse(BaseModel):
    """
    Returned by Claude after analyzing a job site photo.
    summary describes what is visible, detectedIssues lists problems found,
    suggestedTasks lists recommended work, and estimatedComplexity rates the job
    (e.g. "low", "medium", "high").
    """

    summary: str
    detectedIssues: list[str]
    suggestedTasks: list[str]
    estimatedComplexity: str


class AgentRequest(BaseModel):
    """
    Sent by the frontend to the ReAct agent endpoint.
    message is the natural-language question from the user (e.g. "How many open jobs do I have?").
    token is the user's JWT, forwarded by NestJS so the agent tools can authenticate back to the API.
    """

    message: str
    token: str = ""


class AgentResponse(BaseModel):
    """
    Returned by the ReAct agent after reasoning over the available tools.
    answer is the natural-language reply ready to display in the chat UI.
    """

    answer: str
