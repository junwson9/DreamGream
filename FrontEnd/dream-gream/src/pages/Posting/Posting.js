/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostSubject from '../../components/Posting/PostSubject';
import PostDetail from '../../components/Posting/PostDetail';
import PostViewImage from '../../components/Posting/PostViewImage';
import { API_URL } from '../../config';

function Posting() {
  const [activeComponent, setActiveComponent] = useState('PostSubject');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let eventSource = null;

  const setupSSE = () => {
    const member_id = localStorage.getItem('member_id');
    eventSource = new EventSource(`${API_URL}/api/sse/${member_id}`); // Replace the URL with your SSE endpoint

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.url === 'error') {
        navigate('/posterror');
        eventSource.close();
      }
      console.log('Received SSE message:', data);


      // 서버로부터 받은 데이터를 Redux store에 저장
      dispatch({ type: 'SET_SSE_DATA', payload: data });
      // SSE 연결 끊기
      eventSource.close();
    };

    eventSource.onerror = (error) => {
      console.error('Error occurred in SSE connection:', error);
      navigate(-1);
      eventSource.close();
    };
  };
  const handleCloseIconClick = () => {
    if (eventSource) {
      eventSource.close();
    }
    navigate(-1);
  };
  const handleNextButtonClick = () => {
    if (activeComponent === 'PostSubject') {
      setActiveComponent('PostDetail');
    } else if (activeComponent === 'PostDetail') {
      setActiveComponent('PostViewImage');
    }

    // If you want to navigate to the next component, you can do it here
    // For example, if you want to go from PostSubject to PostDetail:
    // setActiveComponent('PostDetail');
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'PostSubject':
        return (
          <PostSubject
            handleCloseIconClick={handleCloseIconClick}
            handleNextButtonClick={handleNextButtonClick}
          />
        );
      case 'PostDetail':
        return (
          <PostDetail
            handleCloseIconClick={handleCloseIconClick}
            handleNextButtonClick={handleNextButtonClick}
          />
        );
      case 'PostViewImage':
        return <PostViewImage handleCloseIconClick={handleCloseIconClick} />;
      default:
        return <PostViewImage />;
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem('ACCESS_TOKEN');
    console.log(access_token);
    if (!access_token) {
      navigate('/loginerror');
    }
    setupSSE();
    return () => {
      // 컴포넌트가 언마운트되기 전에 SSE 연결 종료
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return <div>{renderActiveComponent()}</div>;
}

export default Posting;
