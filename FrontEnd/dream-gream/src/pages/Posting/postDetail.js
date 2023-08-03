import React, { useState,useRef,useEffect } from 'react';
import TopBar from '../../components/Common/Topbar';

function PostDetail() {
    const [detail, setDetail] = useState('');
    const textareaRef = useRef(null);
    
    const onChange = (e) => {
        setDetail(e.target.value);
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
            <div className='w-[360px] h-[730px]'>
            <TopBar 
            showLeftButton={false} 
            confirmName="다음" 
            pathName="/postdetail"
            />
            <div className="text-3xl font-medium leading-10 pl-[21px] pt-[17px]">
                <div className="w-[201px] h-[78px] text-left font-medium leading-10 whitespace-nowrap">
                꿈을 향한 다짐을<br/>적어볼까요</div>
                </div>
                <div className="text-zinc-500 text-left text-xs font-regular leading-4 pl-[21px] pt-[17px]" 
                style={{color:'#888888'}}>
                    소망하는 이유, 구체적인 계획, 나의 다짐을 기록해보세요.
                    </div>
                    <div className="w-[360px] h-px border-b border-neutral-200 mt-[30px]" />
                    
                    <div className="ml-[21px] mt-[48px] w-80 flex relative" style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <textarea ref={textareaRef} className = "focus:outline-0 resize-none w-full mb-7" maxLength="500" placeholder="내용을 입력하세요." onChange={onChange} value={detail} style={{ overflowY: 'hidden' }}/>
                </div>
                <div className="text-sm text-gray-500 mt-1 mr-2 absolute bottom-0 right-0">
                {detail.length}/500 {/* Display the character count */}
                </div>
            </div>
    );
};

export default PostDetail;