/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import { React, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInterceptor';

import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as CheerUpIcon } from '../../assets/icons/CheerUpIcon.svg';
import { API_URL } from '../../config';

function ScrapCheerUpBtns({ post }) {
  const [isCheered, setIsCheered] = useState(
    post.is_cheered === null ? false : post.is_celebrateed,
  );
  const [cheerCount, setCheerCount] = useState(post.cheer_cnt);

  const handleCheerClick = () => {
    const requestData = {
      post_id: post.post_id,
    };

    if (!isCheered) {
      axiosInstance
        .post(`${API_URL}/api/posts/cheers/add`, requestData)
        .then((response) => {
          console.log('응원하기 완료', response);

          setIsCheered(true);
          setCheerCount(cheerCount + 1);
        })
        .catch((error) => {
          console.error('응원하기 에러', error);
        });
    } else {
      axiosInstance
        .post(`${API_URL}/api/posts/cheers/remove`, requestData)
        .then((response) => {
          console.log('응원취소 완료', response);

          setIsCheered(false);
          setCheerCount(cheerCount - 1);
        })
        .catch((error) => {
          console.error('응원취소 에러', error);
          console.log(isCheered);
          console.log(requestData);
        });
    }
  };

  const scrap = () => {
    const scrapData = {
      post_id: post.post_id,
    };
    axiosInstance
      .post(`${API_URL}/api/posts/${post.post_id}/scrap`, scrapData)
      .then((response) => {
        console.log('스크랩 완료', response);
        toast.success('내 버킷리스트에 등록이 완료되었습니다', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log('스크랩 에러 발생', error);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[317px] h-8 justify-center items-start  inline-flex">
        <button
          type="button"
          onClick={scrap}
          className="w-[152px] h-8 px-[34px] py-1.5 bg-white rounded-[10px] border border-indigo-400 justify-center items-center inline-flex mr-4"
        >
          <div className="text-indigo-400 text-[13px] font-bold leading-[18.20px]">
            나도할래
          </div>
        </button>

        <button
          type="button"
          onClick={handleCheerClick}
          className={`w-[152px] h-8 px-[34px] py-1.5 rounded-[10px]  border border-indigo-400 justify-center items-center inline-flex
          ${isCheered ? 'bg-indigo-400' : 'bg-white'}
          `}
        >
          <div className="justify-center items-center gap-px flex">
            <CheerUpIcon style={{ fill: isCheered ? 'white' : '#7887D4' }} />

            <div
              className={`text-[13px] font-bold leading-[18.20px] w-[77px] ${
                isCheered ? 'text-white' : 'text-indigo-400 '
              }`}
            >
              응원해요
              {cheerCount}
            </div>
          </div>
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ScrapCheerUpBtns;
