import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from './pages/members/Login';
import OAuth2RedirectHandler from './pages/members/OAuth2RedirectHandler';
import ProfileEdit from './pages/members/ProfileEdit';
import SignupGenderBirth from './pages/members/SiguUp';
import MyFeed from './pages/MyFeed/MyFeed';
import Posting from './pages/Posting/Posting';
import CheerUpFeed from './pages/Feed/cheerUpFeed';
import ShareImage from './components/Share/ShareImage';
import Follower from './pages/MyFeed/Follower';
import FindMember from './pages/members/FindMember';
import FeedDetail from './pages/Feed/feedDetail';
import ViewAbout from './pages/ViewMore/ViewAbout';
import Following from './pages/MyFeed/Following';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/Siginupgenderbirth" element={<SignupGenderBirth />} />
        <Route path="/profileedit" element={<ProfileEdit />} />
        <Route path="/follower/:memberId" element={<Follower />} />
        <Route path="/following/:memberId" element={<Following />} />
        <Route path="/findmember" element={<FindMember />} />
        <Route path="/post" element={<Posting />} />
        <Route path="/share" element={<ShareImage />} />
        <Route path="/myfeed" element={<MyFeed />} />
        <Route path="/about" element={<ViewAbout />} />
        <Route path="/acheivementupdate" element={<acheivementUpdate />} />
        <Route path="/updatepost" element={<updatePost />} />
        <Route path="/cheerUpFeed" element={<CheerUpFeed />} />
        <Route path="/acheivefeed" element={<acheiveFeed />} />
        <Route path="/feedid" element={<FeedDetail />} />
      </Routes>
    </div>
  );
}

export default App;
