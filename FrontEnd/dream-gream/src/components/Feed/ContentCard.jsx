/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { ReactComponent as ToggleClose } from '../../assets/icons/ToggleClose.svg';

function ContentCard(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`w-[319px] h-[200px] relative bg-[#DEE2F4] rounded-[10px]
    ${isOpen ? 'h-[36px]' : 'h-[180px]'}
    `}
    >
      {/* ++나중에 상위 페이지에서 렌더링 할때, 달성소감이라는 텍스트도 props로 전달해서 텍스트가 표시되도록 */}
      <div className="w-[97px] h-[9.17px] left-[10px] top-[9.09px] absolute text-zinc-800 text-[13px] font-medium leading-[16.90px]">
        시작하는 마음
      </div>
      <div>
        <button
          type="button"
          className={`w-[21px] h-[21.99px] left-[290px] top-[7px] absolute ${
            isOpen ? 'rotate-180' : ''
          }`}
          onClick={toggleCard}
        >
          <ToggleClose />
        </button>
      </div>
      <div
        className={`w-[300px] left-[10px] top-[34px] absolute text-zinc-800 text-[13px] font-normal leading-[16.90px] ${
          isOpen ? 'hidden' : ''
        }`}
      >
        {' '}
        원하던대로 올해가 가기 전에 버킷리스트를 완료했다! 기타를 처음 배우기
        시작했을때 손이 너무 아파서 그만두고 싶었지만 그래도 꾹 참고 배웠더니
        굳은살이 생겨서 이제는 예전만큼 아프지 않다! 그리고 쉬운 곡이지만 그래도
        한 곡을 완주할 수 있어서 뿌듯하다. 앞으로도 열심히 연습해서 연주할 수
        있는 곡을 10곡, 100곡으로 늘려나가겠다!!!
        {/* {props.content} */}
      </div>
    </div>
  );
}

export default ContentCard;
