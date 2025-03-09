import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { APPOINTMENT } from './constants';
import { type IAppointmentData, type IAppointmentType } from './types';

const appointmentInitialData: IAppointmentType = {
  storeAppointmentList: []
};

export const appointmentSlice = createSlice({
  name: APPOINTMENT,
  initialState: appointmentInitialData,
  reducers: {
    setAppointment: (state: IAppointmentType, payload: PayloadAction<IAppointmentData[]>) => {
      state.storeAppointmentList = [...state.storeAppointmentList, ...payload.payload];
    },
    clearAppointment: (state: IAppointmentType) => {
      state.storeAppointmentList = [];
    }
  }
});

export const { setAppointment, clearAppointment } = appointmentSlice.actions;

export const appointmentReducer = appointmentSlice.reducer;
