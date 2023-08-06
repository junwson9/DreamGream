/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../../components/Common/Topbar';

function MyFeed() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState('');
  // const [category, setCategory] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(user.nickname);
  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://i9a609.p.ssafy.io:8000/api/posts/my',
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const data = response.data.data;
        setPost(data);
        // console.log(data);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://i9a609.p.ssafy.io:8000/api/members/info',
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
          },
        );
        // console.log(response);
        const data = response.data.data.member;
        setUser(data);
        console.log(data);
        // console.log(data);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleCategoryChange = (newCategory) => {
    if (category === newCategory) {
      setCategory('');
    } else {
      setCategory(newCategory);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-[360px] h-[800px] relative bg-white">
      <div className="w-[360px] h-[60px] left-0 top-0 absolute">
        <TopBar
          title={user.nickname}
          // title="ㅎㅇ"
          showConfirmButton={false}
          showCloseButton={false}
        />
        <div className="w-[26px] h-[26px] left-[20px] top-[18px] absolute" />
      </div>
      <div className="w-[74px]  h-[74px] left-[16px] top-[76px] bg-zinc-300 rounded-full absolute" />
      <div class="text-center text-neutral-700 text-xs font-bold leading-snug">
        프로필 수정
      </div>
    </div>
  );
}

export default MyFeed;
