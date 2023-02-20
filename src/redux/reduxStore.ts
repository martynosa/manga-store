import { configureStore } from '@reduxjs/toolkit';
import { volumesSlice } from './volumesSlice';
import { authSlice } from './authSlice';

export type RootState = ReturnType<typeof reduxStore.getState>;
export const reduxStore = configureStore({
  reducer: { volumes: volumesSlice.reducer, user: authSlice.reducer },
});

export const volumesAction = volumesSlice.actions;
