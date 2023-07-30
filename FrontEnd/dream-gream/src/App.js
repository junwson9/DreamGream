import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostSubject from './pages/Posting/postSubject';
import PostViewImage from './pages/Posting/postViewImage';
import LogIn from './pages/members/Logintest';
import OAuth2RedirectHandler from './pages/members/OAuth2RedirectHandler';
import SiginupGenderBirth from './pages/members/SiguUp';
import ProfileEdit from './pages/members/ProfileEdit';

function App() {
  return (
    <Routes>
      <Route path="/post" element={<PostSubject />} />
      <Route path="/image" element={<PostViewImage />} />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route path="/SiginupGenderBirth" element={<SiginupGenderBirth />} />
      <Route path="/ProfileEdit" element={<ProfileEdit />} />
    </Routes>
  );
}

export default App;
