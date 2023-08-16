/* eslint-disable */

import React from 'react';
import { ReactComponent as Guide } from '../../assets/guide.svg';
import { useNavigate } from 'react-router-dom';

function guide() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/myfeed');
  };

  return <Guide onClick={handleClick} />;
}

export default guide;
