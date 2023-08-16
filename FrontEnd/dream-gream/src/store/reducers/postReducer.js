// reducers/postReducer.js
/* eslint-disable */

const initialState = {
    subject: {
      title: '',
      category: '기타',
      categoryID: 9,
    },
    detail: {
      content: '',
      isPublic: false,
      selectedPeriod: '',
    },
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_SUBJECT':
        return {
          ...state,
          subject: {
            ...state.subject,
            ...action.payload,
          },
        };
      case 'SAVE_DETAIL':
        return {
          ...state,
          detail: {
            ...state.detail,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default postReducer;
  