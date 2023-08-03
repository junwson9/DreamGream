import React, { useState } from 'react';

function ModalForShare(props) {
  return (
    <div className="w-[360px] h-[800px] bg-[#d9d9d9] opacity-[60%] relative">
      <div className="left-[11px] top-[617px] absolute flex-col justify-start items-start inline-flex">
        <div className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-zinc-300 justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-black text-sm">URL 복사</div>
        </div>
        <div className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white border-b border-zinc-300 justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-black text-sm">카카오로 공유</div>
        </div>
        <div className="w-[340px] grow shrink basis-0 px-[157px] py-2.5 bg-white rounded-bl-[10px] rounded-br-[10px] border-b justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-black text-sm">이미지 저장</div>
        </div>
      </div>
      <div className="w-[340px] h-10 left-[9px] top-[749px] absolute justify-center items-center inline-flex">
        <div className="h-10 px-[157px] py-2.5 bg-white rounded-[10px] justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-black text-sm">취소</div>
        </div>
      </div>
    </div>
  );
}
export default ModalForShare;
