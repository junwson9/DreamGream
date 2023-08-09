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

function Follower() {
  const [member, setMember] = useState([]);
  const [page, setPage] = useState('0');
  const [followerList, setFollowerList] = useState([
    {
      member_id: 1,
      nickname: '변경했지롱',
      profile_img: null,
      is_followed: true,
    },
    {
      member_id: 2,
      nickname: '하이티비',
      profile_img: null,
      is_followed: false,
    },
    {
      member_id: 3,
      nickname: '머',
      profile_img: null,
      is_followed: true,
    },
    {
      member_id: 4,
      nickname: '머',
      profile_img: null,
      is_followed: true,
    },
    {
      member_id: 5,
      nickname: '머',
      profile_img: null,
      is_followed: true,
    },
    {
      member_id: 6,
      nickname: '머',
      profile_img: null,
      is_followed: true,
    },
    {
      member_id: 7,
      nickname: '머',
      profile_img: null,
      is_followed: true,
    },
    {
      member_id: 8,
      nickname: '머',
      profile_img: null,
      is_followed: true,
    },
    {
      member_id: 9,
      nickname: '머',
      profile_img: null,
      is_followed: true,
    },
    {
      member_id: 10,
      nickname: '머',
      profile_img: null,
      is_followed: true,
    },
  ]);
  const { memberId } = useParams();
  // console.log(followerList);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/api/members/${memberId}`);
        const memberData = response.data.data.member;
        console.log(memberData);
        // console.log(memberData.cnt_followers);
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
          `${API_URL}/api/members/${memberId}/followers`,
        );
        console.log(response);
        const followerList = response.data.data.followerList;
        console.log(followerList);
        setFollowerList(followerList); // 여기 살려야댐
        console.log(data);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);
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
        leftActive={true}
      />
      <div className="top-[125px] absolute">
        {followerList.map((follower) => (
          <MemberItem
            key={follower.member_id}
            memberId={follower.member_id}
            nickname={follower.nickname}
            profileImg={follower.profile_img}
            isFollowed={follower.is_followed}
          />
        ))}
      </div>
    </div>
  );
}

export default Follower;
