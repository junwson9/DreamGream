import React, { useState, useEffect } from 'react';
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
  useEffect(() => {
    axios
      .get('http://i9a609.p.ssafy.io:8000/api/posts')
      .then((response) => {
        setPostList(response.data.data.postList.content);
        console.log(response);
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
        <BestBucketList />
      </div>
      <br />
      <hr />
      <div className="main">
        {postList.map((post) => (
          <div className="article" key={post.postId}>
            <Member post={post} />
            <FeedForExplore post={post} />
            <ScrapCheerUpBtns cheerCnt={post.cheerCnt} />
            <br />
            <hr />
          </div>
        ))}
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
