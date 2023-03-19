import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoadingState {
  isStoreLoading: boolean;
  isAuthLoading: boolean;
}

const initialState: ILoadingState = {
  isStoreLoading: false,
  isAuthLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<ILoadingState>) {
      state = action.payload;
      return state;
    },
  },
});

export default loadingSlice;
