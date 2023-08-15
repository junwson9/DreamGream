import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CategoryButtons({ setCategory, setCategoryID }) {
  const categorys = {
    Travel: { id: 1, category: '여행' },
    Health: { id: 2, category: '건강/운동' },
    Learning: { id: 3, category: '배움' },
    Culture: { id: 4, category: '문화/엔터' },
    Love: { id: 5, category: '사랑' },
    Food: { id: 6, category: '음식' },
    Shopping: { id: 7, category: '쇼핑' },
    Work: { id: 8, category: '일' },
    Etc: { id: 9, category: '기타' },
  };

  const [selectedCategory, setSelectedCategory] = useState('etc');

  const handleClick = (category) => {
    setCategory(category);
    setSelectedCategory(category);
    setCategoryID(categorys[category].id);
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
          style={{ marginBottom: '10px' }}
        >
          <div className="text-center text-[13px] font-bold leading-[18.20px] whitespace-nowrap">
            {categorys[category].category}
          </div>
        </button>
      ))}
    </div>
  );
}

CategoryButtons.propTypes = {
  setCategory: PropTypes.func.isRequired,
  setCategoryID: PropTypes.func.isRequired,
};

export default CategoryButtons;
