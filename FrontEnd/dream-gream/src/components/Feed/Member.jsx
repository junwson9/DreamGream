/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { ReactComponent as MoreVert } from '../../assets/icons/MoreVert.svg';

function Member(props) {
  return (
    <div className="w-[347px] h-10 pl-[13px] pr-[15px] justify-center items-center gap-[99px] inline-flex">
      <div className="h-10 justify-start items-center gap-[7px] inline-flex">
        <img
          className="w-[39.67px] h-10 rounded-[999px]"
          src="https://via.placeholder.com/40x40"
          alt="프로필 이미지"
        />
        <div className="w-[200px]">
          <span className="text-black text-sm font-normal leading-tight">
            자카타파하
            {/* ++props에서 넘겨주는건 post 데이터라 닉네임을 post테이블에 추가하던가.. 얘기해봐야함 */}
            {props.nickname}
            <br />
          </span>
          <span className="text-neutral-600 text-xs font-light leading-none">
            2023.07.20
            {props.created_date}
          </span>
          <span className="text-indigo-500 text-xs font-medium leading-none">
            · 1년 이내 {props.deadline}
          </span>
          {/* ##자신의 비공개 게시물만 보이도록 하는건 백쪽에서 그렇게 넘겨줄듯? */}
          {props.is_diplay ? null : (
            <span className="text-indigo-500 text-xs font-medium leading-none">
              · 비공개
            </span>
          )}
        </div>
      </div>
      <MoreVert />
    </div>
  );
}

export default Member;
