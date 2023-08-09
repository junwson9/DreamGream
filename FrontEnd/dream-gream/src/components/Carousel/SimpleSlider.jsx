/* eslint-disable */
import React,{useState,useEffect} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const SimpleSlider = () => {

  const [randomImageIndexes, setRandomImageIndexes] = useState([]);
  const baseURL = 'https://dreamgream-image-bucket.s3.ap-northeast-2.amazonaws.com/loading/img_'
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  useEffect(() => {
    const randomIndexes = [];
    while (randomIndexes.length < 10) {
      const randomIndex = Math.floor(Math.random() * 45) + 1;
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    setRandomImageIndexes(randomIndexes);
  }, []);

  return (
    <div className="w-48 h-48 rounded-xl">
      <Slider {...settings}>
      {randomImageIndexes.map((index) => (
          <div key={index} className="flex flex-col h-auto">
            <img
              className="w-48 h-48 rounded-xl"
              src={`${baseURL}${index}.png/150x150`}
              alt={`Image ${index}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
