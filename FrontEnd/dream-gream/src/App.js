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
import Follow from './pages/MyFeed/Follow';
import FindMember from './pages/members/FindMember';
import FeedDetail from './pages/Feed/feedDetail';
import ViewAbout from './pages/ViewMore/ViewAbout';
import UpdatePost from './pages/Feed/editFeed';
import Test222 from './components/Edit/TopbarForEdit';
import Test333 from './components/Common/Topbar2';
import Test444 from './components/Common/Topbar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/Siginupgenderbirth" element={<SignupGenderBirth />} />
        <Route path="/profileedit" element={<ProfileEdit />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/following" element={<followingUser />} />
        <Route path="/findmember" element={<FindMember />} />
        <Route path="/cheerUpFeed" element={<CheerUpFeed />} />
        <Route path="/acheivefeed" element={<acheiveFeed />} />
        <Route path="/feedid" element={<FeedDetail />} />
        <Route path="/post" element={<Posting />} />
        <Route path="/share" element={<ShareImage />} />
        <Route path="/myfeed" element={<MyFeed />} />
        <Route path="/about" element={<ViewAbout />} />
        <Route path="/updatepost" element={<UpdatePost />} />
        <Route path="/acheivementupdate" element={<acheivementUpdate />} />
        <Route path="/test222" element={<Test222 />} />
        <Route path="/test333" element={<Test333 />} />
        <Route path="/test444" element={<Test444 />} />
      </Routes>
    </div>
  );
}

export default App;
