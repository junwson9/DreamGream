import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ToTheTop from '../Button/ToTopButton';
import { ReactComponent as Feed } from '../../assets/feed.svg'
import { ReactComponent as More } from '../../assets/more.svg';
import { ReactComponent as My } from '../../assets/my.svg';
import { ReactComponent as Temple } from '../../assets/temple.svg';
import { ReactComponent as PaintBrush } from '../../assets/paintbrush.svg';
import { ReactComponent as FeedActive } from '../../assets/feed-active.svg';
import { ReactComponent as MyActive } from '../../assets/my-active.svg';
import { ReactComponent as TempleActive } from '../../assets/temple-active.svg';
import { ReactComponent as MoreActive } from '../../assets/more-active.svg';


function Navbar() {
  const location = useLocation();
  const [activeImage, setActiveImage] = useState('');

  const handleImageClick = (image) => {
    setActiveImage(image);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === '/cheerupfeed') {
      setActiveImage('feed');
    } else if (path === '/achievefeed') {
      setActiveImage('temple');
    } else if (path === '/myfeed') {
      setActiveImage('my');
    } else if (path === '/about') {
      setActiveImage('more');
    } else {
      setActiveImage('');
    }
  }, [location]);
  return (
    <div className="fixed h-16 bottom-0 bg-white shadow">
      <div className="absolute z-50 bottom-[85px] left-[300px]">
        <ToTheTop/>
      </div>
      <div className="w-[360px] h-16 left-0 top-0 absolute bg-white shadow">
        <div className="h-16 left-0 top-0 absolute justify-start items-center inline-flex">
          <div className="w-[72px] h-16 relative">
            <Link to="/cheerupfeed">
              <button
                type="button"
                className="w-[27px] h-[27px] left-[22px] top-[19px] absolute"
                onClick={() => handleImageClick('feed')}
              >
                <div
                  className="w-[26px] h-[26px]">
                    {
                      activeImage === 'feed' ? <FeedActive/> : <Feed/>
                    }
                  </div>
              </button>
            </Link>
          </div>
          <div className="w-[72px] h-16 relative">
            <Link to="/achievefeed">
              <button
                type="button"
                className="w-[26px] h-[26px] left-[23px] top-[19px] absolute"
                onClick={() => handleImageClick('temple')}
              >
                <div
                    className="w-[26px] h-[26px]"
                    >
                    {
                    activeImage === 'temple'
                      ? <TempleActive/>
                      : <Temple/>
                  }
                  </div>
              </button>
            </Link>
          </div>

          <div className="w-[72px] h-16 relative flex justify-center items-center">
            <Link to="/post">
              <button
                type="button"
                className="w-[46px] h-[46px] left-[13px] top-[9px] absolute bg-indigo-400 rounded-full shadow flex    justify-center items-center"
              >
                <div
                  className="w-[28px] h-[28px] relative">
                    <PaintBrush/>
                </div>
              </button>
            </Link>
          </div>

          <div className="w-[72px] h-16 relative">
            <Link to="/myfeed">
              <button
                type="button"
                className="w-[26px] h-[26px] left-[23px] top-[19px] absolute"
                onClick={() => handleImageClick('my')}
              >
                <div
                  className="w-[26px] h-[26px]">
                    {activeImage === 'my' ? <MyActive/> : <My/>}
                </div>
              </button>
            </Link>
          </div>

          <div className="w-[72px] h-16 relative">
            <Link to="/about">
              <button
                type="button"
                className="w-[26px] h-[26px] left-[23px] top-[19px] absolute"
                onClick={() => handleImageClick('more')}
              >
                <div
                  className="w-[26px] h-[26px]"
                  >
                  {
                    activeImage === 'more' ? <MoreActive/> : <More/>
                  }
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[360px] h-[0px] left-0 top-[1px] absolute border border-neutral-200" />
    </div>
  );
}

export default Navbar;
