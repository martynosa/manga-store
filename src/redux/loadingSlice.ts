import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoadingState {
  isPageLoading: boolean;
  isAuthLoading: boolean;
  isAddToCartLoading: boolean;
  isRemoveFromCartLoading: boolean;
  isUpdateShippingAddressLoading: boolean;
  isCheckoutLoading: boolean;
  isAuthStateChanging: boolean;
  isCartLinkLoading: boolean;
}

const initialState: ILoadingState = {
  isPageLoading: false,
  isAuthLoading: false,
  isAddToCartLoading: false,
  isRemoveFromCartLoading: false,
  isUpdateShippingAddressLoading: false,
  isCheckoutLoading: false,
  isAuthStateChanging: true,
  isCartLinkLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<ILoadingState>) {
      console.log(action.payload);

      state = action.payload;
      return state;
    },
  },
});

export default loadingSlice;
