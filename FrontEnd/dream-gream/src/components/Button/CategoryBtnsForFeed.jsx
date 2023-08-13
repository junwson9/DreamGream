/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// import React, { useState } from 'react';

// function CategoryBtnsForFeed({ setCategory }) {
//   const categorys = {
//     Travel: { id: 1, category: '여행' },
//     Health: { id: 2, category: '건강/운동' },
//     Learning: { id: 3, category: '배움' },
//     Culture: { id: 4, category: '문화/엔터' },
//     Love: { id: 5, category: '사랑' },
//     Food: { id: 6, category: '음식' },
//     Shopping: { id: 7, category: '쇼핑' },
//     Work: { id: 8, category: '일' },
//     etc: { id: 9, category: '기타' },
//   };
//   const [selectedCategory, setSelectedCategory] = useState('etc');

//   const handleClick = (category) => {
//     setCategory(category);
//     setSelectedCategory(category);
//   };

//   return (
//     // <div style="width: 315px; height: 29px; justify-content: flex-start; align-items: flex-start; gap: 5px; display: inline-flex">
//     <div className="w-[361px] h-[30px] relative">
//       {/* <div className="w-[267px] flex flex-wrap justify-between"> */}

//       {Object.keys(categorys).map((category) => (
//         <>
//           <button
//             key={category}
//             className={`w-[62px] h-[30px] px-[19px] py-1.5 rounded-[10px] border justify-center items-center gap-2.5 inline-flex ${
//               selectedCategory === category
//                 ? 'bg-indigo-400 text-white'
//                 : 'bg-white text-indigo-400 border-indigo-400'
//             }`}
//             type="submit"
//             onClick={() => handleClick(category)}
//             style={{ marginBottom: '10px' }}
//           >
//             <div className="text-center text-[13px] font-bold leading-[18.20px] whitespace-nowrap">
//               {categorys[category].category}
//             </div>
//           </button>
//           <span />
//         </>
//       ))}
//     </div>
//   );
// }
// export default CategoryBtnsForFeed;

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import './CategoryBtnsForFeed.css';

function CategoryBtnsForFeed({ setCategoryID }) {
  const categorys = {
    Travel: { id: 1, category: '여행' },
    Health: { id: 2, category: '건강/운동' },
    Learning: { id: 3, category: '배움' },
    Culture: { id: 4, category: '문화/엔터' },
    Love: { id: 5, category: '사랑' },
    Food: { id: 6, category: '음식' },
    Shopping: { id: 7, category: '쇼핑' },
    Work: { id: 8, category: '일' },
    etc: { id: 9, category: '기타' },
  };
  const [selectedCategory, setSelectedCategory] = useState('etc');

  const handleClick = (category) => {
    setCategoryID(categorys[category].id);
    setSelectedCategory(category);
  };

  // Slick 슬라이더 설정
  const sliderSettings = {
    dots: false, // 하단에 페이지 번호 표시
    infinite: false, // 무한 스크롤 비활성화
    speed: 500,
    slidesToShow: 4.5, // 한 번에 표시되는 슬라이드 수
    slidesToScroll: 3, // 스크롤 시 이동하는 슬라이드 수
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[320px] h-[40px] mt-[10px] relative">
        {/* <div className="flex items-center"> */}
        <Slider {...sliderSettings}>
          {Object.keys(categorys).map((category) => (
            <div key={category} className="px-2">
              <button
                className={`w-[62px] h-[30px] px-[19px] py-1.5 rounded-[10px] border justify-center items-center gap-2.5 inline-flex ${
                  selectedCategory === category
                    ? 'bg-indigo-400 text-white'
                    : 'bg-white text-indigo-400 border-indigo-400'
                }`}
                type="submit"
                onClick={() => handleClick(category)}
                style={{ marginBottom: '10px' }}
              >
                <div className="text-center text-[13px] font-bold leading-[18.20px] whitespace-nowrap">
                  {categorys[category].category}
                </div>
              </button>
            </div>
          ))}
        </Slider>
        {/* </div> */}
      </div>
    </div>
  );
}

export default CategoryBtnsForFeed;
