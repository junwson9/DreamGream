/* eslint-disable */

import React, { useState } from 'react';

function ProfileEdit() {
  const [profile, setProfile] = useState({
    profileImage: '',
    nickname: '',
    introduction: '',
    gender: '',
    birthYear: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const navigateToMyFeed = () => {
    Navigate('/myFeed');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: 프로필 수정 요청 보내기
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="profileImage">프로필 사진</label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
          value={profile.profileImage}
        />
      </div>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          onChange={handleChange}
          value={profile.nickname}
        />
      </div>
      <div>
        <label htmlFor="introduction">소개글</label>
        <textarea
          id="introduction"
          name="introduction"
          onChange={handleChange}
          value={profile.introduction}
        />
      </div>
      <div>
        <label htmlFor="gender">성별</label>
        <select
          id="gender"
          name="gender"
          onChange={handleChange}
          value={profile.gender}
        >
          <option value="">선택해주세요</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </div>
      <div>
        <label htmlFor="birthYear">태어난 연도</label>
        <input
          type="number"
          id="birthYear"
          name="birthYear"
          onChange={handleChange}
          value={profile.birthYear}
        />
      </div>
      <button type="submit" onClick={navigateToMyFeed}>
        확인
      </button>
    </form>
    // 확인시 어디로 보내고 어떻게 해야할지
  );
}

export default ProfileEdit;
