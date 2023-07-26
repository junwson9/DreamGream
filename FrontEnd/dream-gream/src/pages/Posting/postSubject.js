import React, { useState } from "react";
import axios from 'axios';
import CategoryButtons from "../../components/CategoryButtons";

function PostSubject() {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('기타');
    const onChange = (e) => {
        setText(e.target.value);
    };

    const onPostSubject = async () => {
        try {
        // POST 요청은 body에 실어 보냄
            await axios.post('/post',
            {
                subject: text,
                category,
            });
            setText('');
        } catch (e) {
              console.error(e);
            }
    };

    return (
        <div>
            <input onChange={onChange} value={text}/>
            <button onClick={onPostSubject}type="submit">제출</button>
            <b>값: {text}</b>
            <CategoryButtons setCategory={setCategory}/>
            
        </div>
    );
};

export default PostSubject;