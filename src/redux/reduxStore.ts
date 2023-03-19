import { configureStore } from '@reduxjs/toolkit';
import volumesSlice from './volumesSlice';
import authSlice from './authSlice';
import cartSlice from './cartSlice';
import modalSlice from './modalSlice';
import loadingSlice from './loadingSlice';

export type RootState = ReturnType<typeof reduxStore.getState>;
export const reduxStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    volumes: volumesSlice.reducer,
    cart: cartSlice.reducer,
    modal: modalSlice.reducer,
    loading: loadingSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const volumesActions = volumesSlice.actions;
export const cartActions = cartSlice.actions;
export const modalActions = modalSlice.actions;
export const loadingActions = loadingSlice.actions;
