import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdatePost() {
  const { postId } = useParams(); // postId를 useParams 훅을 통해 받아옵니다

  useEffect(() => {
    // postId를 이용해서 해당 포스트 정보를 가져오거나 로직을 수행할 수 있습니다.
    axios.get(`http://i9a609.p.ssafy.io:8000/api/posts/${postId}`)
      .then((response) => {
        // response에서 필요한 작업 수행
      })
  }, [postId]); // postId가 변경될 때마다 useEffect가 실행되도록 설정합니다

  return (
    <div>
      {/* 컴포넌트 내용 */}
    </div>
  );
}

export default UpdatePost;
