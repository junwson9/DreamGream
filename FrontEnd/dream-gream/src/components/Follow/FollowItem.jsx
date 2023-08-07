import React from 'react';
import PropTypes from 'prop-types';

function FollowItem({ name }) {
  return (
    <div className="w-[360px] h-[45px] relative" style={{ margin: '10px 0' }}>
      <img
        className="w-[47.87px] h-12 left-[14.96px] top-[6px] absolute rounded-full"
        src="https://via.placeholder.com/48x48"
        alt="profile"
      />
      <div className="w-[177px] left-[85px] top-[18px] absolute text-neutral-700 text-base font-medium leading-snug">
        {name}
      </div>
      {/* <div className="w-[359px] h-[0px] left-[1px] top-[69px] absolute border border-zinc-300"></div> */}
      {/* <div className="w-[84.76px] h-[27px] left-[247.31px] top-[17px] absolute"></div> */}
      <div className="w-[84.76px] h-[27px] left-[262px] top-[17px] absolute bg-neutral-200 rounded-lg">
        <div className="left-[11px] top-[4px] absolute text-center text-neutral-700 text-[13px] font-bold leading-snug">
          팔로잉 취소
        </div>
      </div>
    </div>
  );
}

FollowItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FollowItem;
