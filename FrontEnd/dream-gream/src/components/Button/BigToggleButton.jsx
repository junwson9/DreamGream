/* eslint-disable */

import React, { useState } from 'react';

function BigToggleButton({ leftLabel, rightLabel }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked((prevState) => !prevState);
  };

  const switchContainerStyle = 'w-80 h-[50px] relative';
  const switchButtonContainerStyle = 'w-80 h-[50px] left-0 top-0 absolute';
  const defaultButtonStyle =
    'w-40 h-[50px] left-[160px] top-0 absolute bg-gray-300 rounded-tr-lg rounded-br-lg border border-stone-300';
  const activeButtonStyle =
    'w-40 h-[50px] left-0 top-0 absolute bg-[#7887D4] rounded-tl-lg rounded-bl-lg border border-indigo-400';
  const buttonLabelStyle =
    'left-[65px] top-[13px] absolute text-center text-white text-base font-bold leading-snug';

  return (
    <div className={switchContainerStyle}>
      <div className={switchButtonContainerStyle}>
        <div
          className={isChecked ? defaultButtonStyle : activeButtonStyle}
          onClick={toggleSwitch}
        >
          <div className={buttonLabelStyle}>
            {isChecked ? leftLabel : rightLabel}
          </div>
        </div>
        <div
          className={isChecked ? activeButtonStyle : defaultButtonStyle}
          onClick={toggleSwitch}
        >
          <div className={buttonLabelStyle}>
            {isChecked ? rightLabel : leftLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigToggleButton;
