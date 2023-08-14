/* eslint-disable */

import React from 'react';
import { useNavigate } from 'react-router';

function PostError() {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate('/');
  };

  return (
    <div className="w-[360px] h-[800px] bg-black bg-opacity-30 flex justify-center items-center">
      <div className="w-[328px] h-[220px] relative bg-white rounded-xl flex flex-col">
        <div className="top-[70px] absolute left-[85px] text-center text-zinc-800 text-base font-medium leading-snug">
          서버가 쉬는중입니다! <br />
          잠시 후에 이용해 주세요.
        </div>
        <div className="w-[328px] h-[55px] left-0 top-[166px] absolute">
          <button 
            className="w-[300px] h-[55px] left-[13px] absolute  flex justify-center items-center text-center text-neutral-400 text-base font-medium"
            onClick={handleCancelClick}
          >
            메인으로 가기
          </button>
          <div className="w-[328px] h-[0px] left-0 top-[1px] absolute border border-neutral-200"></div>
        </div>
      </div>
    </div>
  );
}

export default PostError;