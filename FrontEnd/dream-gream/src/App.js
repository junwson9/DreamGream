import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom'
import PostSubject from './pages/Posting/postSubject';
import PostViewImage from './pages/Posting/postViewImage';
import PostDetail from './pages/Posting/postDetail';

function App() {
  return (
    <Routes>
      <Route path='/post' element={ <PostSubject/> }/>
      <Route path='/postdetail' element={ <PostDetail/> }/>
      <Route path='/image' element={ <PostViewImage/> }/>

    </Routes>
    
  );
}

export default App;
