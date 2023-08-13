import React, { useRef } from 'react'
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RightEllipse } from '../../assets/Ellipse60.svg';
import { ReactComponent as LeftEllipse } from '../../assets/Ellipse61.svg';
import Logo from '../../assets/logo.png';
import { ReactComponent as DefaultProfile } from '../../assets/default_profile.svg';

function ShareImage(){
  const navigate = useNavigate();
  const extractTimePart = (dateTimeString) => {
    const parts = dateTimeString.split('T');
    return parts[0];
  }
  const sharedPost = useSelector(state => state.share.sharedPost)
  
  const pageRef = useRef();
  const onSaveButtonClick = async () => {
    const page = pageRef.current;
    const canvas = await html2canvas(page,{useCORS: true});
    canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'page.png';
        link.click();
        URL.revokeObjectURL(link.href);
        navigate(-1);
      });
    };
    const imgURL = `${sharedPost.ai_img}?data=1`

  return(
    <div className="w-[360px] h-[800px] relative bg-white">
<div ref={pageRef} className="w-[360px] h-[800px] relative bg-white">
  <div>
<img src={Logo} alt="" className='absolute w-[200px] h-[200px] left-[75px]'/>
</div>
  <div className="w-48 h-48 left-[80px] top-[200px] absolute rounded-lg">
      <img src={imgURL} crossOrigin={process.env.REACT_APP_ORIGIN_URL} alt="" className="w-48 h-48 left-[0.01px] top-0 absolute bg-zinc-300 rounded-lg"/>
    <div className="w-48 h-48 left-0 top-0 absolute" />
  <div className="w-48 mt-[200px] text-center text-zinc-800 text-base font-medium leading-snug">{sharedPost.title}</div>
  </div>
  {sharedPost && (<div className="left-[193px] top-[527px] absolute justify-center items-center gap-1.5 inline-flex">
  {sharedPost.profile_img ?(<img style={{width: 30, height: 30, borderRadius: 9999}} src={sharedPost.profile_img} alt=""/>) : (<DefaultProfile className="w-[30px] h-[30px]"/>)}
    <div className="w-16 text-zinc-800 text-base font-normal leading-snug">{sharedPost.nickname}</div>
  </div>)}
  <div className="w-[360px] h-3.5 left-0 top-0 absolute bg-[#7887D4] border border-[#7887D4]" />
  <div className="w-[360px] h-3.5 left-0 top-[786px] absolute bg-[#7887D4] border border-[#7887D4]" />
  <div>
  <div className="w-3.5 h-[800px] left-0 top-0 absolute bg-[#7887D4] border border-[#7887D4]" />
  <div className='flex ml-[14px] pt-[500px]'>
  <RightEllipse className=""/>
  <div className='ml-[303px]'>
  <LeftEllipse/>
  </div>
  </div>
  </div>
  <div>
  <div className="w-3.5 h-[800px] left-[346px] top-0 absolute bg-[#7887D4] border border-[#7887D4]" />
  </div>
  <div className="w-64 h-px left-[55px] top-[514px] absolute border border-neutral-200" />
  
  <div className="w-64 h-px left-[55px] top-[570.05px] absolute border border-neutral-200" />
  <div className="w-64 h-px left-[55px] top-[625.05px] absolute border border-neutral-200" />
  <div className="w-64 h-px left-[55px] top-[680.05px] absolute border border-neutral-200" />
  <div className="w-11 left-[65px] top-[531px] absolute text-zinc-500 text-base font-normal leading-snug whitespace-nowrap">작성자</div>
  <div className="w-11 left-[65px] top-[587.05px] absolute text-zinc-500 text-base font-normal leading-snug whitespace-nowrap">작성일</div>
  <div className="left-[193px] top-[587.05px] absolute text-zinc-800 text-base font-normal leading-snug whitespace-nowrap">{extractTimePart(sharedPost.created_date)}</div>
  <div className="left-[193px] top-[641px] absolute text-zinc-800 text-base font-normal leading-snug whitespace-nowrap">{sharedPost.dead_line}</div>
  <div className="left-[65px] top-[641px] absolute text-zinc-500 text-base font-normal leading-snug whitespace-nowrap">목표 시기</div>
</div>
  <div className="w-64 h-8 px-8 py-1.5 left-[50px] top-[717px] absolute justify-center items-center gap-8 inline-flex">
    <button type="button" className="px-24 py-1.5 whitespace-nowrap text-indigo-400 text-xs font-bold leading-tight bg-white rounded-lg border border-indigo-400" onClick={onSaveButtonClick}>완료</button>
  </div>
</div>
  );
};
export default ShareImage;