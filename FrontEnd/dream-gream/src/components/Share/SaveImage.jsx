import React, { useRef } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import KakaoModal from '../Modal/KakaoModal';

function Card(){
  const cardRef = useRef();
  const onDownloadBtn = () => {
    const card = cardRef.current;
    domtoimage.toBlob(card).then(blob => {
      saveAs(blob, 'card.png');
    });
  };

  return (
    <div className='flex'>
    <li ref={cardRef} className="card">
      <h1>카드 컴포넌트</h1>
      <button type="submit" className="downBtn" onClick={onDownloadBtn}>
        다운로드 버튼
      </button>
    </li>
      <KakaoModal/>
    </div>
  );
};

export default Card;