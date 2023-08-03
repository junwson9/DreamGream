import { React, useState, useEffect } from 'react';
// import './Main.scss';
import Topbar from '../../components/Common/Topbar';
import CategoryButtons from '../../components/Button/CategoryButtons';
import BestBucketList from '../../components/Feed/BestBucketList';
import FeedForExplore from '../../components/Feed/FeedForExplore';
import Navbar from '../../components/Common/Navbar';
import Member from '../../components/Feed/Member';
import ScrapLikeBtns from '../../components/Button/ScrapLikeBtns';
import ToTopButton from '../../components/Button/ToTopButton';

export default function cheerUpFeed() {
  // const [feeddata, setFeedData] = useState([]);
  // const [bestfeeddata, setBestFeedData] = useState([]);

  // useEffect(() => {
  //   //++여기서 넘겨주는 데이터 형식이 어떤건지 확인이 필요하다
  //   fetch('/posts?category_name={categroy_name}', { method: 'GET' })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFeedData(data);
  //     });

  //   fetch('/posts/best', { method: 'GET' })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBestFeedData(data);
  //     });
  // }, []);

  return (
    <div className="body">
      <Topbar />
      <div className="header">
        <CategoryButtons />
        <BestBucketList />
      </div>
      <div className="main">
        <Member />
        <FeedForExplore />
        <ScrapLikeBtns />
        <Member />
        <FeedForExplore />
        <ScrapLikeBtns />
      </div>
      <div className="footer">
        <ToTopButton />
        <Navbar />
      </div>
    </div>
  );
}
