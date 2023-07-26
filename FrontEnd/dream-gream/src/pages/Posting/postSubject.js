import React, { useState } from 'react';
import axios from 'axios';
import CategoryButtons from '../../components/CategoryButtons';

function PostSubject() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('기타');
    const onChange = (e) => {
        setTitle(e.target.value);
    };

    const onPostSubject = async () => {
        try {
        // POST 요청은 body에 실어 보냄
            await axios.post('/post',
            {
                title,
                category_name: category,
            });
            setTitle('');
        } catch (e) {
              console.error(e);
            }
    };

    return (
        <div>
            <input onChange={onChange} value={title}/>
            <button onClick={onPostSubject}type='submit'>제출</button>
            <b>값: {title}</b>
            <CategoryButtons setCategory={setCategory}/>
            
        </div>
    );
};

export default PostSubject;