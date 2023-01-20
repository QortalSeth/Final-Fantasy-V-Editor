import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import ROMReducer from './slices/ROM-Slice';

export const store = configureStore({
  reducer: {
    ROM: ROMReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;