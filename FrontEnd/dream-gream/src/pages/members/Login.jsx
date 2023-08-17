/* eslint-disable */
import React from 'react';
import { ReactComponent as LogoBig1 } from '../../assets/LogoBig1.svg';
import { ReactComponent as KakaoLogin } from '../../assets/KakaoLogin.svg';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const kauthUrl = `${API_URL}/api/oauth2/authorize/kakao`;
  const navigate = useNavigate();
  return (
    <>
      <div
        className="w-[360px] pt-[165px] pb-[295px] bg-blue-300 bg-opacity-40 flex flex-col justify-start items-center"
        style={{ minHeight: '100vh' }} // min-height 설정
      >
        <div className="mb-20">
          <LogoBig1 />
        </div>
        <a href={kauthUrl}>
          <KakaoLogin />
        </a>
        <div
          className="absolute top-[700px] text-zinc-500 text-sm underline"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          비회원으로 둘러 볼래요!
        </div>
      </div>
    </>
  );
}

export default LogIn;
