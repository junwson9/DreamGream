/* eslint-disable */

import React from 'react';
import { ReactComponent as LeftIcon } from '../../assets/leftIcon.svg';
import { useNavigate } from 'react-router-dom';

function TopBar({ title, showProfileButton = true, showConfirmButton = true }) {
  const navigate = useNavigate();

  const handleLeftIconClick = () => {
    navigate(-1);
  };

  const handleConfirmClick = () => {
    navigate('/다른페이지로 이동 다른 event 나 post는 알아서 만드삼');
  };

  return (
    <div className="w-[360px] h-[60px] relative">
      <LeftIcon
        className="w-[26px] h-[26px] left-[20px] top-[18px] absolute z-[1]"
        onClick={handleLeftIconClick}
        style={{ cursor: 'pointer' }}
      />

      {showProfileButton && (
        <div className="w-[360px] h-[60px] left-0 top-0 absolute bg-white border-b border-neutral-100">
          <div className="left-[49px] top-[14px] absolute text-zinc-800 text-[22px] font-bold leading-[30.80px]">
            {title}
          </div>
        </div>
      )}
      {showConfirmButton && (
        <div
          className="left-[307px] top-[19px] absolute text-right text-zinc-800 text-lg font-bold leading-[25.20px] cursor-pointer"
          onClick={handleConfirmClick}
        >
          확인
        </div>
      )}
    </div>
  );
}

export default TopBar;
