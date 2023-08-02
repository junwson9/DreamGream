/* eslint-disable */
import React, { useState } from 'react';

function ToggleButton() {
  const [isChecked, setIsChecked] = useState(false);
  const toggleSwitch = () => {
    setIsChecked((prevState) => !prevState);
  };
  const switchContainerStyle = 'relative w-12 h-6';
  const switchButtonStyle =
    'w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-200 ease-in-out ' +
    (isChecked ? 'translate-x-full' : '');
  const switchTrackStyle = `absolute inset-0 flex items-center justify-between rounded-full px-1 ${
    isChecked ? 'bg-MainColor' : 'bg-gray-300'
  }`;

  return (
    <div className={switchContainerStyle} onClick={toggleSwitch}>
      <div className={switchTrackStyle}>
        <div className={switchButtonStyle}></div>
      </div>
    </div>
  );
}

export default ToggleButton;
