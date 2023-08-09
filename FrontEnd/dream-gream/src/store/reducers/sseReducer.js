// sseReducer.js
/* eslint-disable */

const initialState = {
    sseData: null,
  };
  
  const sseReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SSE_DATA':
        return {
          ...state,
          sseData: action.payload,
        };
      default:
        return state;
      
        case 'CLEAR_IMAGE_URL':
          return {
            ...state,
            sseData: null,
          }
    }
  };
  
  export default sseReducer;