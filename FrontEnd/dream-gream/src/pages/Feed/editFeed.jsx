/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/alt-text */
import { React, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import axios from 'axios';
import axiosInstance from '../../utils/axiosInterceptor';

import TopbarForEdit from '../../components/Edit/TopbarForEdit';
import EditImg from '../../components/Edit/EditImg';
import ContentCard from '../../components/Feed/ContentCard';
import EditInfo from '../../components/Edit/EditInfo';
import EditInfoForAcheive from '../../components/Edit/EditInfoForAcheive';
import { API_URL } from '../../config';

function EditFeed() {
  const [post, setPost] = useState({});
  const { post_id } = useParams();
  const [imgFile, setimgFile] = useState('');
  const [achievedDate, setAchievedDate] = useState('');

  const handleDateChange = (event) => {
    const selectedDateStr = event.target.value;
    const selectedDate = new Date(selectedDateStr);
    const formattedDate = selectedDate.toISOString();
    setAchievedDate(formattedDate);

    console.log(`formattedDate:${formattedDate}`);
    console.log(`achievedDate:${achievedDate}`);
  };
  console.log(`achievedDate:${achievedDate}`);

  const updateImgFile = (newimgFile) => {
    setimgFile(newimgFile);
  };

  // 달성완료 버튼을 통해서 온건지 확인
  const location = useLocation();
  const isAchievedChanged = location.state && location.state.change_is_achieved;

  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const loginFlag = accessToken !== null;

  // 게시글 상태 업데이트 함수
  const updatePostAchievedStatus = (newAchievedStatus) => {
    setPost((prevPost) => ({
      ...prevPost,
      is_achieved: newAchievedStatus,
    }));
  };

  // isAchievedChanged 값 변경 감지하여 post 상태 업데이트
  useEffect(() => {
    if (isAchievedChanged && !post.is_achieved) {
      // Only update if isAchievedChanged is true and post.is_achieved is not already true
      updatePostAchievedStatus(true);
    }
  }, [isAchievedChanged, post.is_achieved]);

  // 게시글 상세 조회
  useEffect(() => {
    axiosInstance
      .get(`${API_URL}/api/posts/${post_id}`, {
        params: {
          'login-flag': loginFlag,
        },
      })
      .then((response) => {
        setPost(response.data.data.post);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);

  // 게시글 내용 수정
  const handleContentChange = (event) => {
    const newContent = event.target.innerHTML;
    setPost((prevPost) => ({ ...prevPost, content: newContent }));
  };

  return (
    <div
      className="w-[360px] h-[800px] relative bg-white "
      style={{ overflow: 'auto', overflowX: 'hidden' }}
    >
      <TopbarForEdit
        post={post}
        isAchievedChanged={isAchievedChanged}
        imgFile={imgFile}
      />
      <hr />

      <div className="flex space-x-4 absolute top-[85px] left-1/2 transform translate-x-[-50%]">
        <EditImg
          post={post}
          isAiImg
          imgFile={imgFile}
          updateImgFile={updateImgFile}
        />
        {post.is_achieved && (
          <EditImg
            post={post}
            isAiImg={false}
            imgFile={imgFile}
            updateImgFile={updateImgFile}
          />
        )}
      </div>
      <div className="w-[315px] left-[22px] top-[267px] absolute text-zinc-800 text-[17px] font-medium leading-normal">
        {post.title}
      </div>
      <div className="w-[360px] h-[0px] left-0 top-[369px] absolute border border-zinc-300" />
      <div className="w-[319px] h-[165px] left-[17px] top-[395px] absolute">
        <div className="w-[319px] h-[180px] relative bg-[#DEE2F4] rounded-[10px]">
          <div className="card-title w-[97px] h-[9.17px] left-[10px] top-[9.09px] absolute text-zinc-800 text-[13px] font-medium leading-[16.90px]">
            시작하는 마음
          </div>

          <div
            className="w-[300px] left-[10px] top-[34px] absolute text-zinc-800 text-[13px] font-normal leading-[16.90px]"
            contentEditable
            onBlur={handleContentChange}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        {post.is_achieved && (
          <>
            <br />
            <div className="w-[319px] h-[180px] relative bg-[#DEE2F4] rounded-[10px]">
              <div className="card-title w-[97px] h-[9.17px] left-[10px] top-[9.09px] absolute text-zinc-800 text-[13px] font-medium leading-[16.90px]">
                달성 소감
              </div>
              {/* ++시작하는 마음의 내용과 동기화되는거 수정 */}
              <div
                className="w-[300px] left-[10px] top-[34px] absolute text-zinc-800 text-[13px] font-normal leading-[16.90px]"
                contentEditable
                onBlur={handleContentChange}
                dangerouslySetInnerHTML={{ __html: post.achievement_content }}
              />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        )}
      </div>

      <div className="w-[360px] h-14 left-0 top-[813px] absolute bg-white">
        {/* ++세가지 인포정보 수정가능하도록 나중에 추가해야함 */}
        {post.is_achieved ? (
          <EditInfoForAcheive
            achievedDate={achievedDate}
            handleDateChange={handleDateChange}
          />
        ) : (
          <EditInfo
            achievedDate={achievedDate}
            handleDateChange={handleDateChange}
          />
        )}
      </div>
    </div>
  );
}

export default EditFeed;
