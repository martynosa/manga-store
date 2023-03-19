import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoadingState {
  isPageLoading: boolean;
  isAuthLoading: boolean;
  isAuthStateChanging: boolean;
}

const initialState: ILoadingState = {
  isPageLoading: false,
  isAuthLoading: false,
  isAuthStateChanging: true,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setPageLoading(state, action: PayloadAction<boolean>) {
      state.isPageLoading = action.payload;
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isAuthLoading = action.payload;
    },
    setIsAuthStateChanging(state, action: PayloadAction<boolean>) {
      state.isAuthStateChanging = action.payload;
    },
  },
});

export default loadingSlice;
