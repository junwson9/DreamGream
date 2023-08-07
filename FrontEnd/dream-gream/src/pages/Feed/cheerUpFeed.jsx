import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Topbar from '../../components/Common/Topbar';
import CategoryButtons from '../../components/Button/CategoryButtons';
import BestBucketList from '../../components/Feed/BestBucketList';
import FeedForExplore from '../../components/Feed/FeedForExplore';
import Navbar from '../../components/Common/Navbar';
import Member from '../../components/Feed/Member';
import ScrapCheerUpBtns from '../../components/Button/ScrapCheerUpBtns';
import ToTopButton from '../../components/Button/ToTopButton';

function CheerUpFeed() {
  const [postList, setPostList] = useState([]);
  const [bestBucketList, setBestBucketList] = useState([]);

  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    axios
      .get('http://i9a609.p.ssafy.io:8000/api/posts')
      .then((response) => {
        setPostList(response.data.data.postList.content);
        console.log(response);
        console.log('데이터 조회에 성공');
      })
      .catch((error) => console.log(error));

    axios
      .get('http://i9a609.p.ssafy.io:8000/api/posts/best')
      .then((response) => {
        setBestBucketList(response);
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
        <BestBucketList bestBucketList={bestBucketList} />
      </div>
      <br />
      <hr />
      <div className="main">
        {postList.map((post) => (
          <div className="article" key={post.postId}>
            <Member post={post} />
            <FeedForExplore
              post={post}
              onClick={() => handlePostClick(post.id)}
            />
            <ScrapCheerUpBtns cheerCnt={post.cheerCnt} />
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
      <div
        className="ToTopButtonDiv"
        style={{
          position: 'fixed',
          top: 675,
          transform: 'translateX(calc(100% + 260px))',
        }}
      >
        <ToTopButton />
      </div>
      <div
        className="NavDiv"
        style={{
          position: 'fixed',
          top: 736,
          width: '100%',
        }}
      >
        <Navbar />
      </div>
    </div>
  );
}

export default CheerUpFeed;