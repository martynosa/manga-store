import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/user';

interface IAuthState {
  user: IUser | null;
}

const initialState: IAuthState = { user: null };

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      return state;
    },
    unsetUser(state) {
      state.user = null;
      return state;
    },
  },
});

export const authAction = authSlice.actions;
