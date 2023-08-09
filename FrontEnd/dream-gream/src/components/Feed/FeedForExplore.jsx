/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function FeedForExplore({ post }) {
  const navigate = useNavigate();
  const { postId } = post;

  const goFeedDetail = () => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="w-[360px] h-[460px] relative">
      <img
        className="w-[360px] h-[360px] left-0 top-[-1px] absolute"
        src={post.aiImg}
        alt="전체 피드 이미지"
        onClick={goFeedDetail}
        style={{ cursor: 'pointer' }}
      />
      <div
        className="w-[315px] left-[28px] top-[380px] absolute text-zinc-800 text-[17px] font-medium leading-normal"
        onClick={goFeedDetail}
        style={{ cursor: 'pointer' }}
      >
        {post.title}
      </div>
    </div>
  );
}

export default FeedForExplore;
