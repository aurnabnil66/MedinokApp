export interface IMedicineDetailsExtraSettingType {
  storeInstrucTionList: InstrucTion[];
  storeTreatmentDuration: ITreatmentDuration[];
  storeMedicineReminder: IMedicineReminder[];
}

export interface InstrucTion {
  instrucTion: string;
  medicineLocalId: string;
}

export interface ITreatmentDuration {
  treatmentDurationStartTime: string;
  treatmentDurationEndTime: string;
  medicineTakeEachDay: string;
  medicineLocalId: string;
}

export interface IMedicineReminder {
  medicineReminderTotalReq: string;
  medicineReminderCurrentStock: string;
  medicineReminderRemindToLeft: string;
  medicineLocalId: string;
}
