import React from 'react';

const BestBucketList = ({ bestfeeddata }) => {
  return (
    <div className="best-bucket-list">
      <span>BEST 버킷리스트</span>
      <ul>
        {bestfeeddata.map((el) => (
          <li key={el.post_id}>
            <div className="feed-item">
              <img src={el.ai_img} alt="베스트버킷리스트 이미지"></img>
              <p className="feed-title">{el.title}</p>
              <p className="feed-cheers">❤ {el.cheer_cnt}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestBucketList;
