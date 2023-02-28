import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
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
      // must check if already exists

      // add
      state.push(action.payload);
    },
    remove(state, action: PayloadAction<ICartItem>) {
      // must check if quantity === 1
      const currState = current(state);
      const mutatedState = currState.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      return mutatedState;

      // decrement
    },
  },
});
