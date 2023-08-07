/* eslint-disable */
import React from 'react';
import { ReactComponent as LogoBig1 } from '../../assets/LogoBig1.svg';
import { ReactComponent as KakaoLogin } from '../../assets/KakaoLogin.svg';

function LogIn() {
  const kauthUrl = 'http://i9a609.p.ssafy.io:8000/oauth2/authorize/kakao';

  return (
    <>
      <div className="w-[360px] h-[800px] pt-[165px] pb-[295px] bg-blue-300 bg-opacity-40 flex-col justify-start items-center inline-flex">
        <div className="mb-20">
          <LogoBig1 />
        </div>
        <a href={kauthUrl}>
          <KakaoLogin />
        </a>
      </div>
    </>
  );
}

export default LogIn;
