import { React, useState, useEffect } from 'react';
// import './Main.scss';
import Topbar from '../../components/Common/Topbar';
import CategoryButtons from '../../components/Button/CategoryButtons';
import BestBucketList from '../../components/Feed/BestBucketList';
import FeedAcheived from '../../components/Feed/FeedAcheived';
import Navbar from '../../components/Common/Navbar';
import { API_URL } from '../../config';

export default function acheiveFeed() {
  const [acheivedfeeddata, setAcheivedFeedData] = useState([]);
  const [bestfeeddata, setBestFeedData] = useState([]);

  useEffect(() => {
    //++여기서 넘겨주는 데이터 형식이 어떤건지 확인이 필요하다
    fetch('/posts/acheived?category_name={categroy_name}', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setAcheivedFeedData(data);
      });

    fetch('/posts/best/achieved', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setBestFeedData(data);
      });
  }, []);

  return (
    <div className="body">
      <Topbar />
      <div className="header">
        <CategoryButtons />
        <BestBucketList bestfeeddata={bestfeeddata} />
      </div>
      <div className="main">
        {/* props로 전달하는 부분! */}
        <FeedAcheived feeddata={acheivedfeeddata} />
      </div>
      <div className="footer">
        <Navbar />
      </div>
    </div>
  );
}
