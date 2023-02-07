import {
  configureStore,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IVolume } from './types';

const initialState: IVolume[] = [];

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
