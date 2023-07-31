import React from 'react';
import PropTypes from 'prop-types';

function CategoryButtons({ setCategory }) {
  const categorys = [
    '여행',
    '건강/운동',
    '배움',
    '문화/엔터',
    '사랑',
    '음식',
    '쇼핑',
    '일',
    '기타',
  ];

  const handleClick = (category) => {
    setCategory(category);
  };

  return (
    <div className="w-[267px] h-[93px] justify-start items-start gap-[9px] inline-flex">
      {categorys.map((category) => (
        <button
          key={category}
          className="w-[83px] h-[29px] px-[19px] py-1.5 bg-white rounded-[10px] border border-indigo-400 justify-center items-center gap-2.5 flex"
          type="submit"
          onClick={() => handleClick(category)}
        >
          <div className="text-center text-indigo-400 text-[13px] font-bold leading-[18.20px]">
            {category}
          </div>
        </button>
      ))}
    </div>
  );
}

CategoryButtons.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default CategoryButtons;
