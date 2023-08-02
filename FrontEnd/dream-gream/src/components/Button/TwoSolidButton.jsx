/* eslint-disable */
import React, { useState } from 'react';

function TwoSolidButton({ leftLabel, rightLabel, onClick }) {
  const [isLeftSelected, setIsLeftSelected] = useState(true);
  console.log(isLeftSelected);
  const handleLeftButtonClick = () => {
    setIsLeftSelected(true);
    onClick(leftLabel);
  };

  const handleRightButtonClick = () => {
    setIsLeftSelected(false);
    onClick(rightLabel);
  };

  const buttonStyleBase =
    'w-40 h-[50px] left-0 top-0 absolute rounded-lg border text-base font-bold leading-snug cursor-pointer';
  const leftButtonStyle = isLeftSelected
    ? 'bg-[#7887D4] border-indigo-400 text-white'
    : 'bg-white border-stone-300 text-stone-300';
  const rightButtonStyle = isLeftSelected
    ? 'bg-white border-stone-300 text-stone-300'
    : 'bg-[#7887D4] border-indigo-400 text-white';

  return (
    <div className="w-80 h-[50px] relative">
      <div className="w-40 h-[50px] left-0 top-0 absolute">
        <div
          className={`${buttonStyleBase} ${leftButtonStyle}`}
          onClick={handleLeftButtonClick}
        >
          <div className="left-[65px] top-[13px] absolute text-center text-base font-bold leading-snug">
            {leftLabel}
          </div>
        </div>
      </div>
      <div className="w-40 h-[50px] left-[160px] top-0 absolute">
        <div
          className={`${buttonStyleBase} ${rightButtonStyle}`}
          onClick={handleRightButtonClick}
        >
          <div className="left-[65px] top-[13px] absolute text-center text-base font-bold leading-snug">
            {rightLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwoSolidButton;
