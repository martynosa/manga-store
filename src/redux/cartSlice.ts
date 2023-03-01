import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';

const initialState: ICartItem[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<ICartItem[]>) {
      state = action.payload;
      return state;
    },
    add(state, action: PayloadAction<ICartItem>) {
      const cartItem = state.find((item) => action.payload.id === item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.push(action.payload);
      }
    },
    remove(state, action: PayloadAction<ICartItem>) {
      const cartItem = state.find((item) => action.payload.id === item.id);

      if (cartItem) {
        if (cartItem.quantity <= 1) {
          const mutatedState = state.filter(
            (item) => item.id !== action.payload.id
          );
          return mutatedState;
        } else {
          cartItem.quantity--;
        }
      }
    },
  },
});
