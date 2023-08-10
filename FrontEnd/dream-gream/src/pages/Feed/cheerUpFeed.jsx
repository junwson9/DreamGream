/* eslint-disable react/no-array-index-key */
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import axios from 'axios';
import axiosInstance from '../../utils/axiosInterceptor';
import Topbar from '../../components/Common/Topbar';
import CategoryButtons from '../../components/Button/CategoryButtons';
import BestBucketList from '../../components/Feed/BestBucketList';
import FeedForExplore from '../../components/Feed/FeedForExplore';
import Member from '../../components/Feed/Member';
import ScrapCheerUpBtns from '../../components/Button/ScrapCheerUpBtns';
import { API_URL } from '../../config';

import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import './cheerUpFeed.css';

function CheerUpFeed() {
  const [postList, setPostList] = useState([]);
  const [bestBucketList, setBestBucketList] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    const loginFlag = accessToken !== null;

    axiosInstance
      .get(`${API_URL}/api/posts`, {
        params: {
          'login-flag': loginFlag,
        },
      })
      .then((response) => {
        setPostList(response.data.data.post_list.content);
        console.log(response);
        console.log('달성전 피드 조회에 성공');
      })
      .catch((error) => console.log(error));

    axios
      .get(`${API_URL}/api/posts/best`)
      .then((response) => {
        setBestBucketList(response.data.data.post_list);
        console.log(response);
        console.log('달성전 베스트 버킷리스트 조회에 성공');
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="body" style={{ overflow: 'auto', overflowX: 'hidden' }}>
      <Topbar showCloseButton={false} />
      <div className="header">
        <CategoryButtons />

        <br />

        <div className="w-[360px] h-[200px] relative bg-white">
          <div className="left-[26px] top-[8px] absolute text-zinc-800 text-lg font-bold leading-[25.20px]">
            BEST 버킷리스트
          </div>
          {/* <div className="w-[308.12px] h-32 left-[26px] top-[47px] absolute"> */}
          <Swiper
            slidesPerView={1}
            // spaceBetween={30}
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
        {postList.map((post) => (
          <div className="article" key={post.postId}>
            <Member post={post} />
            <FeedForExplore post={post} />
            <ScrapCheerUpBtns post={post} />
            <br />
            <br />
            <hr />
          </div>
        ))}
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
