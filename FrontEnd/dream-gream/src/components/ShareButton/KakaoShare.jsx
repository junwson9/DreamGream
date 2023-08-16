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
    <button type="button" className="w-12 h-12" onClick={() => shareKakao('배포될 url/share', 'dream-gream')}>
  <img className="w-12 h-12" src='/KakaoLogo.png' alt="Kakao Logo" />
</button>
  )
}
export default KakaoShare;