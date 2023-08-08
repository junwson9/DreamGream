import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CategoryButtons({ setCategory, selectedCategory }) {
  const categorys = {
    Travel: '여행',
    Health: '건강/운동',
    Learning: '배움',
    Culture: '문화/엔터',
    Love: '사랑',
    Food: '음식',
    Shopping: '쇼핑',
    Work: '일',
    etc: '기타',
  };

  const handleClick = (category) => {
    setCategory(category);
  };

  return (
    <div className="w-[267px] flex flex-wrap justify-between">
      {Object.keys(categorys).map((category) => (
        <button
          key={category}
          className={`w-[83px] h-[29px] px-[19px] py-1.5 rounded-[10px] border justify-center items-center gap-2.5 flex ${
            selectedCategory === category
              ? 'bg-indigo-400 text-white'
              : 'bg-white text-indigo-400 border-indigo-400'
          }`}
          type="submit"
          onClick={() => handleClick(category)}
          style={{
            marginBottom: ['Shopping', 'Work', 'etc'].includes(category)
              ? '0'
              : '10px',
          }}
        >
          <div className="text-center text-[13px] font-bold leading-[18.20px] whitespace-nowrap">
            {categorys[category]}
          </div>
        </button>
      ))}
    </div>
  );
}

CategoryButtons.propTypes = {
  setCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default CategoryButtons;
