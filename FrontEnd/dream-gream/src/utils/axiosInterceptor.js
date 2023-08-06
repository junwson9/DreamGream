// axiosInterceptor.js
import axios from 'axios';

const axiosInterceptor = (store) => (next) => (action) => {
  // 미들웨어의 기본 구조입니다.
  next(action);

  // 필요한 경우에만 토큰을 요청 헤더에 첨부합니다.
  if (action.meta && action.meta.shouldIntercept) {
    const { url, method, data, onSuccess, onError } = action.meta;

    // Redux store에서 토큰을 가져옵니다.
    const { token } = store.getState().auth;

    // 요청 헤더에 토큰을 추가합니다.
    axios({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (onSuccess) {
          // 성공적인 응답을 처리할 액션을 디스패치합니다.
          store.dispatch(onSuccess(response.data));
        }
      })
      .catch((error) => {
        if (onError) {
          // 오류 응답을 처리할 액션을 디스패치합니다.
          store.dispatch(onError(error));
        }
      });
  }
};

export default axiosInterceptor;
