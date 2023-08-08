/* eslint-disable */

import React, { useState, useEffect } from 'react';
import TopBar from '../../components/Common/Topbar2';
// import FollowItem from '../../components/Follow/FollowItem';
import TwoTapButton from '../../components/Button/TwoTapButton';
import FollowList from '../../components/Follow/FollowList';
import MemberItem from '../../components/Member/MemberItem';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Following() {
  const [member, Setmember] = useState([]);
  const { memberId } = useParams();
  console.log(memberId);
  console.log(member);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://i9a609.p.ssafy.io:8000/api/members/${memberId}`,
        );
        const memberData = response.data.data.member;
        console.log(memberData);
        // console.log(memberData.cntFollowers);
        Setmember(memberData);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <TopBar
        title={member.nickname}
        showConfirmButton={true}
        showCloseButton={false}
        confirmName="친구찾기"
      />
      <TwoTapButton
        leftLabel={`팔로워 ${member.cnt_followers}`}
        rightLabel={`팔로잉 ${member.cnt_followings}`}
      ></TwoTapButton>
      <MemberItem></MemberItem>
    </div>
  );
}

export default Following;
