/* eslint-disable */
import React, { useEffect, useState, type FC } from 'react';
import { Alert, BackHandler, FlatList, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import ClickToAddMedicine from '@/assets/click-to-add-med';
import { type RootState } from '@/store';

import MedicineImage from '../../assets/medicine-image';
import HorizontalCalendar from '../../Components/HorizontalCalender/HorizontalCalendar';
import { colors } from '../../theme/colors';
import styles from './style';
import moment from 'moment';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/AuthStackNavigator';
import { deleteMedicine } from '@/store/slices/features/medicineDetails/slice';
import { deleteSchedule } from '@/helper/notify';

interface RootStackParamListHome {
  PreviewDoseDetails: { medicine: any };
  [key: string]: undefined | { medicine: any } | any;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamListHome,
  'PreviewDoseDetails'
>;

interface NavigationParams {
  prevRoute: string;
}
type NavigationProp = StackNavigationProp<RootStackParamList, 'AddInstructions'>;

const HomeScreen: FC = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state: RootState) => state.users.user.loginStatus);

  const storedMedicineList = useSelector(
    (state: RootState) => state.medicineDetails.storedMedicineList
  );

  const storedScheduleList = useSelector((state: RootState) => state.medicineDetails.scheduleList);
  const selectedDate = useSelector((state: RootState) => state.medicineDetails.selectedDates);

  const instructionList = useSelector(
    (state: RootState) => state.medicineDetailsExtraSetting.storeInstrucTionList
  );

  const weeklyMedicineList = useSelector(
    (state: RootState) => state.medicineDetails.storedMedicineWeeklyList
  );

  const [currentTime, setCurrentTime] = useState(moment());

  const route = useRoute();

  const currentRoute = route.name;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment()); // Update current time every minute
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // use defined navigation prop type
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleAddMedicine = () => {
    navigation.navigate('MedicineAddingMethod' as never);
  };

  const handleAddAppointment: any = async () => {
    navigation.navigate('DoctorAppointments', { prevRoute: currentRoute });
  };

  const handleDosePress: any = (medicine: any) => {
    navigation.navigate('PreviewDoseDetails', { medicine });
  };
  const getWeeklyMedicineList = (medicineId: string) => {
    let weeklyList = weeklyMedicineList.filter(e => {
      if (e.medicineLocalId.medicineLocalId === medicineId) {
        return e.medicineLocalId.weeklyTime;
      }
    });

    if (weeklyList.length > 0) {
      let x = weeklyList.map(e => {
        let y = e.medicineLocalId.weeklyTime
          .map(i => i.charAt(0).toUpperCase() + i.slice(1))
          .join(', ');

        return y;
      });
      return x;
    }
    return false;
  };

  const getInstructionList = (medicineId: string) => {
    let instruction = instructionList.filter(e => {
      if (e.medicineLocalId === medicineId) {
        return e.instrucTion;
      }
    });
    if (instruction.length > 0) {
      let x = instruction.map(e => {
        let y = e.instrucTion;
        return y;
      });
      return x;
    }
  };

  const filteredMedicineList = storedMedicineList.filter(medicine => {
    const medicineDateString = moment(medicine.selectedDateTime).format('YYYY-MM-DD');
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

    // Return medicines where the dates match
    return medicineDateString === formattedDate;
  });

  const currentTimeMaker = (time: string) => {
    const today = moment(selectedDate).format('YYYY-MM-DD');
    return moment(`${today} ${time}`, 'YYYY-MM-DD hh:mm A');
  };

  const deleteMedicineItem = (medicineId: any) => {
    let filtered_Medicine_List = storedMedicineList.filter(e => {
      if (e.medicineLocalId !== medicineId.medicineLocalId) {
        return e;
      }
    });

    let filtered_Schedule_List = storedScheduleList.filter(e => {
      if (e.medicineId === medicineId.medicineLocalId) {
        return e;
      }
    });

    console.log(filtered_Schedule_List, 'filtered_Schedule_List');
    if (filtered_Schedule_List.length > 0) deleteSchedule(filtered_Schedule_List[0].notificationId);
    dispatch(deleteMedicine(filtered_Medicine_List));
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <HorizontalCalendar />
      </View>

      <View style={styles.medicineDoseComponentPosition}>
        <View style={styles.doseComponent}>
          {filteredMedicineList.length > 0 ? (
            <>
              <View style={styles.chipheadingPosition}>
                <Text style={styles.chipheadingText}>Pills for today</Text>
              </View>
              <FlatList
                style={styles.medicineDoseListStyle}
                data={filteredMedicineList}
                renderItem={({ item: medicine }) => {
                  const doseTime = currentTimeMaker(medicine.doseTime);
                  const statusText = currentTime.isBefore(doseTime)
                    ? 'Upcoming'
                    : currentTime.isSame(doseTime, 'minute')
                      ? 'Take Now'
                      : 'Passed';

                  return (
                    <TouchableOpacity style={styles.chip} onPress={() => handleDosePress(medicine)}>
                      <View style={styles.medicineDoseProperties}>
                        <MedicineImage />
                        <View style={styles.doseDetailsPosition}>
                          <View style={styles.doseProperties}>
                            <MaterialCommunityIcons name="pill" size={18} color={colors.buttonBg} />
                            <Text style={styles.medicineNameText}>{medicine.medicineName}</Text>
                          </View>
                          <Text style={styles.doseText}>
                            {medicine.doseQuantity}{' '}
                            {parseInt(medicine.doseQuantity) > 1 ? 'pills' : 'pill'}
                            {getInstructionList(medicine.medicineLocalId)
                              ? ` | ${getInstructionList(medicine.medicineLocalId)}`
                              : ' | Not Present'}
                          </Text>
                          <View style={styles.doseDatesPosition}>
                            <AntDesign name="calendar" size={18} color={colors.typedText} />
                            <Text style={styles.weekDayText}>
                              {/* {getWeeklyMedicineList(medicine.medicineLocalId)
                                ? getWeeklyMedicineList(medicine.medicineLocalId)
                                : 'No Week Days Selected'}{' '} */}
                              {/* {medicine.selectedDateTime !== null
                                ? moment(medicine.selectedDateTime).format('dddd')
                                : 'No Week Days Selected'} */}
                              {moment(medicine.selectedDateTime).format('dddd')}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.doseTimePosition}>
                          <Text style={styles.medicineNameText}>{medicine.doseTime}</Text>
                          <Text style={styles.doseText}>{statusText}</Text>
                          <TouchableOpacity onPress={() => deleteMedicineItem(medicine)}>
                            <Text style={styles.deleteText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          ) : (
            <View style={styles.clickToAddMedPosition}>
              <ClickToAddMedicine />
              <Text style={styles.donotHaveMedText}>You don’t have any meds</Text>
              <View style={styles.clickToAddMedTextPosition}>
                <Text style={styles.clickToAddText}>Click</Text>
                <Text style={styles.plusIconText}> + </Text>
                <Text style={styles.clickToAddText}>to add your first treatment</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.addMedicineButtonPosition}>
        <TouchableOpacity style={styles.addMedicineButton} onPress={handleAddMedicine}>
          <View style={styles.addMedicineButtonProperties}>
            <Feather name="plus" size={22} color={colors.white} />
            <Text style={styles.addMedicineText}>Add Medicine</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.addAppointmentButtonPosition}>
        {authStatus && (
          <TouchableOpacity style={styles.addAppointmentButton} onPress={handleAddAppointment}>
            <View style={styles.addAppointmentButtonProperties}>
              <Feather name="plus" size={22} color={colors.white} />
              <Text style={styles.addMedicineText}>Add Appointment</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
