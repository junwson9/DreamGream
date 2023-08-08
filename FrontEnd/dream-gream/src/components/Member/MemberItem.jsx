/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

function MemberItem({ nickname, profileImg }) {
  const defaultProfileImg = 'https://via.placeholder.com/48x48';
  return (
    <div className="w-[360px] h-[69px] relative">
      <img
        className="w-[47.87px] h-12 left-[14.96px] top-[6px] absolute rounded-full"
        src={profileImg || defaultProfileImg}
        alt={profileImg ? `사용자 ${nickname}의 프로필 이미지` : 'Profile'}
      />
      <div className="w-[177px] left-[85px] top-[18px] absolute text-neutral-700 text-base font-medium leading-snug">
        {nickname}
      </div>
      {/* <div className="w-[359px] h-[0px] left-[1px] top-[69px] absolute border border-zinc-300"></div> */}
      <div className="w-[84.76px] h-[27px] left-[247.31px] top-[17px] absolute" />
      <div className="w-[84.76px] h-[27px] left-[262px] top-[17px] absolute bg-zinc-300 rounded-lg">
        <div className="left-[23px] top-[2px] absolute text-center text-neutral-700 text-[13px] font-bold leading-snug">
          팔로우
        </div>
      </div>
    </div>
  );
}
MemberItem.propTypes = {
  nickname: PropTypes.string.isRequired,
  profileImg: PropTypes.string,
};
export default MemberItem;
