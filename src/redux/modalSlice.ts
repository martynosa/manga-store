import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
  isOpen: boolean;
  content: null | 'signin' | 'signup' | 'checkout' | 'deleteUser';
}

export type IModalPayload =
  | null
  | 'signin'
  | 'signup'
  | 'checkout'
  | 'deleteUser';

const initialState: IModalState = {
  isOpen: false,
  content: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open(state, action: PayloadAction<IModalPayload>) {
      state.isOpen = true;
      state.content = action.payload;
    },
    close(state) {
      state.isOpen = false;
    },
  },
});

export default modalSlice;
