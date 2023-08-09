import React from 'react'
import { ReactComponent as RightEllipse } from '../../assets/Ellipse60.svg';
import { ReactComponent as LeftEllipse } from '../../assets/Ellipse61.svg';
import Logo from '../../assets/logo.png';
import KakaoModal from '../Modal/KakaoModal';


function ShareImage(){
  return(
<div className="relative w-[360px] h-[800px] relative bg-white">
  <div>
<img src={Logo} alt="" className='absolute w-[200px] h-[200px] left-[75px]'/>
</div>
  <div className="w-48 h-48 left-[80px] top-[200px] absolute rounded-lg">
      <img src="https://ifh.cc/g/KyG9oQ.png/150x150" alt="" className="w-48 h-48 left-[0.01px] top-0 absolute bg-zinc-300 rounded-lg"/>
    <div className="w-48 h-48 left-0 top-0 absolute" />
  </div>
  <div className="left-[193px] top-[527px] absolute justify-center items-center gap-1.5 inline-flex">
    프사
    <div className="w-16 text-zinc-800 text-base font-normal leading-snug">최홍준</div>
  </div>
  <div className="w-[360px] h-3.5 left-0 top-0 absolute bg-[#7887D4] border border-[#7887D4]" />
  <div className="w-[360px] h-3.5 left-0 top-[786px] absolute bg-[#7887D4] border border-[#7887D4]" />
  <div>
  <div className="w-3.5 h-[800px] left-0 top-0 absolute bg-[#7887D4] border border-[#7887D4]" />
  <div className='flex ml-[14px] mt-[475px]'>
  <RightEllipse className=""/>
  <LeftEllipse className="ml-[302px]"/>
  </div>
  </div>
  <div>
  <div className="w-3.5 h-[800px] left-[346px] top-0 absolute bg-[#7887D4] border border-[#7887D4]" />
  </div>
  <div className="left-[65px] top-[435px] absolute text-center text-zinc-800 text-base font-medium leading-snug">기타 배워서 1곡 완벽하게 연주하기<br/>기타 배워서 1곡 완벽하게 연주하기</div>
  <div className="w-64 h-px left-[55px] top-[514px] absolute border border-neutral-200" />
  
  <div className="w-64 h-px left-[55px] top-[570.05px] absolute border border-neutral-200" />
  <div className="w-64 h-px left-[55px] top-[625.05px] absolute border border-neutral-200" />
  <div className="w-64 h-px left-[55px] top-[680.05px] absolute border border-neutral-200" />
  <div className="w-64 h-8 px-8 py-1.5 left-[50px] top-[717px] absolute justify-center items-center gap-8 inline-flex">
    <button type="button" className="px-4 py-1.5 whitespace-nowrap text-indigo-400 text-xs font-bold leading-tight bg-white rounded-lg border border-indigo-400">저장하기</button>
    <KakaoModal/>
  </div>
  <div className="w-11 left-[65px] top-[531px] absolute text-zinc-500 text-base font-normal leading-snug whitespace-nowrap">작성자</div>
  <div className="w-11 left-[65px] top-[587.05px] absolute text-zinc-500 text-base font-normal leading-snug whitespace-nowrap">작성일</div>
  <div className="left-[193px] top-[587.05px] absolute text-zinc-800 text-base font-normal leading-snug whitespace-nowrap">2023.07.27</div>
  <div className="left-[193px] top-[641px] absolute text-zinc-800 text-base font-normal leading-snug whitespace-nowrap">10년 후</div>
  <div className="left-[65px] top-[641px] absolute text-zinc-500 text-base font-normal leading-snug whitespace-nowrap">목표 시기</div>
</div>
  );
};
export default ShareImage;