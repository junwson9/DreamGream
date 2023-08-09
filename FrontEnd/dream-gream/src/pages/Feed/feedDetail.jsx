import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import './Main.scss';
import Topbar from '../../components/Common/Topbar';
import FeedForDetail from '../../components/Feed/FeedForDetail';
import AcheiveBtn from '../../components/Button/AcheiveBtn';
import ScrapCheerUpBtns from '../../components/Button/ScrapCheerUpBtns';
import Navbar from '../../components/Common/Navbar';
import Member from '../../components/Feed/Member';
import ContentCard from '../../components/Feed/ContentCard';

function FeedDetail() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    axios
      .get(`http://i9a609.p.ssafy.io:8000/api/posts/${postId}`)
      .then((response) => {
        setPost(response.data.data.postList.content);
        console.log(response);
        console.log('데이터 조회에 성공');
      })
      .catch((error) => console.log(error));
  }, []);


  
  return (
    <>
      <div className="body" style={{ overflow: 'auto', overflowX: 'hidden' }}>
        <Topbar />
        <div className="main">
          <Member post={post} />
          <FeedForDetail post={post} />
          <br />
          <hr />
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ContentCard title="시작하는 마음" post={post} />
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {post.is_acheived ? (
              <ContentCard title="달성 소감" post={post} />
            ) : null}
          </div>
          <br />
          {post.is_acheived ? null : <AcheiveBtn />}

          <br />
          <br />
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
      <div style={{ position: 'fixed', top: 736 }}>
        <Navbar />
      </div>
    </>
  );
}

export default FeedDetail;
