import './App.css';
import React from 'react';

import {Routes, Route} from 'react-router-dom'
import PostSubject from './pages/Posting/postSubject';
import PostViewImage from './pages/Posting/postViewImage';
import LogIn from './pages/Login/Logintest';


function App() {
  return (
    <Routes>
      <Route path='/post' element={ <PostSubject/> }/>
      <Route path='/image' element={ <PostViewImage/> }/>
      <Route path="/login" element={<LogIn />} />
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
      {/* <Route path="/" element={}/> */}
    </Routes>
  );
}

export default App;
