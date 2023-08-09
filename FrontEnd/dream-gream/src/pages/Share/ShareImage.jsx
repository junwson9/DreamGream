/* eslint-disable */
import React, { useState,useRef,useEffect } from 'react'
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { ReactComponent as RightEllipse } from '../../assets/Ellipse60.svg';
import { ReactComponent as LeftEllipse } from '../../assets/Ellipse61.svg';
import Logo from '../../assets/logo.png';
import KakaoShare from '../../components/ShareButton/KakaoShare';
import axiosInstance from '../../utils/axiosInterceptor';
import { API_URL } from '../../config';


function ShareImage(){
  const memberId = localStorage.getItem('member_id')
  const [userData, setUserData] = useState(null);
//   const MmShare = (imageURL) => {
//     const WEBHOOK_URL = 'https://meeting.ssafy.com/hooks/q1x16pxcp3d1jm8sy11bsx8oue'; // Replace with your Mattermost webhook URL
//     const CHANNEL = 'tsmjakyjnpgnu8wg6fdr8wea7h'; // Replace with the target channel name
  
//     const POST_DATA = {
//       channel: CHANNEL,
//       username: 'test',
//       text: 'Here is the image:',
//       attachments: [
//         {
//           fallback: 'Image',
//           image_url: 	
//           'https://via.placeholder.com/300',
//         },
//       ],
//     };
  
//     fetch(WEBHOOK_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(POST_DATA),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('Image sent successfully:', data);
//       })
//       .catch((error) => {
//         console.error('Error sending image:', error);
//       });
//   };
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/api/members/${memberId}`);
        const fetchedUserData = response.data;
        setUserData(fetchedUserData); 
      } 
      catch (e) {
        console.error(e);
      }
    };
    getUser()
  }, [memberId]);
  const pageRef = useRef();

  const onSaveButtonClick = () => {
    const page = pageRef.current;

    domtoimage.toBlob(page).then(blob => {
      saveAs(blob, 'page.png');
    });
  };
  return(
    <div className="w-[360px] h-[800px] relative bg-white">
<div ref={pageRef} className="w-[360px] h-[800px] relative bg-white">
  <div>
<img src={Logo} alt="" className='absolute w-[200px] h-[200px] left-[75px]'/>
</div>
  <div className="w-48 h-48 left-[80px] top-[200px] absolute rounded-lg">
      <img src="https://ifh.cc/g/KyG9oQ.png/150x150" alt="" className="w-48 h-48 left-[0.01px] top-0 absolute bg-zinc-300 rounded-lg"/>
    <div className="w-48 h-48 left-0 top-0 absolute" />
  </div>
  {userData && (<div className="left-[193px] top-[527px] absolute justify-center items-center gap-1.5 inline-flex">
  <img style={{width: 30, height: 30, borderRadius: 9999}} src={userData.profile_img} />
    <div className="w-16 text-zinc-800 text-base font-normal leading-snug">{userData.nickname}</div>
  </div>)}
  <div className="w-[360px] h-3.5 left-0 top-0 absolute bg-[#7887D4] border border-[#7887D4]" />
  <div className="w-[360px] h-3.5 left-0 top-[786px] absolute bg-[#7887D4] border border-[#7887D4]" />
  <div>
  <div className="w-3.5 h-[800px] left-0 top-0 absolute bg-[#7887D4] border border-[#7887D4]" />
  <div className='flex ml-[14px] pt-[500px]'>
  <RightEllipse className=""/>
  <LeftEllipse className="ml-[302px]"/>
  </div>
  </div>
  <div>
  <div className="w-3.5 h-[800px] left-[346px] top-0 absolute bg-[#7887D4] border border-[#7887D4]" />
  </div>
  <div className="left-[65px] top-[435px] absolute text-center text-zinc-800 text-base font-medium leading-snug">기타 배워서 1곡 완벽하게 연주하기<br/>기타 배워서 1곡 완벽하게 연주하기</div>
  <div className="w-64 h-px left-[55px] top-[514px] absolute border border-neutral-200" />
  
  <div className="w-64 h-px left-[55px] top-[570.05px] absolute border border-neutral-200" />
  <div className="w-64 h-px left-[55px] top-[625.05px] absolute border border-neutral-200" />
  <div className="w-64 h-px left-[55px] top-[680.05px] absolute border border-neutral-200" />
  <div className="w-11 left-[65px] top-[531px] absolute text-zinc-500 text-base font-normal leading-snug whitespace-nowrap">작성자</div>
  <div className="w-11 left-[65px] top-[587.05px] absolute text-zinc-500 text-base font-normal leading-snug whitespace-nowrap">작성일</div>
  <div className="left-[193px] top-[587.05px] absolute text-zinc-800 text-base font-normal leading-snug whitespace-nowrap">2023.07.27</div>
  <div className="left-[193px] top-[641px] absolute text-zinc-800 text-base font-normal leading-snug whitespace-nowrap">10년 후</div>
  <div className="left-[65px] top-[641px] absolute text-zinc-500 text-base font-normal leading-snug whitespace-nowrap">목표 시기</div>
</div>
  <div className="w-64 h-8 px-8 py-1.5 left-[50px] top-[717px] absolute justify-center items-center gap-8 inline-flex">
    <button type="button" className="px-4 py-1.5 whitespace-nowrap text-indigo-400 text-xs font-bold leading-tight bg-white rounded-lg border border-indigo-400" onClick={onSaveButtonClick}>저장하기</button>
    <KakaoShare/>
  </div>
</div>
  );
};
export default ShareImage;