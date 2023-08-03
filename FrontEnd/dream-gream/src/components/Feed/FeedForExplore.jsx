/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
import React from 'react';

import Member from './Member';
import ScrapLikeBtns from '../Button/ScrapLikeBtns';

function FeedForExplore({ feeddata }) {
  return (
    // <>
    //   {feeddata.map((el) => (
    //     <article className="feed" key={el.id}>
    //       <div className="feedBox">
    //         {/* 유저 프로필 부분 */}
    //         <Member />
    //       </div>

    //       {/* <img src={el.ai_img} className="feedImage" alt="피드 이미지" />
    //       <div className="contentLine">
    //         <span>
    //           {el.title}
    //         </span>
    //       </div> */}

    //       <div className="w-[360px] h-[501px] relative">
    //         <img
    //           className="w-[360px] h-[360px] left-0 top-[-1px] absolute"
    //           src="https://via.placeholder.com/360x360"
    //           alt="전체 피드 이미지"
    //         />
    //         <div className="w-[315px] left-[28px] top-[380px] absolute text-zinc-800 text-[17px] font-medium leading-normal">
    //           주제입니다
    //           <br />
    //           주제입니다
    //         </div>
    //       </div>

    //       {/* 버튼 부분 */}
    //       <ScrapLikeBtns />
    //     </article>
    //   ))}
    // </>

    <div className="w-[360px] h-[501px] relative">
      <img
        className="w-[360px] h-[360px] left-0 top-[-1px] absolute"
        src="https://via.placeholder.com/360x360"
        alt="전체 피드 이미지"
      />
      <div className="w-[315px] left-[28px] top-[380px] absolute text-zinc-800 text-[17px] font-medium leading-normal">
        주제입니다
        <br />
        주제입니다
      </div>
    </div>
  );
}

export default FeedForExplore;
