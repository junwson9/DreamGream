import React, { useState, useCallback, useEffect, useRef } from 'react';
import Loading from '../../components/Loding';

function PostViewImage() {
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const eventSource = useRef(null);

  const handleEvent = useCallback(event => {
    if (event.data) {
      const imageData = JSON.parse(event.data);
      setImage(imageData)
        // 이전 이미지와 URL이 같은지 확인
      setIsLoading(false);
      eventSource.current.close();
    }
  }, []);

  const handleError = useCallback(
    event => {
      setIsLoading(true);
      console.error('Error Occurred in SSE Connection:', event);
      eventSource.current.close();
    },
    []
  );

  useEffect(() => {
    eventSource.current = new EventSource('http://localhost:5000/sse');
    eventSource.current.addEventListener('message', handleEvent);
    eventSource.current.addEventListener('error', handleError);
    return () => {
      eventSource.current.removeEventListener('message', handleEvent);
      eventSource.current.removeEventListener('error', handleError);
      eventSource.current.close();
    };
  }, [handleEvent, handleError]);

  return (
    <div>
      {isLoading ? <Loading /> : <img src={image} alt="postcapture" />}
    </div>
  );
}

export default PostViewImage;
