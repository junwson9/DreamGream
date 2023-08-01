import React from 'react';

import Member from './Member';
import ContentCard from './ContentCard';

const FeedForDetail = ({ post }) => {
  return (
    <article className="feed" key={post.post_id}>
      <div className="feedBox">
        {/* 유저 프로필 부분 */}
        <Member />
      </div>
      {/* 포스팅 이미지 부분 */}
      <img src={post.ai_img} className="feedImage" alt="피드 이미지" />
      <img
        src={post.acheivement_img}
        className="feedImage"
        alt="피드 달성완료 이미지"
      />
      {/* 포스팅 부분 */}
      <div className="contentLine">
        <span>{post.title}</span>
        <ContentCard />
      </div>
    </article>
  );
};

export default FeedForDetail;
