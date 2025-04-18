import React, { useEffect } from 'react';
import { ImageBackground, View, Text, TouchableOpacity,NativeModules } from 'react-native';
import styles from './style';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '@/theme/colors';
import moment from 'moment';


interface AlarmDetails {
  uid: string;
  title: string;
  description: string;
  hour: number;
  minutes: number;
  snoozeInterval: number;
  repeating: boolean;
  active: boolean;
  days: number[];
}


const AlarmScreen = () => {
  const { AlarmModule } = NativeModules;
  const userName = useSelector((state: RootState) => state.users?.user?.data?.user?.fullName);

  const storedMedicineList = useSelector(
    (state: RootState) => state.medicineDetails.storedMedicineList
  );
  const storedScheduleList = useSelector((state: RootState) => state.medicineDetails.scheduleList);
  const selectedDate = useSelector((state: RootState) => state.medicineDetails.selectedDates);

  const filteredMedicineList = storedMedicineList.filter(medicine => {
    const medicineDateString = moment(medicine.selectedDateTime).format('YYYY-MM-DD');
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

    // Return medicines where the dates match
    return medicineDateString === formattedDate;
  });

  const getMedicineName = (medicineId: string) => {
    const med = filteredMedicineList.find(med => medicineId === med.medicineLocalId);
    return med ? med.medicineName : '';
  };

  const getScheduleTime = (medicineId: string) => {
    const med = filteredMedicineList.find(med => medicineId === med.medicineLocalId);
    return med ? med.doseTime : '';
  };

  const getTakeStatus = (medicineId: string) => {
    const med = filteredMedicineList.find(med => medicineId === med.medicineLocalId);
    return med ? med.takeStatus : '';
  };

  const getStrength = (medicineId: string) => {
    const med = filteredMedicineList.find(med => medicineId === med.medicineLocalId);
    return med ? med.strengthMed : '';
  };

  const getUnit = (medicineId: string) => {
    const med = filteredMedicineList.find(med => medicineId === med.medicineLocalId);
    return med ? med.unitMed : '';
  };

  const getQuantity = (medicineId: string) => {
    const med = filteredMedicineList.find(med => medicineId === med.medicineLocalId);
    return med ? med.doseQuantity : '';
  };
  const setAlarm = async () => {
    try {
      // Get the current time
      const now = new Date();
  
      // Calculate the time 2 minutes later
      const twoMinutesLater = new Date(now.getTime() + 2 * 60 * 1000); // 2 minutes in milliseconds
  
      // Extract hours and minutes
      const hour = twoMinutesLater.getHours();
      const minutes = twoMinutesLater.getMinutes();
  
      // Set the alarm details
      const alarmDetails: AlarmDetails = {
        uid: 'alarm1', // Unique ID for the alarm
        title: 'Test Alarm',
        description: 'This is a test alarm set 2 minutes later.',
        hour: hour,
        minutes: minutes,
        snoozeInterval: 5, // Snooze interval in minutes
        repeating: false, // Set to true if you want the alarm to repeat
        active: true, // Set the alarm as active
        days: [], // Empty array for non-repeating alarms
      };
  
      // Call the native module to set the alarm
      await AlarmModule.set(alarmDetails);
      console.log('Alarm set successfully for:', twoMinutesLater.toLocaleTimeString());
      console.log('Alarm set successfully kfor:', twoMinutesLater.toLocaleTimeString());

    } catch (error) {
      console.error('Failed to set alarm:', error);
    }
  };
  return (
    <>
      <ImageBackground
        source={require('../../assets/alarm_background.png')} // Replace with your image URL or local image
        style={styles.background}
        resizeMode="cover">
        <View style={styles.userNameProperties}>
          <FontAwesome5 name="user-circle" size={30} color={colors.black} />
          <Text style={styles.userNameText}>Hello {userName}, It’s time to take your meds.</Text>
        </View>

        <View style={styles.actionBoxPosition}>
          <View style={styles.actionBox}>
            <View style={styles.medicineNameProperties}>
              <MaterialCommunityIcons name="pill" size={30} color={colors.buttonBg} />
              {filteredMedicineList.map(e => {
                return (
                  <Text style={styles.medicineNameText}>{getMedicineName(e.medicineLocalId)}</Text>
                );
              })}
            </View>
            <View style={styles.doseDetailsProperties}>
              <View style={styles.scheduleAndDoseProperties}>
                <Fontisto name="date" size={20} color={colors.typedText} />
                {filteredMedicineList.map(e => {
                  return (
                    <Text style={styles.scheduleAndDoseText}>
                      Scheduled for {getTakeStatus(e.medicineLocalId)}, {getScheduleTime(e.medicineLocalId)}
                    </Text>
                  );
                })}
              </View>
              <View style={styles.scheduleAndDoseProperties}>
                <MaterialCommunityIcons
                  name="message-alert-outline"
                  size={20}
                  color={colors.typedText}
                />
                {filteredMedicineList.map(e => {
                  return (
                    <Text style={styles.scheduleAndDoseText}>
                      {getStrength(e.medicineLocalId)} {getUnit(e.medicineLocalId)}, take{' '}
                      {getQuantity(e.doseQuantity)} pill(s)
                    </Text>
                  );
                })}
              </View>
            </View>
            <View style={styles.btnPosition}>
              <View style={styles.btnProperties}>
                <View>
                  <TouchableOpacity style={styles.btnBackground} onPress={setAlarm}>
                    <Entypo name="cross" size={25} color={colors.black} />
                  </TouchableOpacity>
                  <Text style={styles.actionText}>Skip</Text>
                </View>

                <View>
                  <TouchableOpacity style={styles.btnBackground}>
                    <AntDesign name="check" size={28} color={colors.buttonBg} />
                  </TouchableOpacity>
                  <Text style={styles.takenText}>Taken</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default AlarmScreen;
