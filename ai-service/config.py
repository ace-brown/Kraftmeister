import os 
from dotenv import load_dotenv


load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env.dev"))

class Settings:
    open_api_key = os.getenv("OPENAI_API_KEY")
    anthropic_key = os.getenv("ANTHROPIC_API_KEY")
    # Trailing slash stripped so paths can always be joined as f"{api_gateway_url}/jobs"
    api_gateway_url = os.getenv("API_GATEWAY_URL", "http://api-gateway:4000").rstrip("/")


settings = Settings()