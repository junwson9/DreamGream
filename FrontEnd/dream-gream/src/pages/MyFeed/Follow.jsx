/* eslint-disable */

import React, { useState, useEffect } from 'react';
import TopBar from '../../components/Common/Topbar2';
// import FollowItem from '../../components/Follow/FollowItem';
import TwoTapButton from '../../components/Button/TwoTapButton';
import FollowList from '../../components/Follow/FollowList';

function Follow() {
  //memberID가 필요한데.. ㅇㄷ서 가져오지 그 전의 마이페이지에서 가져올 수 있겠지  -> parameter로 보내
  return (
    <div>
      <TopBar
        title="ㅎㅇ"
        showConfirmButton={true}
        showCloseButton={false}
        confirmName="친구찾기"
      />
      <TwoTapButton leftLabel={'팔로워'} rightLabel={'팔로잉'}></TwoTapButton>
      <FollowList></FollowList>
    </div>
  );
}

export default Follow;
