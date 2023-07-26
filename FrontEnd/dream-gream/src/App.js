import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostSubject from './pages/Posting/postSubject';

function App() {
  return (
    <Routes>
      <Route path="/post" element={<PostSubject />} />
    </Routes>
  );
}

export default App;
