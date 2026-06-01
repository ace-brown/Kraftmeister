import os 
from dotenv import load_dotenv


load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env.dev"))

class Settings:
    open_api_key = os.getenv("OPENAI_API_KEY")
    anthopic_key = os.getenv("ANTHROPIC_API_KEY")


settings = Settings()