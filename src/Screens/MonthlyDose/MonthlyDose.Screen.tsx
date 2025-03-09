/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { type FC } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { type RootState } from '@/store';
import {
  setMonthlyStoreData,
  updateTimeInterval
} from '@/store/slices/features/medicineDetails/slice';
import { type IStoredMonthly } from '@/store/slices/features/medicineDetails/types';

import DailyDoseLogo from '../../assets/medicine-daily-dose';
import CalendarModalWithDates from '../../Components/CalendarModalWithDates/CalenderModalWithDates';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomNumberPickerModal from '../../Components/CustomNumberPickerModal/CustomNumberPickerModal';
import { colors } from '../../theme/colors';

import styles from './style';

const MonthlyDose: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Record<string, { selected: boolean }>>({});
  const [numberOfDates, setNumberOfDates] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');

  const medicineLocalId = useSelector((state: RootState) => state.medicineDetails.medicineLocalId);

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long'
    };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleSelectNumber: any = () => {
    setModalVisible(true); // Show the Calendar modal
  };

  const handleSelectTime: any = () => {
    setOpen(true);
  };

  const handleValueChange: any = (data: string, selectedIndex: number) => {
    setSelectedNumber(data);
  };

  const clearDateSelection: any = () => {
    setNumberOfDates('');
    setSelectedDates({});
  };

  const clearNumberSelection: any = () => {
    setSelectedNumber('');
  };

  const okPress: any = () => {
    dispatch(updateTimeInterval(selectedNumber));
    setOpen(false);
  };

  const cancelPress: any = () => {
    setOpen(false);
  };

  const handleNext: any = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    // Convert the object to an array of formatted date strings
    const formattedDates = Object.keys(selectedDates).map(date => {
      const [year, month, day] = date.split('-');
      return `${parseInt(year)} ${parseInt(day)} ${months[parseInt(month) - 1]}`;
    });

  
    const storedMonthlyArray: IStoredMonthly[] = [
      {
        medicineLocalId: {
          Days: formattedDates, // Array of formatted dates
          eachOfDays: selectedNumber, // Value for eachOfDays
          medicineLocalId // The medicineLocalId value
        }
      }
    ];


    dispatch(setMonthlyStoreData(storedMonthlyArray));

    setSelectedDates({});

    setSelectedNumber('');

    navigation.navigate('MonthlyDoseDetails' as never);
  };

  // Update selectedNumber whenever selectedDates changes
  useEffect(() => {
    const numberOfSelectedDays = Object.keys(selectedDates).length;
    if (numberOfSelectedDays > 0) {
      setNumberOfDates(`${numberOfSelectedDays}`);
    } else {
      setNumberOfDates(''); // Reset if no days selected
    }
  }, [selectedDates]);

  return (
    <View style={styles.container}>
      <Progress.Bar color="#A6BDF8" progress={0.2} width={380} style={styles.progressBarPosition} />
      <View style={styles.imagePosition}>
        <DailyDoseLogo />
      </View>
      <View style={styles.headingPosition}>
        <Text style={styles.headingText}>Which days of the month?</Text>
      </View>
      <View style={styles.chipPosition}>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              {numberOfDates !== '' && (
                <TouchableOpacity onPress={clearDateSelection}>
                  <FontAwesome name="minus-circle" size={30} color={'red'} />
                </TouchableOpacity>
              )}
              <Text style={styles.chipText}>Days</Text>
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={handleSelectNumber}>
              <Text style={styles.selectButtonText}>
                {numberOfDates === '' ? 'Select' : numberOfDates}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {modalVisible && (
        <CalendarModalWithDates
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
      )}

      {Object.keys(selectedDates).length > 0 && (
        <FlatList
          data={Object.keys(selectedDates)}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Text style={styles.selectedDaysText}>{formatDate(new Date(item))}, </Text>
          )}
          numColumns={3}
          scrollEnabled={true}
          style={styles.selectedDaysList}
        />
      )}

      <View style={styles.timesOfEachDayTextPosition}>
        <Text style={styles.timesOfEachDayText}>How many times of each day</Text>
      </View>
      <View style={styles.chipPosition}>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              {selectedNumber !== '' && (
                <TouchableOpacity onPress={() => clearNumberSelection()}>
                  <FontAwesome name="minus-circle" size={30} color={'red'}></FontAwesome>
                </TouchableOpacity>
              )}
              <Text style={styles.chipText}>Time</Text>
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={() => handleSelectTime()}>
              <Text style={styles.selectButtonText}>
                {selectedNumber === '' ? 'Select' : selectedNumber}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {open && (
        <CustomNumberPickerModal
          isVisible={open}
          min={1}
          max={60}
          selectedValue={selectedNumber}
          onValueChange={handleValueChange}
          onOk={okPress}
          onCancel={cancelPress}
          rightText="Times a day"
        />
      )}

      {numberOfDates !== '' && Object.keys(selectedDates).length > 0 && selectedNumber !== '' && (
        <View style={styles.buttonContainer}>
          <View style={styles.buttonPosition}>
            <CustomButton
              onPress={handleNext}
              icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
              text="Next"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default MonthlyDose;
