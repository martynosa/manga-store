import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
  isOpen: boolean;
  content: null | 'signin' | 'signup';
}

export type IModalPayload = null | 'signin' | 'signup';

const initialState: IModalState = {
  isOpen: false,
  content: 'signin',
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
