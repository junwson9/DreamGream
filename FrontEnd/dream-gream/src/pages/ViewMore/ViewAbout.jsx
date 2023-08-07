import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/Common/Topbar2';
import { ReactComponent as LogoSecond } from '../../assets/LogoSecond.svg';

function ViewAbout() {
  // accesstoken을 확인 -> 없어? 그러면 없는 기준으로 화면 띄워
  // 있어 -> 있으면 회원정보 조회하고 profileimg 닉네임 같은거 추가
  const navigate = useNavigate();

  return (
    <div className="w-[360px] h-[800px] relative bg-white block">
      <div className="top-[10px] left-[5px] absolute">
        <LogoSecond />
      </div>
      <TopBar
        showProfileButton={false}
        showConfirmButton={false}
        showLeftButton={false}
        showCloseButton={false}
      />
      <div className="w-[320px] top-[100px] left-[30px] h-10 justify-start items-center gap-[79px] flex absolute">
        <div className="text-neutral-400 text-[15px] font-normal">
          로그인이 필요합니다.
        </div>
        <div
          role="button" // Add role="button" to indicate it's an interactive element
          tabIndex="0" // Add a tabIndex to make the element focusable
          className="w-20 h-10 px-[22px] py-1.5 bg-[#7887D4] rounded-lg shadow justify-center items-center gap-2.5 flex"
          onClick={() => navigate('/login')}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              navigate('/login');
            }
          }}
        >
          <div className="text-white text-[13px] font-bold">로그인</div>
        </div>
      </div>
      {/* <div className="w-[320px] top-[100px] left-[30px] h-10 justify-start items-center gap-[79px] flex absolute">
        <div className="text-zinc-800 text-[19px] font-bold leading-relaxed">
          리듬타는 셰익스피어
        </div>
        <div className="w-6 h-6 relative origin-top-left -rotate-180" />
      </div> */}
      <div className="left-[28px] top-[223px] absolute text-zinc-800 text-[19px] font-bold leading-relaxed">
        ABOUT
      </div>
      <div className="left-[28px] top-[285px] absolute text-zinc-800 text-[19px] font-bold leading-relaxed">
        서비스 이용약관
      </div>
      <div className="left-[28px] top-[347px] absolute text-zinc-800 text-[19px] font-bold leading-relaxed">
        개인정보 처리방침
      </div>
      <div className="left-[28px] top-[409px] absolute text-zinc-800 text-[19px] font-bold leading-relaxed">
        오픈소스 라이브러리
      </div>
      <div className="left-[28px] top-[533px] absolute text-zinc-800 text-[19px] font-bold leading-relaxed">
        로그아웃
      </div>
      <div className="left-[28px] top-[471px] absolute text-zinc-800 text-[19px] font-bold leading-relaxed">
        친구 찾기
      </div>
    </div>
  );
}

export default ViewAbout;
