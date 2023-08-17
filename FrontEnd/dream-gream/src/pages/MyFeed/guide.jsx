/* eslint-disable */

import React from 'react';
import { ReactComponent as Guide } from '../../assets/guide.svg';
import { useNavigate } from 'react-router-dom';

function GuideComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/myfeed');
  };

  return (
    <div className="Guide" onClick={handleClick}>
      <Guide></Guide>
    </div>
  );
}

export default GuideComponent;
