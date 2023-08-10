/* eslint-disable */

import React from 'react';
import axiosInstance from '../../utils/axiosInterceptor';

import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

function TopbarForEdit({ post }) {
  const navigate = useNavigate();

  const handleLeftIconClick = () => {
    navigate(-1);
  };

  const handleUpdateClick = () => {
    const requestBody = {
      content: post.content,
      dead_line: post.dead_line,
      is_display: post.is_display,
      category_id: post.category_id,
    };

    axiosInstance
      .post(`${API_URL}/api/posts/${post.post_id}/unachieved`, requestBody)
      .then((response) => {
        console.log('수정완료:', response);
        navigate(-1);
      })
      .catch((error) => {
        console.error('수정실패:', error);
        console.log(requestBody);
      });
  };

  return (
    <div className="w-[360px] h-[60px] relative flex items-center justify-center">
      <CloseIcon
        className="w-[26px] h-[26px] left-[20px] top-[18px] absolute"
        onClick={handleLeftIconClick}
        style={{ cursor: 'pointer' }}
      />

      {/* ++나중에 달성하기 버튼으로 들어왔을 때 props로 받아와서 타이틀만 '달성 완료' */}
      <div className="text-zinc-800 text-[22px] font-bold leading-[30.80px]">
        수정하기
      </div>

      <div
        className="left-[307px] top-[19px] absolute text-right text-zinc-800 text-lg font-bold leading-[25.20px] cursor-pointer"
        //++{post.is_achieved 가 true이면 다른 api 주소로 보내야함}
        onClick={handleUpdateClick}
        style={{ cursor: 'pointer' }}
      >
        완료
      </div>
    </div>
  );
}

export default TopbarForEdit;
