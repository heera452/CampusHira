import os

from dotenv import load_dotenv
from google import genai

load_dotenv("../.env")

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


def ask_gemini(question: str):
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=question
    )

    return response.text