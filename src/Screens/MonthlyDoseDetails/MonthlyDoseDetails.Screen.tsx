/* eslint-disable */

import React, { type FC, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import MedicineLogo from '../../assets/medicine-logo';
import CustomButton from '../../Components/CustomButton/CustomButton';
import DoseInputModal from '../../Components/DoseInputModal/DoseInputModal';
import MoreSettings from '../../Components/MoreSettingsComponent/MoreSettingsComponent';
import { colors } from '../../theme/colors';

import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IMonthlyDoseTime } from '@/store/slices/features/medicineDetails/types';
import {
  addscheduleList,
  setDoseList,
  setMonthlyDoseTime,
  setWeeklyStoreData
} from '@/store/slices/features/medicineDetails/slice';
import moment from 'moment';
import { createMothyMutation } from '@/mutations/createMonthly';
import { createMedicineData } from '@/mutations/createMedicine';
import { localSchedule } from '@/helper/notify';
import { INSTRUCTION_MUTATION } from '@/mutations/instruction_mutation';
import { TREATMENT_DURATION_MUTATION } from '@/mutations/treatmentDuration_mutation';
import { MEDICINE_REMINDER_MUTATION } from '@/mutations/medicineReminder_mutation';
import ToastPopUp from '@/utils/Toast.android';
import {
  getMothyDates,
  getWeekDates,
  setWeeklyDateDoseTimes,
  WeeklyDateEntry
} from '../WeeklyDoseDetails/extramethod';
import { multiScheduleMaker } from '../OnceAdayDose/extrafunctions';

const MonthlyDoseDetails: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const timeInterval = useSelector((state: RootState) => state.medicineDetails.timeInterval);
  const medicineLocalId = useSelector((state: RootState) => state.medicineDetails.medicineLocalId);
  const monthlyDoseTime = useSelector((state: RootState) => state.medicineDetails.monthlyDoseTime);
  const medicineName = useSelector((state: RootState) => state.medicineDetails.medicineName);
  const loginStatus = useSelector((state: RootState) => state.users.user.loginStatus);
  const takeStatus = useSelector((state: RootState) => state.medicineDetails.takeStatus);
  const typeMed = useSelector((state: RootState) => state.medicineDetails.typeMed);
  const unitMed = useSelector((state: RootState) => state.medicineDetails.unitMed);
  const strengthMed = useSelector((state: RootState) => state.medicineDetails.strengthMed);
  const accessToken = useSelector((state: RootState) => state.users.user?.data?.accessToken);

  const selectedDateTime = useSelector(
    (state: RootState) => state.medicineDetails.selectedDateTime
  );

  // State for time and dose for each intake
  const [times, setTimes] = useState<string[]>(
    Array(timeInterval !== '' ? parseInt(timeInterval) : 0).fill('')
  );
  const [doses, setDoses] = useState<number[]>(
    Array(timeInterval !== '' ? parseInt(timeInterval) : 0).fill(0)
  );

  const [doseDates, setDoseDates] = useState<Date[]>(
    Array(timeInterval !== '' ? parseInt(timeInterval) : 0).fill(new Date())
  );

  const [open, setOpen] = useState(false); // for time picker
  const [isModalVisible, setModalVisible] = useState(false); // for dose input
  const [selectedChip, setSelectedChip] = useState<number | null>(null); // to track which chip is being modified
  const [date, setDate] = useState(new Date());

  const [disable, setDisable] = useState(false);

  const storedMedicineMonthlyList = useSelector(
    (state: RootState) => state.medicineDetails.storedMedicineMonthlyList
  );

  const storedMedicineList = useSelector(
    (state: RootState) => state.medicineDetails.storedMedicineList
  );

  const storedInstructionList = useSelector(
    (state: RootState) => state.medicineDetailsExtraSetting.storeInstrucTionList
  );

  const storedTreatmentDurationList = useSelector(
    (state: RootState) => state.medicineDetailsExtraSetting.storeTreatmentDuration
  );

  const storedReminderList = useSelector(
    (state: RootState) => state.medicineDetailsExtraSetting.storeMedicineReminder
  );

  // Function to fetch instruction data from list
  const getInstructionData = (medicineId: string) => {
    if (storedInstructionList.length === 0) return '';

    const instructionName = storedInstructionList.find(
      (item: any) => item.medicineLocalId === medicineId
    );
    return instructionName?.instrucTion;
  };

  // Function to fetch treatment duration data from list
  const getTreatmentDurationData = (medicineId: string) => {
    if (storedTreatmentDurationList.length === 0)
      return {
        medicineTakeEachDay: '',
        treatmentDurationEndTime: '',
        treatmentDurationStartTime: ''
      };

    const treatmentDurationName = storedTreatmentDurationList.find(
      (item: any) => item.medicineLocalId === medicineId
    );

    return treatmentDurationName
      ? {
          medicineTakeEachDay: treatmentDurationName.medicineTakeEachDay,
          treatmentDurationEndTime: treatmentDurationName.treatmentDurationEndTime,
          treatmentDurationStartTime: treatmentDurationName.treatmentDurationStartTime
        }
      : { medicineTakeEachDay: '', treatmentDurationEndTime: '', treatmentDurationStartTime: '' };
  };

  const { medicineTakeEachDay, treatmentDurationEndTime, treatmentDurationStartTime } =
    getTreatmentDurationData(medicineLocalId);

  // Function to fetch medicine reminder data from list
  const getReminderData = (medicineId: string) => {
    if (storedReminderList.length === 0)
      return {
        medicineReminderCurrentStock: '',
        medicineReminderRemindToLeft: '',
        medicineReminderTotalReq: ''
      };

    const reminderQuantity = storedReminderList.find(
      (item: any) => item.medicineLocalId === medicineId
    );

    return reminderQuantity
      ? {
          medicineReminderCurrentStock: reminderQuantity.medicineReminderCurrentStock,
          medicineReminderRemindToLeft: reminderQuantity.medicineReminderRemindToLeft,
          medicineReminderTotalReq: reminderQuantity.medicineReminderTotalReq
        }
      : {
          medicineReminderCurrentStock: '',
          medicineReminderRemindToLeft: '',
          medicineReminderTotalReq: ''
        };
  };

  const { medicineReminderCurrentStock, medicineReminderRemindToLeft, medicineReminderTotalReq } =
    getReminderData(medicineLocalId);

  const handleSelectTime: any = (index: number) => {
    setSelectedChip(index);
    setOpen(true);
  };

  const handleSelectDose: any = (index: number) => {
    setSelectedChip(index);
    setModalVisible(true);
  };

  const clearTimeSelection: any = (index: number) => {
    setTimes(prevTimes => {
      const newTimes = [...prevTimes];
      newTimes[index] = '';
      return newTimes;
    });
  };

  const clearDoseSelection: any = (index: number) => {
    setDoses(prevDoses => {
      const newDoses = [...prevDoses];
      newDoses[index] = 0;
      return newDoses;
    });
  };

  const handleSubmit: any = (inputValue: number) => {
    if (selectedChip !== null) {
      setDoses(prevDoses => {
        const newDoses = [...prevDoses];
        newDoses[selectedChip] = inputValue;
        return newDoses;
      });
      setModalVisible(false);
    }
  };

  const clearAllDosesAndTime: any = () => {
    setDoses(doses.map(() => 0));
    setTimes(times.map(() => ''));
  };

  const handleNext: any = async () => {
    setDisable(true);
    let updatedStoredList = [...storedMedicineList];

    let filterArray = monthlyDoseTime.filter(e => {
      if (e.medicineLocalId === medicineLocalId) return e;
    });

    let filterArrayMonthly = storedMedicineMonthlyList.filter(e => {
      if (e.medicineLocalId.medicineLocalId.toString() === medicineLocalId) return e;
    });

    const customToday = new Date();

    let dataMData: WeeklyDateEntry[] = [];
    filterArrayMonthly.map(e => {
      dataMData = getMothyDates(e.medicineLocalId.Days, customToday);
    });

    const MonthlyDoseTime = setWeeklyDateDoseTimes(filterArray, dataMData);

    let updatedInstructionList = [...storedInstructionList];

    let updatedTreatmentDurationList = [...storedTreatmentDurationList];

    let updatedReminderList = [...storedReminderList];

    if (MonthlyDoseTime.length > 0) {
      let tempStore = MonthlyDoseTime.map(e => {
        return {
          medicineName: medicineName,
          medicineStatus: 'week',
          takeStatus: takeStatus,
          doseQuantity: e.doseQuantity,
          doseTime: e.doseTime,
          strengthMed: strengthMed,
          unitMed: unitMed,
          typeMed: typeMed,
          medicineId: '',
          medicineLocalId: e.medicineLocalId,
          createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
          selectedDateTime: e.doseDate
        };
      });

      // Create data for the new instruction
      let instructionData = {
        medicineLocalId: medicineLocalId,
        instrucTion: getInstructionData(medicineLocalId) || ''
      };

      // create treatment duration data
      let treatmentDurationData = {
        medicineLocalId: medicineLocalId,
        medicineTakeEachDay: medicineTakeEachDay,
        treatmentDurationEndTime: treatmentDurationEndTime,
        treatmentDurationStartTime: treatmentDurationStartTime
      };

      // Create data for the new reminder
      let reminderData = {
        medicineLocalId: medicineLocalId,
        medicineReminderCurrentStock: medicineReminderCurrentStock,
        medicineReminderRemindToLeft: medicineReminderRemindToLeft,
        medicineReminderTotalReq: medicineReminderTotalReq
      };

      const dataArray = multiScheduleMaker(
        tempStore,
        treatmentDurationStartTime,
        treatmentDurationEndTime,
        0,
        'monthly'
      );
      console.log('object', dataArray);
      // Add the new data to the copied array
      updatedInstructionList.push(instructionData);
      updatedTreatmentDurationList.push(treatmentDurationData);
      updatedReminderList.push(reminderData);

      updatedStoredList.push(...dataArray);

      if (loginStatus && accessToken != undefined) {
        // await createMothyMutation(accessToken, storedMedicineMonthlyList, medicineLocalId);
        await createMedicineData(dataArray, accessToken);
      }
      dispatch(setDoseList(updatedStoredList));

      let scheduleList = await localSchedule(dataArray, 'day', medicineLocalId);

      dispatch(addscheduleList(scheduleList));

      setDisable(false);

      //ToastPopUp('Medicine Created Successfully');
    }

    navigation.navigate('AddedMedicine' as never);
  };

  useEffect(() => {
    if (times.every(time => time !== '') && doses.every(dose => dose !== 0)) {
      const monthlyDoses: IMonthlyDoseTime[] = times
        .map((time, index) => ({
          doseTime: time,
          doseQuantity: doses[index].toString(),
          medicineLocalId,
          doseDate: doseDates[index]
        }))
        .filter(dose => dose.doseTime !== '' && dose.doseQuantity !== '0'); // Optional: filter out empty values

      dispatch(setMonthlyDoseTime(monthlyDoses));
    }
  }, [times, doses]);

  return (
    <View style={styles.container}>
      <Progress.Bar color="#A6BDF8" progress={0.4} width={380} style={styles.progressBarPosition} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.imagePosition}>
          <MedicineLogo />
        </View>
        <View style={styles.headingPosition}>
          <Text style={styles.headingText}>When do you need to take the dose?</Text>
        </View>

        {/* Time and Dose Chips */}
        <View>
          {times.map((_, index) => (
            <React.Fragment key={index}>
              <Text style={styles.intakeNumberText}>{`Intake ${index + 1}`}</Text>

              <View style={styles.chipPosition}>
                {/* Time Chip */}
                <View style={styles.chip}>
                  <View style={styles.chipProperties}>
                    <View style={styles.chipContentProperties}>
                      {times[index] !== '' && (
                        <TouchableOpacity onPress={() => clearTimeSelection(index)}>
                          <FontAwesome name="minus-circle" size={30} color={'red'} />
                        </TouchableOpacity>
                      )}
                      <Text style={styles.chipText}>Time</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.selectButton}
                      onPress={() => handleSelectTime(index)}>
                      <Text style={styles.selectButtonText}>
                        {times[index] === '' ? 'Select' : times[index]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Dose Chip */}
                <View style={styles.chip}>
                  <View style={styles.chipProperties}>
                    <View style={styles.chipContentProperties}>
                      {doses[index] !== 0 && (
                        <TouchableOpacity onPress={() => clearDoseSelection(index)}>
                          <FontAwesome name="minus-circle" size={30} color={'red'} />
                        </TouchableOpacity>
                      )}
                      <Text style={styles.chipText}>Dose</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.selectButton}
                      onPress={() => handleSelectDose(index)}>
                      <Text style={styles.selectButtonText}>
                        {doses[index] === 0 ? 'Select' : doses[index]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* Add More Settings */}
        {times.every(time => time !== '') && doses.every(dose => dose !== 0) && (
          <View>
            <View style={styles.addMoreSettingsHeaderPosition}>
              <Text style={styles.addMoreSettingsHeaderText}>
                Would you like to add more settings?
              </Text>
            </View>
            <View style={styles.addMoresettingsContainer}>
              <MoreSettings />
            </View>
          </View>
        )}

        {/* Time Picker Modal */}
        {open && (
          <DatePicker
            modal
            mode="time"
            open={open}
            date={date}
            dividerColor="white"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              const timeStr = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }).format(new Date(date));
              if (selectedChip !== null) {
                setTimes(prevTimes => {
                  const newTimes = [...prevTimes];
                  newTimes[selectedChip] = timeStr;
                  return newTimes;
                });

                setDoseDates(prevDates => {
                  const newDates = [...prevDates];
                  newDates[selectedChip] = date; // Store the selected date
                  return newDates;
                });
              }
            }}
            onCancel={() => {
              setOpen(false);
            }}
            theme="dark"
          />
        )}

        {/* Dose Input Modal */}
        <DoseInputModal
          numKeybaordType={true}
          visible={isModalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
          onSubmit={handleSubmit}
        />
      </ScrollView>

      {/* Next Button */}
      {times.every(time => time !== '') && doses.every(dose => dose !== 0) && (
        <View style={styles.NextbuttonPosition}>
          <CustomButton
            onPress={handleNext}
            disabled={disable}
            icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
            text="Next"
          />
        </View>
      )}
    </View>
  );
};

export default MonthlyDoseDetails;
