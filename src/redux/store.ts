import { combineReducers, configureStore } from '@reduxjs/toolkit';
/* eslint-disable import/no-cycle */
import { createStateSyncMiddleware, initMessageListener, initStateWithPrevTab, withReduxStateSync } from 'redux-state-sync';
import thunk from 'redux-thunk';
import ROMReducer from './slices/ROM-Slice';

const rootReducer = withReduxStateSync(combineReducers({ ROM: ROMReducer }));
export const store = configureStore({
  reducer: rootReducer,
  middleware: [createStateSyncMiddleware()],
});

// withReduxStateSync();

initStateWithPrevTab(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
