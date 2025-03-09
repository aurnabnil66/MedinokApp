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
import { IWeeklyDoseTime, IXDaysDoseTime } from '@/store/slices/features/medicineDetails/types';
import {
  addscheduleList,
  setDoseList,
  setXDaysTakeDose
} from '@/store/slices/features/medicineDetails/slice';
import moment from 'moment';
import { localSchedule } from '@/helper/notify';
import { createMedicineData } from '@/mutations/createMedicine';
import { INSTRUCTION_MUTATION } from '@/mutations/instruction_mutation';
import { TREATMENT_DURATION_MUTATION } from '@/mutations/treatmentDuration_mutation';
import { MEDICINE_REMINDER_MUTATION } from '@/mutations/medicineReminder_mutation';
import ToastPopUp from '@/utils/Toast.android';
import { date } from '@nozbe/watermelondb/decorators';
import { multiScheduleMaker } from '../OnceAdayDose/extrafunctions';

const EveryXdaysDoseDetails: FC = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const timeInterval = useSelector((state: RootState) => state.medicineDetails.timeInterval);

  // State for time and dose for each intake
  // State for time and dose for each intake
  const [times, setTimes] = useState<string[]>(
    Array(timeInterval !== '' ? parseInt(timeInterval) : 0).fill('')
  );
  const [doses, setDoses] = useState<number[]>(
    Array(timeInterval !== '' ? parseInt(timeInterval) : 0).fill(0)
  );

  const [open, setOpen] = useState(false); // for time picker
  const [isModalVisible, setModalVisible] = useState(false); // for dose input
  const [selectedChip, setSelectedChip] = useState<number | null>(null); // to track which chip is being modified
  const [date, setDate] = useState(new Date());

  const [disable, setDisable] = useState(false);

  const medicineLocalId = useSelector((state: RootState) => state.medicineDetails.medicineLocalId);
  const medicineName = useSelector((state: RootState) => state.medicineDetails.medicineName);
  const takeStatus = useSelector((state: RootState) => state.medicineDetails.takeStatus);
  const typeMed = useSelector((state: RootState) => state.medicineDetails.typeMed);
  const unitMed = useSelector((state: RootState) => state.medicineDetails.unitMed);
  const strengthMed = useSelector((state: RootState) => state.medicineDetails.strengthMed);
  const accessToken = useSelector((state: RootState) => state.users.user?.data?.accessToken);
  const doseTime = useSelector((state: RootState) => state.medicineDetails.doseTime);
  const doseQuantity = useSelector((state: RootState) => state.medicineDetails.doseQuantity);
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

  const xDaysTakeDoseTime = useSelector(
    (state: RootState) => state.medicineDetails.xDaysTakeDoseTime
  );

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

  const loginStatus = useSelector((state: RootState) => state.users.user.loginStatus);
  const xDaysDoseTime = useSelector((state: RootState) => state.medicineDetails.xDaysDoseTime);
  const parseDateString = (dateString: string) => {
    console.log('date string', dateString);
    return moment(dateString, 'ddd, MMMM D, YYYY hh:mm A');
  };
  const handleNext: any = async () => {
    setDisable(true);
    let filterArray = xDaysTakeDoseTime.filter(e => {
      if (e.medicineLocalId === medicineLocalId) return e;
    });

    let filterNewArray = xDaysDoseTime.filter(e => {
      if (e.medicineLocalId === medicineLocalId) return e;
    });

    const currentDate = parseDateString(filterNewArray[0].date); // Get the current date

    const newDate = currentDate.add(filterNewArray[0].day, 'days'); // Add 6 days
    console.log(newDate.format('YYYY-MM-DD'));

    if (filterArray.length > 0) {
      let tempStore1 = filterArray.map(e => {
        const dateObject = parseDateString(filterNewArray[0].date + ' ' + e.doseTime);

        return {
          medicineName: medicineName,
          medicineStatus: 'xDay',
          takeStatus: takeStatus,
          doseQuantity: e.doseQuantity,
          doseTime: e.doseTime,
          strengthMed: strengthMed,
          unitMed: unitMed,
          typeMed: typeMed,
          medicineId: '',
          medicineLocalId: e.medicineLocalId,
          createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
          selectedDateTime: dateObject.format()
        };
      });

      let tempstore2 = filterArray
        .map(e => {
          const dateObject = `${newDate} ${e.doseTime}`;

          const parsedDate = parseDateString(dateObject);

          if (parsedDate.isValid()) {
            console.log('is valid date', parsedDate.format()); // Outputs parsed date
          } else {
            console.log('');
          }

          return {
            medicineName: medicineName,
            medicineStatus: 'xDay',
            takeStatus: takeStatus,
            doseQuantity: e.doseQuantity,
            doseTime: e.doseTime,
            strengthMed: strengthMed,
            unitMed: unitMed,
            typeMed: typeMed,
            medicineId: '',
            medicineLocalId: e.medicineLocalId,
            createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            selectedDateTime: parsedDate.format() // Correctly formatted with offset
          };
        })
        .filter(item => item !== null); // Remove invalid items

      let tempStore = tempStore1.concat(tempstore2);
      const dataArrary = multiScheduleMaker(
        tempStore,
        treatmentDurationStartTime,
        treatmentDurationEndTime,
        filterNewArray[0].day
      );

      // now check login or not
      if (loginStatus) {
        let updatedInstructionList = [...storedInstructionList];

        let updatedTreatmentDurationList = [...storedTreatmentDurationList];

        let updatedReminderList = [...storedReminderList];

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

        //  Add the new data to the copied array
        updatedInstructionList.push(instructionData);
        updatedTreatmentDurationList.push(treatmentDurationData);
        updatedReminderList.push(reminderData);

        // Required Mutations
        if (accessToken !== undefined) {
          await createMedicineData(dataArrary, accessToken);
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
      }

      //let scheduleList = await localSchedule(dataArrary, 'day', medicineLocalId);

      let scheduleList = await localSchedule(dataArrary, 'day', medicineLocalId);

      dispatch(addscheduleList(scheduleList));

      let newArray = storedMedicineList.concat(dataArrary);

      dispatch(setDoseList(newArray));

      clearAllDosesAndTime();

      setDisable(false);
    }

    navigation.navigate('AddedMedicine' as never);
  };

  useEffect(() => {
    if (times.every(time => time !== '') && doses.every(dose => dose !== 0)) {
      const xDaysDose: IXDaysDoseTime[] = times
        .map((time, index) => ({
          doseTime: time,
          doseQuantity: doses[index].toString(),
          medicineLocalId
        }))
        .filter(dose => dose.doseTime !== '' && dose.doseQuantity !== '0'); // Optional: filter out empty values

      dispatch(setXDaysTakeDose(xDaysDose));
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

export default EveryXdaysDoseDetails;
