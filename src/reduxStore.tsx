import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVolume } from './types';

const initialVolumesState: IVolume[] = [];

const volumesSlice = createSlice({
  name: 'volumes',
  initialState: initialVolumesState,
  reducers: {
    initialize(state, action: PayloadAction<IVolume[]>) {
      state = action.payload;
      return state;
    },
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export const reduxStore = configureStore({
  reducer: { volumes: volumesSlice.reducer },
});

export const volumesAction = volumesSlice.actions;
