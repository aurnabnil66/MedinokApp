/* eslint-disable */

import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import CustomButton from '../../Components/CustomButton/CustomButton';
import Header from '../../Components/Header/Header';
import styles from './style';
import { RootState } from '@/store';
import filterDuplicateMedicines from '@/utils/filterDuplicateMedicine';

// Define the type for the medicine data
interface Medicine {
  medicineLocalId: string;
  medicineName: string;
  createdDate: string; // Assuming createdDate is a string formatted as "YYYY-MM-DD HH:mm:ss"
  doseTime: string;
}

const MedicineHistory: FC = () => {
  const navigation = useNavigation();

  const medicineHistoryData: Medicine[] = useSelector(
    (state: RootState) => state.medicineDetails.storedMedicineList
  );

  const storedMedicineList = useSelector(
    (state: RootState) => state.medicineDetails.storedMedicineList
  );

  const getDoseTime = (medicineId: string) => {
    let medDoseTime = storedMedicineList.filter(e => {
      if (e.medicineLocalId === medicineId) {
        return e.doseTime;
      }
    });
    if (medDoseTime.length > 0) {
      let x = medDoseTime.map(e => {
        let y = e.doseTime;
        return y;
      });
      return x;
    }
  };

  const handleBack = (): void => {
    navigation.goBack();
  };

  // Function to group medicine records by date
  // const groupByDate = (data: Medicine[]): Record<string, Medicine[]> => {
  //   return data.reduce(
  //     (acc, curr) => {
  //       const date = curr.createdDate.split(' ')[0]; // Extract date only (YYYY-MM-DD)
  //       if (!acc[date]) {
  //         acc[date] = [];
  //       }
  //       acc[date].push(curr);
  //       return acc;
  //     },
  //     {} as Record<string, Medicine[]>
  //   );
  // };

  const groupByDate = (data: Medicine[]): Record<string, Medicine[]> => {
    const groupedData = data.reduce(
      (acc, curr) => {
        // Check if createdDate exists and is valid
        if (!curr.createdDate) {
          console.warn('Skipping medicine record with missing createdDate:', curr);
          return acc;
        }

        const date = curr.createdDate.split(' ')[0]; // Extract date only (YYYY-MM-DD)

        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
      },
      {} as Record<string, Medicine[]>
    );

    // Sort the keys (dates) in descending order
    return Object.keys(groupedData)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .reduce(
        (sortedAcc, date) => {
          sortedAcc[date] = groupedData[date];
          return sortedAcc;
        },
        {} as Record<string, Medicine[]>
      );
  };

  const groupedMedicines = groupByDate(medicineHistoryData);
  const today: string = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)

  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Medicine History" />
      </View>
      {storedMedicineList.length === 0 ? (
        <View style={styles.emptyDataTextPosition}>
          <Text style={styles.emptyDataTextStyle}>No Data to Show</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.chipPosition}>
            {Object.keys(groupedMedicines).map(date => (
              <View key={date}>
                <Text style={styles.medicineHistoryHeading}>{date === today ? 'Today' : date}</Text>
                {filterDuplicateMedicines(groupedMedicines[date] as any).map(medicine => (
                  <View key={medicine.medicineLocalId} style={styles.chip}>
                    <View style={styles.chipContentProperties}>
                      <Text style={styles.medicineNameText}>{medicine.medicineName}</Text>
                      <Text style={styles.doseTimeText}>{medicine.doseTime}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.BackbuttonPosition}>
            <CustomButton onPress={handleBack} icon={<></>} text="Back" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MedicineHistory;
