import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxiosWithAuth = () => {
  const [cookies] = useCookies(['jwt']);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const statusCode = error.response?.status;
      if (statusCode === 401) {
        // 새로운 에러 객체 생성
        const modifiedError = {
          ...error,
          response: {
            ...error.response,
            statusText: 'Unauthorized', // statusText 변경
            status: 401, // status 변경
          },
        };
        // 수정된 에러를 사용하여 처리
        navigate('/');
        return Promise.reject(modifiedError);
      }
      // 다른 상태 코드일 경우 그대로 에러 반환
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosWithAuth;
