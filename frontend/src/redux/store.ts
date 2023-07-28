import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { cartOrderSlice } from './cart/cartSlice';
import { userSlice } from './user/userSlice';

export const store = configureStore({
  reducer: {
    [cartOrderSlice.name]: cartOrderSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  devTools: true,
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(() => store);
