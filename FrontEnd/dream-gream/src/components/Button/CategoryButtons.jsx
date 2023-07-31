import React from 'react';
import PropTypes from 'prop-types';

function CategoryButtons({ setCategory }) {
    const categorys = ['여행','건강/운동','배움','문화/엔터','사랑','음식','쇼핑','일','기타']

    const handleClick = (category) => {
       setCategory(category);
    };

    return (
        <div>
            {categorys.map((category) => (
                <button 
                key={category}  
                type='submit' onClick={() =>handleClick(category)}>
                    {category}
                </button>
            ))}
        </div>
    )
}

CategoryButtons.propTypes = {
    setCategory: PropTypes.func.isRequired,
  };

export default CategoryButtons;