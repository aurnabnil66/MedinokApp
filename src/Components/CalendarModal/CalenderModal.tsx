import React from 'react';
import { Modal, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { moderateScale } from 'react-native-size-matters';

import type ICalendarModalProps from '../../Interfaces/ICalendarModalProps';
import { colors } from '../../theme/colors';

import styles from './style';

// Define the type for the day parameter
interface DayObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const CalendarModal: React.FC<ICalendarModalProps> = ({
  modalVisible,
  setModalVisible,
  setStartDate,
  setEndDate,
  modalFOr
}) => {
  const handleDayPress: any = (day: DayObject) => {
    if (modalFOr === 'startDate' && setStartDate != null) {
      setStartDate(day.dateString);
    } else if (modalFOr === 'endDate' && setEndDate != null) {
      setEndDate(day.dateString);
    }
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
          <Calendar
            onDayPress={handleDayPress}
            theme={{
              todayTextColor: colors.buttonBg,
              dayTextColor: colors.calendarDate,
              monthTextColor: colors.buttonBg,
              arrowColor: colors.buttonBg,
              selectedDayBackgroundColor: colors.buttonBg,
              selectedDayTextColor: colors.textInput,
              textDayFontFamily: 'WorkSansMedium',
              textMonthFontFamily: 'WorkSansMedium',
              textDayHeaderFontWeight: 'WorkSansSemiBold',
              textMonthFontSize: moderateScale(16),
              textDayFontSize: moderateScale(18),
              textDayHeaderFontSize: moderateScale(14)
            }}
            style={styles.calendarShape}
            minDate={new Date().toISOString().split('T')[0]}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CalendarModal;
