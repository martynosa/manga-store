import {
  configureStore,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ICartItem, IVolume } from './types';

const initialVolumesState: IVolume[] = [];
const initialCartState: ICartItem[] = [];

const volumesSlice = createSlice({
  name: 'volumes',
  initialState: initialVolumesState,
  reducers: {
    initialize(state, action: PayloadAction<IVolume[]>) {
      state = action.payload;
      return state;
    },
  },
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    initalize(state, action: PayloadAction<ICartItem[]>) {
      state = action.payload;
      return state;
    },
    add(state, action: PayloadAction<ICartItem>) {
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
    remove(state, action: PayloadAction<{ chapterId: number }>) {
      const currState = current(state);
      const cartItem = currState.find(
        (cartItem) => cartItem.chapterId === action.payload.chapterId
      );

      if (cartItem) {
        if (cartItem.quantity > 1) {
          const updatedCartItem = {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          };
          const filteredState = currState.filter(
            (c) => c.chapterId !== updatedCartItem.chapterId
          );
          return filteredState.concat(updatedCartItem);
        }
        return state.filter((c) => c.chapterId !== action.payload.chapterId);
      }
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
  reducer: { volumes: volumesSlice.reducer, cart: cartSlice.reducer },
});

export const volumesAction = volumesSlice.actions;
export const cartActions = cartSlice.actions;
