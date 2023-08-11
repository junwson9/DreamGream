/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect,Fragment } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Topbar from '../../components/Common/Topbar';
import CategoryButtons from '../../components/Button/CategoryButtons';
import BestBucketList from '../../components/Feed/BestBucketList';
import FeedForExplore from '../../components/Feed/FeedForExplore';
import Member from '../../components/Feed/Member';
import ScrapCheerUpBtns from '../../components/Button/ScrapCheerUpBtns';
import { API_URL } from '../../config';
import { UseInfiniteCheer } from '../../hooks/useInfiniteCheer';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import './cheerUpFeed.css';

function CheerUpFeed() {
  const [bestBucketList, setBestBucketList] = useState([]);
  
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const loginFlag = accessToken !== null;
  const {ref,inView} = useInView()
  const fetchInfiniteScrollData = (pageParam) => 
    UseInfiniteCheer(loginFlag, pageParam, 10)
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
      .get(`${API_URL}/api/posts/best`)
      .then((response) => {
        setBestBucketList(response.data.data.post_list);
        console.log(response);
        console.log('달성전 베스트 버킷리스트 조회에 성공');
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
    <div className="body" style={{ overflow: 'auto', overflowX: 'hidden', position: 'relative' }}>
      <Topbar showCloseButton={false} />
      <div className="header">
        <CategoryButtons />

        <br />

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
          {/* </div> */}
        </div>
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
          <ScrapCheerUpBtns post={post} />
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

export default CheerUpFeed;
