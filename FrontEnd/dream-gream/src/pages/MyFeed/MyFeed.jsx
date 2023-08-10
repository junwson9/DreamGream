/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../../components/Common/Topbar';
import TwoTapButton from '../../components/Button/TwoTapButton';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DownArrow } from '../../assets/DownArrow.svg';
import CategoryButtons from './../../components/Button/CategoryButtons2';
import axiosInstance from '../../utils/axiosInterceptor';
import { API_URL } from '../../config';
import MyFeedCard from '../../components/Feed/MyFeedCard';

function MyFeed() {
  const [postList, setPostList] = useState([]);
  const [achieveList, setAchievedList] = useState([]);
  const [user, setUser] = useState({
    cnt_followers: 0,
    cnt_followings: 0,
  });
  const [category, setCategory] = useState('');
  const Navigate = useNavigate();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const handleFollowersClick = () => {
    Navigate(`/follower/${user.member_id}`);
  };

  const handleFollowingsClick = () => {
    Navigate(`/following/${user.member_id}`);
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
  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/posts/myPosts`, // 개인 피드 조회
        );
        // console.log(response);
        const post_list = response.data.data.post_list;
        const achieved_list = response.data.data.achieved_post_list;
        // 달성전, 달성후 따로 저장
        setPostList(post_list);
        setAchievedList(achieved_list);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);
  // console.log(postList);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/members/info`, // 멤버 id 조회 해야댐
        );
        // console.log(response);
        const data = response.data.data.member;
        // member id 로컬스토리지에 저장
        localStorage.setItem('member_id', data.member_id);
        // console.log(data);
        setUser(data);
        // console.log(data);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // console.log(user.memberId);
    async function fetchData() {
      try {
        const member_id = localStorage.getItem('member_id');
        console.log(member_id);
        const response = await axiosInstance.get(
          `${API_URL}/api/members/${member_id}`,
        );
        // console.log(response);
        const data = response.data.data.member;
        setUser(data);
        // console.log(data);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);
  console.log(user);
  const handleCategoryChange = (newCategory) => {
    if (category === newCategory) {
      setCategory(''); // 같은 카테고리면 전체 보기로 변경
    } else {
      setCategory(newCategory); // 다른 카테고리면 선택한 카테고리로 변경
    }
    setIsOverlayOpen(false);
  };
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
      <div className="w-[218px] h-[17px] top-[105px] left-[120px] relative bg-zinc-300 rounded-lg">
        <div className="left-[109px] top-[-3px] absolute text-center"></div>
        <div className="w-[154.63px] h-[17px] left-0 top-0 absolute bg-indigo-400 rounded-lg">
          <div className="left-[77px] top-[-3px] absolute text-center"></div>
        </div>
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
            {Math.floor(
              (achieveList.length / (achieveList.length + postList.length)) *
                100,
            )}
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
      <div className="w-[74px]  h-[74px] left-[16px] top-[76px] bg-zinc-300 rounded-full absolute" />
      <div
        className="w-[76px] h-[27px] top-[142px] left-[16px] relative bg-neutral-200 rounded-lg absolute"
        onClick={() => Navigate('/profileEdit')}
      >
        <div className="left-[9px] top-[5px] absolute text-center text-neutral-700 text-xs font-bold leading-snug">
          프로필 수정
        </div>
      </div>
      <div className="top-[187px] absolute">
        <TwoTapButton
          leftLabel="달성중"
          rightLabel="달성완료"
          leftValue={postList.length}
          rightValue={achieveList.length}
        />
      </div>

      <div className="w-[347px] left-[11px] top-[208px] h-8 relative">
        <div className="left-[6px] top-[8px] absolute text-zinc-800 text-[13px] font-normal leading-[18.20px]">
          {postList.length}
        </div>
        <div className="top-[35px] left-[5px] absolute">
          {postList.map((post, index) => (
            <MyFeedCard
              key={index}
              title={post.title}
              aiImg={post.ai_img}
              cheerCount={post.cheer_cnt}
              postId={post.post_id}
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

export default MyFeed;
