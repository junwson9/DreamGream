/* eslint-disable react/prop-types */
import React from 'react';

function InputBox({ text, onInputChange }) {
  // 닉네임의 최대 길이를 설정합니다 (10글자)
  const MAX_NICKNAME_LENGTH = 10;

  // 입력된 닉네임이 최대 길이를 초과하면 잘라냅니다
  const handleNicknameChange = (event) => {
    const newNickname = event.target.value.slice(0, MAX_NICKNAME_LENGTH);
    onInputChange({ target: { value: newNickname } });
  };

  return (
    <div className="absolute z-10">
      <form
        className="w-[320px] h-70 bg-white border border-gray-400"
        style={{ borderRadius: '8px' }}
      >
        <div className="relative w-100 h-5 my-4 ml-6">
          <input
            className="w-full h-full text-base leading-5 font-normal text-black placeholder-gray-400 focus:outline-none"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={text}
            onChange={handleNicknameChange} // 수정된 핸들러 함수를 사용합니다
          />
        </div>
      </form>
    </div>
  );
}

export default InputBox;
