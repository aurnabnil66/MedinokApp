/* eslint-disable */

import React, { type FC, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment'; // Import moment for date manipulation
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay } from '@/store/slices/features/medicineDetails/slice';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '@/store';

const HorizontalCalendar: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Function to format date to string (YYYY-MM-DD HH:mm:ss)
  const formatDate = (date: Date): string => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  };

  // Function to handle moving to the previous week
  const handlePrevWeek = (): void => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  // Function to handle moving to the next week
  const handleNextWeek = (): void => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // Function to get an array of dates and day names for the current week
  const getWeekDates = (date: Date): Array<{ date: Date; dayName: string }> => {
    const startOfWeek = moment(date).startOf('week').toDate(); // Get start of the week
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return { date: day, dayName: dayNames[i] };
    });
  };

  const selectedDay = useSelector((state: RootState) => state.medicineDetails.selectedDates);

  useEffect(() => {
    //console.log(selec)

    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      // const formattedDate = currentDate;
      setCurrentDate(currentDate);
      dispatch(setSelectedDay(currentDate.toDateString()));
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  const renderDay = ({ item }: { item: { date: Date; dayName: string } }) => {
    // Format currentDate and item.date for comparison
    const formattedCurrentDate = moment(currentDate).format('ddd MMM DD YYYY');
    const formattedItemDate = moment(item.date).format('ddd MMM DD YYYY');

    // Check if the current date or selected day matches the item date
    const isSelected =
      selectedDay === formattedItemDate || formattedCurrentDate === formattedItemDate;

    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setSelectedDay(formattedItemDate)); // Update selectedDay with formatted date
          setCurrentDate(item.date); // Update currentDate to the clicked date
        }}>
        <View style={[styles.dayContainer, isSelected && styles.selectedDay]}>
          <Text style={[styles.dateText, isSelected && styles.selectedDayText]}>
            {item.date.getDate()}
          </Text>
          <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{item.dayName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Get the array of dates for the current week
  const weekDates = getWeekDates(currentDate);

  return (
    <View style={styles.calendarBox}>
      {/* Header with month/year on top left and navigation buttons on top right */}
      <View style={styles.header}>
        <Text style={styles.monthYear}>
          {moment(currentDate).format('MMMM YYYY')} {/* Format month/year display */}
        </Text>
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={handlePrevWeek}>
            <Text style={styles.navButton}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextWeek}>
            <Text style={styles.navButton}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FlatList to render days of the week */}
      <FlatList
        data={weekDates}
        renderItem={renderDay}
        keyExtractor={item => item.date.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.weekContainer}
      />
    </View>
  );
};

export default HorizontalCalendar;
