import { configureStore } from '@reduxjs/toolkit';
import ROMReducer from './slices/ROM-Slice';

export const store = configureStore({
  reducer: {
    ROM: ROMReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
