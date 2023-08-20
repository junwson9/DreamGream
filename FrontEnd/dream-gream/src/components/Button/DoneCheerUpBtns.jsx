/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInterceptor';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as CheerUpIcon } from '../../assets/icons/CheerUpIcon.svg';
import { API_URL } from '../../config';

function DoneCheerUpBtns({ post }) {
  const navigate = useNavigate();

  const [isCheered, setIsCheered] = useState(
    post.is_cheered === null ? false : post.is_cheered,
  );
  const [cheerCount, setCheerCount] = useState(post.cheer_cnt);

  const goAcheivementUpdatePage = () => {
    navigate(`/updatepost/${post.post_id}`, {
      state: { change_is_achieved: true },
    });
  };

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
          navigate('/loginerror');
        });
    } else {
      axiosInstance
        .post(`${API_URL}/api/posts/cheers/remove`, requestData)
        .then((response) => {
          setIsCheered(false);
          setCheerCount(cheerCount - 1);
        })
        .catch((error) => {
          navigate('/loginerror');
        });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[317px] h-8 justify-center items-start  inline-flex">
        <button
          type="button"
          onClick={goAcheivementUpdatePage}
          className="w-[152px] h-8 px-[34px] py-1.5 bg-white rounded-[10px] border border-indigo-400 justify-center items-center inline-flex mr-4"
        >
          <div className="text-indigo-400 text-[13px] font-bold leading-[18.20px]">
            달성완료
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
              <span /> <span />
              {cheerCount}
            </div>
          </div>
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default DoneCheerUpBtns;
