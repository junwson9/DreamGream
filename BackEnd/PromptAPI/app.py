import openai
import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import asyncio

#load_dotenv()

# OpenAI API 액세스 키 설정
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
    
    #전처리 부분
    if gender == "F":
        gender = "여성"
    else:
        gender = "남성"
    
    start1 = "이제부터 너는 버킷리스트를 그림으로 바꾸기 위한 최적의 프롬프트를 작성할거야. 너가 작성한 프롬프트는 stable-diffusion 모델에 text부분으로 들어갈거야."
    start2 = "해당 버킷리스트를 들어보고 특징을 추출해서 그림으로 그려질 수 있게 상세히 작성해서 주면 돼."
    final = "이걸 그림으로 그릴 수 있게 영어로 번역해서 특징을 자세하게 추출해서 작성해줘. 다시 결과를 반환할 때 한글로 번역해서 알려줘."
    #prompt 예시
    if category is "null":
        content = age + "대" + gender + "의 버킷리스트야. 내용은 '" + content + "'이야."
    else:
        content = age + "대" + gender + "의 버킷리스트야. 내용은 '" + content + "'이고 이 글의 카테고리는 " + category + "이야."
    
    content = start1 + start2 + content + final
    
    #print(content)
    
    response = await chat_gpt3(content)
    
    print(response)
    #request to generate_image_url
    
    return {"user_id": user_id, "prompt_id": prompt_id, "response": response}