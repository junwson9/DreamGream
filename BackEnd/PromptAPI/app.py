import openai
import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import asyncio
from langchain import PromptTemplate
import json


# OpenAI API 액세스 키 설정
load_dotenv()
openai.api_key = os.getenv("API_KEY")
app = FastAPI()

# 요청 모델 정의
class PromptRequest(BaseModel):
    user_id: str
    prompt_id: str
    content: str
    age: str
    gender: str
    category: str

class PromptTemplateJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, PromptTemplate):
            return obj.__dict__
        return super().default(obj)

async def chat_gpt3(prompt):
    response = await asyncio.to_thread(openai.Completion.create,
                                       engine='text-davinci-003',
                                       prompt=prompt,
                                       max_tokens=50,
                                       temperature=0.7,
                                       n=3,
                                       stop=None,
                                       timeout=10)
    if 'choices' in response and len(response['choices']) > 0:
        choices = response['choices']
        return {'responses': [choice['text'].strip() for choice in choices]}
    return None

#서버 잘 도는지 테스트
@app.get("/")
async def main():
    return "Hi"

#프롬프트 테스트
@app.post("/prompt")
async def process_prompt(request: PromptRequest):
    user_id = request.user_id
    prompt_id = request.prompt_id
    content = request.content
    age = request.age
    gender = request.gender
    category = request.category
    
    print(age)

    #전처리 부분
    if gender == "F":
        gender = "여성"
    else:
        gender = "남성"
    
    prompt = PromptTemplate(
        input_variables=["age", "gender", "content", "category"],
        template=
                " {age} 대 {gender} 의 버킷리스트야. 내용은 {content}이고, 카테고리는 {category}."
                + "이걸 그림으로 그릴 수 있게 영어로 번역해서 특징을 자세하게 추출해서 작성해줘."
                + "문장의 시작은 'a photo of'로 시작해."
    )
    
    #print(content)

    prompt = prompt.format(age=age, gender=gender, content=content, category=category)
    print(prompt)
    #prompt_json = json.dumps(prompt, cls=PromptTemplateJSONEncoder)
    #print(prompt_json)

    #response = await chat_gpt3(prompt_json)
    response = await chat_gpt3(prompt)
    print(response)
    #request to generate_image_url
    
    return {"user_id": user_id, "prompt_id": prompt_id, "response": response}