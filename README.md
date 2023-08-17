

![DreamGreamLogo.png](./exec/image/DreamGreamLogo.png)

# About Dream Gream

---

- Draw Your Dream with AI
    
    AI로 그리는 버킷리스트 Dream Gream 🖌
    
- 개발 기간: 2023.07.10~2023.08.18

## Overview

---

- 막연하게 꿈만 꾸던 버킷리스트를 시각화 하여 그 꿈에 다가가는 것을 돕습니다.
- 자신의 버킷리스트를 보관하고 간직하기 어려웠던 문제를 피드에 모음으로써 해결합니다.
- 버킷리스트를 홀로 간직하는 것이 아니라 타인과의 네트워킹을 통해 동기부여 받을 수 있습니다.

## Description

---

- 드림그림은 사용자에게 ‘재미’ 와 ’소통’의 가치를 주고싶은 목표로 만들어진 서비스입니다.
- 사용자가 자신의 버킷리스트를 입력하면, 이 정보는 생성형AI를 통해 그림으로 만들어집니다.
- 사용자는 자신만의 버킷리스트 그림을 피드에 올리고, 저장할 수 있습니다.
- 버킷리스트를 달성하게 되면 달성완료 버튼을 누르고, 본인의 실제 달성사진을 업로드해 그림과 함께 간직할 수 있습니다.
- 다른사람의 버킷리스트를 공유하고, 응원해주고, 축하해주면서 소셜 네트워킹이 가능합니다.

## Main Features

---

### AI

1. Stable Diffusion 사용
    - autocast를 활용해 이미지 생성 시간 단축: 장당 8초 → 3초
2. GPT API 사용
    - GPT API를 활용하여 이미지 생성 프롬프트 최적화
3. 필터 적용
    - AI 이미지 보정 효과를 위해 openCV 활용

### FE

1. 무한 스크롤
    - React Query를 이용한 No-Offset 방식 무한 스크롤 구현
2. SSE 통신
    - 서버와 SSE통신으로 실시간으로 데이터 응답을 받음
3. Axios Interceptor
    - axios 요청보낼때 헤더에 토큰 자동첨부 및 토큰 만료시 reissue

### BE

1. Rabbit MQ
    - Rabbit MQ를 활용해 이미지 생성 요청/응답 큐를 나눠 이미지 생성 서버 부하 제어
2. Redis로 빠른 데이터 접근 및 효율성 증대
    - BEST 게시글 조회 속도 감축 : 48ms → 6ms
    - 좋아요 데이터 읽기/쓰기
3. Spring Security, OAuth2, JWT로 회원 인증/인가 기능 구현
4. 무한 스크롤
    - Query DSL을 이용한 No-Offset 방식 무한 스크롤 구현

### INFRA

### 프로젝트 아키텍처

![Untitled](./exec/image/Untitled.png)

## Screens

---

### 회원가입/로그인

- 카카오 소셜로그인
- 최초 회원 가입 시 성별/나이 입력

![로그인.gif](./exec/image/%25EB%25A1%259C%25EA%25B7%25B8%25EC%259D%25B8.gif)

### 포스팅 등록

- 카테고리 선택 및 버킷리스트 입력
- 꿈을 향한 다짐, 목표시기, 공개여부 선택
- 로딩, 이미지 도착, 피드 올리기

![포스팅등록.gif](./exec/image/%25ED%258F%25AC%25EC%258A%25A4%25ED%258C%2585%25EB%2593%25B1%25EB%25A1%259D.gif)

![로딩, 이미지 도착, 피드 올리기.gif](./exec/image/%25EB%25A1%259C%25EB%2594%25A9_%25EC%259D%25B4%25EB%25AF%25B8%25EC%25A7%2580_%25EB%258F%2584%25EC%25B0%25A9_%25ED%2594%25BC%25EB%2593%259C_%25EC%2598%25AC%25EB%25A6%25AC%25EA%25B8%25B0.gif)

### 달성완료 등록

- 달성완료 등록
    - 본인 사진 등록, 달성완료 소감 등록
    - 이걸해냄 도장 지급
    
    ![달성완료등록.gif](./exec/image/%25EB%258B%25AC%25EC%2584%25B1%25EC%2599%2584%25EB%25A3%258C%25EB%2593%25B1%25EB%25A1%259D.gif)
    

![이걸해냄이미지.gif](./exec/image/%25EC%259D%25B4%25EA%25B1%25B8%25ED%2595%25B4%25EB%2583%2584%25EC%259D%25B4%25EB%25AF%25B8%25EC%25A7%2580.gif)

### 공유하기

- 카카오 공유 API 사용

![카카오로 공유 누르기.gif](./exec/image/%25EC%25B9%25B4%25EC%25B9%25B4%25EC%2598%25A4%25EB%25A1%259C_%25EA%25B3%25B5%25EC%259C%25A0_%25EB%2588%2584%25EB%25A5%25B4%25EA%25B8%25B0.gif)

![카카오에서 공유.gif](./exec/image/%25EC%25B9%25B4%25EC%25B9%25B4%25EC%2598%25A4%25EC%2597%2590%25EC%2584%259C_%25EA%25B3%25B5%25EC%259C%25A0.gif)

- 이미지 저장

![이미지 저장.gif](./exec/image/%25EC%259D%25B4%25EB%25AF%25B8%25EC%25A7%2580_%25EC%25A0%2580%25EC%259E%25A5.gif)

### 전체 피드

- 응원해요 피드(카테고리별 분류)
    
    ![전체피드-응원해요 피드.gif](./exec/image/%25EC%25A0%2584%25EC%25B2%25B4%25ED%2594%25BC%25EB%2593%259C-%25EC%259D%2591%25EC%259B%2590%25ED%2595%25B4%25EC%259A%2594_%25ED%2594%25BC%25EB%2593%259C.gif)
    
- 응원해요 (좋아요 기능)

![응원해요.gif](./exec/image/%25EC%259D%2591%25EC%259B%2590%25ED%2595%25B4%25EC%259A%2594.gif)

- 나도할래 (스크랩 기능)
    
    ![스크랩 기능 - 나도할래.gif](./exec/image/%25EC%258A%25A4%25ED%2581%25AC%25EB%259E%25A9_%25EA%25B8%25B0%25EB%258A%25A5_-_%25EB%2582%2598%25EB%258F%2584%25ED%2595%25A0%25EB%259E%2598.gif)
    

## Service ENV

---

- node 18.15.0v
- Java 11
- Spring Boot 2.7.13
- Python 3.10
- FastAPI 0.100.0
- MySQL 8.1
- Redis 7.0.12
- Ubuntu 20.04 LTS
- Chatgpt3.5-api
- Stable diffusion v2-api

## Tools

---

- Gitlab
    - git-flow 전략으로 branch 관리
    - 코드 버전 관리
    - 자동배포 (BE-develop to master)
- JIRA
    - 매주 총 40시간의 Sprint를 진행하며 스케줄 관리
- Notion
    - 회의록 보관
    - 스프린트 회고 진행
    - 컨벤션 정리
    - 기술 이슈 정리
    - 산출물 및 공통 문서 관리
- Figma
    - 와이어프레임 및 디자인

## Stacks

---

```markdown
### FE
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=react query&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

### BE
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
<img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white">
<img src="https://img.shields.io/badge/openai-412991?style=for-the-badge&logo=openai&logoColor=white">

### INFRA
<img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
<img src="https://img.shields.io/badge/rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white">
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white">
<img src="https://img.shields.io/badge/ngrok-1F1E37?style=for-the-badge&logo=ngrok&logoColor=white">

```

## Project Outputs

---

- [기능명세서](https://docs.google.com/spreadsheets/d/1hSQxz9xcMZUKyNf-t6OM-5w9GZataRg_IBM1K6K1zDo/edit#gid=202236398)
- [WBS](https://docs.google.com/spreadsheets/d/1LschveFKhA1YkkMzVmkjLK0wTwZ_OKCX4mUPU53BNs0/edit#gid=0)
- [Notion](https://www.notion.so/_A609-b5cb58766173436485f3d0469f59880b?pvs=21)
- [WireFrame & Design](https://www.figma.com/file/5dLrdcNUMg1AgGSjWIHWkp/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84-%EB%B0%8F-%EB%94%94%EC%9E%90%EC%9D%B8?type=design&node-id=0-1&mode=design)

## Members

---

- [박승휘](https://github.com/hwi29)(FE)
- [최홍준](https://github.com/HBumzz)(FE)
- [송준우](https://github.com/junwson9)(FE)
- [김정락](https://github.com/jlal1226)(BE)
- [김준현](https://github.com/jhhhhhj)(BE)
- [김지수](https://github.com/jis002)(BE)

