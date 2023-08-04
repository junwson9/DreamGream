/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import CategoryButtons from '../../components/Button/CategoryButtons2';
import TopBar from '../../components/Common/Topbar';
function MyFeed() {
  const [post_list, setPost_list] = useState([]);
  // const [category, setCategory] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const member = {
  //   followers: 205,
  //   followings: 210,
  //   achived_score: 70,
  // };

  // const postsNums = posts.length;
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
        console.log(data);
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
          title="송준우"
          showConfirmButton={false}
          showCloseButton={false}
        />
        <div className="w-[26px] h-[26px] left-[20px] top-[18px] absolute" />
      </div>
    </div>
  );
}

export default MyFeed;
