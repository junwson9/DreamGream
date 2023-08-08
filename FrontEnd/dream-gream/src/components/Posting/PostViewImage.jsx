import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInterceptor';
import Loading from './Loding';
import SolidButton from '../Button/SolidButton';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import Modal from '../Modal/Modal';
import { API_URL } from '../../config';

function PostViewImage({ handleCloseIconClick }) {
  const imageUrl = useSelector((state) => state.sse.sseData); // 이미지 URL을 Redux 상태에서 가져옴
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const subjectData = useSelector((state) => state.post.subject);
  const detailData = useSelector((state) => state.post.detail);
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsLoading(false); // 이미지 로딩이 끝났을 때 isLoading 상태를 false로 변경
  };

  // 리덕스로부터 모든정보 가져오는 로직도 있어야함

  const postData = {
    imageUrl,
    subjectData,
    detailData,
  };
  // 여기에 다있음 @@@@@@@@@@@@@@@@@@@@@@@ 근데 목표시기도 정해야함!@@@@@@@@@@@@@

  console.log(postData);
  const sendPostInfo = async () => {
    console.log('게시물 보내!!!!');
    try {
      // POST 요청은 body에 실어 보냄
      await axiosInstance.post(`${API_URL}/api/posts`, {
        category_id: postData.subjectData.categoryID,
        title: postData.subjectData.title,
        content: postData.detailData.content,
        dead_line: postData.detailData.selectedPeriod,
        is_display: postData.detailData.isPublic,
        ai_img: postData.imageUrl.url,
      });
      navigate('/myfeed');
      // 여기에서 내피드로? 물어보기 이건 라우터 옮기면된다
    } catch (e) {
      console.error(e);
    }
  };

  console.log('Image URL:', imageUrl && imageUrl.url);

  return (
    <div>
      {isLoading ? <Loading /> : null}
      {imageUrl && imageUrl.url && (
        <div>
          <div className="w-[360px] h-[800px] pb-12 bg-white flex-col justify-start items-center inline-flex">
            <div className="self-stretch flex-col justify-start items-center gap-11 inline-flex">
              <div className="w-[360px] h-[60px] relative border-b">
                <CloseIcon
                  className="w-[26px] h-[26px] left-[20px] top-[18px] absolute z-[1]"
                  onClick={handleCloseIconClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="text-zinc-800 text-3xl font-medium leading-10">
                꿈 그림이 도착했어요!
              </div>
              <img
                className="w-72 h-72 rounded-xl"
                src={imageUrl.url}
                alt="Post"
                onLoad={handleImageLoad}
              />
              <div className="text-center text-zinc-800 text-xl font-medium leading-loose px-[36px]">
                {subjectData.title}
              </div>
              <div className="w-80 h-14 bg-indigo-400 rounded-lg justify-center items-center inline-flex">
                <SolidButton name="피드 올리기" onClick={sendPostInfo} />
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <Modal handleCloseModal={handleCloseModal} />}
    </div>
  );
}
PostViewImage.propTypes = {
  handleCloseIconClick: PropTypes.func.isRequired,
};
export default PostViewImage;
