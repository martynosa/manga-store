import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Action } from '@remix-run/router';
import { IShippingAddress, IUser } from '../typescript/interfaces';

interface IAuthState {
  user: IUser | null;
  shippingAddress: IShippingAddress;
}

export const initialShippingAddress = {
  address: '',
  city: '',
  postCode: '',
  phoneNumber: '',
};

const initialState: IAuthState = {
  user: null,
  shippingAddress: initialShippingAddress,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setShippingAddress(state, action: PayloadAction<IShippingAddress>) {
      state.shippingAddress = action.payload;
    },
    unsetUser(state) {
      state.user = null;
      state.shippingAddress = initialShippingAddress;
    },
  },
});

export default authSlice;
