/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import EditImg from '../../components/Edit/EditImg';
import EditInfo from '../../components/Edit/EditInfo';
import TopbarForEdit from '../../components/Edit/TopbarForEdit';
import ContentCard from '../../components/Feed/ContentCard';

function editFeed() {
  return (
    <div className="w-[360px] h-[800px] relative bg-white">
      <div>
        <TopbarForEdit />
      </div>
      <hr />
      <div>
        <div className="w-[147px] h-[147px] absolute top-[85px] left-1/2 transform translate-x-[-50%]">
          <EditImg />
        </div>
      </div>

      <div className="w-[315px] left-[22px] top-[267px] absolute text-zinc-800 text-[17px] font-medium leading-normal">
        에베레스트 등산하기 에베레스트 등산하기 에베레스트 등산하기 에베레스트
        등산하기 에베레스트 등산하기
      </div>

      <div className="w-[360px] h-[0px] left-0 top-[369px] absolute border border-zinc-300" />

      <div className="w-[319px] h-[165px] left-[17px] top-[395px] absolute">
        {/* <ContentCard title="시작하는 마음" /> */}
      </div>

      <div className="w-[360px] h-14 left-0 top-[613px] absolute bg-white">
        <EditInfo />
      </div>
    </div>
  );
}

export default editFeed;
