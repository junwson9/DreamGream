/* eslint-disable */

import React, { useState } from 'react';
import axios from 'axios';

function SiginupGenderBirth() {
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 어디로 보내는지 주소 확인, 데이터 형태랑
      const response = await axios.post('/api/submit', { gender, birthYear });
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        성별:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </label>
      <br />
      <label>
        태어난 연도:
        <input
          type="number"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
        />
      </label>
      <br />
      <input type="submit" value="제출" />
    </form>
  );
}

export default SiginupGenderBirth;
