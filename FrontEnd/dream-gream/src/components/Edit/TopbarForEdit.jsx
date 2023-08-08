/* eslint-disable */

import React from 'react';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { useNavigate } from 'react-router-dom';

function TopbarForEdit({ pathName, onConfirm }) {
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
    <div className="w-[360px] h-[60px] relative flex items-center justify-center">
      <CloseIcon
        className="w-[26px] h-[26px] left-[20px] top-[18px] absolute"
        onClick={handleLeftIconClick}
        style={{ cursor: 'pointer' }}
      />

      <div className="text-zinc-800 text-[22px] font-bold leading-[30.80px]">
        수정하기
      </div>

      <div
        className="left-[307px] top-[19px] absolute text-right text-zinc-800 text-lg font-bold leading-[25.20px] cursor-pointer"
        onClick={handleConfirmClick}
      >
        완료
      </div>
    </div>
  );
}

export default TopbarForEdit;
