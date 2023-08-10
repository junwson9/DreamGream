/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/alt-text */
import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import axiosInstance from '../../utils/axiosInterceptor';

import EditImg from '../../components/Edit/EditImg';
import EditInfo from '../../components/Edit/EditInfo';
import TopbarForEdit from '../../components/Edit/TopbarForEdit';
import ContentCard from '../../components/Feed/ContentCard';
import EditInfoForAcheive from '../../components/Edit/EditInfoForAcheive';
import { API_URL } from '../../config';

function EditFeed() {
  const [post, setPost] = useState({});
  const [isImgUpdated, setIsImgUpdated] = useState(false);
  const { post_id } = useParams();

  // 게시글 상세 조회
  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts/${post_id}`)
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

  // 이미지 수정
  const handleImageUpdate = (event) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    formData.append('img_update_flag', 'true');

    axiosInstance
      .post(`${API_URL}/api/posts/${post_id}/unachieved`, formData)
      .then((response) => {
        setIsImgUpdated(true);
        console.log(response);
        console.log('이미지 수정');
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      className="w-[360px] h-[800px] relative bg-white "
      style={{ overflow: 'auto', overflowX: 'hidden' }}
    >
      <TopbarForEdit post={post} />
      <hr />

      <div className="flex space-x-4 absolute top-[85px] left-1/2 transform translate-x-[-50%]">
        <EditImg post={post} isAiImg onageUpdate={handleImageUpdate} />
        {post.is_achieved && (
          <EditImg
            post={post}
            isAiImg={false}
            onImageUpdate={handleImageUpdate}
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
              <div
                className="w-[300px] left-[10px] top-[34px] absolute text-zinc-800 text-[13px] font-normal leading-[16.90px]"
                contentEditable
                onInput={handleContentChange}
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

      <div className="w-[360px] h-14 left-0 top-[613px] absolute bg-white">
        {/* ++세가지 인포정보 수정가능하도록 나중에 추가해야함 */}
        {post.is_achieved ? <EditInfoForAcheive /> : <EditInfo />}
      </div>
    </div>
  );
}

export default EditFeed;
