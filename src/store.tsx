import { configureStore, createSlice, current } from '@reduxjs/toolkit';
import { ICartItem, IVolume } from './types';

const initialVolumesState: IVolume[] = [];
const initialCartState: ICartItem[] = [];

const volumesSlice = createSlice({
  name: 'volumes',
  initialState: initialVolumesState,
  reducers: {
    initialize(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    add(state, action) {
      const currState = current(state);
      const cartItem = currState.find(
        (cartItem) => cartItem.chapterId === action.payload.chapterId
      );

      if (cartItem) {
        const updatedCartItem = {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
        const filteredState = currState.filter(
          (c) => c.chapterId !== updatedCartItem.chapterId
        );
        return filteredState.concat(updatedCartItem);
      }

      return state.concat(action.payload);
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
  reducer: { volumes: volumesSlice.reducer, cart: cartSlice.reducer },
});

export const volumesAction = volumesSlice.actions;
export const cartActions = cartSlice.actions;
