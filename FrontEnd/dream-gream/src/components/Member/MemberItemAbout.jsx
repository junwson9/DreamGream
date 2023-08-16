/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../../utils/axiosInterceptor';
import { API_URL } from '../../config';
import { ReactComponent as RightArrowIcon } from '../../assets/icons/RightArrowIcon.svg';
import { useNavigate } from 'react-router-dom';
import myDefaultImg from '../../assets/default_profile.svg';

function MemberItem({ toMemberId, nickname, profileImg }) {
  const defaultProfileImg = myDefaultImg;

  const navigate = useNavigate();

  const navgateToProfile = () => {
    navigate(`/myfeed`);
  };

  return (
    <div
      className="w-[360px] h-[69px] top-[30px] relative"
      onClick={navgateToProfile}
    >
      <div className="top-[-20px] w-[400px] h-[0px] border border-zinc-100 absolute" />
      <div className="top-[100px] w-[400px] h-[0px] border border-zinc-100 absolute" />
      <div className="w-6 h-6 relative origin-top-left -rotate-180" />
      <img
        className="w-[75px] h-[75px] left-[14.96px] top-[3px] absolute rounded-full"
        style={{
          backgroundImage: `url(${profileImg || defaultProfileImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="w-[177px] left-[110px] top-[25px] absolute text-neutral-700 text-xl font-medium leading-snug">
        {nickname}
        <div className="absolute top-[0px] left-[200px]">
          <RightArrowIcon />
        </div>
      </div>
    </div>
  );
}

MemberItem.propTypes = {
  tomemberId: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  profileImg: PropTypes.string,
  isFollowed: PropTypes.bool.isRequired,
};

export default MemberItem;
