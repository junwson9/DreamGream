/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../../components/Common/Topbar';
import TwoTapButton from '../../components/Button/TwoTapButtonMyfeed';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DownArrow } from '../../assets/DownArrow.svg';
import CategoryButtons from './../../components/Button/CategoryButtons2';
import axiosInstance from '../../utils/axiosInterceptor';
import { API_URL } from '../../config';
import MyFeedCard from '../../components/Feed/MyFeedCard';
import { useParams } from 'react-router-dom';
import OtherFeedCard from '../../components/Feed/OtherFeedCard';
import myDefaultImg from '../../assets/default_profile.svg';
import runningIcon from '../../assets/icons/Running.gif';
function OtherFeed() {
  const { toMemberId } = useParams(); // 피드 주인의 memberId
  const [postList, setPostList] = useState([]);
  const defaultProfileImg = myDefaultImg;
  const [achieveList, setAchievedList] = useState([]);
  const [user, setUser] = useState('');
  // const [followed, setFollowed] = useState(isFollowed);
  // const buttonLabel = followed ? '팔로잉' : '팔로우';
  const [loginFlag, setLoginFlag] = useState('');
  const [memberId, setMemberId] = useState(''); // 사용자의 memberId
  const [activeTab, setActiveTab] = useState('inProgress');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [category, setCategory] = useState('');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const Navigate = useNavigate();

  const handleFollowersClick = () => {
    Navigate(`/follow/${user.member_id}`);
  };

  const handleFollowingsClick = () => {
    Navigate(`/follow/${user.member_id}`);
  };

  const getFeedData = () => {
    if (activeTab === 'inProgress') {
      return postList;
    } else {
      return achieveList;
    }
  };

  // 카테고리에 따라 렌더링할 데이터를 선택하는 함수
  const getFilteredData = (data) => {
    if (!category) {
      return data; // 카테고리가 선택되지 않았으면 모든 데이터를 반환
    } else {
      const categoryId = categorysValue[category];
      return data.filter((post) => post.category_id === categoryId); // 선택한 카테고리와 일치하는 데이터만 반환
    }
  };

  const categorysValue = {
    Travel: 1,
    Health: 2,
    Learning: 3,
    Culture: 4,
    Love: 5,
    Food: 6,
    Shopping: 7,
    Work: 8,
    etc: 9,
  };

  const categorys = {
    Travel: '여행',
    Health: '건강/운동',
    Learning: '배움',
    Culture: '문화/엔터',
    Love: '사랑',
    Food: '음식',
    Shopping: '쇼핑',
    Work: '일',
    etc: '기타',
  };

  const renderFollowButton = () => {
    if (user.is_followed) {
      return (
        <div
          className="w-[76px] h-[27px] top-[142px] left-[16px] relative bg-neutral-200 rounded-lg absolute"
          onClick={handleUnFollowClick}
        >
          <div className="left-[22px] top-[5px] absolute text-center text-neutral-700 text-xs font-bold leading-snug">
            팔로우 취소
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="w-[76px] h-[27px] top-[142px] left-[16px] relative bg-primary-600 rounded-lg absolute"
          onClick={handleFollowClick}
        >
          <div className="left-[22px] top-[5px] absolute text-center text-white text-xs font-bold leading-snug">
            팔로우
          </div>
        </div>
      );
    }
  };

  // 팔로우 클릭 처리
  const handleFollowClick = async () => {
    try {
      // 팔로우 등록 요청
      await axiosInstance.post(`${API_URL}/api/members/follow/${toMemberId}`);
      // 팔로우 상태 업데이트
      setUser((prevUser) => ({ ...prevUser, is_followed: true }));
    } catch (error) {
      console.error('Error while following:', error);
    }
  };

  // 언팔로우 클릭 처리
  const handleUnFollowClick = async () => {
    try {
      // 언팔로우 등록 요청
      await axiosInstance.delete(`${API_URL}/api/members/follow/${toMemberId}`);
      // 팔로우 상태 업데이트
      setUser((prevUser) => ({ ...prevUser, is_followed: false }));
    } catch (error) {
      console.error('Error while unfollowing:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/posts/members/${toMemberId}`, // 타인 피드 조회
        );
        console.log(response);
        const post_list = response.data.data.post_list;
        const achieved_list = response.data.data.achieved_post_list;
        // 달성전, 달성후 따로 저장
        setPostList(post_list);
        setAchievedList(achieved_list);
      } catch (error) {
        console.error('Error while fetching data:', error);
        Navigate('/loginerror');
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    if (ACCESS_TOKEN) {
      setLoginFlag(true);
    } else {
      setLoginFlag(false);
    }
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/members/${toMemberId}`,
          {
            params: {
              // query string으로 전달할 파라미터 추가
              'login-flag': loginFlag,
            },
          },
        );
        const memberData = response.data.data.member;

        setUser(memberData);
        console.log(memberData);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    if (toMemberId) {
      fetchData();
    }
  }, [toMemberId]);

  const handleCategoryChange = (newCategory) => {
    if (category === newCategory) {
      setCategory(''); // 같은 카테고리면 전체 보기로 변경
    } else {
      setCategory(newCategory); // 다른 카테고리면 선택한 카테고리로 변경
    }
    setIsOverlayOpen(false);
  };

  const achievedPercent = Math.floor(
    (achieveList.length / (achieveList.length + postList.length)) * 100,
  );
  const achievedPercentBar = (achievedPercent * Number(232)) / Number(100);
  // activeTab에 따라서 postList와 achieveList 선택
  const selectedList = activeTab === 'inProgress' ? postList : achieveList;
  const selectedListLength = selectedList.length;

  return (
    <div className="w-[360px] h-[800px] relative bg-white">
      <div className="w-[360px] h-[60px] left-0 top-0 absolute">
        <TopBar
          title={user.nickname}
          showConfirmButton={false}
          showCloseButton={false}
        />
        <div className="w-[26px] h-[26px] left-[20px] top-[18px] absolute" />
      </div>
      <div className="w-[218px] h-[17px] top-[105px] left-[120px] relative bg-zinc-300 rounded-lg ">
        <div className="left-[109px] top-[-3px] absolute text-center"></div>
        <div>
          <img
            className="absolute"
            style={{
              left: `${achievedPercentBar - 20}px`,
              width: '40px',
              height: '40px',
              top: `-${40}px`,
              zIndex: 0, // 이미지를 위로 올리기 위한 z-index 값 설정
            }}
            src={runningIcon}
            alt="Running"
          />
        </div>
        <div
          style={{
            width: `${achievedPercentBar}px`,
            height: '17px',
            left: '0',
            top: '0',
            position: 'absolute',
            background: '#6366F1',
            borderRadius: '0.375rem',
            zIndex: 1, // 배경을 아래로 내리기 위한 z-index 값 설정
          }}
        />
      </div>
      <div
        className="w-[222px] h-10 justify-start items-start gap-[5px] inline-flex"
        style={{ position: 'absolute', top: '138px', left: '120px' }}
      >
        <div style={{ width: '71px', height: '10px', textAlign: 'center' }}>
          <span
            style={{
              color: 'text-neutral-700',
              fontSize: '13px',
              fontWeight: 'bold',
              lineHeight: '18.20px',
            }}
          >
            {achievedPercent}
            %
            <br />
          </span>
          <span
            style={{
              color: 'text-neutral-700',
              fontSize: '13px',
              fontWeight: 'normal',
              lineHeight: '18.20px',
            }}
          >
            달성률
          </span>
        </div>
        <div style={{ width: '71px', height: '10px', textAlign: 'center' }}>
          <span
            style={{
              color: 'text-neutral-700',
              fontSize: '13px',
              fontWeight: 'bold',
              lineHeight: '18.20px',
            }}
          >
            <a style={{ cursor: 'pointer' }} onClick={handleFollowingsClick}>
              {user.cnt_followings}
              <br />
            </a>
          </span>
          <span
            style={{
              color: 'text-neutral-700',
              fontSize: '13px',
              fontWeight: 'normal',
              lineHeight: '18.20px',
            }}
          >
            팔로잉
          </span>
        </div>
        <div style={{ width: '70px', height: '10px', textAlign: 'center' }}>
          <span
            style={{
              color: 'text-neutral-700',
              fontSize: '13px',
              fontWeight: 'bold',
              lineHeight: '18.20px',
            }}
          >
            <a style={{ cursor: 'pointer' }} onClick={handleFollowersClick}>
              {user.cnt_followers}
              <br />
            </a>
          </span>
          <span
            style={{
              color: 'text-neutral-700',
              fontSize: '13px',
              fontWeight: 'normal',
              lineHeight: '18.20px',
            }}
          >
            팔로워
          </span>
        </div>
      </div>
      <img
        className="w-[74px]  h-[74px] left-[16px] top-[76px] bg-zinc-300 rounded-full absolute"
        style={{
          backgroundImage: `url(${user.profile_img || defaultProfileImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="w-[76px] h-[27px] top-[142px] left-[16px] relative bg-neutral-200 rounded-lg absolute"
        // onClick={handleClick}
      >
        <div className="left-[22px] top-[5px] absolute text-center text-neutral-700 text-xs font-bold leading-snug">
          {renderFollowButton}
        </div>
      </div>
      <div className="top-[187px] absolute">
        <TwoTapButton
          leftLabel="달성중"
          rightLabel="달성완료"
          leftValue={postList.length}
          rightValue={achieveList.length}
          leftActive={activeTab === 'inProgress'} // 달성중 탭이 선택된 경우
          onLeftTap={() => handleTabChange('inProgress')} // 달성중 탭 클릭 시 처리
          onRightTap={() => handleTabChange('achieved')} // 달성완료 탭 클릭 시 처리
        />
      </div>

      <div className="w-[347px] left-[11px] top-[208px] h-8 relative">
        <div className="left-[6px] top-[8px] absolute text-zinc-800 text-[13px] font-normal leading-[18.20px]">
          {selectedListLength}
        </div>
        <div className="top-[35px] left-[5px] absolute">
          {getFilteredData(getFeedData()).map((post, index) => (
            <OtherFeedCard
              key={index}
              title={post.title}
              Img={
                activeTab === 'inProgress'
                  ? post.ai_img
                  : post.achieve_img || post.ai_img
              }
              likeCount={
                activeTab === 'inProgress' ? post.cheer_cnt : post.celebrate_cnt
              }
              postId={post.post_id}
              isDisplay={post.is_display}
              activeTab={activeTab === 'inProgress'}
            />
          ))}
          <br />
          <br />
          <br />
          <br />
        </div>
        <div
          className="left-[263px] top-[8px] absolute text-zinc-800 text-[13px] font-normal leading-[18.20px]"
          onClick={() => setIsOverlayOpen(!isOverlayOpen)}
        >
          {/* 필터 선택 버튼을 선택된 카테고리로 변경 */}
          {category === '' ? '전체 보기' : categorys[category]}
          <div className="w-8 h-8 left-[60px] absolute origin-top-left -rotate-90">
            <DownArrow
              className={`w-[15px] h-[10px]`}
              style={{
                transform: isOverlayOpen ? 'rotate(270deg)' : 'rotate(90deg)',
              }}
            />
          </div>
        </div>
        {isOverlayOpen && (
          <div
            className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-gray-500 bg-opacity-50 z-[1]"
            onClick={() => setIsOverlayOpen(false)}
          >
            <div className="bg-white p-3 rounded-lg">
              <CategoryButtons
                setCategory={handleCategoryChange} // 카테고리 변경 함수를 전달
                selectedCategory={category} // 선택된 카테고리도 전달
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OtherFeed;
