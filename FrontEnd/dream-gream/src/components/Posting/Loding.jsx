import React from 'react'
import { RingLoader } from 'react-spinners';
import SimpleSlider from '../Carousel/SimpleSlider';

function Loading() {
    return(
        <div>
            <div className="w-[360px] h-[800px] pb-12 bg-white flex-col justify-start items-center inline-flex">
              <div className="self-stretch flex-col justify-start items-center gap-11 inline-flex">
                <div className="w-[360px] h-[60px] relative" />
                <div className="text-zinc-800 text-3xl font-medium leading-10">그림을 그리는 중이에요!<br/>조금만 기다려 주세요.</div>
                <RingLoader color="#7887D4" />
                <div className="text-center text-zinc-800 text-xl font-medium leading-loose px-[36px]">기다리시는 동안 <br/>다른 분들의 꿈을 보여드릴게요</div>
                <SimpleSlider />
                </div>
              </div>
        </div>
    

)}

export default Loading;