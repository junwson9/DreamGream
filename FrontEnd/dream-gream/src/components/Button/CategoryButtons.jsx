import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CategoryButtons({ setCategory }) {
    const categorys = ['여행', '건강/운동', '배움', '문화/엔터', '사랑', '음식', '쇼핑', '일', '기타'];

    const [selectedCategory, setSelectedCategory] = useState('기타');

    const handleClick = (category) => {
        setCategory(category);
        setSelectedCategory(category);
    };

    return (
        <div className="w-[267px] flex flex-wrap justify-between">
            {categorys.map((category) => (
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
