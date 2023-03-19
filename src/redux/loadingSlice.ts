import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoadingState {
  isStoreLoading: boolean;
  isAuthLoading: boolean;
  isVolumeLoading: boolean;
  isAddToCartLoading: boolean;
  isRemoveFromCartLoading: boolean;
}

const initialState: ILoadingState = {
  isStoreLoading: false,
  isAuthLoading: false,
  isVolumeLoading: false,
  isAddToCartLoading: false,
  isRemoveFromCartLoading: false,
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
