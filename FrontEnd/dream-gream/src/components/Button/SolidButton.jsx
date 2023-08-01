import React from 'react';
import PropTypes from 'prop-types';

function SolidButton({name}){
    return (
        <button type="submit" className="w-80 h-[55px] bg-indigo-400 rounded-lg justify-center items-center inline-flex">
  <div className="text-center text-white text-base font-medium">{name}</div>
        </button>
    )
}

SolidButton.propTypes = {
    name: PropTypes.string.isRequired,
  };

export default SolidButton;