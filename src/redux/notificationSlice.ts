import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface INotificationState {
  isOpen: boolean;
  type: 'success' | 'fail';
  message: string;
}

export interface INotificationPayload {
  message: string;
  type: 'success' | 'fail';
}

const initialState: INotificationState = {
  isOpen: false,
  type: 'success',
  message: '',
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
