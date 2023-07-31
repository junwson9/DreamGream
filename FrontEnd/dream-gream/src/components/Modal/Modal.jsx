/* eslint-disable */

import React, { useEffect } from 'react';
import shareKakao from '../../utils/shareKakaoLink';

function Modal() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js'; // 카카오톡 SDK
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script); // return으로 제거해주기
    };
  }, []);

  return (
    <div>
      <button type="submit" onClick={() => shareKakao(route, title)}>
        <img
          className="w-12 h-12"
          src={`${process.env.PUBLIC_URL}/assets/KakaoLogo.png`}
          alt="Kakao Logo"
        />
      </button>
    </div>
  );
}

export default Modal;
