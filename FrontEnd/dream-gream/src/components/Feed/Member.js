import React, { useState } from 'react';

const Member = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="memberBox">
      <div className="member">
        {/* 프로필 이미지 */}
        <img
          className={props.member_id}
          src={props.profile_img}
          alt="프로필 이미지"
        />
        {/* 프로필 닉네임 */}
        <div className="textLine">
          <span className="nickname">{props.nickname}</span>
          <span className="created date">{props.created_date}</span>
          <span className="deadline">{props.deadline}</span>
          {/* ++로그인 유저 닉네임 가져오는거 추가해야함 */}
          {props.is_display === false &&
          loggedInUserNickname === props.nickname ? (
            <span className="is_display">비공개</span>
          ) : null}
        </div>
      </div>
      {/* 더보기 점 세개 모달 */}
      <span onClick={handleModalOpen}>
        {/* 점세개 이미지 */}
        <img src="#" alt="더보기 점 세개" />
      </span>

      {isModalOpen && (
        <div className="modal">
          <ul>
            {/* ++onclick 이벤트 추가해야함 */}
            <li>URL 복사</li>
            <li>카카오로 공유</li>
            <li>이미지 저장</li>
          </ul>
          <button onClick={handleModalClose}>취소</button>
        </div>
      )}
    </div>
  );
};

export default Member;
