import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Topbar from '../../components/Common/Topbar';
import CategoryButtons from '../../components/Button/CategoryButtons';
import BestBucketList from '../../components/Feed/BestBucketList';
import FeedForExplore from '../../components/Feed/FeedForExplore';
import Member from '../../components/Feed/Member';
import ScrapCheerUpBtns from '../../components/Button/ScrapCheerUpBtns';
// import axiosInstance from '../../utils/axiosInterceptor';

function CheerUpFeed() {
  const [postList, setPostList] = useState([]);
  const [bestBucketList, setBestBucketList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://i9a609.p.ssafy.io:8800/api/posts')
      .then((response) => {
        setPostList(response.data.data.post_list.content);
        console.log(response);
        console.log('데이터 조회에 성공');
      })
      .catch((error) => console.log(error));

    axios
      .get('http://i9a609.p.ssafy.io:8800/api/posts/best')
      .then((response) => {
        setBestBucketList(response.data.data.post_list);
        console.log(response);
        console.log('버킷리스트');
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="body" style={{ overflow: 'auto', overflowX: 'hidden' }}>
      <Topbar />
      <div className="header">
        <CategoryButtons />

        <br />
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          BEST 버킷리스트
        </div>
        {bestBucketList.map((bestBucketItem) => (
          <BestBucketList bestBucketItem={bestBucketItem} />
        ))}
        {/* npm i react-paginate 필요 */}
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
      {/* <div
        className="ToTopButtonDiv"
        style={{
          position: 'fixed',
          top: 675,
          transform: 'translateX(calc(100% + 260px))',
        }}
      >
        <ToTopButton />
      </div> */}
      <div
        className="NavDiv"
        style={{
          position: 'fixed',
          top: 736,
          width: '100%',
        }}
      >
        {/* <Navbar /> */}
      </div>
    </div>
  );
}

export default CheerUpFeed;
