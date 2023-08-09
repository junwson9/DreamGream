/* eslint-disable */
import React, {useEffect} from 'react';
import { shareKakao } from '../../utils/shareKakaoLink';

function KakaoShare(){
useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);
  return (
    <button type="button" className="w-12 h-12" onClick={() => shareKakao('여기에 내가 공유할 페이지 url', 'dream-gream')}>
  <img className="w-12 h-12" src='/KakaoLogo.png' alt="Kakao Logo" />
</button>
  )
}
export default KakaoShare;