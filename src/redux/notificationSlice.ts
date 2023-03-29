import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface INotificationState {
  isOpen: boolean;
  message: string;
  type: null | 'success' | 'fail';
}

export interface INotificationPayload {
  message: string;
  type: 'success' | 'fail';
}

const initialState: INotificationState = {
  isOpen: false,
  message: '',
  type: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    open(state, action: PayloadAction<INotificationPayload>) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    close(state) {
      state.isOpen = false;
    },
  },
});

export default notificationSlice;
