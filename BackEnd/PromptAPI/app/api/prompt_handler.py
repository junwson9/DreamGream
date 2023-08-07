import os
from dotenv import load_dotenv
import asyncio
import openai
from models.prompt_request import PromptRequest
from langchain import PromptTemplate

load_dotenv()
openai.api_key = os.getenv("API_KEY")

class PromptHandler:
    def __init__(self):
        pass

    async def chat_gpt3(self, prompt):
        response = await asyncio.to_thread(openai.Completion.create,
                                       engine='text-davinci-003', # gpt 엔진 종류
                                       prompt=prompt, # prompt 변수 전달
                                       max_tokens=50, # 응답 길이 설정
                                       temperature=0.7, # 낮을수록 일관성 상승 / 높을수록 다양성 상승
                                       n=1, # 답변 받을 개수
                                       stop=None, # 일정 토큰량 넘어가면 함수 호출 스탑
                                       timeout=10 # 응답 최대 대기 시간
                                    )
        # 응답에서 필요한 부분만 추출
        if 'choices' in response and len(response['choices']) > 0:
            choices = response['choices']
            #print(type(choices))
            #print(choices)
            #print(choices[0]['text'].strip())
            return {'image_prompt': choices[0]['text'].strip()}
        return None

    async def process_prompt(self, request: PromptRequest):
        title = request.title
        birthyear = request.birthyear
        gender = request.gender
        category_name = request.category_name
    
        # 전처리 부분
        if gender == "F":
            gender = "여성"
        else:
            gender = "남성"
    
        # LangChain PromptTemplate 사용
        prompt = PromptTemplate(
            input_variables=["birthyear", "gender", "title", "category_name"],
            template=(
                " {birthyear}년에 태어난 {gender}의 버킷리스트야. "
                "내용은 {title}이고, 카테고리는 {category_name}. "
                "이걸 그림으로 그릴 수 있게 영어로 번역해서 특징을 자세하게 추출해서 작성해줘. "
                "문장의 시작은 'a photo of'로 시작해."
                "만약 title에 취업하기 라는 단어가 들어가면 회사와 관련된 그림을 그릴 수 있게 문장을 작성해줘"
            )
        )
    
        # Template에 값 대입
        prompt = prompt.format(birthyear=birthyear, gender=gender, title=title, category_name=category_name)

        # API 비동기 요청
        response = await self.chat_gpt3(prompt)
        response['image_prompt'] = response['image_prompt'].lstrip('.\n')

        return response
