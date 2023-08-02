import React, { useRef, useEffect,useState } from 'react';
import axios from 'axios';
import CategoryButtons from '../../components/Button/CategoryButtons';
import TopBar from '../../components/Common/Topbar';

function PostSubject() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('기타');;
    const textareaRef = useRef(null);
 

    const onChange = (e) => {
        setTitle(e.target.value);
    };

    const onPostSubject = async () => {
        try {
        // POST 요청은 body에 실어 보냄
            await axios.post('http://i9a609.p.ssafy.io:8000/api/posts/image',
            {
                title,
                category_name: category,
            });
            setTitle('');
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
      }, [title]);

    return (
        <div>
            <TopBar 
            showLeftButton={false} 
            confirmName="다음" 
            pathName="/postdetail"
            onConfirm={onPostSubject}/>
            <div className="text-3xl font-medium leading-10 pl-[21px] pt-[17px]">
                <div className="w-[201px] h-[78px] text-left font-medium leading-10 whitespace-nowrap">
                이루고 싶은<br/>꿈이 무엇인가요?</div>
                </div>
                <div className="text-zinc-500 text-left text-xs font-regular leading-4 pl-[21px] pt-[17px]" 
                style={{color:'#888888'}}>
                    하고 싶고, 갖고 싶고, 가보고 싶은 꿈을 적어주세요.<br/>
                    나에게 일어날 멋진 일을 그림으로 만나보실 수 있어요.
                    </div>
                <div className="w-[360px] h-px border-b border-neutral-200 mt-[13px]" />
                <div className="text-zinc-800 text-left font-medium leading-snug mt-[30px] pl-[21px]">카테고리를 선택해주세요.</div>
            <div className='pl-[21px] mt-[30px]'>
            <CategoryButtons setCategory={setCategory}/>
            </div>
            <div className="ml-[21px] mt-[48px] w-80 flex relative">
            <textarea ref={textareaRef} className = "focus:outline-0 resize-none w-full border-b border-gray-200  mb-7" maxLength="50" placeholder="꿈을 입력하세요." onChange={onChange} value={title} style={{ overflowY: 'hidden' }}/>
                <div className="text-sm text-gray-500 mt-1 mr-2 absolute bottom-0 right-0">
                {title.length}/50 {/* Display the character count */}
                </div>
            </div>
            <div className="pl-[21px] mt-[48px] w-72 h-10 text-stone-300 text-xs font-normal leading-4">🙏 멋진 그림 생성을 위해 줄임말이나 모호한 언어는 피해주세요!</div>
        </div>
    );
};

export default PostSubject;