import os
from dotenv import load_dotenv
import asyncio
import openai
from models.prompt_request import PromptRequest
from langchain import PromptTemplate
import re

load_dotenv()
openai.api_key = os.getenv("API_KEY")

class PromptHandler:
    def __init__(self):
        pass

    async def chat_gpt3(self, prompt):
        response = await asyncio.to_thread(openai.Completion.create,
                                       engine='text-davinci-003', # gpt 엔진 종류
                                       prompt=prompt, # prompt 변수 전달
                                       max_tokens=70, # 응답 길이 설정
                                       temperature=0.5, # 낮을수록 일관성 상승 / 높을수록 다양성 상승
                                       n=1, # 답변 받을 개수
                                       stop=None, # 일정 토큰량 넘어가면 함수 호출 스탑
                                       timeout=10 # 응답 최대 대기 시간
                                    )
        # 응답에서 필요한 부분만 추출
        if 'choices' in response and len(response['choices']) > 0:
            choices = response['choices']
            return {'image_prompt': choices[0]['text'].strip()}
        return None

    async def process_prompt(self, request: PromptRequest):
        title = request.title
        birthyear = request.birthyear
        gender = request.gender
        category_name = request.category_name
    
        # 전처리 부분
        if gender == "FEMALE":
            gender = "여성"
        elif gender == "MALE":
            gender = "남성"
        else:
            pass

        if category_name == "etc":
            category_name = "없어"
        elif category_name == "Culture":
            category_name = "Entertainment or Cultural life"

        category = ["남성 1명과 여성 1명이 사이 좋게 있는 모습 또는 내가 알려준 버킷리스트 주인의 성별과는 다른 성별의 그림을 만들 수 있도록 명령어를 알려줘.",
                    "만약 title에 취업하기,취뽀,취직하기 라는 단어가 들어가면 회사와 관련된 그림을 그릴 수 있게 문장을 작성해",
                    "please write a new sentence that related title and includes the word 'dollar.' ",
                    "부자에 관련된 문장을 작성하면 돼.",
                    ""]
    
        # LangChain PromptTemplate 사용
        prompt = PromptTemplate(
            input_variables=["birthyear", "gender", "title", "category_name"],
            template=(
                " {birthyear}년에 태어난 {gender}의 버킷리스트야. "
                "내용은 {title}이고, 카테고리는 {category_name}. "
                "이걸 그림으로 그릴 수 있게 특징을 자세하게 추출해서 작성해줘. "
                "문장의 시작은 'a photo of'로 시작해. "
            )
        )
    
        # Template에 값 대입
        prompt = prompt.format(birthyear=birthyear, gender=gender, title=title, category_name=category_name)
        lotto = ["로또","복권","당첨"]
        rich = "부자"

        if category_name == "Love":
            prompt = prompt + category[0]
        elif category_name == "Work":
            prompt = prompt + category[1]
        elif category_name == "없어":
            for i in range(len(lotto)):
                if lotto[i] in title:
                    prompt = prompt + category[2]
                    break
                else:
                    pass
            
            if rich in title:
                prompt = prompt + category[3]

        # API 비동기 요청
        response = await self.chat_gpt3(prompt)
        response['image_prompt'] = re.sub('[^a-zA-Z0-9\s\W]', '', response['image_prompt'])
        response['image_prompt'] = response['image_prompt'].lstrip('.\n')
        # response['image_prompt'] = response['image_prompt'] + " Make it a cute and bright image."
        return response