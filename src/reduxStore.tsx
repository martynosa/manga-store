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
        (cartItem) =>
          cartItem.volume === action.payload.volume &&
          cartItem.manga === action.payload.manga
      );

      if (cartItem) {
        const updatedCartItem = {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
        const filteredState = currState.filter(
          (v) =>
            v.volume !== updatedCartItem.volume &&
            v.manga !== updatedCartItem.manga
        );
        return filteredState.concat(updatedCartItem);
      }

      return state.concat(action.payload);
    },
    remove(state, action: PayloadAction<{ volume: number; manga: string }>) {
      const currState = current(state);
      const cartItem = currState.find(
        (cartItem) =>
          cartItem.volume === action.payload.volume &&
          cartItem.manga === action.payload.manga
      );

      if (cartItem) {
        if (cartItem.quantity > 1) {
          const updatedCartItem = {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          };
          const filteredState = currState.filter(
            (v) =>
              v.volume !== updatedCartItem.volume &&
              v.manga !== updatedCartItem.manga
          );
          return filteredState.concat(updatedCartItem);
        }
        return state.filter(
          (v) =>
            v.volume !== action.payload.volume &&
            v.manga !== action.payload.manga
        );
      }
    },
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export const reduxStore = configureStore({
  reducer: { volumes: volumesSlice.reducer, cart: cartSlice.reducer },
});

export const volumesAction = volumesSlice.actions;
export const cartActions = cartSlice.actions;
