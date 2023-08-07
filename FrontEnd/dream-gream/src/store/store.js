import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
/* eslint-disable */

const store = configureStore({
  reducer: rootReducer,
});

export default store;