/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React from 'react';

import Member from './Member';
import ContentCard from './ContentCard';

function FeedForDetail({ post }) {
  return (
    // <article className="feed" key={post.post_id}>
    //   <div className="feedBox">
    //     {/* 유저 프로필 부분 */}
    //     <Member />
    //   </div>
    //   {/* 포스팅 이미지 부분 */}
    //   <img src={post.ai_img} className="feedImage" alt="피드 이미지" />
    //   <img
    //     src={post.acheivement_img}
    //     className="feedImage"
    //     alt="피드 달성완료 이미지"
    //   />
    //   {/* 포스팅 부분 */}
    //   <div className="contentLine">
    //     <span>{post.title}</span>
    //     <ContentCard />
    //   </div>
    // </article>
    <div className="w-[360px] h-[448px] relative">
      <div className="w-[315px] left-[25px] top-[376px] absolute text-zinc-800 text-[17px] font-medium leading-normal">
        기타 배워서 1곡 완벽하게 연주하기 기타 배워서 1곡 완벽하게 연주하기 기타
        배워서 1곡 완벽하게 연주하{' '}
      </div>
      <div className="w-[360px] h-[360px] left-0 top-0 absolute">
        <img
          className="w-[360px] h-[360px] left-0 top-0 absolute"
          src="https://via.placeholder.com/360x360"
          alt="피드 상세 이미지"
        />
        <img
          className="w-[135px] h-[135px] left-[225px] top-[1px] absolute"
          src="https://via.placeholder.com/135x135"
          alt="달성완료 도장 이미지"
        />
      </div>
      <div className="w-[140px] h-1.5 left-[110px] top-[345px] absolute">
        <div className="w-[70px] h-1.5 left-[0px] top-[-0px] absolute bg-zinc-400 bg-opacity-80 rounded-[10px]" />
        <div className="w-[70px] h-1.5 left-[70px] top-[-0px] absolute bg-white bg-opacity-80 rounded-[10px]" />
      </div>
    </div>
  );
}

export default FeedForDetail;
