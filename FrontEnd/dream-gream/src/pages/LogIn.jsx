import React from 'react';

function LogIn() {
  const restapiKey = '5259e8e054d186bbde75ddd66650a767';
  const redirectUri = 'http://localhost:3000/auth';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restapiKey}&redirect_uri=${redirectUri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  // eslint-disable-next-line react/button-has-type
  return <button onClick={handleLogin}>카카오 로그인</button>;
}
export default LogIn;
function query() {
  queryString.parse(window.location.search);
}
