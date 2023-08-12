/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AcheiveBtn({ post }) {
  const navigate = useNavigate();

  const goAcheivementUpdatePage = () => {
    navigate(`/updatepost/${post.post_id}`, {
      state: { change_is_achieved: true },
    });
  };
  // ++이후 달성완료페이지에서 등록을 누르면 is_ahceived도 true로 같이 전달

  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        onClick={goAcheivementUpdatePage}
        className="w-[319px] h-[37px] px-[34px] py-1.5 bg-white rounded-[10px] border border-indigo-400 justify-center items-center gap-2.5 inline-flex "
      >
        <div className="justify-center items-center gap-px flex">
          <div className="text-indigo-400 text-[13px] font-bold leading-[18.20px] hover:text-whtie ">
            달성완료
          </div>
        </div>
      </button>
    </div>
  );
}

export default AcheiveBtn;
