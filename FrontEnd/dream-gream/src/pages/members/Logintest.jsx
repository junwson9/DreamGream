/* eslint-disable */
import React from 'react';

function LogIn() {
  const kauthUrl = 'http://localhost:8000/oauth2/authorize/kakao';

  return (
    <>
      <a href={kauthUrl}>
        <img
          src="/public/kakao_login.png"
          id="kakao-login-btn"
          alt="kakao"
          // onClick={handleLogin}
        />
      </a>
    </>
  );
}
// 로그인 인지 회원가입인지 확인하고 main page path로 쏠지, signup_nickname으로 쏠지 만들어야댐
export default LogIn;
