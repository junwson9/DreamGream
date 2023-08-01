import React from 'react';

const ScrapLikeBtns = (props) => {
  return (
    <div className="buttonLine">
      <div className="scrapBtn">
        <button>나도 할래</button>
      </div>
      {props.is_acheived ? (
        <div className="congrateBtn">
          <button>아이콘+축하해요</button>
        </div>
      ) : (
        <div className="cheerUpBtn">
          <button>아이콘+응원해요</button>
        </div>
      )}
    </div>
  );
};

export default ScrapLikeBtns;
