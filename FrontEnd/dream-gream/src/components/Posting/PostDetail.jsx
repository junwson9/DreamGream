import React, { useState,useRef,useEffect } from 'react';
import PropTypes from 'prop-types'; 
import axios from 'axios';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import ToggleButton from '../Button/ToggleButton';
import Dropdown from './Dropdown';

function PostDetail({ handleCloseIconClick,handleNextButtonClick }) {
    const [detail, setDetail] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const textareaRef = useRef(null);
    
    const onTogglePublic = () => {
      setIsPublic((prevIsPublic) => !prevIsPublic);
    };
    const onChange = (e) => {
        setDetail(e.target.value);
    };

    const onPostDetail = async () => {
        try {
        // POST 요청은 body에 실어 보냄
            await axios.post('http://i9a609.p.ssafy.io:8000/api/posts/test',
            {
                detail,
                isPublic: isPublic ? '공개' : '비공개',
            });
            setDetail('');
            handleNextButtonClick();
        } catch (e) {
              console.error(e);
            }
    };

    useEffect(() => {
        // Update the textarea height to match its content
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      }, [detail]);


    return (
        <div>
            <div className='w-[360px] h-[670px] relative'>
                <div className="w-[360px] h-[60px] relative border-b">
                  <CloseIcon
                    className="w-[26px] h-[26px] left-[20px] top-[18px] absolute z-[1]"
                    onClick={handleCloseIconClick}
                    style={{ cursor: 'pointer' }}
                  />
    
                  <button
                    type="button"
                    className="left-[307px] top-[19px] absolute text-right text-zinc-800 text-lg font-bold leading-[25.20px] cursor-pointer"
                    onClick={onPostDetail}
                  >
                    다음
                  </button>
                </div>
            <div className="text-3xl font-medium leading-10 pl-[21px] pt-[17px]" />   
            <div className="text-3xl font-medium leading-10 pl-[21px] pt-[17px]">
                <div className="w-[201px] h-[78px] text-left font-medium leading-10 whitespace-nowrap">
                꿈을 향한 다짐을<br/>적어볼까요</div>
                </div>
                <div className="text-zinc-500 text-left text-xs font-regular leading-4 pl-[21px] pt-[17px]" 
                style={{color:'#888888'}}>
                    소망하는 이유, 구체적인 계획, 나의 다짐을 기록해보세요.
                    </div>
                    <div className="w-[360px] h-px border-b border-neutral-200 mt-[30px]" />
                    
                    <div className="ml-[21px] mt-[48px] w-80 flex relative" style={{ overflowY: 'auto', maxHeight: '360px' }}>
            <textarea ref={textareaRef} className = "focus:outline-0 resize-none w-full mb-7" maxLength="500" placeholder="내용을 입력하세요." onChange={onChange} value={detail} style={{ overflowY: 'hidden' }}/>
                </div>
                <div className="text-sm text-gray-500 mt-1 mr-[28px] absolute bottom-0 right-0">
                {detail.length}/500 {/* Display the character count */}
                </div>
            </div>
            <div className="w-[360px] h-14 mt-[18px] relative bg-white">
              <div className="left-[22px] top-[17px] absolute text-center text-zinc-800 text-base font-normal">목표 시기</div>
              <div className="left-[290px] top-[17px] absolute text-center text-zinc-800 text-base font-normal">
                <Dropdown/> 
              </div>
              <div className="w-[360px] h-px left-0 top-[1px] absolute border border-neutral-100" />
            </div>
            <div className="w-96 h-14 relative bg-white">
              <div className="left-[22px] top-[18px] absolute text-center text-zinc-800 text-base font-normal">공개 설정</div>
              <div className="w-12 h-6 left-[294px] top-[16px] absolute">

              <ToggleButton 
              isChecked={isPublic} 
              onToggle={onTogglePublic}/>
              </div>
            <div className="w-96 h-px left-0 top-[1px] absolute border border-neutral-100" />
            </div>
        </div>
    );
};
PostDetail.propTypes = {
    handleCloseIconClick: PropTypes.func.isRequired,
    handleNextButtonClick: PropTypes.func.isRequired,
};
export default PostDetail;