/* eslint-disable */

import React, { type FC, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  addscheduleList,
  setDoseList,
  setDoseQuantity,
  setDoseTime
} from '@/store/slices/features/medicineDetails/slice';
import MedicineLogo from '../../assets/medicine-logo';
import CustomButton from '../../Components/CustomButton/CustomButton';
import DoseInputModal from '../../Components/DoseInputModal/DoseInputModal';
import MoreSettings from '../../Components/MoreSettingsComponent/MoreSettingsComponent';
import { colors } from '../../theme/colors';
import styles from './style';
import { RootState } from '@/store';
import ToastPopUp from '@/utils/Toast.android';
import moment from 'moment';
import { localSchedule } from '@/helper/notify';
import DatePicker from 'react-native-date-picker';
import { createMedicineData } from '@/mutations/createMedicine';
import { INSTRUCTION_MUTATION } from '@/mutations/instruction_mutation';
import { TREATMENT_DURATION_MUTATION } from '@/mutations/treatmentDuration_mutation';
import { MEDICINE_REMINDER_MUTATION } from '@/mutations/medicineReminder_mutation';
import { multiScheduleMaker } from './extrafunctions';

const OnceAdayDose: FC = () => {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // State for time and dose for each intake
  const [times, setTimes] = useState<string[]>(Array(1).fill(''));
  const [doses, setDoses] = useState<number[]>(Array(1).fill(0));
  const [open, setOpen] = useState(false); // for time picker
  const [isModalVisible, setModalVisible] = useState(false); // for dose input
  const [selectedChip, setSelectedChip] = useState<number | null>(null); // to track which chip is being modified
  const [dateFromModal, setDateFromModal] = useState(new Date());

  const [disable, setDisable] = useState(false);

  const medicineLocalId = useSelector((state: RootState) => state.medicineDetails.medicineLocalId);
  const doseTime = useSelector((state: RootState) => state.medicineDetails.doseTime);
  const doseQuantity = useSelector((state: RootState) => state.medicineDetails.doseQuantity);
  const medicineName = useSelector((state: RootState) => state.medicineDetails.medicineName);
  const medicineStatus = useSelector((state: RootState) => state.medicineDetails.medicineStatus);

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

  const typeMed = useSelector((state: RootState) => state.medicineDetails.typeMed);
  const unitMed = useSelector((state: RootState) => state.medicineDetails.unitMed);
  const takeStatus = useSelector((state: RootState) => state.medicineDetails.takeStatus);
  const accessToken = useSelector((state: RootState) => state.users.user?.data?.accessToken);
  const strengthMed = useSelector((state: RootState) => state.medicineDetails.strengthMed);
  const selectedDateTime = useSelector(
    (state: RootState) => state.medicineDetails.selectedDateTime
  );
  const loginStatus = useSelector((state: RootState) => state.users?.user?.loginStatus);

  const handleSelectTime: any = async (index: number) => {
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

  const handleDatePicker = async (dateTime: any) => {
    var currentTime = Date.now();

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    // Format time (e.g., "2:26 PM")
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;

    if (dateTime.getTime() < currentTime) {
      Alert.alert('Please choose future time');
      // hideDateTimePicker();
      return;
    }
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const clearDoseSelection: any = (index: number) => {
    setDoses(prevDoses => {
      const newDoses = [...prevDoses];
      newDoses[index] = 0;
      return newDoses;
    });
  };

  const clearAllDosesAndTime: any = () => {
    setDoses([0]);
    setTimes(['']);
  };

  const handleSubmit: any = (inputValue: number) => {
    if (selectedChip !== null) {
      dispatch(setDoseQuantity({ doseQuantity: inputValue.toString() }));

      // setDoseQuantity
      setDoses(prevDoses => {
        const newDoses = [...prevDoses];
        newDoses[selectedChip] = inputValue;
        return newDoses;
      });
      setModalVisible(false);
    }
  };
  console.log('startDate end date', treatmentDurationStartTime, treatmentDurationEndTime);
  // Function to handle next button press
  const handleNext: any = async () => {
    setDisable(true);

    if (loginStatus) {
      let updatedStoredList = [...storedMedicineList];

      let updatedInstructionList = [...storedInstructionList];

      let updatedTreatmentDurationList = [...storedTreatmentDurationList];

      let updatedReminderList = [...storedReminderList];

      // Create data for the new medicine
      let data = {
        medicineLocalId: medicineLocalId,
        medicineName: medicineName,
        medicineStatus: medicineStatus,
        takeStatus: takeStatus,
        doseQuantity: doseQuantity,
        doseTime: doseTime,
        strengthMed: strengthMed,
        unitMed: unitMed,
        typeMed: typeMed,
        medicineId: 'R@f@', // Use the correct reference
        createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        selectedDateTime: selectedDateTime
      };

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
        [data],
        treatmentDurationStartTime,
        treatmentDurationEndTime,
        1
      );

      // Add the new data to the copied array
      updatedStoredList.push(...dataArray);
      updatedInstructionList.push(instructionData);
      updatedTreatmentDurationList.push(treatmentDurationData);
      updatedReminderList.push(reminderData);

      // schedule notification
      let scheduleList = await localSchedule(dataArray, 'day', medicineLocalId);

      dispatch(addscheduleList(scheduleList));

      // Required Mutations
      if (accessToken !== undefined) {
        await createMedicineData(updatedStoredList, accessToken);
        await INSTRUCTION_MUTATION(updatedInstructionList, accessToken, medicineLocalId);
        await TREATMENT_DURATION_MUTATION(
          updatedTreatmentDurationList,
          accessToken,
          medicineLocalId
        );
        await MEDICINE_REMINDER_MUTATION(updatedReminderList, accessToken, medicineLocalId);
      } else {
        // Handle the case where accessToken is undefined
        console.error('AccessToken is undefined');
      }
      dispatch(setDoseList(updatedStoredList));

      clearAllDosesAndTime();

      setDisable(false);

      navigation.navigate('AddedMedicine' as never);

      //ToastPopUp('Medicine Created Successfully');
    } else {
      let updatedStoredList = [...storedMedicineList];

      let updatedInstructionList = [...storedInstructionList];

      let updatedTreatmentDurationList = [...storedTreatmentDurationList];

      let updatedReminderList = [...storedReminderList];

      // Create data for the new medicine
      let data = {
        medicineLocalId: medicineLocalId,
        medicineName: medicineName,
        medicineStatus: medicineStatus,
        takeStatus: takeStatus,
        doseQuantity: doseQuantity,
        doseTime: doseTime,
        strengthMed: strengthMed,
        unitMed: unitMed,
        typeMed: typeMed,
        medicineId: 'R@f@', // Use the correct reference
        createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        selectedDateTime: selectedDateTime
      };

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
        [data],
        treatmentDurationStartTime,
        treatmentDurationEndTime,
        0
      );

      console.log(' array', dataArray);

      // Add the new data to the copied array
      updatedStoredList.push(...dataArray);
      updatedInstructionList.push(instructionData);
      updatedTreatmentDurationList.push(treatmentDurationData);
      updatedReminderList.push(reminderData);

      dispatch(setDoseList(updatedStoredList));

      // schedule notification
      let scheduleList = await localSchedule(dataArray, 'day', medicineLocalId);

      dispatch(addscheduleList(scheduleList));

      clearAllDosesAndTime();

      setDisable(false);

      navigation.navigate('AddedMedicine' as never);

      //ToastPopUp('Medicine Created Successfully');
    }
  };

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
              {/* <Text style={styles.intakeNumberText}>{`Intake ${index + 1}`}</Text> */}

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
                      onPress={() =>
                        //setIsDateTimePickerVisible(true)}
                        handleSelectTime(index)
                      }>
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
            date={dateFromModal}
            dividerColor="white"
            onConfirm={date => {
              setOpen(false);
              setDateFromModal(date);
              const timeStr = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }).format(new Date(date));
              if (selectedChip !== null) {
                dispatch(setDoseTime({ doseTime: timeStr, selectedDateTime: date }));
                setTimes(prevTimes => {
                  const newTimes = [...prevTimes];
                  newTimes[selectedChip] = timeStr;
                  return newTimes;
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

      {/* extra option to show date */}

      <DateTimePicker
        mode="datetime"
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicker}
        onCancel={hideDateTimePicker}
      />

      {/* extra option to show date */}

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

export default OnceAdayDose;
