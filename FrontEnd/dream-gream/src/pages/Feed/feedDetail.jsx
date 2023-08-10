/* eslint-disable camelcase */
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInterceptor';
// import './Main.scss';
import Topbar from '../../components/Common/Topbar';
import FeedForDetail from '../../components/Feed/FeedForDetail';
import AcheiveBtn from '../../components/Button/AcheiveBtn';
import ScrapCheerUpBtns from '../../components/Button/ScrapCheerUpBtns';
import Navbar from '../../components/Common/Navbar';
import Member from '../../components/Feed/Member';
import ContentCard from '../../components/Feed/ContentCard';
import { API_URL } from '../../config';

function FeedDetail() {
  const [post, setPost] = useState({});
  const { post_id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts/${post_id}`)
      .then((response) => {
        setPost(response.data.data.post);
        console.log(response);
        console.log('게시물 상세 조회');
      })
      .catch((error) => console.log(error));
    console.log('상세조회 실패');
    console.log(post_id);
  }, [post_id]);

  return (
    <>
      <div className="body" style={{ overflow: 'auto', overflowX: 'hidden' }}>
        <Topbar showCloseButton={false} />
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
