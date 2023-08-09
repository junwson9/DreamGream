/* eslint-disable */

import React, { useState, useEffect } from 'react';
import TopBar from '../../components/Common/Topbar2';
// import FollowItem from '../../components/Follow/FollowItem';
import TwoTapButton from '../../components/Button/TwoTapButtonFollow';
import FollowList from '../../components/Follow/FollowList';
import MemberItem from '../../components/Member/MemberItem';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInterceptor';
import { API_URL } from '../../config';

function Following() {
  const [member, setMember] = useState([]);
  const [page, setPage] = useState('0');
  const [followingList, setFollowingList] = useState([]);
  const { memberId } = useParams();

  // console.log(followingList);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/api/members/${memberId}`);
        const memberData = response.data.data.member;
        // console.log(memberData);
        console.log('hihihi');
        console.log(memberData.cnt_followers);
        setMember(memberData);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, [memberId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/members/${memberId}/followings`,
        );
        console.log(response);
        const followingList = response.data.data.following_list;
        console.log(followingList);
        setFollowingList(followingList); // 여기 살려야댐
        console.log(followingList);
        // console.log(data);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, [memberId]);
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
        leftActive={false}
      />
      <div className="top-[125px] w-[360px] absolute">
        {followingList && followingList.length > 0 ? (
          followingList.map((following) => (
            <MemberItem
              key={following.member_id}
              toMemberId={following.member_id}
              nickname={following.nickname}
              profileImg={following.profile_img}
              isFollowed={following.is_followed}
            />
          ))
        ) : (
          <div className="absolute top-[180px] left-[65px] text-center text-neutral-700 text-base font-medium leading-snug">
            아직 팔로잉한 사람이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default Following;
