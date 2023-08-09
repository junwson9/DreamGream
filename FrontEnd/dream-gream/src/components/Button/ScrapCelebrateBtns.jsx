// /* eslint-disable react/prop-types */
// /* eslint-disable react/destructuring-assignment */
// /* eslint-disable react/button-has-type */
// import React from 'react';
// import axios from 'axios';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ReactComponent as CelebrateIcon } from '../../assets/icons/CelebrateIcon.svg';

// function ScrapCelebrateBtns(props) {
//   const scrap = () => {
//     const postData = {
//       title: props.title,
//       content: props.content,
//       deadline: props.deadline,
//       is_acheived: false,
//       ai_img: props.ai_img,
//       category_id: props.category_id,
//     };
//     axios
//       .post('/posts', postData)
//       .then((response) => {
//         console.log('스크랩 완료', response);
//         toast.success('내 버킷리스트에 등록이 완료되었습니다', {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 2000,
//         });
//       })
//       .catch((error) => {
//         console.log('스크랩 에러 발생', error);
//       });
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <div className="w-[317px] h-8 justify-center items-start  inline-flex">
//         <button
//           type="button"
//           onClick={scrap}
//           className="w-[152px] h-8 px-[34px] py-1.5 bg-white rounded-[10px] border border-indigo-400 justify-center items-center inline-flex mr-4"
//         >
//           <div className="text-indigo-400 text-[13px] font-bold leading-[18.20px]">
//             나도할래
//           </div>
//         </button>

//         {/* ++좋아요여부 확인하는 api 받아와서, 좋아요 상태일시 색반전 및 누를때마다 api로 좋아요 등록/취소 post */}
//         <button
//           type="button"
//           className="w-[152px] h-8 px-[34px] py-1.5 bg-s rounded-[10px] border border-indigo-400 justify-center items-center inline-flex"
//         >
//           <div className="justify-center items-center gap-px flex">
//             <CelebrateIcon style={{ fill: '#7887D4' }} />

//             <span />
//             <span />

//             <div className="text-indigo-400 text-[13px] font-bold leading-[18.20px] w-[77px]">
//               축하해요 144
//               {props.celebrate_cnt}
//             </div>
//           </div>
//         </button>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// }

// export default ScrapCelebrateBtns;
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import { React, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInterceptor';

import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as CelebrateIcon } from '../../assets/icons/CelebrateIcon.svg';
import { API_URL } from '../../config';

function ScrapCelebrateBtns({ post }) {
  const [isCelebrated, setIsCelebrated] = useState(post.is_celebrateed);
  const [celebrateCount, setCelebrateCount] = useState(post.celebrate_cnt);

  const handleCelebrateClick = () => {
    const requestData = {
      post_id: post.post_id,
      member_id: parseInt(localStorage.getItem('member_id'), 10),
    };

    if (!isCelebrated) {
      axiosInstance
        .post(`${API_URL}/api/posts/celebrates/add`, requestData)
        .then((response) => {
          console.log('축하하기 완료', response);

          toast.success('축하가 완료되었습니다', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setIsCelebrated(true);
          setCelebrateCount(celebrateCount + 1);
        })
        .catch((error) => {
          console.error('축하하기 에러', error);
        });
    } else {
      axiosInstance
        .post(`${API_URL}/api/posts/celebrates/remove`, requestData)
        .then((response) => {
          console.log('축하취소 완료', response);
          toast.success('축하하기가 취소되었습니다', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setIsCelebrated(false);
          setCelebrateCount(celebrateCount - 1);
        })
        .catch((error) => {
          console.error('축하취소 에러', error);
          console.log(isCelebrated);
          console.log(requestData);
        });
    }
  };

  const scrap = () => {
    const scrapData = {};
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
          onClick={handleCelebrateClick}
          className={`w-[152px] h-8 px-[34px] py-1.5 rounded-[10px]  border border-indigo-400 justify-center items-center inline-flex
          ${isCelebrated ? 'bg-indigo-400' : 'bg-white'}
          `}
        >
          <div className="justify-center items-center gap-px flex">
            <CelebrateIcon
              style={{ fill: isCelebrated ? 'white' : '#7887D4' }}
            />

            <div
              className={`text-[13px] font-bold leading-[18.20px] w-[77px] ${
                isCelebrated ? 'text-white' : 'text-indigo-400 '
              }`}
            >
              축하해요
              {celebrateCount}
            </div>
          </div>
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ScrapCelebrateBtns;
