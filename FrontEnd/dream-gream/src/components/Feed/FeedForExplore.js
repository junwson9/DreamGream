import React from 'react';

import Member from './Member';
import ScrapLikeBtns from '../Button/ScrapLikeBtns';

const FeedForExplore = ({ feeddata }) => {
  return (
    <>
      {feeddata.map((el) => {
        return (
          <article className="feed" key={el.id}>
            <div className="feedBox">
              {/* 유저 프로필 부분 */}
              <Member />
            </div>
            {/* 포스팅 이미지 부분 */}
            <img src={el.ai_img} className="feedImage" alt="피드 이미지" />

            {/* 컨텐츠 부분 */}
            <div className="contentLine">
              <span>
                {el.title}
                {/* <a href="#" className="type3">
                            ...더 보기
                          </a> */}
              </span>
            </div>
            {/* 버튼 부분 */}
            <ScrapLikeBtns />
          </article>
        );
      })}
    </>
  );
};

export default FeedForExplore;
