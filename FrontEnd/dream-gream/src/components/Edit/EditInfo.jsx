import { React, useState } from 'react';
import Container from '../Posting/Container';
import ToggleButton from '../Button/ToggleButton';
import ContainerForCategory from '../Posting/ContainerForCategory';

function EditInfo() {
  const [isPublic, setIsPublic] = useState(false);

  const onTogglePublic = () => {
    setIsPublic((prevIsPublic) => !prevIsPublic);
  };

  return (
    <div>
      <div className="w-[360px] h-14 mt-[18px] relative bg-white">
        <div className="left-[22px] top-[17px] absolute text-center text-zinc-800 text-base font-normal">
          카테고리
        </div>
        <div className="left-[290px] top-[17px] absolute text-center text-zinc-800 text-base font-normal">
          <ContainerForCategory />
        </div>
        <div className="w-[360px] h-px left-0 top-[1px] absolute border border-neutral-100" />
      </div>
      <div className="w-[360px] h-14 relative bg-white">
        <div className="left-[22px] top-[17px] absolute text-center text-zinc-800 text-base font-normal">
          목표 시기
        </div>
        <div className="left-[290px] top-[17px] absolute text-center text-zinc-800 text-base font-normal">
          <Container />
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

export default EditInfo;