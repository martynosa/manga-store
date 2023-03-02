import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/user';

interface IAuthState {
  user: IUser | null;
}

const initialState: IAuthState = { user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    unsetUser(state) {
      state.user = null;
    },
  },
});

export default authSlice;
