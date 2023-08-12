/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FeedForDetail({ post }) {
  const [showFirstImage, setShowFirstImage] = useState(true);

  const handleImageToggle = () => {
    setShowFirstImage((prev) => !prev);
  };

  const navigate = useNavigate();

  return (
    <div className="w-[360px] h-[448px] relative">
      <div className="w-[315px] left-[25px] top-[376px] absolute text-zinc-800 text-[17px] font-medium leading-normal">
        {post.title}
      </div>
      <div
        className="w-[360px] h-[360px] left-0 top-0 absolute "
        onClick={post.is_achieved ? handleImageToggle : null}
      >
        {showFirstImage ? (
          <img
            className="w-[360px] h-[360px] left-0 top-0 absolute"
            src={post.ai_img}
            alt="1번 이미지"
          />
        ) : (
          // 2번 이미지 없는 경우 1번 이미지만 보이도록
          post.is_achieved && (
            <img
              className="w-[360px] h-[360px] left-0 top-0 absolute"
              src={post.achievement_img}
              alt="2번 이미지"
            />
          )
        )}
        {post.is_achieved && (
          <img
            className="w-[135px] h-[135px] left-[225px] top-[1px] absolute"
            src="https://via.placeholder.com/135x135"
            alt="달성완료 도장 이미지"
          />
        )}
      </div>
      {post.is_achieved && (
        <div className="bar w-[140px] h-1.5 left-[110px] top-[345px] absolute">
          <div
            className={`leftbar w-[70px] h-1.5 left-[0px] top-[-0px] absolute ${
              showFirstImage
                ? 'bg-white bg-opacity-80'
                : 'bg-zinc-400 bg-opacity-80'
            } rounded-[10px]`}
          />
          <div
            className={`rightbar w-[70px] h-1.5 left-[70px] top-[-0px] absolute ${
              showFirstImage
                ? 'bg-zinc-400 bg-opacity-80'
                : 'bg-white bg-opacity-80'
            } rounded-[10px]`}
          />
        </div>
      )}
    </div>
  );
}

export default FeedForDetail;
