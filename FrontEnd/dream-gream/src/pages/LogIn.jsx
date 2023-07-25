import React, { useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';

function LogIn() {
  const restapiKey = '5259e8e054d186bbde75ddd66650a767';
  const redirectUri = 'http://localhost:3000/auth/kakao/callback';
  const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restapiKey}&redirect_uri=${redirectUri}&response_type=code`;
  const query = queryString.parse(window.location.search);

  const sendKakaoTokenToServer = async (token: string) => {
    const res = await axios.post('http://localhost:8000/auth/kakao', {
      access_token: token,
    });
    if (res.status === 201 || res.status === 200) {
      const { user } = res.data;
      window.localStorage.setItem(
        'token',
        JSON.stringify({
          access_token: res.data.jwt,
        }),
      );
    } else {
      window.alert('로그인에 실패하였습니다.');
    }
  };

  const getKakaoTokenHandler = async (code) => {
    try {
      const data = {
        grant_type: 'authorization_code',
        client_id: restapiKey,
        redirect_uri: redirectUri,
        code,
      };
      const queryStringData = Object.keys(data)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
        .join('&');

      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        queryStringData,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );
      sendKakaoTokenToServer(response.data.access_token);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (query.code) {
      getKakaoTokenHandler(query.code.toString());
    }
  }, [query.code]);

  return (
    <a href={kauthUrl}>
      <img
        src="/assets/kakao_login.png"
        id="kakao-login-btn"
        width="250"
        height="100"
        alt="kakao"
      />
    </a>
  );
}
export default LogIn;
