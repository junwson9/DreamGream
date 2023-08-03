/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ModalForShare from './ModalForShare';

function ModalForMine({ setMineModalOpen, setShareModalOpen }) {
  const closeMineModal = () => {
    console.log('내모달 닫는다');
    setMineModalOpen(false);
  };

  return (
    <div
      className="modal-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      <div className="w-[360px] h-[800px] bg-[#000000] opacity-[15%] relative" />

      <div className="left-[11px] top-[617px] absolute flex-col justify-start items-start inline-flex">
        <button
          type="button"
          onClick={() => {
            closeMineModal();
            setShareModalOpen(true);
          }}
          className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-zinc-300 justify-center items-center gap-2.5 inline-flex whitespace-nowrap"
        >
          <div className="text-center text-black text-sm">공유하기</div>
        </button>

        <button
          type="button"
          className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white border-b border-zinc-300 justify-center items-center gap-2.5 inline-flex whitespace-nowrap"
        >
          <div className="text-center text-black text-sm">수정하기</div>
        </button>
        <button
          type="button"
          className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white rounded-bl-[10px] rounded-br-[10px] border-b justify-center items-center gap-2.5 inline-flex whitespace-nowrap"
        >
          <div className="text-center text-[#FF0000] text-sm">삭제하기</div>
        </button>
      </div>
      <div className="w-[340px] h-10 left-[9px] top-[749px] absolute justify-center items-center inline-flex">
        <button
          type="button"
          onClick={closeMineModal}
          className="h-10 px-[157px] py-2.5 bg-white rounded-[10px] justify-center items-center gap-2.5 inline-flex whitespace-nowrap"
        >
          <div className="text-center text-black text-sm">취소</div>
        </button>
      </div>
    </div>
  );
}
export default ModalForMine;
