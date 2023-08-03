/* eslint-disable */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import InputBox from '../../components/InputBox/InputBox.jsx';
import TopBar from '../../components/Common/Topbar.jsx';
import TwoSolidButton from '../../components/Button/TwoSolidButton.jsx';
import DropdownList from '../../components/Button/DropDownList.jsx';
import SelectSmall from '../../components/Button/SelectDropDown.jsx';

function SignupGenderBirth() {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(gender);
    // console.log(birthYear);
    // console.log(ACCESS_TOKEN);
    try {
      const response = await axios.put(
        'http://i9a609.p.ssafy.io:8000/api/auth/role',
        {
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
      console.log(response.data.data.token.accessToken);
      const access_token = response.data.data.token.accessToken;
      localStorage.setItem('ACCESS_TOKEN', access_token);
      const refresh_token = response.data.data.token.refreshToken;
      localStorage.setItem('REFRESH_TOKEN', refresh_token);

      // ACCESS_TOKEN = tokenResponse.token.access_token;
      // REFRESH_TOKEN = tokenResponse.token.refresh_token;
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
    navigateToMyFeed();
  };
  return (
    <div className="w-[360px] h-[800px] relative bg-white">
      <div className="w-80 h-[440px] left-[20px] top-[95px] absolute">
        <div className="left-0 top-[169px] absolute text-zinc-800 text-[32px] font-medium leading-[41.60px]">
          성별
        </div>
        <div className="left-0 top-[327px] absolute text-zinc-800 text-[32px] font-medium leading-[41.60px]">
          태어난 연도
        </div>
        <div className="left-0 top-0 absolute text-zinc-800 text-[28px] font-medium leading-[39.20px]">
          당신에 대해 알려주시면
          <br />꼭 맞는 버킷리스트 그림을 <br />
          그려드릴게요!
        </div>
        <div className="w-80 h-[55px] left-0 top-[385px] absolute">
          {/* <div className="w-[250px] h-5 left-[24px] top-[17px] absolute text-zinc-800 text-base font-bold leading-snug"></div> */}
          {/* <div className="w-80 h-9 left-[274px] top-[9px] absolute" /> */}
          {/* <DropdownList
            years={years}
            selectedYear={selectedYear}
            onSelect={handleYearSelection}
          /> */}
          <SelectSmall onSelect={handleYearSelection} />
        </div>
      </div>
      <div className="w-[360px] h-[60px] left-0 top-0 absolute">
        <TopBar
          showProfileButton={false}
          showConfirmButton={false}
          showCloseButton={false}
        />
        <div className="w-[26px] h-[26px] left-[20px] top-[18px] absolute" />
      </div>
      <div
        className="w-80 h-[55px] left-[20px] top-[639px] absolute bg-[#7887D4] rounded-lg"
        onClick={handleSubmit}
      >
        <div className="left-[130px] top-[16px] absolute text-center text-white text-base font-bold leading-snug">
          시작하기
        </div>
      </div>
      <div className="w-80 h-[50px] left-[20px] top-[333px] absolute">
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
    </div>
  );
}

export default SignupGenderBirth;
// onClick 위치 체크할 필요성이 있음
