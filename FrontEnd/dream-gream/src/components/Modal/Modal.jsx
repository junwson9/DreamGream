import React from 'react'
import PropTypes from 'prop-types';

function Modal({handleCloseModal}){

return( 
<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  <div className="bg-white w-[320px] p-8 rounded-xl">
    <p className="text-center mb-6">그림이 도착했어요!<br/>확인해볼까요?</p>
    <div className="flex justify-center">
      <button className="text-white bg-indigo-400 hover:bg-indigo-700 font-bold py-2 px-4 rounded" type="button" onClick={handleCloseModal}>그림보러가기</button>
    </div>
  </div>
</div>
    
)}
Modal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default Modal;