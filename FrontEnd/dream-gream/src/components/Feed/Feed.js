import React from 'react';

import Member from '../Feed/Member';

// feeddata 대신 post?? 가 들어가야 하나?? post는 db 의 테이블 이름이다-> 상관없을듯 하다. 이것의 상위 컴포넌트인 page.js에서 feeddata로 변수를 선언하고, db에서 가져올때 적절한 데이터만 가져오면 된다!
const Feed = ({ feeddata }) => {
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
            <div className="buttonLine">
              <div className="scrapBtn">
                <button>나도 할래</button>
              </div>
              <div className="cheerUpBtn">
                <button>아이콘+응원해요</button>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default Feed;
