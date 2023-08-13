/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { shareKakao } from '../../utils/shareKakaoLink';
import { setSharedPost } from '../../store/actions/shareActions';

function ModalForShare({ setShareModalOpen,post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeShareModal = () => {
    setShareModalOpen(false);
  };
  
  const moveShare = () => {
    console.log(post)
    dispatch(setSharedPost(post));
    navigate('/share')
    
  }
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);
  return (
    <div
      className='"modal-container'
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 0,
        zIndex: 999,
      }}
    >
      <div className="w-[360px] h-[800px] bg-[#000000] opacity-[15%] relative" />

      <div className="left-[11px] top-[617px] absolute flex-col justify-start items-start inline-flex">
        <button
          type="button"
          className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-zinc-300 justify-center items-center gap-2.5 inline-flex whitespace-nowrap"
        >
          <div className="text-center text-black text-sm">URL 복사</div>
        </button>
        <button
          type="button"
          className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white border-b border-zinc-300 justify-center items-center gap-2.5 inline-flex whitespace-nowrap"
          onClick={() => shareKakao('http://localhost:3000/share', 'dream-gream')}        
        >
          <div className="text-center text-black text-sm">카카오로 공유</div>
        </button>
        <button
          type="button"
          className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white rounded-bl-[10px] rounded-br-[10px] border-b justify-center items-center gap-2.5 inline-flex whitespace-nowrap"
          onClick={moveShare}
        
        >
          <div className="text-center text-black text-sm">이미지 저장</div>
        </button>
      </div>
      <div className="w-[340px] h-10 left-[9px] top-[749px] absolute justify-center items-center inline-flex">
        <button
          type="button"
          onClick={closeShareModal}
          className="h-10 px-[157px] py-2.5 bg-white rounded-[10px] justify-center items-center gap-2.5 inline-flex whitespace-nowrap"
        >
          <div className="text-center text-black text-sm">취소</div>
        </button>
      </div>
    </div>
  );
}
export default ModalForShare;
