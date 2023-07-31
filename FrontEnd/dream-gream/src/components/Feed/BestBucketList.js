import React from 'react';

const BestBucketList = ({ feeddata }) => {
  // 당일 좋아요를 가장 많이 받은 8개 피드를 추출하는 함수
  const getBestFeeds = () => {
    // 기존 feeddata를 복제하여 새로운 배열을 만든다.
    const clonedFeeddata = [...feeddata];

    // 좋아요 수를 기준으로 feed를 내림차순으로 정렬한다.
    //++feeddata에 likes라는 게 있는지 확인해봐야 할 것 같다.
    clonedFeeddata.sort((a, b) => b.likes - a.likes);

    // 상위 8개의 피드를 추출하여 반환한다.
    return clonedFeeddata.slice(0, 8);
  };

  // BestBucketList 컴포넌트 렌더링
  return (
    <div className="best-bucket-list">
      <span>BEST 버킷리스트</span>
      <ul>
        {getBestFeeds().map((feed) => (
          <li key={feed.id}>
            <div className="feed-item">
              <img src={feed.img} alt="베스트버킷리스트 이미지"></img>
              <p className="feed-title">{feed.title}</p>
              <p className="feed-likes">❤ {feed.likes}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestBucketList;
