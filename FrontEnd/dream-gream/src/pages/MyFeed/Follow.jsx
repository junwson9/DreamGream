/* eslint-disable */

import React, { useState, useEffect } from 'react';
import TopBar from '../../components/Common/Topbar2';
import FollowItem from '../../components/Follow/FollowItem';
import TwoTapButton from '../../components/Button/TwoTapButtonFollowAdd';
import FollowList from '../../components/Follow/FollowList';
import MemberItem from '../../components/Member/MemberItem';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInterceptor';
import { API_URL } from '../../config';

function Follow() {
  const [member, setMember] = useState([]);
  const [page, setPage] = useState('0');
  const [list, setList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [isFollower, setIsFollower] = useState(true); // 초기 상태를 팔로워로 설정
  const { memberId } = useParams();

  const handleFollowStatusChange = async (memberId) => {
    try {
      // 팔로우 상태 변경 로직 구현
      // memberId에 해당하는 팔로우 상태를 변경하고 서버에 요청할 수도 있습니다.
      // 이후 팔로우 상태 업데이트를 위해 필요한 로직을 구현하세요.

      // 예시: 팔로우 상태를 업데이트하는 로직
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/members/${memberId}`,
        );
        const memberData = response.data.data.member;
        setMember(memberData);

        const followResponse = await axiosInstance.get(
          `${API_URL}/api/members/${memberId}${
            isFollower ? '/followers' : '/followings'
          }`,
        );
        const list =
          followResponse.data.data[
            isFollower ? 'followerList' : 'followingList'
          ];

        if (isFollower) {
          setFollowerList(list);
          setFollowingList([]);
        } else {
          setFollowerList([]);
          setFollowingList(list);
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, [memberId, isFollower]);

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
        onRightTap={() => {
          setIsFollower(true); // 오른쪽 탭 클릭 시 팔로워로 변경
          fetchData(); // 팔로워 목록 갱신을 위해 API 호출
        }}
        onLeftTap={() => {
          setIsFollower(false); // 왼쪽 탭 클릭 시 팔로잉으로 변경
          fetchData(); // 팔로잉 목록 갱신을 위해 API 호출
        }}
      />
      <div className="top-[125px] w-[360px] absolute">
        {list && list.length > 0 ? (
          list.map((item) => (
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
          <div className="absolute top-[180px] left-[65px] text-center text-neutral-700 text-base font-medium leading-snug">
            {isFollower
              ? '아직 팔로워가 없습니다.'
              : '아직 팔로잉한 사람이 없습니다.'}
          </div>
        )}
      </div>
    </div>
  );
}

export default Follow;
