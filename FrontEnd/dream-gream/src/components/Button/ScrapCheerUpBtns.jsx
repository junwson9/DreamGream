/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React from 'react';
import axios from 'axios';
// npm 설치 필요
// npm i -S react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as CheerUpIcon } from '../../assets/icons/CheerUpIcon.svg';

function ScrapCheerUpBtns({ cheerCnt }) {
  // const scrap = () => {
  //   const postData = {
  //     title: props.title,
  //     content: props.content,
  //     deadline: props.deadline,
  //     is_acheived: false,
  //     ai_img: props.ai_img,
  //     category_id: props.category_id,
  //   };
  //   // ++ post요청과 토스트 메시지 잘 되는지 확인 필요
  //   axios
  //     .post('/posts', postData)
  //     .then((response) => {
  //       console.log('스크랩 완료', response);
  //       toast.success('내 버킷리스트에 등록이 완료되었습니다', {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 2000,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('스크랩 에러 발생', error);
  //     });
  // };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[317px] h-8 justify-center items-start  inline-flex">
        <button
          type="button"
          // onClick={scrap}
          className="w-[152px] h-8 px-[34px] py-1.5 bg-white rounded-[10px] border border-indigo-400 justify-center items-center inline-flex mr-4"
        >
          <div className="text-indigo-400 text-[13px] font-bold leading-[18.20px]">
            나도할래
          </div>
        </button>

        {/* ++좋아요여부 확인하는 api 받아와서, 좋아요 상태일시 색반전 및 누를때마다 api로 좋아요 등록/취소 post */}
        <button
          type="button"
          className="w-[152px] h-8 px-[34px] py-1.5 bg-s rounded-[10px] border border-indigo-400 justify-center items-center inline-flex"
        >
          <div className="justify-center items-center gap-px flex">
            <CheerUpIcon style={{ fill: '#7887D4' }} />

            <div className="text-indigo-400 text-[13px] font-bold leading-[18.20px] w-[77px] ">
              응원해요 {cheerCnt}
            </div>
          </div>
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ScrapCheerUpBtns;
