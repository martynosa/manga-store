import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoadingState {
  isStoreLoading: boolean;
  isProfileLoading: boolean;
  isCartLoading: boolean;
  isAuthLoading: boolean;
  isVolumeLoading: boolean;
  isAddToCartLoading: boolean;
  isRemoveFromCartLoading: boolean;
  isUpdateShippingAddressLoading: boolean;
  isCheckoutLoading: boolean;
}

const initialState: ILoadingState = {
  isStoreLoading: false,
  isProfileLoading: false,
  isCartLoading: false,
  isAuthLoading: false,
  isVolumeLoading: false,
  isAddToCartLoading: false,
  isRemoveFromCartLoading: false,
  isUpdateShippingAddressLoading: false,
  isCheckoutLoading: false,
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
