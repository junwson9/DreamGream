import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostDetail() {
    const [detail, setDetail] = useState('');
    const navigate = useNavigate();
    
    const onChange = (e) => {
        setDetail(e.target.value);
    };

    const navigateToViewImage = () => {
        navigate('/image');
      };
    return (
        <div>
            <input onChange={onChange} value={detail}/>
            <button onClick={navigateToViewImage}type='submit'>제출</button>
        </div>
    );
};

export default PostDetail;