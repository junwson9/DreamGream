import { combineReducers } from 'redux';
import sseReducer from './sseReducer';

const rootReducer = combineReducers({
  sse: sseReducer,
  // 다른 리듀서들도 필요하다면 여기에 추가할 수 있습니다.
});

export default rootReducer;