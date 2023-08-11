/* eslint-disable */
const initialState = {
    sharedPost: null,
  };
  
  const shareReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SHARED_POST':
        return { ...state, sharedPost: action.payload };
      default:
        return state;
    }
  };
  export default shareReducer;