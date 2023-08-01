import React from 'react';

function InputBox() {
  return (
    <div className="absolute z-10">
      <form
        className="w-320 h-55 bg-white border border-gray-400"
        style={{ borderRadius: '8px' }}
      >
        <div className="relative w-70 h-5 my-4 ml-6">
          <input
            className="w-full h-full text-base leading-5 font-normal text-black placeholder-gray-400 focus:outline-none"
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
      </form>
    </div>
  );
}

export default InputBox;
