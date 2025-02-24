// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import appReducer from './slices/appSlice';
import setConfig from './slices/setSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    set: setConfig
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false // 关闭序列化警告（根据需求可选）
    })
})

export default store