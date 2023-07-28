from pydantic import BaseModel

class PromptRequest(BaseModel):
    title: str
    birthyear: str
    gender: str
    category_name: str
