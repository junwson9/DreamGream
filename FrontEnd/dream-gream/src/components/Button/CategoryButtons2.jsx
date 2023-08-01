/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

function CategoryButtons(props) {
  const { setCategory } = props;

  const categories = [
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
    <div className="styles.modal">
      {Array(3)
        .fill()
        .map((_, row) => (
          <div key={`row-${row}`} className="row">
            {Array(3)
              .fill()
              .map((_, col) => {
                const index = row * 3 + col;
                if (index >= categories.length) return null;
                return (
                  <button
                    key={categories[index]}
                    onClick={() => handleClick(categories[index])}
                  >
                    {categories[index]}
                  </button>
                );
              })}
          </div>
        ))}
    </div>
  );
}

CategoryButtons.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default CategoryButtons;
