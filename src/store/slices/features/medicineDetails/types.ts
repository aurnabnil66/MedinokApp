import moment from 'moment';

export interface IMedicineDetailsType {
  medicineName: string;
  medicineGenericName: string;
  medicineManufacturer: string;
  medicineStatus: string;
  takeStatus: string;
  doseQuantity: string;
  doseTime: string;
  storedMedicineList: IMedicine[];
  storedMedicineWeeklyList: IStoredWeekly[];
  storedMedicineMonthlyList: IStoredMonthly[];
  strengthMed: string;
  unitMed: string;
  typeMed: string;
  medicineLocalId: string;
  weeklyTime: string[];
  timeInterval: string;
  twiceAdayDoseTime: ITwiceAdayDoseTime[];
  threeTimesAdayDoseTime: IThreeTimesAdayDoseTime[];
  fourTimesAdayDoseTime: IFourTimesAdayDoseTime[];
  xTimesAdayDoseTime: IXTimesAdayDoseTime[];
  xHoursDoseTime: IXHoursAdayDoseTime[];
  weeklyDoseTime: IWeeklyDoseTime[];
  monthlyDoseTime: IMonthlyDoseTime[];
  xDaysDoseTime: IXDaysDoseTime[];
  xDaysTakeDoseTime: IMonthlyDoseTime[];
  xWeekDoseTime: IXWeeklyDoseTime[];
  xWeekTakeDoseTime: IWeeklyDoseTime[];
  xMonthDoseTime: IXMonthlyDoseTime[];
  xMonthTakeDoseTime: IWeeklyDoseTime[];
  selectedDates: string;
  description: string;
  person1: string;
  person2: string;
  person3: string;
  selectedDateTime: Date | null;
  scheduleList: MedicationScheduleList[];
}

export interface MedicationScheduleList {
  // alarmNotifData: AlarmNotification;
  medicineName: string;
  medicineId: string;
  notificationId: number;
}

export interface IXDaysDoseTime {
  day: string;
  date: string;
  timeTravel: string;
  medicineLocalId: string;
}

export interface IXWeeklyDoseTime {
  day: string;
  date: string;
  timeTravel: string;
  medicineLocalId: string;
}
export interface IXMonthlyDoseTime {
  day: string;
  date: string;
  timeTravel: string;
  medicineLocalId: string;
}

export interface IMonthlyDoseTime {
  doseTime: string;
  doseQuantity: string;
  medicineLocalId: string;
  doseDate: Date;
}

export interface IWeeklyDoseTime {
  doseTime: string;
  doseQuantity: string;
  medicineLocalId: string;
  doseDate: Date;
}

export interface ITwiceAdayDoseTime {
  doseTime: string;
  doseQuantity: string;
  medicineLocalId: string;
}

export interface IThreeTimesAdayDoseTime {
  doseTime: string;
  doseQuantity: string;
  medicineLocalId: string;
}

export interface IFourTimesAdayDoseTime {
  doseTime: string;
  doseQuantity: string;
  medicineLocalId: string;
}

export interface IXTimesAdayDoseTime {
  doseTime: string;
  doseQuantity: string;
  medicineLocalId: string;
}

export interface IXHoursAdayDoseTime {
  doseTime: string;
  doseQuantity: string;
  medicineLocalId: string;
}

export interface IMedicine {
  medicineName: string;
  medicineStatus: string;
  takeStatus: string;
  doseQuantity: string;
  doseTime: string;
  strengthMed?: string;
  unitMed?: string;
  typeMed?: string;
  medicineId?: string;
  medicineLocalId: string;
  createdDate: string;
  selectedDateTime: Date | null | moment.Moment;
}

export interface MedicineName {
  medicineName: string;
}

export interface StrengthUnit {
  strengthMed: string;
  unitMed: string;
}

export interface MedicType {
  typeMed: string;
}

export interface MedicStatus {
  medicineStatus: string;
}

export interface TakeStatus {
  takeStatus: string;
}

export interface doseTimeStatus {
  doseTime: string;
  selectedDateTime: Date | null;
}

export interface doseQuantityStatus {
  doseQuantity: string;
}

export interface IWeekly {
  weeklyTime: string[];
  timeInterval: string;
  IStoredWeekly: IStoredWeekly;
}

export interface IStoredWeekly {
  medicineLocalId: IMedicineLocalId;
}

export interface IStoredTwiceAday {
  medicineLocalId: IMedicineLocalId;
}

export interface IStoredThreeTimesAday {
  medicineLocalId: IMedicineLocalId;
}

export interface IStoredFourTimesAday {
  medicineLocalId: IMedicineLocalId;
}

export interface IStoredMonthly {
  medicineLocalId: IMedicineLocalMonthly;
}

export interface IMedicineLocalMonthly {
  Days: string[];
  eachOfDays: string;
  medicineLocalId: string;
}

export interface IMedicineLocalId {
  weeklyTime: string[];
  timeInterval: string;
  medicineLocalId: string;
}

export interface IProductDetails {
  description: string;
}

export interface IAdministration {
  person1: string;
  person2: string;
  person3: string;
}

export interface IDosageAndAdministration {
  administration: IAdministration;
}

export interface IMedicineInfo {
  product_details: IProductDetails;
  dosage_and_administration: IDosageAndAdministration;
}
