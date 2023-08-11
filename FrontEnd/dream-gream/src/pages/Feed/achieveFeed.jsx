/* eslint-disable */
import React, { useState, useEffect,Fragment } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import  { Pagination  } from 'swiper';
import Topbar from '../../components/Common/Topbar';
import BestBucketList from '../../components/Feed/BestBucketList';
import FeedForExplore from '../../components/Feed/FeedForExplore';
import Member from '../../components/Feed/Member';
import ScrapCelebrateBtns from '../../components/Button/ScrapCelebrateBtns';
import {UseInfiniteScroll} from '../../hooks/useInfiniteScroll';
import { API_URL } from '../../config';

function AchieveFeed() {
  const [bestBucketList, setBestBucketList] = useState([]);
  const {ref,inView} = useInView()
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const loginFlag = accessToken !== null;
  const fetchInfiniteScrollData = (pageParam) => 
     UseInfiniteScroll(loginFlag,pageParam, 10)
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
  
  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts/best/achieved`)
      .then((response) => {
        setBestBucketList(response.data.data.post_list);
        console.log(response);
        console.log('달성후 베스트 조회에 성공');
      })
      .catch((error) => console.log(error));
  }, []);
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
      <Topbar showCloseButton={false}/>
      <div className="w-[360px] h-[200px] relative bg-white">
          <div className="left-[26px] top-[8px] absolute text-zinc-800 text-lg font-bold leading-[25.20px]">
            BEST 버킷리스트
          </div>
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {bestBucketList.map((bestBucketItem, index) => {
              const isEvenIndex = index % 2 === 0;
              const otherIndex = isEvenIndex ? index + 1 : index - 1;
              const otherBestBucketItem = bestBucketList[otherIndex];

              return (
                <SwiperSlide key={index}>
                  <BestBucketList
                    className="A"
                    bestBucketItem={bestBucketItem}
                  />
                  <BestBucketList
                    className="B"
                    bestBucketItem={otherBestBucketItem}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
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