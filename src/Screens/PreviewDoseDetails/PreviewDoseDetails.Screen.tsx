import React, { type FC } from 'react';
import { Text, TextInput, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { type RootState } from '@/store';

import MedicineImage from '../../assets/medicine-image';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Header from '../../Components/Header/Header';
import { colors } from '../../theme/colors';

import styles from './style';
import moment from 'moment';

const PreviewDoseDetails: FC = () => {
  const route = useRoute(); // Access the route prop

  const { medicine } = route.params as { medicine: any }; // Extract medicineId from route params
  console.log(medicine, 'medicine');

  const weeklyTime = useSelector((state: RootState) => state.medicineDetails.weeklyTime);

  const navigation = useNavigation();

  const handleDone: any = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.imagePosition}>
          <MedicineImage />
        </View>

        <View style={styles.mainHeader}>
          <Header mainHeader={medicine.medicineName} />
        </View>
        <View style={styles.subHeader}>
          <Header subHeader={`${medicine.typeMed}, ${medicine.strengthMed}${medicine.unitMed}`} />
        </View>

        <View style={styles.doseDetailsPosition}>
          <View style={styles.schedulePosition}>
            <View style={styles.doseDetailsProperties}>
              <Text style={styles.headingStyle}>Schedule</Text>
              <View style={styles.chip}>
                <View style={styles.dayContentProperties}>
                  <Text style={styles.chipText}>
                    {medicine.selectedDateTime !== null
                      ? moment(medicine.selectedDateTime).format('dddd')
                      : 'No Week Days Selected'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.chip}>
            <View style={styles.timeAndQuantityProperties}>
              <Text style={styles.chipText}>{medicine?.doseTime}</Text>
              <Text style={styles.chipText}>
                {medicine?.doseQuantity} {medicine?.typeMed}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.doseDetailsPosition}>
          {/* <View style={styles.optionalDetailsPosition}>
            <View style={styles.doseDetailsProperties}>
              <Text style={styles.headingStyle}>Optional Details</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                style={styles.displayNameInput}
                placeholder="Display Name"
                placeholderTextColor={colors.typedText}
                maxLength={10}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                style={styles.notesInput}
                placeholder="Notes"
                placeholderTextColor={colors.typedText}
                maxLength={100}
              />
            </View>
          </View> */}
          {/* <View style={styles.secondaryButtonPosition}>
            <TouchableOpacity style={styles.rescheduleButton}>
              <View style={styles.rescheduleButtonProperties}>
                <Ionicons name="alarm-outline" size={22} color={colors.header} />
                <Text style={styles.secondayButtonText}>Reschedule</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.historyButton}>
              <View style={styles.historyButtonProperties}>
                <MaterialCommunityIcons name="history" size={22} color={colors.header} />
                <Text style={styles.secondayButtonText}>History</Text>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
      <View style={styles.DonebuttonPosition}>
        <CustomButton onPress={handleDone} icon={<></>} text="Done" />
      </View>
    </View>
  );
};

export default PreviewDoseDetails;
