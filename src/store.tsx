import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Volume } from './types';

const initialState: Volume[] = [];

const volumeSlice = createSlice({
  name: 'volumes',
  initialState,
  reducers: {
    initialize(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({ reducer: volumeSlice.reducer });

export const volumesAction = volumeSlice.actions;
