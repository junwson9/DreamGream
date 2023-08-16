/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { ReactComponent as ToggleClose } from '../../assets/icons/ToggleClose.svg';

function ContentCard({ title, post, isBefore }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`w-[319px] h-[200px] relative bg-[#DEE2F4] rounded-[10px]
    ${isOpen ? 'h-[36px]' : 'h-[180px]'}
    `}
    >
      <div className="card-title w-[97px] h-[9.17px] left-[10px] top-[9.09px] absolute text-zinc-800 text-[13px] font-medium leading-[16.90px]">
        {title}
      </div>
      <div>
        <button
          type="button"
          className={`w-[21px] h-[21.99px] left-[290px] top-[7px] absolute ${
            isOpen ? 'rotate-180' : ''
          }`}
          onClick={toggleCard}
        >
          <ToggleClose />
        </button>
      </div>
      {isBefore ? (
        <div
          className={`w-[300px] left-[10px] top-[34px] absolute text-zinc-800 text-[13px] font-normal leading-[16.90px] 
          ${isOpen ? 'hidden' : ''}
          `}
        >
          {post.content}
        </div>
      ) : (
        <div
          className={`w-[300px] left-[10px] top-[34px] absolute text-zinc-800 text-[13px] font-normal leading-[16.90px] 
          ${isOpen ? 'hidden' : ''}
          `}
        >
          {post.achievement_content}
        </div>
      )}
    </div>
  );
}

export default ContentCard;
