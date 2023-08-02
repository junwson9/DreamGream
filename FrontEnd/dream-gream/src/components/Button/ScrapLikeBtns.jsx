/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React from 'react';
import { ReactComponent as CheerUpIcon } from '../../assets/icons/CheerUpIcon.svg';

function ScrapLikeBtns(props) {
  return (
    // <div className="buttonLine">
    //   <div className="scrapBtn">
    //     <button>나도 할래</button>
    //   </div>
    //   {props.is_acheived ? (
    //     <div className="congrateBtn">
    //       <button>아이콘+축하해요</button>
    //     </div>
    //   ) : (
    //     <div className="cheerUpBtn">
    //       <button>아이콘+응원해요</button>
    //     </div>
    //   )}
    // </div>

    <div className="w-[317px] h-8 justify-center items-start gap-[13px] inline-flex">
      <div className="w-[152px] h-8 px-[34px] py-1.5 bg-white rounded-[10px] border border-indigo-400 justify-center items-center gap-2.5 inline-flex">
        <div className="text-indigo-400 text-[13px] font-bold leading-[18.20px]">
          나도할래
        </div>
      </div>
      <div className="w-[152px] h-8 px-[34px] py-1.5 bg-white rounded-[10px] border border-indigo-400 justify-center items-center gap-2.5 inline-flex">
        <div className="justify-center items-center gap-px flex">
          <CheerUpIcon />
          <span />
          <span />
          <div className="text-indigo-400 text-[13px] font-bold leading-[18.20px] w-[77px]">
            응원해요 144
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrapLikeBtns;
