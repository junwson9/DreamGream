/* eslint-disable */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CategoryButtons from '../../components/Button/CategoryButtons2';

function MyFeed() {
  const [posts, setPosts_list] = useState([]);
  const [category, setCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const member = {
    followers: 205,
    followings: 210,
    achived_score: 70,
  };
  // 테스트용

  // const posts = [
  //   { id: 1, category: '여행', content: '여행 게시물입니다.' },
  //  { id: 2, category: '건강/운동', content: '건강/운동 게시물입니다.' },
  //  { id: 3, category: '음식', content: '음식 게시물입니다.' },
  //  { id: 4, category: '건강/운동', content: '건강/운동 게시물입니다.' },
  //  { id: 5, category: '쇼핑', content: '쇼핑 게시물입니다.' },
  //  { id: 6, category: '일', content: '일 게시물입니다.' },
  // ];

  const postsNums = posts.length;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/posts?members={member_id}',
        );
        const data = await response.json();
        console.log(data);
        // 여기 data가 post_list일지도
        setPosts(data.post_list);
      } catch (error) {
        console.error('Error getting posts: ', error);
      }
    };
    fetchPosts();
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
    <div>
      <h1>nickname</h1>
      <p>
        달성률 : {member.achived_score} | 팔로워: {member.followers} | 팔로잉:{' '}
        {member.followings} |
      </p>
      <h3>게시물수 : {postsNums}개</h3>
      <button onClick={() => setIsModalOpen(true)}>
        {category === '' ? '전체' : category} ▼
      </button>

      {/* 모달창 */}
      <div style={{ display: isModalOpen ? 'block' : 'none' }}>
        <CategoryButtons setCategory={handleCategoryChange} />
        <button onClick={() => setIsModalOpen(false)}>닫기</button>
      </div>

      {/* 필터링된 게시물 목록 렌더링 */}
      <ul>
        {posts
          .filter((post) => {
            if (category === '') {
              return true;
            }
            return post.category.category_name === category;
          })
          .map((post) => (
            <li key={post.post_id}>{post.content}</li>
          ))}
      </ul>
    </div>
  );
}

MyFeed.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default MyFeed;
