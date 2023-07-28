from fastapi import FastAPI
from api.prompt_handler import PromptHandler
from models.prompt_request import PromptRequest

app = FastAPI()
prompt_handler = PromptHandler()

@app.get("/")
async def main():
    return 'main page'

@app.post("/prompt")
async def process_prompt(request: PromptRequest):
    return await prompt_handler.process_prompt(request)
