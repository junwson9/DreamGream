/* eslint-disable jsx-a11y/alt-text */
import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import EditImg from '../../components/Edit/EditImg';
import EditInfo from '../../components/Edit/EditInfo';
import TopbarForEdit from '../../components/Edit/TopbarForEdit';
import ContentCard from '../../components/Feed/ContentCard';
import EditInfoForAcheive from '../../components/Edit/EditInfoForAcheive';

function EditFeed() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    axios
      .get(
        `/posts/${postId}
      `,
      )
      .then((response) => {
        setPost(response.data.data.postList.content);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleContentChange = (event) => {
    const newContent = event.target.innerHTML;
    setPost((prevPost) => ({ ...prevPost, content: newContent }));
  };

  return (
    <div
      className="w-[360px] h-[800px] relative bg-white "
      style={{ overflow: 'auto', overflowX: 'hidden' }}
    >
      <TopbarForEdit />
      <hr />

      <div className="flex space-x-4 absolute top-[85px] left-1/2 transform translate-x-[-50%]">
        <EditImg />
        {/* {post.is_acheived && <EditImg />} */}
      </div>
      <div className="w-[315px] left-[22px] top-[267px] absolute text-zinc-800 text-[17px] font-medium leading-normal">
        에베레스트 등산하기 에베레스트 등산하기 에베레스트 등산하기 에베레스트
        등산하기 에베레스트 등산하기
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
            onInput={handleContentChange}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        {post.is_acheived && (
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
                dangerouslySetInnerHTML={{ __html: post.acheivement_content }}
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
        {post.is_acheived ? <EditInfoForAcheive /> : <EditInfo />}
      </div>
    </div>
  );
}

export default EditFeed;
