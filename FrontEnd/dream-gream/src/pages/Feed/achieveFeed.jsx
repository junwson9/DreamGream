/* eslint-disable */
import React, { useState, useEffect, Fragment } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Topbar from '../../components/Common/Topbar';
import CategoryBtnsForFeed from '../../components/Button/CategoryBtnsForFeed';
import BestBucketList from '../../components/Feed/BestBucketList';
import FeedForExplore from '../../components/Feed/FeedForExplore';
import Member from '../../components/Feed/Member';
import AcheiveBtn from '../../components/Button/AcheiveBtn';
import ScrapCheerUpBtns from '../../components/Button/ScrapCheerUpBtns';
import ScrapCelebrateBtns from '../../components/Button/ScrapCelebrateBtns';
import { UseInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { API_URL } from '../../config';

function AchieveFeed() {
  const [bestBucketList, setBestBucketList] = useState([]);
  const [categoryID, setCategoryID] = useState();
  const loggedInUser = parseInt(localStorage.getItem('member_id'), 10);
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const loginFlag = accessToken !== null;
  const { ref, inView } = useInView();
  const fetchInfiniteScrollData = (pageParam) =>
    UseInfiniteScroll(loginFlag, pageParam, 10, categoryID);
  const {
    data: postInfoList,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['infinitePostList'],
    ({ pageParam = null }) => fetchInfiniteScrollData(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) {
          return lastPage.nextLastPostId;
        }
        return undefined;
      },
    },
  );

  // 카테고리 버튼 클릭시 즉시 리렌더링 관련
  const [shouldRefetch, setShouldRefetch] = useState(false);

  // 카테고리 ID 변경 시 shouldRefetch 상태를 true로 설정
  useEffect(() => {
    setShouldRefetch(true);
  }, [categoryID]);

  // shouldRefetch 상태 변경 시 refetch 호출
  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false); // 상태를 다시 false로 설정하여 무한 호출을 방지
    }
  }, [shouldRefetch]);

  //

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
      <Topbar showCloseButton={false} showLeftButton={false} />
      <div className="header">
        <CategoryBtnsForFeed setCategoryID={setCategoryID} />
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
            {bestBucketList
              .filter(
                (bestBucketItem, index) =>
                  index === 0 || index === 2 || index === 4 || index === 6,
              )
              .map((bestBucketItem, index) => {
                const otherBestBucketItem = bestBucketList[index * 2 + 1];

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
                {loggedInUser === post.member_id && !post.is_achieved && (
                  <AcheiveBtn post={post} />
                )}
                {loggedInUser === post.member_id && post.is_achieved && null}
                {loggedInUser !== post.member_id && !post.is_achieved && (
                  <ScrapCheerUpBtns post={post} />
                )}
                {loggedInUser !== post.member_id && post.is_achieved && (
                  <ScrapCelebrateBtns post={post} />
                )}
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
