/* eslint-disable */
import React from 'react';

function ToggleButton({ isChecked, onToggle }) {
  
  const toggleSwitch = () => {
    onToggle(); // 토글 버튼 상태 변화 이벤트를 부모 컴포넌트로 전달
  };

  const switchContainerStyle = 'relative w-12 h-6';
  const switchButtonStyle =
    'w-[22px] h-[22px] bg-white rounded-full shadow-md transform transition-all duration-200 ease-in-out ' +
    (isChecked ? 'translate-x-full' : '');
  const switchTrackStyle = `absolute inset-0 flex items-center justify-between rounded-full px-1 ${
    isChecked ? 'bg-MainColor' : 'bg-gray-300'
  }`;

  return (
    <div className={switchContainerStyle} onClick={toggleSwitch}>
      <div className={switchTrackStyle}>
        <div
          className={`${switchButtonStyle} ${
            isChecked ? 'translate-x-full' : 'transform translate-x-[-13%]'
          }`}
        ></div>
      </div>
    </div>
  );
}

export default ToggleButton;
