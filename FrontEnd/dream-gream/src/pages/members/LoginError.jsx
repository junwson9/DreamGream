/* eslint-disable */

import React from 'react';
import { useNavigate } from 'react-router';

function LoginError() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  return (
    <div className="w-[360px] h-[800px] bg-black bg-opacity-30 flex justify-center items-center">
      <div className="w-[328px] h-[220px] relative bg-white rounded-xl">
        <div className="left-[97px] top-[65px] absolute text-center text-zinc-800 text-base font-medium leading-snug">
          로그인 하셔야 <br />
          이용 할 수 있습니다.
        </div>
        <div className="w-[328px] h-[55px] left-0 top-[166px] absolute">
          <div
            className="w-[300px] h-[55px] left-[173px] absolute flex justify-center items-center text-center text-zinc-800 text-base font-medium"
            onClick={handleLoginClick}
          >
            로그인 하기
          </div>
          <div className="w-[328px] h-[0px] left-0 top-[1px] absolute border border-neutral-200"></div>
          <div className="w-[54px] h-[0px] left-[164px] top-[1px] absolute origin-top-left rotate-90 border border-neutral-200"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginError;
