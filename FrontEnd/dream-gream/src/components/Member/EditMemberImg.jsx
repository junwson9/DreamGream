/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
// EditCheerImg.jsx
import React, { useState, useRef, useEffect } from 'react';

import { ReactComponent as ClearBtn } from '../../assets/icons/ClearBtn.svg';
import { ReactComponent as AddImgIcon } from '../../assets/AddImgIcon.svg';

function EditMemberImg({ updateImgFile }) {
  const [mainImg, setMainImg] = useState('');

  const fileInputRef = useRef(null);

  const setPreviewImg = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setMainImg(e.target.result);
        updateImgFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
    console.log(`선택된파일: ${selectedFile}`);
  };

  const addImg = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="addImg w-[147px] h-[147px] relative">
        <input
          ref={fileInputRef}
          type="file"
          id="image"
          accept="image/*"
          className="hidden"
          style={{
            borderStyle: 'dotted',
            borderColor: '#c4c4c4',
            borderWidth: '3px',
          }}
          onChange={setPreviewImg}
        />
        <AddImgIcon
          className="w-[70px] h-[70px] left-[37px] top-[39px] absolute cursor-pointer Z-[999]"
          onClick={addImg}
        />
      </div>
    </div>
  );
}

export default EditMemberImg;
