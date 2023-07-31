import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryButtons from '../../components/Button/CategoryButtons';

function PostSubject() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('기타');
    const navigate = useNavigate();
 
    const navigateToDetail = () => {
      navigate('/image');
    };

    const onChange = (e) => {
        setTitle(e.target.value);
    };

    const onPostSubject = async () => {
        try {
        // POST 요청은 body에 실어 보냄
            await axios.post('http://localhost:8000/posts/image', {
              title,
              category_name: category,
            });
            setTitle('');
            navigateToDetail();
            console.log(title);
            console.log(category);
        } catch (e) {
              console.error(e);
            }
    };

    return (
        <div>
            <input onChange={onChange} value={title}/>
            <button onClick={onPostSubject}type='submit'>제출</button>
            <CategoryButtons setCategory={setCategory}/>
            
        </div>
    );
};

export default PostSubject;