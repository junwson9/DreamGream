# 베이스 이미지 선택: 여기서는 Python 3.8 이미지를 사용합니다.
FROM python:3.10

# 작업 디렉토리 설정
WORKDIR /app

# 호스트의 현재 디렉토리의 모든 파일을 컨테이너의 /app/ 디렉토리로 복사
COPY . /app/

# 환경 변수를 설정하기 위해 .env 파일 복사 (옵션)
# 만약 .env 파일이 필요하지 않다면 아래 라인을 주석 처리하거나 제거합니다.
# COPY .env /app/
# 필요한 패키지들을 설치합니다.
RUN pip install -r requirements.txt

# FastAPI 앱 실행 명령
CMD ["uvicorn", "gpt_api:app", "--host", "0.0.0.0", "--port", "5001"]
