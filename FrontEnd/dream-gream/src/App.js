import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LogIn from './pages/members/Login';
import OAuth2RedirectHandler from './pages/members/OAuth2RedirectHandler';
import ProfileEdit from './pages/members/ProfileEdit';
import SignupGenderBirth from './pages/members/SiguUp';
import MyFeed from './pages/MyFeed/MyFeed';
import Posting from './pages/Posting/Posting';
import CheerUpFeed from './pages/Feed/cheerUpFeed';
import ShareImage from './pages/Share/ShareImage';
import Follower from './pages/MyFeed/Follower';
import Following from './pages/MyFeed/Following';
import FindMember from './pages/members/FindMember';
import FeedDetail from './pages/Feed/feedDetail';
import ViewAbout from './pages/ViewMore/ViewAbout';
import Navbar from './components/Common/Navbar';
import LoginError from './pages/members/LoginError';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 스플래시 스크린을 보여주는 시간 (밀리초 단위)
  }, []);

  return (
    <div className="App">
      {showSplash ? (
        <div className={`splash ${showSplash ? 'animate-splash' : ''}`}>
          <img src="/splashscreen.png" alt="" />
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/cheerUpFeed" />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route
              path="/oauth2/redirect"
              element={<OAuth2RedirectHandler />}
            />
            <Route path="/Siginupgenderbirth" element={<SignupGenderBirth />} />
            <Route path="/profileedit" element={<ProfileEdit />} />
            <Route
              path="/follower/:memberId"
              element={
                <>
                  <Follower />
                  <Navbar className="Navbar" />
                </>
              }
            />
            <Route
              path="/following/:memberId"
              element={
                <>
                  <Following />
                  <Navbar className="Navbar" />
                </>
              }
            />
            <Route
              path="/follow/:memberId"
              element={
                <>
                  <Following />
                  <Navbar className="Navbar" />
                </>
              }
            />
            <Route path="/findmember" element={<FindMember />} />
            <Route path="/post" element={<Posting />} />
            <Route path="/share" element={<ShareImage />} />
            <Route
              path="/myfeed"
              element={
                <>
                  <MyFeed />
                  <Navbar className="Navbar" />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <ViewAbout />
                  <Navbar className="Navbar" />
                </>
              }
            />
            <Route path="/acheivementupdate" element={<acheivementUpdate />} />
            <Route path="/updatepost" element={<updatePost />} />
            <Route
              path="/cheerUpFeed"
              element={
                <>
                  <CheerUpFeed />
                  <Navbar className="Navbar" />
                </>
              }
            />
            <Route
              path="/acheivefeed"
              element={
                <>
                  <acheiveFeed />
                  <Navbar className="Navbar" />
                </>
              }
            />
            <Route
              path="/feed/:post_id"
              element={
                <>
                  <FeedDetail />
                  <Navbar className="Navbar" />
                </>
              }
            />
            <Route path="/LoginError" element={<LoginError />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
