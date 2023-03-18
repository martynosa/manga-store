import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IPurchaseHistoryItem,
  IShippingAddress,
  IUser,
} from '../typescript/interfaces';

interface IAuthState {
  user: IUser | null;
  shippingAddress: IShippingAddress;
  purchaseHistory: IPurchaseHistoryItem[];
}

export const initialShippingAddress = {
  address: '',
  city: '',
  postCode: '',
  phoneNumber: '',
};

export const initialPurchaseHistory: IPurchaseHistoryItem[] = [];

const initialState: IAuthState = {
  user: null,
  shippingAddress: initialShippingAddress,
  purchaseHistory: initialPurchaseHistory,
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
    setPurchaseHistory(state, action: PayloadAction<IPurchaseHistoryItem[]>) {
      state.purchaseHistory = action.payload;
    },
    addToPurchaseHistory(state, action: PayloadAction<IPurchaseHistoryItem>) {
      state.purchaseHistory.push(action.payload);
    },
    unsetUser(state) {
      state.user = null;
      state.shippingAddress = initialShippingAddress;
      state.purchaseHistory = initialPurchaseHistory;
    },
  },
});

export default authSlice;
