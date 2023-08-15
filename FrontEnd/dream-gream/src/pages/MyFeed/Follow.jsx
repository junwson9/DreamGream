/* eslint-disable */

import React, { useState, useEffect } from 'react';
import TopBar from '../../components/Common/Topbar2';
import TwoTapButton from '../../components/Button/TwoTapButtonFollowAdd';
import MemberItem from '../../components/Member/MemberItem';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInterceptor';
import { API_URL } from '../../config';
import { useLocation } from 'react-router-dom';

function Follow() {
  const [member, setMember] = useState({});
  const [fetchedList, setFetchedList] = useState([]);
  const location = useLocation();
  const isFollowing = new URLSearchParams(location.search).get('is_following');
  const [isFollower, setIsFollower] = useState(isFollowing);

  // useParams를 사용하여 memberId 가져오기
  const { memberId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}/api/members/${memberId}`,
        {
          params: {
            // query string으로 전달할 파라미터 추가
            'login-flag': true,
          },
        },
      );
      const memberData = response.data.data.member;
      setMember(memberData);
      console.log(memberData);
      const followResponse = await axiosInstance.get(
        `${API_URL}/api/members/${memberId}${
          isFollower ? '/followers' : '/followings'
        }`,
      );
      const fetchedList = isFollower
        ? followResponse.data.data.follower_list
        : followResponse.data.data.following_list;
      setFetchedList(fetchedList);
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // 초기 렌더링 시 fetchData 호출
  }, [memberId, isFollower]);

  console.log(isFollower);
  const handleFollowStatusChange = async (memberId) => {
    try {
      const updatedList = list.map((item) => {
        if (item.member_id === memberId) {
          return {
            ...item,
            is_followed: !item.is_followed,
          };
        }
        return item;
      });
      setList(updatedList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRightTap = () => {
    setIsFollower(true);
    fetchData();
  };

  const handleLeftTap = () => {
    setIsFollower(false);
    fetchData();
  };

  return (
    <div className="w-[360px] h-[800px] relative bg-white">
      <TopBar
        title={member.nickname}
        showConfirmButton={true}
        showCloseButton={false}
        confirmName="친구찾기"
        pathName={'/findmember'}
      />
      <TwoTapButton
        rightLabel={`팔로워 ${member.cnt_followers}`}
        leftLabel={`팔로잉 ${member.cnt_followings}`}
        memberId={memberId}
        leftActive={!isFollower}
        onRightTap={handleRightTap}
        onLeftTap={handleLeftTap}
      />
      <div className="top-[125px] w-[360px] absolute">
        {fetchedList && fetchedList.length > 0 ? (
          fetchedList.map((item) => (
            <MemberItem
              key={item.member_id}
              toMemberId={item.member_id}
              nickname={item.nickname}
              profileImg={item.profile_img}
              isFollowed={item.is_followed}
              onFollowStatusChange={() =>
                handleFollowStatusChange(item.member_id)
              }
            />
          ))
        ) : (
          <div className="absolute top-[180px] left-[75px] text-center text-neutral-700 text-base font-medium leading-snug">
            <div style={{ textAlign: 'center' }}>
              {isFollower
                ? '아직 팔로워인 사람이 없습니다.'
                : '아직 팔로잉한 사람이 없습니다.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Follow;
