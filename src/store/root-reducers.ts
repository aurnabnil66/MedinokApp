import { combineReducers } from '@reduxjs/toolkit';

import {
  appointmentReducer,
  medicineDetailsReducer,
  medicineDetailsExtraSettingReducer,
  prescriptionReducer, 
  usersReducer, 
  settingsReducer
} from '../store/slices/features/index';

const rootReducers = combineReducers({
  users: usersReducer,
  settings: settingsReducer,
  medicineDetails: medicineDetailsReducer,
  medicineDetailsExtraSetting: medicineDetailsExtraSettingReducer,
  appointment: appointmentReducer,
  prescription: prescriptionReducer
});

export default rootReducers;
