/* eslint-disable */

import React from 'react';
import axiosInstance from '../../utils/axiosInterceptor';
import axios from 'axios';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

function TopbarForEdit({ post, isAchievedChanged, imgFile }) {
  console.log(`post.isachieved상태:${post.is_achieved}`);
  const navigate = useNavigate();

  const handleLeftIconClick = () => {
    navigate(-1);
  };

  const handleUpdateClick = () => {
    // 만약 post.is_achieved가 false라면, (달성전 요청)
    if (!post.is_achieved) {
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
    }
    // 만약 post.is_achieved가 true라면, (달성후 요청)
    else {
      // console.log(`달성후면 이게 실행됩니다`);
      // console.log(`이미지 파일:${imgFile}`);

      const formData = new FormData();
      const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
      const requestPart = {
        content: post.content,
        dead_line: '언젠가아ㅏ',
        // ++공개여부 데이터 입력값에 따라 수정
        is_display: post.is_display,
        //  ++좀 고민해봐야함
        is_achieved: true,
        achievement_content: 'ㅋㅋ달성소감',
        // ++달성일 데이터 입력값에 따라 수정
        achieved_date: '2023-08-11T12:34:56',
        // ++가져와야함.
        img_update_flag: true,
        // ++카테고리 데이터 입력값에 따라 수정
        category_id: post.category_id,
      };

      const achievedPostUpdateRequestDto = JSON.stringify(requestPart);
      formData.append(
        'achievedPostUpdateRequestDto',
        new Blob([achievedPostUpdateRequestDto], { type: 'application/json' }),
      );

      // formData.append(
      //   'achievedPostUpdateRequestDto',
      //   JSON.stringify(requestPart),
      // );

      console.log('어펜드확인');
      for (let value of formData.values()) {
        console.log(value);
      }
      //

      formData.append('file', imgFile);

      //

      console.log('어펜드 전체확인');
      for (let value of formData.values()) {
        console.log(value);
      }

      //console.log(`이미지파일 타입 확인 : ${imgFile.type}`);
      console.log(`postId:${post.post_id}`);
      axios
        .post(`${API_URL}/api/posts/${post.post_id}/achieved`, formData, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('달성 등록 완료:', response);
          navigate(-1);
        })
        .catch((error) => {
          console.error('달성 등록 실패:', error);
          console.log(requestPart);
        });
    }
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
        {isAchievedChanged ? '달성 완료' : '수정하기'}
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
