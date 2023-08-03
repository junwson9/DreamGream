/* eslint-disable */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputBox from '../../components/InputBox/InputBox';
import TopBar from '../../components/Common/Topbar';
import TwoSolidButton from '../../components/Button/TwoSolidButton';
import SelectSmall from '../../components/Button/SelectDropDown';

function ProfileEdit() {
  const [profile, setProfile] = useState({
    profileImage: '',
    nickname: '',
    gender: '',
    birthyear: '',
  });
  // const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const years = Array.from({ length: 100 }, (_, idx) =>
    (new Date().getFullYear() - idx).toString(),
  );
  const handleYearSelection = (year) => {
    setBirthYear(year);
  };
  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
  const Navigate = useNavigate();
  // console.log(selectedYear);
  const navigateToMyFeed = () => {
    Navigate('/myfeed');
  };
  const handleGenderSelection = (selectedGender) => {
    // Check the selected gender and set 'MALE' or 'FEMALE' accordingly
    const genderValue = selectedGender === 'left' ? 'MALE' : 'FEMALE';
    setGender(genderValue);
  };
  // console.log(gender);

  return (
    <div className="w-[360px] h-[800px] relative bg-white">
      <div className="top-[260px] left-[127px] w-[107px] h-[29px] relative">
        <div className="w-[107px] h-[29px] left-0 top-0 absolute bg-neutral-200 rounded-lg">
          <div className="left-[9px] top-[4px] absolute text-center text-zinc-800 text-[13px] font-bold leading-snug">
            프로필 사진 수정
          </div>
        </div>
      </div>
      <div className="w-[360px] h-[33px] top-[310px] absolute text-zinc-500 text-2xl font-normal text-center">
        몇글자 까지 더라 열글자도 가능
      </div>
      <div className="w-[200px] h-[237px] top-[70px] left-[111px] text-center flex justify-center items-center relative">
        <div className="w-[137px] h-[136px] left-0 top-0 absolute bg-zinc-300 rounded-full border-2 border-blue-300" />
      </div>
      <div className="w-80 h-[440px] left-[20px] top-[195px] absolute">
        <div className="left-0 top-[200px] absolute text-zinc-800 text-[14px] font-medium leading-[41.60px]">
          닉네임
        </div>
        <div className="left-0 top-[350px] absolute text-zinc-800 text-[14px] font-medium leading-[41.60px]">
          성별
        </div>
        <div className="left-0 top-[500px] absolute text-zinc-800 text-[14px] font-medium leading-[41.60px]">
          태어난 연도
        </div>
      </div>
      <div className="w-80 h-[55px] left-0 top-[385px] absolute">
        <SelectSmall onSelect={handleYearSelection} />
      </div>
      <div className="w-80 h-[50px] left-[20px] top-[433px] absolute">
        <div className="w-80 h-[50px] left-0 top-0 absolute">
          <div>
            <TwoSolidButton
              leftLabel="남성"
              rightLabel="여성"
              onClick={handleGenderSelection}
            />
          </div>
        </div>
      </div>
      <div className="w-[360px] h-[60px] left-0 top-0 absolute">
        <TopBar
          title={'프로필'}
          confirmName={'확인'}
          showProfileButton={true}
          showConfirmButton={true}
          showCloseButton={false}
        />
        <div className="w-[26px] h-[26px] left-[20px] top-[18px] absolute" />
      </div>
      <div class="w-[360px] h-[60px] top-[400px] left-[20px] absolute">
        <InputBox />
      </div>
    </div>
    // 확인시 어디로 보내고 어떻게 해야할지
  );
}
export default ProfileEdit;
