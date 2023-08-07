/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CheerUpIcon } from '../../assets/icons/CheerUpIcon.svg';
import { ReactComponent as CelebrateIcon } from '../../assets/icons/CelebrateIcon.svg';

function BestBucketList({ bestBucketList }) {
  const navigate = useNavigate();

  const goFeedDetailPage = () => {
    // ++url 수정 필요
    navigate('/feedid');
  };

  return (
    <div className="w-[148.24px] h-32 relative">
      <button
        type="button"
        onClick={goFeedDetailPage}
        style={{ border: 'none', background: 'none', padding: 0 }}
      >
        <div className="w-[148.24px] h-32 left-0 top-0 absolute bg-black bg-opacity-40 rounded-lg" />
      </button>
      <div className="w-[135.39px] h-[37.55px] left-[5.93px] top-[4.27px] absolute text-white text-base font-bold leading-snug">
        스위스에서 스카이 다이빙하기
        {/* {bestBucketList.title} */}
      </div>

      {/* {bestBucketList.is_acheived ? ( */}
      <div className="w-[38.12px] h-[29.26px] left-[102.71px] top-[99.06px] absolute flex items-center text-white text-xs font-bold leading-none">
        <CelebrateIcon className="mr-1" style={{ fill: 'white' }} />
        999
        {/* {bestBucketList.celeberate_cnt} */}
      </div>
      {/* ) : ( */}
      <div className="w-[38.12px] h-[29.26px] left-[102.71px] top-[99.06px] absolute flex items-center text-white text-xs font-bold leading-none">
        <CheerUpIcon className="mr-1" style={{ fill: 'white' }} />
        999
        {/* {bestBucketList.cheer_cnt}  */}
      </div>
      {/* )} */}
    </div>
  );
}

export default BestBucketList;
