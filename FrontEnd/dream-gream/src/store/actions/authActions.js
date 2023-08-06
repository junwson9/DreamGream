// actions/authActions.js
/* eslint-disable */

// 액세스 토큰과 리프레시 토큰을 받아서 객체를 반환하는 액션 생성자
export const setToken = (accessToken, refreshToken) => ({
    type: 'SET_TOKEN',
    payload: {
      accessToken,
      refreshToken,
    },
  });
  