import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../theme/colors';
import moment from 'moment';
import {setTakeMedicine} from '../../store/slices/features/medicineDetailsExtraSetting/slice';
import {useRoute} from '@react-navigation/native';

const AlarmScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute(); // Get route params
  const {medicineId} = route.params as {medicineId: string}; // Extract medicineId

  const userName = useSelector(
    (state: RootState) => state.users?.user?.data?.user?.fullName,
  );

  const storedMedicineList = useSelector(
    (state: RootState) => state.medicineDetails.storedMedicineList,
  );

  const selectedDate = useSelector(
    (state: RootState) => state.medicineDetails.selectedDates,
  );

  const filteredMedicineList = storedMedicineList.filter(medicine => {
    const medicineDateString = moment(medicine.selectedDateTime).format(
      'YYYY-MM-DD',
    );
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

    // Return medicines where the dates match
    return medicineDateString === formattedDate;
  });

  // Filter medicine based on the ID received from the notification
  const medicine = filteredMedicineList.find(
    med => med.medicineLocalId === medicineId,
  );

  return (
    <>
      <ImageBackground
        source={require('../../assets/alarm_background.png')} // Replace with your image URL or local image
        style={styles.background}
        resizeMode="cover">
        <View style={styles.userNameProperties}>
          <FontAwesome5 name="user-circle" size={30} color={colors.black} />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.userNameText}>Hello {userName},</Text>
            <Text style={styles.userNameText}>
              It’s time to take your meds.
            </Text>
          </View>
        </View>

        <View style={styles.actionBoxPosition}>
          <View style={styles.actionBox}>
            <View style={styles.medicineNameProperties}>
              <MaterialCommunityIcons
                name="pill"
                size={30}
                color={colors.buttonBg}
              />
              <Text style={styles.medicineNameText}>
                {medicine?.medicineName}
              </Text>
            </View>
            <View style={styles.doseDetailsProperties}>
              <View style={styles.scheduleAndDoseProperties}>
                <Fontisto name="date" size={20} color={colors.typedText} />

                <Text style={styles.scheduleAndDoseText}>
                  Scheduled for {medicine?.takeStatus}
                </Text>
              </View>
              <View style={styles.scheduleAndDoseProperties}>
                <MaterialCommunityIcons
                  name="message-alert-outline"
                  size={20}
                  color={colors.typedText}
                />

                <Text style={styles.scheduleAndDoseText}>
                  {medicine?.strengthMed}
                  {medicine?.unitMed}, take {medicine?.doseQuantity} pill(s)
                </Text>
              </View>
            </View>
            <View style={styles.btnPosition}>
              <View style={styles.btnProperties}>
                <View>
                  <TouchableOpacity
                    style={styles.btnBackground}
                    onPress={() => BackHandler.exitApp()}>
                    <Entypo name="cross" size={25} color={colors.black} />
                  </TouchableOpacity>
                  <Text style={styles.actionText}>Skip</Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.btnBackground}
                    onPress={() => {
                      if (medicine?.medicineLocalId) {
                        dispatch(
                          setTakeMedicine({
                            medicineLocalId: medicine.medicineLocalId,
                            doseQuantity: parseInt(medicine.doseQuantity),
                          }),
                        );
                        // console.log(
                        //   'Dispatched:',
                        //   medicine.medicineLocalId,
                        //   medicine.doseQuantity,
                        // );
                        BackHandler.exitApp();
                      }
                    }}>
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
