import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../Loding';


function PostViewImage() {
  const imageUrl = useSelector((state) => state.sse.sseData); // 이미지 URL을 Redux 상태에서 가져옴
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // When the component mounts, check if the imageUrl is available.
    // If imageUrl is available, set isLoading to false.
    if (imageUrl && imageUrl.url) {
      setIsLoading(false);
    }
  }, [imageUrl]); // Listen for changes in imageUrl

  const handleImageLoad = () => {
    setIsLoading(false); // 이미지 로딩이 끝났을 때 isLoading 상태를 false로 변경
  };

  console.log('Image URL:', imageUrl && imageUrl.url);

  return (
    <div>
      {isLoading ? <Loading /> : null}
      {imageUrl && imageUrl.url && (
        <img src={imageUrl.url} alt="Post" onLoad={handleImageLoad} />
      )}
    </div>
  );
}

export default PostViewImage;
