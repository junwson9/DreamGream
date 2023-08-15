/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TwoTapButton({
  memberId,
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  leftActive, // 추가: leftActive를 props로 받음
  onRightTap, // 추가: 오른쪽 탭 클릭 시 실행할 함수
  onLeftTap, // 추가: 왼쪽 탭 클릭 시 실행할 함수
}) {
  // const [isActive, setIsActive] = useState(!leftActive); // 상태명을 isActive로 변경
  // const navigate = useNavigate();
  console.log('레프트엑티브' + leftActive);
  // console.log('액티브' + isActive);
  const handleLeftClick = () => {
    // setIsActive(false);
    onLeftTap();
  };

  const handleRightClick = () => {
    // setIsActive(true);
    onRightTap();
  };

  return (
    <div className="w-[360px] h-[60px] bg-white justify-start items-start inline-flex">
      <div
        className={`w-[180px] pt-[17px] flex-col justify-end items-center gap-[17px] inline-flex ${
          !leftActive ? 'text-stone-300' : 'text-neutral-700'
        }`}
        onClick={handleLeftClick}
      >
        <div className="text-center text-base font-bold">
          {leftLabel} {leftValue}
        </div>
        <div
          className={`w-[180px] h-[3px] ${
            !leftActive ? 'bg-stone-300' : 'bg-neutral-700'
          }`}
        />
      </div>
      <div
        className={`w-[180px] pt-[17px] flex-col justify-end items-center gap-[17px] inline-flex ${
          !leftActive ? 'text-neutral-700' : 'text-stone-300'
        }`}
        onClick={handleRightClick}
      >
        <div className="text-center text-base font-bold">
          {rightLabel} {rightValue}
        </div>
        <div
          className={`w-[180px] h-[3px] ${
            !leftActive ? 'bg-neutral-700' : 'bg-stone-300'
          }`}
        />
      </div>
    </div>
  );
}

export default React.memo(TwoTapButton);
