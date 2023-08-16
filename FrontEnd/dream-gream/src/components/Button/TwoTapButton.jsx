/* eslint-disable */
import React, { useState, useEffect } from 'react';

function TwoTapButton({ leftLabel, rightLabel, leftValue, rightValue }) {
  const [leftActive, setLeftActive] = useState(true);

  const handleLeftClick = () => {
    setLeftActive(false);
  };

  const handleRightClick = () => {
    setLeftActive(true);
  };

  return (
    <div className="w-[360px] h-[60px] bg-white justify-start items-start inline-flex">
      <div
        className={`w-[180px] pt-[17px] flex-col justify-end items-center gap-[17px] inline-flex ${
          leftActive ? 'text-stone-300' : 'text-neutral-700'
        }`}
        onClick={handleLeftClick}
      >
        <div className="text-center text-base font-bold">
          {leftLabel} {leftValue}
        </div>
        <div
          className={`w-[180px] h-[3px] ${
            leftActive ? 'bg-stone-300' : 'bg-neutral-700'
          }`}
        />
      </div>
      <div
        className={`w-[180px] pt-[17px] flex-col justify-end items-center gap-[17px] inline-flex ${
          leftActive ? 'text-neutral-700' : 'text-stone-300'
        }`}
        onClick={handleRightClick}
      >
        <div className="text-center text-base font-bold">
          {rightLabel} {rightValue}
        </div>
        <div
          className={`w-[180px] h-[3px] ${
            leftActive ? 'bg-neutral-700' : 'bg-stone-300'
          }`}
        />
      </div>
    </div>
  );
}

export default TwoTapButton;
