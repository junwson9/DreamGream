/* eslint-disable */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupGenderBirth() {
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
  const Navigate = useNavigate();
  const navigateToMyFeed = () => {
    Navigate('/myFeed');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:8000/api/auth/role',
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
      const tokenResponse = await axios.get(
        "'http://localhost:8000/api/auth/token",
      );
      ACCESS_TOKEN = tokenResponse.token.access_token;
      REFRESH_TOKEN = tokenResponse.token.refresh_token;
      localStorage.setItem('ACCESS_TOKEN', ACCESS_TOKEN);
      localStorage.setItem('REFRESH_TOKEN', REFRESH_TOKEN);
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
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
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
      <input type="submit" value="제출" onClick={navigateToMyFeed} />
    </form>
  );
}

export default SignupGenderBirth;
// onClick 위치 체크할 필요성이 있음
