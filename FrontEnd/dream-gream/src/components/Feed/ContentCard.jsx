/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { ReactComponent as ToggleClose } from '../../assets/icons/ToggleClose.svg';

function ContentCard({ title, post }) {
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
      {/* ++나중에 상위 페이지에서 렌더링 할때, 달성소감이라는 텍스트도 props로 전달해서 텍스트가 표시되도록 */}
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
      {post.is_acheived ? (
        <div
          className={`w-[300px] left-[10px] top-[34px] absolute text-zinc-800 text-[13px] font-normal leading-[16.90px] ${
            isOpen ? 'hidden' : ''
          }`}
        >
          {post.acheivement_content}
        </div>
      ) : (
        <div
          className={`w-[300px] left-[10px] top-[34px] absolute text-zinc-800 text-[13px] font-normal leading-[16.90px] ${
            isOpen ? 'hidden' : ''
          }`}
        >
          {post.content}
        </div>
      )}
    </div>
  );
}

export default ContentCard;
