import React, { type FC, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { DayPicker } from 'react-native-picker-weekday';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { type RootState } from '@/store';
import { setWeekly } from '@/store/slices/features/medicineDetails/slice';
import { type IStoredWeekly } from '@/store/slices/features/medicineDetails/types';

import DailyDoseLogo from '../../assets/medicine-daily-dose';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomNumberPickerModal from '../../Components/CustomNumberPickerModal/CustomNumberPickerModal';
import { colors } from '../../theme/colors';

import styles from './style';

// Mapping of day numbers to names
const dayNames: Record<number, string> = {
  1: 'Sun',
  2: 'Mon',
  3: 'Tue',
  4: 'Wed',
  5: 'Thu',
  6: 'Fri',
  7: 'Sat'
};

const WeeklyDose: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedNumber, setSelectedNumber] = useState('');

  const medicineLocalId = useSelector((state: RootState) => state.medicineDetails.medicineLocalId);

  const [weekdays, setWeekdays] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<Record<number, { selected: boolean }>>({});
  const [open, setOpen] = useState(false);

  const handleSelectNumber: any = () => {
    setOpen(true);
  };

  const clearNumberSelection: any = () => {
    setSelectedNumber('');
  };

  const handleNext: any = () => {
    const selectedDayNames = weekdays.map(day => dayNames[day]);

    const data: IStoredWeekly = {
      medicineLocalId: {
        weeklyTime: selectedDayNames, // Use selectedDayNames here
        timeInterval: selectedNumber,
        medicineLocalId
      }
    };

    dispatch(
      setWeekly({
        weeklyTime: selectedDayNames,
        timeInterval: selectedNumber,
        IStoredWeekly: data
      })
    );

    setSelectedNumber('');

    setWeekdays([]);

    setSelectedDay({});

    navigation.navigate('WeeklyDoseDetails' as never);
  };

  const handleValueChange: any = (data: string) => {
    setSelectedNumber(data);
  };

  const okPress: any = () => {
    setOpen(false);
  };

  const cancelPress: any = () => {
    setOpen(false);
  };

  // Callback for when a weekday is selected
  const handleWeekdayChange: any = (newWeekdays: number[]) => {
    setWeekdays(newWeekdays);
    //console.log(newWeekdays, 'newWeekdays');

    // Updating the selectedDay state
    const newSelectedDays = newWeekdays.reduce<Record<number, { selected: boolean }>>(
      (acc, day) => {
        acc[day] = { selected: true };
        console.log(dayNames[day], 'dayNames[day]');
        console.log(day, 'day');
        return acc;
      },
      {}
    );

    setSelectedDay(newSelectedDays);

    // console.log(newSelectedDays, 'newSelectedDays');
  };

  return (
    <View style={styles.container}>
      <Progress.Bar color="#A6BDF8" progress={0.2} width={380} style={styles.progressBarPosition} />
      <View style={styles.imagePosition}>
        <DailyDoseLogo />
      </View>
      <View style={styles.headingPosition}>
        <Text style={styles.headingText}>How many days of a week?</Text>
      </View>

      <View style={styles.weekDaysHeaderPosition}>
        <Text style={styles.weekDaysHeader}>Choose Days :</Text>
      </View>

      <View style={styles.dayPickerPosition}>
        <DayPicker
          wrapperStyles={styles.weekDayPicker}
          dayTextStyle={styles.weekDayText}
          weekdays={weekdays}
          setWeekdays={handleWeekdayChange}
          activeColor={colors.buttonBg}
          textColor="white"
          inactiveColor="grey"
        />
      </View>

      <FlatList
        data={Object.keys(selectedDay)}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Text style={styles.selectedDaysText}>
            {dayNames[Number(item)]}
            {weekdays.length > 1 ? ',' : ''}
          </Text>
        )}
        numColumns={4}
        scrollEnabled={true}
        style={styles.selectedDaysList}
      />

      <Text style={styles.timeIntervalHeader}>How many times of each day</Text>
      <View style={styles.chipPosition}>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              {selectedNumber !== '' && (
                <TouchableOpacity onPress={clearNumberSelection}>
                  <FontAwesome name="minus-circle" size={30} color={'red'} />
                </TouchableOpacity>
              )}
              <Text style={styles.chipText}>Time Interval</Text>
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={handleSelectNumber}>
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

      {weekdays.length > 0 && selectedNumber !== '' && (
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

export default WeeklyDose;
