/* eslint-disable */
import React, { useState } from 'react';
import TopBar from '../../components/Common/Topbar';
import InputBox from '../../components/InputBox/InputBox';
import MemberItem from '../../components/Member/MemberItem';
import { API_URL } from '../../config';
import axiosInstance from '../../utils/axiosInterceptor';
// isFollowed 처리만 해주고 프로필이나 이름 누르면 navigate되게끔

function FindMember() {
  const [nickname, setNickname] = useState('');
  const [noResult, setNoResult] = useState(false);
  const [memberList, setMemberList] = useState([]); // 빈 배열로 초기화
  // console.log(memberList);
  const handleSaveClick = async (value) => {
    setNickname(value);
    console.log(nickname);

    const queryParams = new URLSearchParams({ nickname: nickname }); // 넘어온 값 사용
    const url = `${API_URL}/api/members?${queryParams}`;

    try {
      const response = await axiosInstance.get(url);
      console.log('Response from server:', response.data);
      const receivedMemberList = response.data.data.member_list;
      setMemberList(receivedMemberList);
      console.log(receivedMemberList);

      // 검색 결과가 없을 때 noResult 상태를 설정
      if (!receivedMemberList || receivedMemberList.length === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="w-[360px] h-[800px] relative bg-white">
      <TopBar
        title="친구찾기"
        showConfirmButton={false}
        showCloseButton={false}
      />
      <div className="w-[320px] h-[60px] top-[85px] left-[20px] absolute">
        <InputBox
          text={nickname}
          onInputChange={setNickname}
          onSaveClick={handleSaveClick}
          onEnterKeyPress={handleSaveClick}
        />
      </div>
      <div>
        <div className="top-[155px] absolute">
          {memberList ? (
            memberList.map((member) => (
              <div key={member.id}>
                <MemberItem
                  nickname={member.nickname}
                  profileImg={member.profile_img}
                  toMemberId={member.member_id}
                  isFollowed={member.is_followed}
                />
                {/* 추가적인 정보를 띄우고 싶으면 여기에 추가 */}
              </div>
            ))
          ) : (
            // 길이가 0인 경우 검색결과가 없습니다.
            <div
              className={`${
                noResult ? 'block' : 'hidden' // hidden 클래스 추가
              } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
              <div className="font-normal text-center">
                검색결과가 없습니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindMember;
