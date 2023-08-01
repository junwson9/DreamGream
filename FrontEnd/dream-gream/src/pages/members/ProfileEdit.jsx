/* eslint-disable */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputBox from '../../components/InputBox/InputBox';

function ProfileEdit() {
  const [profile, setProfile] = useState({
    profileImage: '',
    nickname: '',
    gender: '',
    birthyear: '',
  });
  // const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
  const Navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const navigateToMyFeed = () => {
    Navigate('/myfeed');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:8000/api/members/info',
        {
          nickname: profile.nickname,
          gender: profile.gender,
          birthyear: profile.birthyear,
        },
      );

      if (response.status === 200) {
        navigateToMyFeed();
      } else {
        console.log('Error updating profile:', response);
      }
    } catch (error) {
      console.error(error);
    }
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
        <label htmlFor="birthyear">태어난 연도</label>
        <input
          type="number"
          id="birthyear"
          name="birthyear"
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
