import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostSubject from './pages/Posting/postSubject';
import PostViewImage from './pages/Posting/postViewImage';
import PostDetail from './pages/Posting/postDetail';

function App() {
  return (
    <Routes>
      <Route path="/logIn" element={<logIn />} />
      <Route path="/oauth2/redirect" element={<oAuth2RedirectHandler />} />
      <Route path="/Siginupgenderbirth" element={<siginupGenderBirth />} />
      <Route path="/profileedit" element={<profileEdit />} />
      <Route path="/follow" element={<followUser />} />
      <Route path="/following" element={<followingUser />} />
      <Route path="/findmember" element={<findMember />} />
      <Route path="/cheerupfeed" element={<cheerUpFeed />} />
      <Route path="/acheivefeed" element={<acheiveFeed />} />
      <Route path="/feed/:id" element={<feedDetail />} />
      <Route path="/post" element={<PostSubject />} />
      <Route path="/postdetail" element={<PostDetail />} />
      <Route path="/image" element={<PostViewImage />} />
      <Route path="/myfeed" element={<myFeed />} />
      <Route path="/about" element={<viewAbout />} />
    </Routes>
  );
}

export default App;
