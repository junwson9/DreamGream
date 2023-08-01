import React from 'react';

const ContentCard = (props) => {
  return (
    <div className="contentLine">
      <div className="contentCard">
        <span className="ContentSubject_before">시작하는 마음</span>
        <span className="content_before">{props.content}</span>
      </div>
      {acheivement_content !== null && (
        <div className="contentCard">
          <span className="ContentSubject_after">달성소감</span>
          <span className="content_after">{acheivement_content}</span>
        </div>
      )}
    </div>
  );
};

export default ContentCard;
