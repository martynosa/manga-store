import {
  configureStore,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IVolume } from './types';

const initialState: IVolume[] = [];

const volumesSlice = createSlice({
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
export const store = configureStore({ reducer: volumesSlice.reducer });

export const volumesAction = volumesSlice.actions;
