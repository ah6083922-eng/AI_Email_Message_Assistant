
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv(override=True)

key = os.getenv("GROQ_API_KEY", "").strip()

if not key:
    print("ERROR: API key not found in .env")

else:
    print("API key loaded successfully.")
    print("Testing Groq connection...")

    try:
        client = Groq(api_key=key)
        models = client.models.list()

        print("SUCCESS! Groq API is working.")
        print("Available models:", len(models.data))

    except Exception as error:
        print("API TEST FAILED:")
        print(type(error).__name__, error)
