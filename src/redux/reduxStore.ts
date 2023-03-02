import { configureStore } from '@reduxjs/toolkit';
import volumesSlice from './volumesSlice';
import authSlice from './authSlice';
import cartSlice from './cartSlice';
import modalSlice from './modalSlice';

export type RootState = ReturnType<typeof reduxStore.getState>;
export const reduxStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    volumes: volumesSlice.reducer,
    cart: cartSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const volumesActions = volumesSlice.actions;
export const cartActions = cartSlice.actions;
export const modalActions = modalSlice.actions;
