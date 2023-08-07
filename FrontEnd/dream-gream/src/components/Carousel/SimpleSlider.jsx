/* eslint-disable */
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SimpleSlider = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="w-48 h-48 rounded-xl">
      <Slider {...settings}>
        <div className="flex flex-col h-auto">
          <p className="text-center whitespace-normal text-zinc-800 text-lg font-regular">테스트중입니담ㄴㅇㅎ나엏ㄴ아ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㅎㄴㅇㄻㄴㅇㄹ</p>
          <img className="w-48 h-48 rounded-xl" src="https://ifh.cc/g/KyG9oQ.png/150x150" alt=''/>
        </div>
        <div className="flex flex-col h-auto">
          <p className="text-center whitespace-normal text-zinc-800 text-lg font-regular">안녕하세요 ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
          <img className="w-48 h-48 rounded-xl" src="https://ifh.cc/g/KyG9oQ.png/150x150" alt=''/>
        </div>
        <div className="flex flex-col h-auto">
          <p className="text-center whitespace-normal text-zinc-800 text-lg font-regular">그래앨앨애랭래애랭래ㅓㅁㄴㅇ라ㅣㅓㄴㅁ아렁ㄴ마럼ㄴ아ㅓㄻ나</p>
          <img className="w-48 h-48 rounded-xl" src="https://ifh.cc/g/KyG9oQ.png/150x150" alt=''/>
        </div>
        {/* ... The other slides with similar structure */}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
