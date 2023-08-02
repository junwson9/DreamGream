/* eslint-disable */

import React, { useState } from 'react';
import { ReactComponent as DownArrow } from '../../assets/DownArrow.svg';

function DropdownList({ years, selectedYear, onSelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <div
        className="w-80 h-[55px] bg-white rounded-lg border border-neutral-200 cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="w-[150px] h-5 left-[24px] top-[17px] absolute text-zinc-800 text-base font-bold leading-snug">
          {selectedYear}
        </div>
        <div
          className={`w-[40px] h-[40px] flex justify-center items-center ${
            isDropdownOpen ? 'transform rotate-180' : ''
          }`}
          style={{ position: 'absolute', right: '10px', top: '7px' }}
        >
          <DownArrow className={`w-[15px] h-[7.5px]`} />
        </div>
      </div>
      {isDropdownOpen && (
        <ul
          className="mt-1 w-[320px] absolute bg-white border border-neutral-200 rounded-lg"
          style={{ maxHeight: '200px', overflowY: 'scroll' }}
        >
          {years.map((year) => (
            <li
              key={year}
              className="cursor-pointer hover:bg-gray-100 py-1 px-2"
              onClick={() => {
                onSelect(year);
                toggleDropdown();
              }}
            >
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownList;
