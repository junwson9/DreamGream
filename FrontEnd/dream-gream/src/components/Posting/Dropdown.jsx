/* eslint-disable */
import React from 'react';

function DropDown({ value, setIsOpen, onChangePeriod, isOpen }) {
  const handleItemClick = () => {
    setIsOpen(false);
    onChangePeriod(value);
  };

  return (
    <li
      onClick={handleItemClick}
      style={{
        margin: '8px 0', //상하 간격을 조정
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#f0f0f0';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
      }}
    >
      {value}
    </li>
  );
}

//   return (
//     <li
//       onClick={handleItemClick}
//       style={{
//         margin: '8px 0', // 여기서 상하 간격을 조정합니다. '8px' 대신 다른 값을 사용할 수 있습니다.
//         padding: '8px 16px',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         transition: 'background-color 0.2s',
//       }}
//       onMouseEnter={(e) => {
//         e.target.style.backgroundColor = '#f0f0f0';
//       }}
//       onMouseLeave={(e) => {
//         e.target.style.backgroundColor = 'transparent';
//       }}
//     >
//       {value}
//     </li>
//   );
// }

export default DropDown;
