/* eslint-disable */
import React, {useState,useEffect} from 'react';
import { shareKakao } from '../../utils/shareKakaoLink';
import axiosInstance from '../../utils/axiosInterceptor';
import { API_URL } from '../../config';

function KakaoShare(){
  const memberId = localStorage.getItem('member_id')
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/api/members/${memberId}`);
        const fetchedUserData = response.data.data.member.nickname;
        setUserData(fetchedUserData); 
      } 
      catch (e) {
        console.error(e);
      }
    };
    getUser()
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, [memberId]);
  return (
    <button type="button" className="w-12 h-12" onClick={() => shareKakao('배포될 url/share', 'dream-gream',userData)}>
  <img className="w-12 h-12" src='/KakaoLogo.png' alt="Kakao Logo" />
</button>
  )
}
export default KakaoShare;