import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import axiosInterceptor from '../utils/axiosInterceptor';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), axiosInterceptor],
});

export default store;