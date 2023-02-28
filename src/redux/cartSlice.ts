import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';

const initialState: ICartItem[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initalize(state, action: PayloadAction<ICartItem[]>) {
      state = action.payload;
      return state;
    },
    add(state, action: PayloadAction<ICartItem>) {
      // add item to the cart
      // if item already exists increment
    },
    remove(state, action: PayloadAction<ICartItem>) {
      // if item already exists decrement
      // if quantity === 0 remove
    },
  },
});
