import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { moderateScale, scale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

import styles from './style';

interface ICalendarModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedDates: Record<string, { selected: boolean }>;
  setSelectedDates: (dates: Record<string, { selected: boolean }>) => void;
}

const CalendarModalWithDates: React.FC<ICalendarModalProps> = ({
  modalVisible,
  setModalVisible,
  selectedDates,
  setSelectedDates
}) => {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long'
    };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleDayPress: any = (day: any) => {
    const { dateString } = day;
    const updatedDates = { ...selectedDates };

    if (updatedDates[dateString] !== undefined) {
      // If the date exists, create a new object without this date
      const { [dateString]: _, ...rest } = updatedDates;
      setSelectedDates(rest);
    } else {
      // Otherwise, add the date with the selected: true property
      setSelectedDates({
        ...updatedDates,
        [dateString]: { selected: true }
      });
    }
  };

  const handleCancelPress: any = () => {
    setModalVisible(false);
  };

  const handleOkPress: any = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={Object.keys(selectedDates).reduce<any>((marked, date) => {
                marked[date] = {
                  selected: true,
                  customStyles: {
                    container: {
                      backgroundColor: colors.buttonBg,
                      borderRadius: scale(20),
                      height: scale(30),
                      width: scale(30),
                      justifyContent: 'center',
                      alignItems: 'center'
                    },
                    text: {
                      color: 'white'
                    }
                  }
                };
                return marked;
              }, {})}
              markingType={'custom'}
              theme={{
                todayTextColor: colors.buttonBg,
                dayTextColor: colors.calendarDate,
                monthTextColor: colors.buttonBg,
                arrowColor: colors.buttonBg,
                selectedDayBackgroundColor: colors.buttonBg,
                selectedDayTextColor: colors.white,
                textDayFontFamily: 'WorkSansMedium',
                textMonthFontFamily: 'WorkSansSemiBold',
                textDayHeaderFontFamily: 'WorkSansMedium',
                textMonthFontSize: moderateScale(16),
                textDayFontSize: moderateScale(18),
                textDayHeaderFontSize: moderateScale(14)
              }}
              style={styles.calendarStyle}
              minDate={new Date().toISOString().split('T')[0]}
            />
            <ScrollView style={styles.scrollViewContainer}>
              <View style={styles.selectedDaysContainer}>
                <Text style={styles.selectedDaysHeaderText}>Selected Days: </Text>
                {Object.keys(selectedDates).length > 0 &&
                  Object.keys(selectedDates).map(date => (
                    <Text key={date} style={styles.selectedDaysText}>
                      {formatDate(new Date(date))}, {''}
                    </Text>
                  ))}
              </View>
            </ScrollView>
            <View style={styles.cancelAndOKbuttonPosition}>
              <TouchableOpacity onPress={() => handleCancelPress()}>
                <Text style={styles.cancelAndOKButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOkPress()}>
                <Text style={styles.cancelAndOKButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarModalWithDates;
