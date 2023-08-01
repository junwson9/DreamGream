import { React, useState, useEffect } from 'react';
// import './Main.scss';
import Topbar from '../../components/Common/Topbar';
import FeedForDetail from '../../components/Feed/FeedForDetail';
import ContentCard from '../../components/Feed/ContentCard';
import ScrapLikeBtns from '../../components/Button/ScrapLikeBtns';
import AcheiveBtn from '../../components/Button/AcheiveBtn';
import Navbar from '../../components/Common/Navbar';

export default function feedDetail() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    //++여기서 넘겨주는 데이터 형식이 어떤건지 확인이 필요하다
    fetch('/posts/{post_id}', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
  }, []);

  return (
    <div className="body">
      <Topbar />
      <div className="main">
        {/* props로 전달하는 부분! */}
        <FeedForDetail post={post} />
        {/* ++로그인유저닉네임 변수 설정 필요 */}
        {/* 버튼부분 */}
        {post.nickname === loggedInUserNickname && !post.is_acheived ? (
          <AcheiveBtn />
        ) : (
          <ScrapLikeBtns />
        )}
      </div>
      <div className="footer">
        <Navbar />
      </div>
    </div>
  );
}
