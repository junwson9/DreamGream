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

#요청 형식 정의
class PromptRequest(BaseModel):
    user_id: str
    prompt_id: str
    content: str
    age: str
    gender: str
    category: str

#프롬프트 비동기 요청 함수
async def chat_gpt3(prompt):
    response = await asyncio.to_thread(openai.Completion.create,
                                       engine='text-davinci-003', #gpt 엔진 종류
                                       prompt=prompt, #prompt 변수 전달
                                       max_tokens=50, #응답 길이 설정
                                       temperature=0.7, #낮을수록 일관성 상승 / 높을수록 다양성 상승
                                       n=1, #답변 받을 개수
                                       stop=None, #일정 토큰량 넘어가면 함수 호출 스탑
                                       timeout=10 #응답 최대 대기 시간
                                    )
    #응답에서 필요한 부분만 추출
    if 'choices' in response and len(response['choices']) > 0:
        choices = response['choices']
        return {'responses': [choice['text'].strip() for choice in choices]}
    return None

#프롬프트 생성 요청
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
    
    #LangChain PromptTemplate 사용
    prompt = PromptTemplate(
        input_variables=["age", "gender", "content", "category"],
        template=
                " {age} 대 {gender} 의 버킷리스트야. 내용은 {content}이고, 카테고리는 {category}."
                + "이걸 그림으로 그릴 수 있게 영어로 번역해서 특징을 자세하게 추출해서 작성해줘."
                + "문장의 시작은 'a photo of'로 시작해."
    )
    
    #Template에 값 대입
    prompt = prompt.format(age=age, gender=gender, content=content, category=category)

    #API 비동기 요청
    response = await chat_gpt3(prompt)

    return {"user_id": user_id, "prompt_id": prompt_id, "response": response}