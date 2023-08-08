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
    // <div className="w-[360px] h-[167px] relative">
    //   <div className="w-[360px] h-14 left-0 top-[55px] absolute bg-white">
    //     <div className="left-[22px] top-[17px] absolute text-center text-neutral-900 text-[15px] font-normal">
    //       목표 시기
    //     </div>
    //     <div className="left-[283px] top-[17px] absolute text-center text-neutral-900 text-[15px] font-normal">
    //       언젠가▼
    //     </div>
    //     <div className="w-[360px] h-[0px] left-0 top-[1px] absolute border border-zinc-300" />
    //     <div className="w-[360px] h-[0px] left-0 top-[56px] absolute border border-zinc-300" />
    //   </div>
    //   <div className="w-[360px] h-14 left-0 top-0 absolute bg-white">
    //     <div className="left-[23px] top-[17px] absolute text-center text-neutral-900 text-[15px] font-normal">
    //       카테고리
    //     </div>
    //     <div className="left-[273px] top-[17px] absolute text-center text-neutral-900 text-[15px] font-normal">
    //       건강/운동▼
    //     </div>
    //     <div className="w-[360px] h-[0px] left-0 top-[1px] absolute border border-zinc-300" />
    //     <div className="w-[360px] h-[0px] left-0 top-[56px] absolute border border-zinc-300" />
    //   </div>
    //   <div className="w-[360px] h-[57px] left-0 top-[110px] absolute bg-white">
    //     <div className="left-[22px] top-[18px] absolute text-center text-neutral-900 text-[15px] font-normal">
    //       공개 설정
    //     </div>
    //     <div className="w-[360px] h-[0px] left-0 top-[1px] absolute border border-zinc-300" />
    //     <div className="w-[360px] h-[0px] left-0 top-[56px] absolute border border-zinc-300" />
    //     <div className="w-12 h-[26px] left-[294px] top-[16px] absolute">
    //       <div className="w-12 h-[26px] left-0 top-0 absolute bg-indigo-400 rounded-[20px]" />
    //       <div className="w-[22px] h-[22px] left-[24px] top-[2px] absolute bg-white rounded-full" />
    //     </div>
    //   </div>
    // </div>
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
