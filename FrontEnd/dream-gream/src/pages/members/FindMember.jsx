/* eslint-disable */

import React, { useState } from 'react';
import TopBar from '../../components/Common/Topbar';
import InputBox from '../../components/InputBox/InputBox';
// import { ReactComponent as SearchIcon } from '../../assets/icons/SearchIcon.svg';

function FindMember() {
  const [nickname, setNickname] = useState('');
  const [noResult, setNoResult] = useState(false);

  const handleSaveClick = (value) => {
    setNickname(value);
    // console.log('Saved nickname:', value);
    const queryParams = new URLSearchParams({ nickname: nickname }); // value 체크
    // console.log(queryParams);
    const url = `http://i9a609.p.ssafy.io:8000/api/members?${queryParams}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from server:', data);
        const memberList = data.data.memberlist;

        if (memberList === undefined) {
          setNoResult(true);
          console.log(1);
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  return (
    <div className="w-[360px] h-[800px] relative bg-white">
      <TopBar
        title="친구찾기"
        showConfirmButton={false}
        showCloseButton={false}
      />
      <div class="w-[320px] h-[60px] top-[85px] left-[20px] absolute">
        <InputBox
          text={nickname}
          onInputChange={setNickname}
          onSaveClick={handleSaveClick}
        />
      </div>
      <div
        className={`${
          noResult ? 'block' : 'hidden' // hidden 클래스 추가
        } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="font-normal text-center">검색결과가 없습니다.</div>
      </div>
    </div>
  );
}
export default FindMember;
