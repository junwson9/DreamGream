/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputBox from '../../components/InputBox/InputBox2';
import TopBar from '../../components/Common/Topbar';
import TwoSolidButton from '../../components/Button/TwoSolidButton';
import SelectSmall from '../../components/Button/SelectDropDown';

function ProfileEdit() {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleYearSelection = (year) => {
    setBirthYear(year);
  };
  console.log(gender, birthYear);
  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
  const handleGenderSelection = (selectedGender) => {
    const genderValue = selectedGender === '남성' ? 'MALE' : 'FEMALE';
    setGender(genderValue);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://i9a609.p.ssafy.io:8800/api/members/info',
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const user = response.data.data.member;
        console.log(user);
        setNickname(user.nickname);
        setGender(user.gender);
        setBirthYear(user.birthyear);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        'http://i9a609.p.ssafy.io:8800/api/members/info',
        {
          nickname: nickname,
          gender: gender,
          birthyear: birthYear,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Data successfully submitted:', response.data);
    } catch (error) {
      console.error('Error while submitting data:', error);
    }
  };

  return (
    <div className="w-[360px] h-[800px] relative bg-white">
      <div className="top-[260px] left-[127px] w-[107px] h-[29px] relative">
        <div className="w-[107px] h-[29px] left-0 top-0 absolute bg-neutral-200 rounded-lg">
          <div className="left-[9px] top-[5px] absolute text-center text-zinc-800 text-[13px] font-bold leading-snug">
            프로필 사진 수정
          </div>
        </div>
      </div>
      <div className="w-[360px] h-[33px] top-[310px] absolute text-zinc-500 text-2xl font-normal text-center">
        {nickname}
      </div>
      <div className="w-[200px] h-[237px] top-[70px] left-[111px] text-center flex justify-center items-center relative">
        <div className="w-[137px] h-[136px] left-0 top-0 absolute bg-zinc-300 rounded-full border-2 border-blue-300" />
      </div>
      <div className="w-80 h-[440px] left-[20px] top-[185px] absolute">
        <div className="left-0 top-[195px] absolute text-zinc-800 text-[14px] font-medium leading-[41.60px]">
          닉네임
        </div>
        <div className="left-0 top-[320px] absolute text-zinc-800 text-[14px] font-medium leading-[41.60px]">
          성별
        </div>
        <div className="left-0 top-[440px] absolute text-zinc-800 text-[14px] font-medium leading-[41.60px]">
          태어난 연도
        </div>
      </div>
      <div className="w-80 h-[55px] left-[20px] top-[655px] absolute">
        <SelectSmall onSelect={handleYearSelection} selectedValue={birthYear} />
      </div>
      <div className="w-80 h-[50px] left-[20px] top-[545px] absolute">
        <div className="w-80 h-[50px] left-0 top-0 absolute">
          <div>
            <TwoSolidButton
              leftLabel="남성"
              rightLabel="여성"
              onClick={handleGenderSelection}
              value={gender}
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
          onConfirm={handleSubmit}
          pathName="/myfeed"
        />
        <div className="w-[26px] h-[26px] left-[20px] top-[18px] absolute" />
      </div>
      <div class="w-[320px] h-[60px] top-[420px] left-[20px] absolute">
        <InputBox
          text={nickname}
          onInputChange={(event) => setNickname(event.target.value)}
          showSearchIcon={false}
        />
      </div>
    </div>
    // 확인시 어디로 보내고 어떻게 해야할지
  );
}
export default ProfileEdit;
