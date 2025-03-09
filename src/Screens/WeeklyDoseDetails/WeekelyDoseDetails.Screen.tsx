/* eslint-disable */

import React, { type FC, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { type RootState } from '@/store';
import {
  addscheduleList,
  setWeeklyDoseTime,
  setWeeklyStoreData
} from '@/store/slices/features/medicineDetails/slice';
import { type IWeeklyDoseTime } from '@/store/slices/features/medicineDetails/types';

import MedicineLogo from '../../assets/medicine-logo';
import CustomButton from '../../Components/CustomButton/CustomButton';
import DoseInputModal from '../../Components/DoseInputModal/DoseInputModal';
import MoreSettings from '../../Components/MoreSettingsComponent/MoreSettingsComponent';
import { colors } from '../../theme/colors';
import { setDoseQuantity } from '@/store/slices/features/medicineDetails/slice';

import styles from './style';
import moment from 'moment';
import { createWeeklyMutation } from '@/mutations/createWeekly';
import { localSchedule } from '@/helper/notify';
import { createMedicineData } from '@/mutations/createMedicine';
import {
  getWeekDates,
  mergeWeeklyDataWithDoseTimes,
  setWeeklyDateDoseTimes,
  WeeklyDateEntry
} from './extramethod';
import ToastPopUp from '@/utils/Toast.android';
import { select } from 'redux-saga/effects';
import { multiScheduleMaker } from '../OnceAdayDose/extrafunctions';
const WeeklyDoseDetails: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const timeInterval = useSelector((state: RootState) => state.medicineDetails.timeInterval);
  const medicineLocalId = useSelector((state: RootState) => state.medicineDetails.medicineLocalId);
  const weeklyDoseTime = useSelector((state: RootState) => state.medicineDetails.weeklyDoseTime);
  const selectedDateTime = useSelector(
    (state: RootState) => state.medicineDetails.selectedDateTime
  );
  const loginStatus = useSelector((state: RootState) => state.users.user.loginStatus);
  const accessToken = useSelector((state: RootState) => state.users.user?.data?.accessToken);
  const storedMedicineWeeklyList = useSelector(
    (state: RootState) => state.medicineDetails.storedMedicineWeeklyList
  );

  console.log(storedMedicineWeeklyList, 'storedMedicineWeeklyList');
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

  const storedTreatmentDurationList = useSelector(
    (state: RootState) => state.medicineDetailsExtraSetting.storeTreatmentDuration
  );

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

  const clearAllDosesAndTime: any = () => {
    setDoses(doses.map(() => 0));
    setTimes(times.map(() => ''));
  };

  const parseTodayWithTime = (timeString: string) => {
    const today = moment().format('YYYY-MM-DD'); // Get today's date in 'YYYY-MM-DD' format
    return moment(`${today} ${timeString}`, 'YYYY-MM-DD hh:mm A');
  };

  const handleNext: any = async () => {
    setDisable(true);

    let filterArray = weeklyDoseTime.filter(e => {
      if (e.medicineLocalId === medicineLocalId) return e;
    });

    let filterArrayMonthly = storedMedicineWeeklyList.filter(e => {
      if (e.medicineLocalId.medicineLocalId.toString() === medicineLocalId) return e;
    });

    const customToday = new Date();

    let dataWeekData: WeeklyDateEntry[] = [];
    filterArrayMonthly.map(e => {
      dataWeekData = getWeekDates(e.medicineLocalId.weeklyTime, customToday);
    });

    const weekDoseTime = setWeeklyDateDoseTimes(filterArray, dataWeekData);

    if (weekDoseTime.length > 0) {
      let tempStore = weekDoseTime.map(e => {
        let selectedtimeobj = parseTodayWithTime(e.doseTime);
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

      const dataArray = multiScheduleMaker(
        tempStore as any,
        treatmentDurationStartTime,
        treatmentDurationEndTime,
        0,
        'weekly'
      );

      // now check login or not
      if (loginStatus && accessToken != undefined) {
        await createWeeklyMutation(accessToken, storedMedicineWeeklyList, medicineLocalId);
        await createMedicineData(dataArray, accessToken);
      }
      let scheduleList = await localSchedule(dataArray, 'day', medicineLocalId);

      dispatch(addscheduleList(scheduleList));
      dispatch(setWeeklyStoreData(dataArray));
    }

    clearAllDosesAndTime();

    setDisable(false);

    //ToastPopUp('Medicine Created Successfully');

    navigation.navigate('AddedMedicine' as never);
  };

  const medicineName = useSelector((state: RootState) => state.medicineDetails.medicineName);
  const typeMed = useSelector((state: RootState) => state.medicineDetails.typeMed);
  const unitMed = useSelector((state: RootState) => state.medicineDetails.unitMed);
  const takeStatus = useSelector((state: RootState) => state.medicineDetails.takeStatus);
  const strengthMed = useSelector((state: RootState) => state.medicineDetails.strengthMed);

  useEffect(() => {
    if (times.every(time => time !== '') && doses.every(dose => dose !== 0)) {
      const weeklyDoses: IWeeklyDoseTime[] = times
        .map((time, index) => ({
          doseTime: time,
          doseQuantity: doses[index].toString(),
          medicineLocalId,
          doseDate: doseDates[index]
        }))
        .filter(dose => dose.doseTime !== '' && dose.doseQuantity !== '0'); // Optional: filter out empty values

      dispatch(setWeeklyDoseTime(weeklyDoses));
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

export default WeeklyDoseDetails;
