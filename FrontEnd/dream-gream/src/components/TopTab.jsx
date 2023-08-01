/* eslint-disable */

import React from 'react';

function TopTap() {
  return (
    <div className="w-[360] h-[60px] bg-white justify-start items-start inline-flex">
      <div className="w-[180px] h-[60px] relative">
        <div className="w-[180px] h-[3px] left-0 top-[57px] absolute bg-stone-300" />
        <div className="left-[51px] top-[17px] absolute text-center text-stone-300 text-base font-bold">
          팔로워 0
        </div>
      </div>
      <div className="w-[180px] h-[60px] relative">
        <div className="w-[180px] h-[3px] left-0 top-[57px] absolute bg-neutral-700" />
        <div className="left-[60px] top-[17px] absolute text-center text-neutral-700 text-base font-bold">
          팔로잉 0
        </div>
      </div>
    </div>
  );
}

export default TopTap;
