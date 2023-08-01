/* eslint-disable */

import React, { useState } from 'react';

function TopTap() {
  const [isFollowersActive, setIsFollowersActive] = useState(true); // 처음 상태에서는 팔로워 탭이 활성화 상태
  const [isFollowingActive, setIsFollowingActive] = useState(false); // 팔로잉 탭의 상태

  const handleFollowersClick = () => {
    setIsFollowersActive(true);
    setIsFollowingActive(false);
  };

  const handleFollowingClick = () => {
    setIsFollowersActive(false);
    setIsFollowingActive(true);
  };

  return (
    <div className="w-[360] h-[60px] bg-white justify-start items-start inline-flex">
      <div
        className={`w-[180px] h-[60px] relative cursor-pointer`}
        onClick={handleFollowersClick}
      >
        <div
          className={`w-[180px] h-[3px] left-0 bottom-0 absolute ${
            isFollowersActive ? 'bg-black' : 'bg-stone-300'
          }`}
        />
        <div
          className={`left-[60px] top-[17px] absolute text-center ${
            isFollowersActive ? 'text-black' : 'text-stone-300'
          } text-base font-bold`}
        >
          팔로워 0
        </div>
      </div>
      <div
        className={`w-[180px] h-[60px] relative cursor-pointer`}
        onClick={handleFollowingClick}
      >
        <div
          className={`w-[180px] h-[3px] left-0 bottom-0 absolute ${
            isFollowingActive ? 'bg-black' : 'bg-stone-300'
          }`}
        />
        <div
          className={`left-[60px] top-[17px] absolute text-center ${
            isFollowingActive ? 'text-black' : 'text-stone-300'
          } text-base font-bold`}
        >
          팔로잉 0
        </div>
      </div>
    </div>
  );
}

export default TopTap;
