/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CheerUpIcon } from '../../assets/icons/CheerUpIcon.svg';
import { ReactComponent as CelebrateIcon } from '../../assets/icons/CelebrateIcon.svg';

function BestBucketList({ bestBucketItem }) {
  const navigate = useNavigate();

  const goFeedDetail = () => {
    // ++url 수정 필요
    navigate(`/feed/${bestBucketItem.post_id}`);
  };

  return (
    <div className="w-[148.24px] h-32 relative">
      <div
        className="w-[148.24px] h-32 left-0 top-0 absolute bg-black bg-opacity-40 rounded-lg"
        onClick={goFeedDetail}
        style={{ cursor: 'pointer' }}
      >
        <img
          className="w-[148.24px] h-32 left-0 top-0 absolute rounded-lg"
          onClick={goFeedDetail}
          style={{ cursor: 'pointer' }}
          src={bestBucketItem.ai_img}
          alt="베스트버킷 이미지"
        />
        <div className="w-[135.39px] h-[37.55px] left-[5.93px] top-[4.27px] absolute text-white text-base font-bold leading-snug">
          {bestBucketItem.title}
        </div>

        {bestBucketItem.is_acheived ? (
          <div className="w-[38.12px] h-[29.26px] left-[102.71px] top-[99.06px] absolute flex items-center text-white text-xs font-bold leading-none">
            <CelebrateIcon className="mr-1" style={{ fill: 'white' }} />
            {bestBucketItem.celeberate_cnt}
          </div>
        ) : (
          <div className="w-[38.12px] h-[29.26px] left-[102.71px] top-[99.06px] absolute flex items-center text-white text-xs font-bold leading-none">
            <CheerUpIcon className="mr-1" style={{ fill: 'white' }} />
            {bestBucketItem.cheer_cnt}
          </div>
        )}
      </div>
    </div>
  );
}

export default BestBucketList;
