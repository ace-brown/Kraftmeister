import os 
from dotenv import load_dotenv


load_dotenv()

class Settings:
    open_api_key = os.getenv("OPENAI_API_KEY")
    anthopic_key = os.getenv("ANTHROPIC_API_KEY")


settings = Settings()