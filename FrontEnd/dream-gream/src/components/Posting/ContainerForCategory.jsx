/* eslint-disable */
import React, { useRef, useState } from 'react';
import OpenHooks from '../../hooks/OpenHooks';
import { ReactComponent as ArrowIcon } from '../../assets/leftIcon.svg';
import DropDown from './Dropdown';

function ContainerForCategory({
  selectedCategory,
  setSelectedCategory,
  setSelectedCategoryID,
}) {
  const dropDownRef = useRef();
  const CategoryList = [
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
  const [isOpen, setIsOpen] = OpenHooks(dropDownRef, false);
  const arrowIconStyle = {
    width: '24px',
    height: '24px',
    transform: isOpen ? 'rotate(-90deg)' : 'rotate(-270deg)',
  };

  return (
    <div style={{ position: 'relative' }}>
      <div ref={dropDownRef} className="whitespace-nowrap flex ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="flex items-center"
        >
          {selectedCategory}
          <ArrowIcon style={arrowIconStyle} />
        </button>
      </div>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            transform: 'translateX(-30%)',
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '8px',
            }}
          >
            <ul style={{ padding: 0, margin: 0, width: 'max-content' }}>
              {CategoryList.map((value, index) => (
                <DropDown
                  key={index}
                  value={value}
                  setIsOpen={setIsOpen}
                  onChangePeriod={() => {
                    setSelectedCategory(value);
                    setSelectedCategoryID(index + 1);
                    setIsOpen(false);
                  }}
                  isOpen={isOpen}
                  style={{ width: 'max-content' }}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContainerForCategory;
