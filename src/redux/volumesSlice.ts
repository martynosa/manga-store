import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVolume } from '../types/manga';

const initialState: IVolume[] = [];

const volumesSlice = createSlice({
  name: 'volumes',
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<IVolume[]>) {
      state = action.payload;
      return state;
    },
  },
});

export default volumesSlice;
