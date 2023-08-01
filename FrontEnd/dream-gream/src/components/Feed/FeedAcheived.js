import React, { useState } from 'react';

import Member from './Member';

const FeedAcheived = ({ acheivedfeeddata }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (nextSlide) => {
    setCurrentSlide(nextSlide);
  };

  return (
    <>
      {acheivedfeeddata.map((el) => (
        <article className="feed" key={el.id}>
          <div className="feedBox">
            {/* 유저 프로필 부분 */}
            <Member />
          </div>
          {/* 이미지 슬라이드 부분 */}
          <div className="imageContainer">
            {currentSlide === 0 ? (
              <img src={el.ai_img} className="feedImage" alt="피드 이미지" />
            ) : (
              <img
                src={el.acheivement_img}
                className="feedAcheivedImage"
                alt="피드 달성완료 이미지"
              />
            )}
          </div>

          {/* 컨텐츠 부분 */}
          <div className="contentLine">
            <span>{el.title}</span>
          </div>
          {/* 버튼 부분 */}
          <div className="buttonLine">
            <div className="scrapBtn">
              <button>나도 할래</button>
            </div>
            <div className="celebrateBtn">
              <button>아이콘+축하해요</button>
            </div>
          </div>
          {/* 좌우 넘기기 버튼 */}
          <div className="slideButtons">
            <button
              disabled={currentSlide === 0}
              onClick={() => handleSlideChange(0)}
            >
              첫 번째 이미지 보기
            </button>
            <button
              disabled={currentSlide === 1}
              onClick={() => handleSlideChange(1)}
            >
              두 번째 이미지 보기
            </button>
          </div>
        </article>
      ))}
    </>
  );
};

export default FeedAcheived;
