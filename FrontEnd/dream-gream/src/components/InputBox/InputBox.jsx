/* eslint-disable react/prop-types */
import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/SearchIcon.svg';

function InputBox({
  text,
  onInputChange,
  showSearchIcon = true,
  onSaveClick = false,
}) {
  // 닉네임의 최대 길이를 설정합니다 (10글자)
  const MAX_NICKNAME_LENGTH = 10;

  // 입력된 닉네임이 최대 길이를 초과하면 잘라냅니다
  const handleNicknameChange = (event) => {
    const newNickname = event.target.value.slice(0, MAX_NICKNAME_LENGTH);
    onInputChange(newNickname); // 변경된 닉네임을 콜백 함수로 전달합니다.
  };

  const handleSearchIconClick = () => {
    onSaveClick(text); // 클릭 시에 text 값을 onSaveClick 함수로 전달하여 저장
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 이벤트 제거
      onSaveClick(text); // 검색 아이콘 클릭과 동일한 이벤트 발생시키기
    }
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
            onChange={handleNicknameChange}
            onKeyDown={handleOnKeyPress} // Enter 키 입력 시 이벤트 처리를 위한 이벤트 핸들러 추가
          />
          {showSearchIcon && (
            <button
              type="button"
              className="w-9 h-9 left-[250px] top-[-5px] absolute"
              onClick={handleSearchIconClick}
            >
              <SearchIcon />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default InputBox;
