/* eslint-disable */

import React from 'react';
import { ReactComponent as LeftIcon } from '../../assets/leftIcon.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { useNavigate } from 'react-router-dom';
import SimpleLogo from '../../assets/LogoSecond.svg';

function TopBar({
  pathName,
  onConfirm,
  title,
  confirmName,
  showProfileButton = true,
  showConfirmButton = true,
  showLeftButton = true,
  showCloseButton = true,
  showSimpleLogo = true,
}) {
  const navigate = useNavigate();

  const handleLeftIconClick = () => {
    navigate(-1);
  };
  const handleConfirmClick = async (event) => {
    // console.log(onconfirm);

    if (onConfirm) {
      await onConfirm(event); // Trigger the onConfirm function (POST request)
    }
    navigate(pathName); // Navigate to the specified pathName after the onConfirm function completes
  };

  return (
    <div className="w-[360px] h-[60px] relative">
      {showSimpleLogo && (
        <img
          className="w-[105px] h-[38px] left-[45px] top-[14px] absolute z-[1]"
          src={SimpleLogo}
        />
      )}
      {showLeftButton && (
        <LeftIcon
          className="w-[26px] h-[26px] left-[20px] top-[18px] absolute z-[1]"
          onClick={handleLeftIconClick}
          style={{ cursor: 'pointer' }}
        />
      )}

      {showCloseButton && (
        <CloseIcon
          className="w-[26px] h-[26px] left-[20px] top-[18px] absolute z-[1]"
          onClick={handleLeftIconClick}
          style={{ cursor: 'pointer' }}
        />
      )}

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
          {confirmName}
        </div>
      )}
    </div>
  );
}

export default TopBar;
