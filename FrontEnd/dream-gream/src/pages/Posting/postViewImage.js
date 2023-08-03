import React, { useState, useCallback, useEffect, useRef } from 'react';
import Loading from '../../components/Loding';

function PostViewImage() {
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const eventSource = useRef(null);

  const handleEvent = useCallback(event => {
    if (event.data) {
      console.log(event.data)
      const imageData = JSON.parse(event.data);
      setImage(imageData)
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
    eventSource.current = new EventSource('http://i9a609.p.ssafy.io:8000/sse');
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
      {isLoading ? <Loading /> : console.log(image)}
    </div>
  );
}

export default PostViewImage;
