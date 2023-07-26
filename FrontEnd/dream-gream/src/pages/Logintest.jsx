import React, { useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';

function LogIn() {
  const restapiKey = '5259e8e054d186bbde75ddd66650a767';
  const redirectUri = 'http://localhost:3000/auth/kakao/callback';
  const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restapiKey}&redirect_uri=${redirectUri}&response_type=code`;
  const query = queryString.parse(window.location.search);
  const getJwtTokenFromServer = async (code) => {
    try {
      const data = {
        code,
      };

      const response = await axios.post(
        'http://localhost:8000/auth/kakao',
        data,
      );

      if (response.status === 200) {
        const { jwt } = response.data;
        window.localStorage.setItem(
          'token',
          JSON.stringify({
            access_token: jwt,
          }),
        );
      } else {
        window.alert('로그인에 실패하였습니다.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (query.code) {
      getJwtTokenFromServer(query.code.toString());
    }
  }, [query.code]);

  return (
    <a href={kauthUrl}>
      <img
        src="/public_assets/kakao_login.png"
        id="kakao-login-btn"
        alt="kakao"
      />
    </a>
  );
}
export default LogIn;
