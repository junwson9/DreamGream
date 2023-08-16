/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import Container from '../Posting/Container';
import ToggleButton from '../Button/ToggleButton';
import ContainerForCategory from '../Posting/ContainerForCategory';

// eslint-disable-next-line no-unused-vars
function EditInfoForAcheive({
  post,
  achievedDate,
  handleDateChange,
  selectedCategory,
  setSelectedCategory,
  isPublic,
  setSelectedCategoryID,
  onTogglePublic,
}) {
  console.log(`achieveDted:${achievedDate}`);

  return (
    <div>
      <div className="w-[360px] h-14 mt-[18px] relative bg-white">
        <div className="left-[22px] top-[17px] absolute text-center text-zinc-800 text-base font-normal">
          카테고리
        </div>
        <div className="left-[290px] top-[17px] absolute text-center text-zinc-800 text-base font-normal">
          <ContainerForCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedCategoryID={setSelectedCategoryID}
          />
        </div>
        <div className="w-[360px] h-px left-0 top-[1px] absolute border border-neutral-100" />
      </div>
      <div className="w-[360px] h-14 relative bg-white">
        <div className="left-[22px] top-[17px] absolute text-center text-zinc-800 text-base font-normal">
          달성일
        </div>
        <div className="left-[210px] top-[13px] absolute text-center text-zinc-800 text-base font-normal">
          <input
            type="date"
            className="border border-neutral-200 p-1 rounded"
            value={achievedDate.split('T')[0]}
            onChange={handleDateChange}
          />
        </div>
        <div className="w-[360px] h-px left-0 top-[1px] absolute border border-neutral-100" />
      </div>
      <div className="w-[360px] h-14 relative bg-white">
        <div className="left-[22px] top-[18px] absolute text-center text-zinc-800 text-base font-normal">
          공개 설정
        </div>
        <div className="w-12 h-6 left-[294px] top-[16px] absolute">
          <ToggleButton isChecked={isPublic} onToggle={onTogglePublic} />
        </div>
        <div className="w-[360px] h-px left-0 top-[1px] absolute border border-neutral-100" />
      </div>
    </div>
  );
}

export default EditInfoForAcheive;
