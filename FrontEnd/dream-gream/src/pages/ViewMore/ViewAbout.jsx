/* eslint-disable */

import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/Common/Topbar2';
import { ReactComponent as LogoSecond } from '../../assets/LogoSecond.svg';
import axios from 'axios';
import { API_URL } from '../../config';
import axiosInstance from '../../utils/axiosInterceptor';
import MemberItem from '../../components/Member/MemberItemAbout';

function ViewAbout() {
  // accesstoken을 확인 -> 없어? 그러면 없는 기준으로 화면 띄워
  // 있어 -> 있으면 회원정보 조회하고 profileimg 닉네임 같은거 추가
  // const access_token = localStorage.getItem('ACCESS_TOKEN');
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loginFlag, setLoginFlag] = useState('');

  useEffect(() => {
    const access_token = localStorage.getItem('ACCESS_TOKEN');
    setIsLoggedin(!!access_token);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
      if (ACCESS_TOKEN) {
        setLoginFlag(true);
      } else {
        setLoginFlag(false);
      }
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/members/info`,
          {
            params: {
              // query string으로 전달할 파라미터 추가
              'login-flag': loginFlag,
            },
          },
        );

        const memberData = response.data.data.member;
        setUser(memberData);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post(`${API_URL}/api/auth/logout`);
      // 로그아웃하고 로그인 페이지로 이동시키기 or 메인피드로 이동시키기
      console.log('로그아웃 성공');
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('member_id');
      navigate('/login');
    } catch (error) {
      console.log('로그아웃 실패');
      console.error('Error logging out:', error);
    }
  };

  const handleFindMember = () => {
    const access_token = localStorage.getItem('ACCESS_TOKEN');
    if (access_token) {
      navigate('/findmember');
    } else {
      navigate('/loginerror');
    }
  };

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
      {/* 로그인이 안되어 있을 때 UI */}
      {!isLoggedin && (
        <div className="w-[320px] top-[100px] left-[30px] h-10 justify-start items-center gap-[79px] flex absolute">
          <div className="text-neutral-400 text-[15px] font-normal">
            로그인이 필요합니다.
          </div>
          <div
            role="button"
            tabIndex="0"
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
      )}
      {/* ... (이전 코드) */}
      {/* 로그인 상태에 따라 MemberItem 렌더링 */}
      {isLoggedin && (
        <MemberItem toMemberId={user.member_id} nickname={user.nickname} />
      )}
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
      {isLoggedin && (
        <>
          <div className="left-[28px] top-[533px] absolute text-zinc-800 text-[19px] font-bold leading-relaxed">
            <button
              type="button"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              로그아웃
            </button>
          </div>
          <div className="left-[28px] top-[471px] absolute text-zinc-800 text-[19px] font-bold leading-relaxed">
            <button
              type="button"
              onClick={handleFindMember}
              style={{ cursor: 'pointer' }}
            >
              친구 찾기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewAbout;
