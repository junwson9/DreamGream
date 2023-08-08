import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root', // 스토리지에 저장될 키 값
  storage, // 사용할 스토리지 객체 (로컬 스토리지)
  whitelist: ['auth'], // 지속적으로 저장할 상태의 이름 (여기서는 'auth'라는 리듀서만 저장)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
