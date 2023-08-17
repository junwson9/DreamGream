/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInterceptor';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as CheerUpIcon } from '../../assets/icons/CheerUpIcon.svg';
import { API_URL } from '../../config';

function ScrapCheerUpBtns({ post }) {
  const navigate = useNavigate()
  const [isCheered, setIsCheered] = useState(
    post.is_cheered === null ? false : post.is_cheered,
  );
  const [cheerCount, setCheerCount] = useState(post.cheer_cnt);

  useEffect(() => {
    setCheerCount(post.cheer_cnt);
    setIsCheered(post.is_cheered === null ? false : post.is_cheered);
  }, [post]);

  const handleCheerClick = () => {
    const requestData = {
      post_id: post.post_id,
    };

    if (!isCheered) {
      axiosInstance
        .post(`${API_URL}/api/posts/cheers/add`, requestData)
        .then((response) => {

          setIsCheered(true);
          setCheerCount(cheerCount + 1);
        })
        .catch((error) => {
          navigate('/loginerror')
          
        });
    } else {
      axiosInstance
        .post(`${API_URL}/api/posts/cheers/remove`, requestData)
        .then((response) => {

          setIsCheered(false);
          setCheerCount(cheerCount - 1);
        })
        .catch((error) => {
          navigate('/loginerror')
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
        toast.info('내 버킷리스트에 등록이 완료되었습니다', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((error) => {
        navigate('/loginerror')
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
