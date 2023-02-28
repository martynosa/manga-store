import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';

const initialState: ICartItem[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initalize(state, action: PayloadAction<ICartItem[]>) {
      console.log(action.payload);

      state = action.payload;
      return state;
    },
  },
});
