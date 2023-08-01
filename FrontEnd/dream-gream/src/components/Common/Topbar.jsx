/* eslint-disable */

import React from 'react';

function TopBar({ title }) {
  return (
    <div className="w-[360px] h-[60px] relative">
      <div className="w-[360px] h-[60px] left-0 top-0 absolute bg-white border-b border-neutral-100">
        <div className="left-[49px] top-[14px] absolute text-zinc-800 text-[22px] font-bold leading-[30.80px]">
          프로필
        </div>
      </div>
      <div className="left-[307px] top-[19px] absolute text-right text-zinc-800 text-lg font-bold leading-[25.20px]">
        확인
      </div>
      <div className="w-[26px] h-[26px] left-[20px] top-[18px] absolute"> </div>
    </div>
  );
}

export default TopBar;
