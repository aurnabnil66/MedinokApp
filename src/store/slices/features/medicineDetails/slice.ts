import uuid from 'react-native-uuid';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {MEDICINE_DETAILS} from './constants';
import {
  type doseQuantityStatus,
  type doseTimeStatus,
  type IMedicine,
  type IMedicineDetailsType,
  type IMonthlyDoseTime,
  type IStoredMonthly,
  type ITwiceAdayDoseTime,
  type IThreeTimesAdayDoseTime,
  type IFourTimesAdayDoseTime,
  type IXTimesAdayDoseTime,
  type IXHoursAdayDoseTime,
  type IWeekly,
  type IWeeklyDoseTime,
  type IXDaysDoseTime,
  type IXMonthlyDoseTime,
  type IXWeeklyDoseTime,
  type MedicineName,
  type MedicStatus,
  type MedicType,
  type StrengthUnit,
  type TakeStatus,
  MedicationScheduleList,
  IMedicineScanData,
} from './types';

const medicineDetailsInitialData: IMedicineDetailsType = {
  medicineLocalId: '',
  medicineName: '',
  medicineGenericName: '',
  medicineManufacturer: '',
  medicineStatus: '',
  takeStatus: '',
  doseQuantity: '',
  doseTime: '',
  strengthMed: '',
  unitMed: '',
  typeMed: '',
  storedMedicineList: [],
  storedMedicineWeeklyList: [],
  storedMedicineMonthlyList: [],
  weeklyTime: [],
  timeInterval: '',
  twiceAdayDoseTime: [],
  threeTimesAdayDoseTime: [],
  fourTimesAdayDoseTime: [],
  xTimesAdayDoseTime: [],
  xHoursDoseTime: [],
  weeklyDoseTime: [],
  monthlyDoseTime: [],
  xDaysDoseTime: [],
  xDaysTakeDoseTime: [],
  xWeekDoseTime: [],
  xWeekTakeDoseTime: [],
  xMonthDoseTime: [],
  xMonthTakeDoseTime: [],
  selectedDates: '',
  id: 0,
  manufacturer: '',
  brandName: '',
  dosageFromStrength: '',
  indication: '',
  sideEffects: '',
  dose: '',
  contraindication: '',
  selectedDateTime: null,
  scheduleList: [],
};

const GenerateUniqueIdUUID = (): string => {
  return uuid.v4() as string;
};

export const medicineDetailsSlice = createSlice({
  name: MEDICINE_DETAILS,
  initialState: medicineDetailsInitialData,
  reducers: {
    getMedicineDetailsAction: (state: IMedicineDetailsType) => {
      state.medicineName = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.doseQuantity = '';
      state.doseTime = '';
      state.medicineGenericName = '';
    },
    setMedicineName: (
      state: IMedicineDetailsType,
      payload: PayloadAction<MedicineName>,
    ) => {
      state.medicineLocalId = GenerateUniqueIdUUID();
      state.medicineName = payload.payload.medicineName;
    },
    setStrengthUnit: (
      state: IMedicineDetailsType,
      payload: PayloadAction<StrengthUnit>,
    ) => {
      state.strengthMed = payload.payload.strengthMed;
      state.unitMed = payload.payload.unitMed;
    },
    setMedicineType: (
      state: IMedicineDetailsType,
      payload: PayloadAction<MedicType>,
    ) => {
      state.typeMed = payload.payload.typeMed;
    },
    setMedicineStatus: (
      state: IMedicineDetailsType,
      payload: PayloadAction<MedicStatus>,
    ) => {
      state.medicineStatus = payload.payload.medicineStatus;
    },
    setTakeStatus: (
      state: IMedicineDetailsType,
      payload: PayloadAction<TakeStatus>,
    ) => {
      state.takeStatus = payload.payload.takeStatus;
    },
    setDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<doseTimeStatus>,
    ) => {
      state.doseTime = payload.payload.doseTime;
      state.selectedDateTime = payload.payload.selectedDateTime;
    },
    setDoseQuantity: (
      state: IMedicineDetailsType,
      payload: PayloadAction<doseQuantityStatus>,
    ) => {
      state.doseQuantity = payload.payload.doseQuantity;
    },

    setDoseList: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IMedicine[]>,
    ) => {
      state.storedMedicineList = payload.payload;
      state.medicineLocalId = '';
      state.timeInterval = '';
      state.doseTime = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.strengthMed = '';
      state.unitMed = '';
      state.typeMed = '';
      state.doseQuantity = '';
      state.medicineName = '';
    },
    setWeekly: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IWeekly>,
    ) => {
      state.weeklyTime = payload.payload.weeklyTime;
      state.timeInterval = payload.payload.timeInterval;
      state.storedMedicineWeeklyList = [
        ...state.storedMedicineWeeklyList,
        payload.payload.IStoredWeekly,
      ];
    },
    setTwiceAdayDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<ITwiceAdayDoseTime[]>,
    ) => {
      const data = [...state.twiceAdayDoseTime, ...payload.payload];
      state.twiceAdayDoseTime = data;
    },

    setThreeTimesAdayDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IThreeTimesAdayDoseTime[]>,
    ) => {
      const data = [...state.threeTimesAdayDoseTime, ...payload.payload];
      state.threeTimesAdayDoseTime = data;
    },

    setFourTimesAdayDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IFourTimesAdayDoseTime[]>,
    ) => {
      const data = [...state.fourTimesAdayDoseTime, ...payload.payload];
      state.fourTimesAdayDoseTime = data;
    },

    setXtimesAdayDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IXTimesAdayDoseTime[]>,
    ) => {
      const data = [...state.xTimesAdayDoseTime, ...payload.payload];
      state.xTimesAdayDoseTime = data;
    },

    setXhoursAdayDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IXHoursAdayDoseTime[]>,
    ) => {
      const data = [...state.xHoursDoseTime, ...payload.payload];
      state.xHoursDoseTime = data;
    },

    setWeeklyDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IWeeklyDoseTime[]>,
    ) => {
      const data = [...state.weeklyDoseTime, ...payload.payload];
      state.weeklyDoseTime = data;
    },
    setMonthlyDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IMonthlyDoseTime[]>,
    ) => {
      const data = [...state.monthlyDoseTime, ...payload.payload];
      state.monthlyDoseTime = data;
    },
    setWeeklyStoreData: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IMedicine[]>,
    ) => {
      state.storedMedicineList = [
        ...state.storedMedicineList,
        ...payload.payload,
      ];
      state.medicineLocalId = '';
      state.timeInterval = '';
      state.doseTime = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.strengthMed = '';
      state.unitMed = '';
      state.typeMed = '';
      state.doseQuantity = '';
      state.medicineName = '';
    },
    setTwiceAdayStoreData: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IMedicine[]>,
    ) => {
      state.storedMedicineList = [
        ...state.storedMedicineList,
        ...payload.payload,
      ];
      state.medicineLocalId = '';
      state.timeInterval = '';
      state.doseTime = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.strengthMed = '';
      state.unitMed = '';
      state.typeMed = '';
      state.doseQuantity = '';
      state.medicineName = '';
    },

    setThreeTimesAdayStoreData: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IMedicine[]>,
    ) => {
      state.storedMedicineList = [
        ...state.storedMedicineList,
        ...payload.payload,
      ];
      state.medicineLocalId = '';
      state.timeInterval = '';
      state.doseTime = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.strengthMed = '';
      state.unitMed = '';
      state.typeMed = '';
      state.doseQuantity = '';
      state.medicineName = '';
    },

    setFourTimesAdayStoreData: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IMedicine[]>,
    ) => {
      state.storedMedicineList = [
        ...state.storedMedicineList,
        ...payload.payload,
      ];
      state.medicineLocalId = '';
      state.timeInterval = '';
      state.doseTime = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.strengthMed = '';
      state.unitMed = '';
      state.typeMed = '';
      state.doseQuantity = '';
      state.medicineName = '';
    },

    setXtimesAdayStoreData: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IMedicine[]>,
    ) => {
      state.storedMedicineList = [
        ...state.storedMedicineList,
        ...payload.payload,
      ];
      state.medicineLocalId = '';
      state.timeInterval = '';
      state.doseTime = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.strengthMed = '';
      state.unitMed = '';
      state.typeMed = '';
      state.doseQuantity = '';
      state.medicineName = '';
    },

    setXhoursAdayStoreData: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IMedicine[]>,
    ) => {
      state.storedMedicineList = [
        ...state.storedMedicineList,
        ...payload.payload,
      ];
      state.medicineLocalId = '';
      state.timeInterval = '';
      state.doseTime = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.strengthMed = '';
      state.unitMed = '';
      state.typeMed = '';
      state.doseQuantity = '';
      state.medicineName = '';
    },

    setMonthlyStoreData: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IStoredMonthly[]>,
    ) => {
      state.storedMedicineMonthlyList = [
        ...state.storedMedicineMonthlyList,
        ...payload.payload,
      ];
    },

    setXmonthStoreData: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IMedicine[]>,
    ) => {
      state.storedMedicineList = [
        ...state.storedMedicineList,
        ...payload.payload,
      ];
      state.medicineLocalId = '';
      state.timeInterval = '';
      state.doseTime = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.strengthMed = '';
      state.unitMed = '';
      state.typeMed = '';
      state.doseQuantity = '';
      state.medicineName = '';
    },

    updateTimeInterval: (
      state: IMedicineDetailsType,
      payload: PayloadAction<string>,
    ) => {
      state.timeInterval = payload.payload;
    },
    // set X days
    setXDaysDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IXDaysDoseTime[]>,
    ) => {
      state.xDaysDoseTime = [...state.xDaysDoseTime, ...payload.payload];
    },
    setXDaysTakeDose: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IWeeklyDoseTime[]>,
    ) => {
      state.xDaysTakeDoseTime = [
        ...state.xDaysTakeDoseTime,
        ...payload.payload,
      ];
    },
    // set X week
    setXWeekDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IXWeeklyDoseTime[]>,
    ) => {
      state.xWeekDoseTime = [...state.xWeekDoseTime, ...payload.payload];
    },
    setXWeekTakeDose: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IWeeklyDoseTime[]>,
    ) => {
      state.xWeekTakeDoseTime = [
        ...state.xWeekTakeDoseTime,
        ...payload.payload,
      ];
    },
    // set X Month
    setXMonthDoseTime: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IXMonthlyDoseTime[]>,
    ) => {
      state.xMonthDoseTime = [...state.xMonthDoseTime, ...payload.payload];
    },
    setXMonthTakeDose: (
      state: IMedicineDetailsType,
      payload: PayloadAction<IWeeklyDoseTime[]>,
    ) => {
      state.xMonthTakeDoseTime = [
        ...state.xMonthTakeDoseTime,
        ...payload.payload,
      ];
    },

    setSelectedDay: (
      state: IMedicineDetailsType,
      payload: PayloadAction<string>,
    ) => {
      state.selectedDates = payload.payload;
    },

    clearStoreMedicineDetails: (state: IMedicineDetailsType) => {
      state.medicineLocalId = '';
      state.medicineName = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.doseQuantity = '';
      state.doseTime = '';
      state.strengthMed = '';
      state.unitMed = '';
      state.typeMed = '';
      state.storedMedicineList = [];
      state.storedMedicineWeeklyList = [];
      state.storedMedicineMonthlyList = [];
      state.weeklyTime = [];
      state.timeInterval = '';
      state.weeklyDoseTime = [];
      state.monthlyDoseTime = [];
      state.xDaysDoseTime = [];
      state.xDaysTakeDoseTime = [];
      state.xWeekDoseTime = [];
      state.xWeekTakeDoseTime = [];
      state.xMonthDoseTime = [];
      state.xMonthTakeDoseTime = [];
      state.selectedDates = '';
      state.selectedDateTime = null;
    },

    // for QR Code Scan
    setQrCodeToScanData: (
      state: IMedicineDetailsType,
      payload: PayloadAction<any>,
    ) => {
      state.id = payload.payload?.id;
      state.manufacturer = payload.payload?.manufacturer;
      state.brandName = payload.payload?.brandName;
      state.dosageFromStrength = payload.payload?.dosageFromStrength;
      state.indication = payload.payload?.indication;
      state.sideEffects = payload.payload?.sideEffects;
      state.dose = payload.payload?.dose;
      state.contraindication = payload.payload?.contraindication;
    },
    clearStoreMedicine: (state: IMedicineDetailsType) => {
      state.medicineLocalId = '';
      state.timeInterval = '';
      state.doseTime = '';
      state.medicineStatus = '';
      state.takeStatus = '';
      state.strengthMed = '';
      state.unitMed = '';
      state.typeMed = '';
      state.doseQuantity = '';
      state.medicineName = '';
    },

    deleteMedicine: (
      state: IMedicineDetailsType,
      payload: PayloadAction<any>,
    ) => {
      state.storedMedicineList = payload.payload;
    },

    addscheduleList: (
      state: IMedicineDetailsType,
      payload: PayloadAction<MedicationScheduleList[]>,
    ) => {
      state.scheduleList = [...state.scheduleList, ...payload.payload];
    },
  },
});

export const {
  getMedicineDetailsAction,
  setMedicineName,
  setStrengthUnit,
  setMedicineType,
  setMedicineStatus,
  setTakeStatus,
  setDoseTime,
  setDoseQuantity,
  setDoseList,
  setWeekly,
  setTwiceAdayDoseTime,
  setTwiceAdayStoreData,
  setThreeTimesAdayDoseTime,
  setThreeTimesAdayStoreData,
  setFourTimesAdayDoseTime,
  setFourTimesAdayStoreData,
  setXtimesAdayDoseTime,
  setXtimesAdayStoreData,
  setXhoursAdayDoseTime,
  setXhoursAdayStoreData,
  setWeeklyDoseTime,
  setWeeklyStoreData,
  setMonthlyStoreData,
  setXmonthStoreData,
  updateTimeInterval,
  setMonthlyDoseTime,
  setXDaysDoseTime,
  setXDaysTakeDose,
  setXWeekDoseTime,
  setXWeekTakeDose,
  setXMonthDoseTime,
  setXMonthTakeDose,
  clearStoreMedicineDetails,
  setSelectedDay,
  setQrCodeToScanData,
  clearStoreMedicine,
  deleteMedicine,
  addscheduleList,
} = medicineDetailsSlice.actions;

export const medicineDetailsReducer = medicineDetailsSlice.reducer;
