/* eslint-disable */

import React from 'react';
import { ReactComponent as CheerUpIcon } from '../../assets/icons/SmallCheerUpIcon.svg';

function MyFeedCard({ title, aiImg, cheerCount }) {
  const image = {
    backgroundImage: `url(${aiImg})`, // aiImg를 배경 이미지로 설정
  };
  return (
    <div className="w-40 h-[221px] flex-col justify-start items-start gap-[3px] inline-flex z-[5] mr-2 mb-2">
      <div
        className="w-40 h-40 bg-zinc-300 rounded-[10px] shadow-md"
        style={{ ...image, backgroundSize: 'cover' }}
      />
      <div className="w-[88px] h-[17px] relative">
        <div className="w-[46px] top-[-0px] absolute text-zinc-800 text-xs font-medium">
          <CheerUpIcon />
        </div>
        <div className="w-[46px] left-[18px] top-[-0px] absolute text-zinc-800 text-xs font-medium">
          {cheerCount}
        </div>
      </div>
      <div className="w-40 text-neutral-700 text-[13px] font-normal">
        {title}
      </div>
    </div>
  );
}

export default MyFeedCard;
