/* eslint-disable */
import React, { useState } from 'react';
import CategoryButtons from '../../components/Button/CategoryButtons';

function MyFeed() {
  const [category, setCategory] = useState('');

  const posts = [
    { id: 1, category: '여행', content: '여행 게시물입니다.' },
    { id: 2, category: '건강/운동', content: '건강/운동 게시물입니다.' },
    // 기타 게시물 등
  ];
  const postsNums = posts.length;
  const handleCategoryChange = (newCategory) => {
    if (category === newCategory) {
      setCategory(''); // 동일한 카테고리를 다시 누른 경우 전체 게시글을 보여주려면 카테고리를 초기화합니다.
    } else {
      setCategory(newCategory); // 새 카테고리가 선택된 경우에만 카테고리를 업데이트합니다.
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (category === '') {
      // 카테고리가 선택되지 않은 경우 모든 게시물 반환
      return true;
    }
    return post.category === category;
  });

  return (
    <div>
      <h1>Page</h1>
      <h3>{postsNums}</h3>
      <CategoryButtons setCategory={handleCategoryChange} />
      <p>선택한 카테고리: {category === '' ? '전체' : category}</p>

      {/* 필터링된 게시물 목록 렌더링 */}
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyFeed;
