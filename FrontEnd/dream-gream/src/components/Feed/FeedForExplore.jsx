/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
import React from 'react';

function FeedForExplore({ post }) {
  return (
    <div className="w-[360px] h-[460px] relative">
      <img
        className="w-[360px] h-[360px] left-0 top-[-1px] absolute"
        src="https://via.placeholder.com/360x360"
        alt="전체 피드 이미지"
      />
      <div className="w-[315px] left-[28px] top-[380px] absolute text-zinc-800 text-[17px] font-medium leading-normal">
        주제입니다
        {post.title}
      </div>
    </div>
  );
}

export default FeedForExplore;
