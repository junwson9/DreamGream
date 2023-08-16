/* eslint-disable react/prop-types */
import React, { useEffect,useRef } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { shareKakao } from '../../utils/shareKakaoLink';
import { setSharedPost } from '../../store/actions/shareActions';



function ModalForShare({ setShareModalOpen, post }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const token = localStorage.getItem('ACCESS_TOKEN');
  const closeShareModal = () => {
    setShareModalOpen(false);
  };
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeShareModal();
    }
  };
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info('클립보드에 링크가 복사되었어요!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const moveShare = () => {
    if (!token) {
      navigate('/loginerror')
    }
    else {
    dispatch(setSharedPost(post));
    navigate('/share');
    }
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.body.removeChild(script);
      window.removeEventListener('mousedown', handleOutsideClick);
    }
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
        height: '100%',
      }}
    >
      <div className="w-[360px] h-full bg-[#000000] opacity-[15%] relative" />

      <div className="left-[11px] bottom-[120px] absolute flex-col justify-start items-start inline-flex"
      ref={modalRef}>
        <button
          type="button"
          className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-zinc-300 justify-center items-center gap-2.5 inline-flex whitespace-nowrap"
          onClick={() => handleCopyClipBoard(`${process.env.REACT_APP_PUBLIC_URL}${location.pathname}`)}
        >
          <div className="text-center text-black text-sm">URL 복사</div>
        </button>


        {/* 로그인할때만 */}
        
        <button
          type="button"
          className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white border-b border-zinc-300 justify-center items-center gap-2.5 inline-flex whitespace-nowrap"
          onClick={() => token ? shareKakao(`${process.env.REACT_APP_PUBLIC_URL}/feed/${post.post_id}`, 'dream-gream') : navigate('/loginerror')}        
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
      <div className="w-[340px] h-10 left-[9px] bottom-16 absolute justify-center items-center inline-flex">
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
