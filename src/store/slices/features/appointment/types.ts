export interface IAppointmentType {
  storeAppointmentList: IAppointmentData[];
}

export interface IAppointmentData {
  date: string;
  time: string;
  doctorName: string;
  location: string;
  setReminder: string;
  medicineLocalId: string;
}
