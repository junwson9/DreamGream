/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect,Fragment } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import Topbar from '../../components/Common/Topbar';
import CategoryButtons from '../../components/Button/CategoryButtons';
import BestBucketList from '../../components/Feed/BestBucketList';
import FeedForExplore from '../../components/Feed/FeedForExplore';
import Member from '../../components/Feed/Member';
import ScrapCelebrateBtns from '../../components/Button/ScrapCelebrateBtns';
import ToTopButton from '../../components/Button/ToTopButton';
import {UseInfiniteScroll} from '../../utils/useInfiniteScroll';
import { API_URL } from '../../config';

function AchieveFeed() {
  const [bestBucketList, setBestBucketList] = useState([]);
  const {ref,inView} = useInView()
  const fetchInfiniteScrollData = (pageParam) => 
     UseInfiniteScroll(pageParam, 10)
  ;
  const { data: postInfoList, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinitePostList'],
    ({pageParam = null}) => fetchInfiniteScrollData(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) {
          return lastPage.nextLastPostId;
        }
        return undefined;
      }
    }
    );
  
  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/api/posts/best/achieved`)
  //     .then((response) => {
  //       setBestBucketList(response.data.data.post_list);
  //       console.log(response);
  //       console.log('달성후 베스트 조회에 성공');
  //     })
  //     .catch((error) => console.log(error));
  // }, []);
  useEffect(() => {
    if (inView) {
      fetchNextPage()
        .then(() => {
          console.log(postInfoList); // 여기서 확인
        })
        .catch((error) => {
          console.error('데이터 로딩 중 에러', error);
        });
    }
  }, [inView]);

  return (
    <div className="body" style={{ overflow: 'auto', overflowX: 'hidden' }}>
      <Topbar />
      {/* <div className="header">
        <CategoryButtons />

        <br />
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          BEST 버킷리스트
        </div>
        {bestBucketList.map((bestBucketItem, index) => (
          <BestBucketList key={index} bestBucketItem={bestBucketItem} />
        ))}
      </div> */}
      <br />
      <hr />
      <div className="main">
  {postInfoList?.pages.map((page) => (
    <Fragment key={page.nextLastPostId}>
      {page.postList.map((post) => (
        <div className="article" key={post.post_id}>
          <Member post={post} />
          <FeedForExplore post={post} />
          <ScrapCelebrateBtns post={post} />
          <br />
          <br />
          <hr />
        </div>
      ))}
    </Fragment>
  ))}
  {isFetchingNextPage ? <div>로딩중</div> : <div ref={ref} />}
</div>
      <div className="w-[360px] h-[66px] pl-[79px] pr-[81px] pt-[21px] pb-[11px] bg-white bg-opacity-0 flex-col justify-end items-center gap-0.5 inline-flex">
        <div className="text-center text-neutral-400 text-[11px] font-normal">
          Copyright ⓒ SSAFY. All rights reserved.
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
export default AchieveFeed;
//         <br />
//         <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
//           BEST 버킷리스트
//         </div>
//         {bestBucketList.map((bestBucketItem) => (
//           <BestBucketList bestBucketItem={bestBucketItem} />
//         ))}
//       </div>
//       <br />
//       <hr />
//       <div className="main">
//         {postInfoList?.pages.map((page) => (
//           <Fragment key={page.postId}>
//             <div className="article" key={page.postId}>
//               <Member post={page} />
//               <FeedForExplore post={page} />
//               <ScrapCelebrateBtns post={page} />
//               <br />
//               <br />
//               <hr />
//             </div>
//           </Fragment>
//         ))}
//         {isFetchingNextPage ? <div>로딩중</div> : <div ref={ref} />}
//       </div>
//       <div className="w-[360px] h-[66px] pl-[79px] pr-[81px] pt-[21px] pb-[11px] bg-white bg-opacity-0 flex-col justify-end items-center gap-0.5 inline-flex">
//         <div className="text-center text-neutral-400 text-[11px] font-normal">
//           Copyright ⓒ SSAFY. All rights reserved.
//         </div>
//       </div>
//       <br />
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// }

// export default AchieveFeed;
