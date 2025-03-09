import React, { type FC, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { type RootState } from '@/store';
import {
  setXWeekDoseTime,
  updateTimeInterval
} from '@/store/slices/features/medicineDetails/slice';

import MedicineLogo from '../../assets/medicine-logo';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomNumberPickerModal from '../../Components/CustomNumberPickerModal/CustomNumberPickerModal';
import { colors } from '../../theme/colors';

import styles from './style';

const EveryXweeksDose: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openTimeInterval, setOpenTimeInterval] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeInterval, setTimeInterval] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const medicineLocalId = useSelector((state: RootState) => state.medicineDetails.medicineLocalId);

  const handleSelectDayNumber: any = () => {
    setOpen(!open);
  };

  const handleSelectTimeInterval: any = () => {
    setOpenTimeInterval(!openTimeInterval);
  };

  const handleSelectDate: any = () => {
    setModalVisible(!modalVisible);
  };

  const clearDayNumberSelection: any = () => {
    setSelectedNumber('');
  };

  const clearTimeIntervalSelection: any = () => {
    setTimeInterval('');
  };

  const handleDayValueChange: any = (data: string) => {
    setSelectedNumber(data);
  };

  const closeWeekPickerModal: any = () => {
    setOpen(false);
  };

  const cancelWeekPickerModal: any = () => {
    setOpen(false);
  };

  const closeTimePickerModal: any = () => {
    setOpenTimeInterval(false);
  };

  const cancelTimePickerModal: any = () => {
    setOpenTimeInterval(false);
  };

  const handleTimeIntervalChange: any = (data: string) => {
    setTimeInterval(data);
  };

  const clearSelectedDate: any = () => {
    setSelectedDate('');
  };

  const handleNext: any = () => {
    const newDoseTime = {
      day: selectedNumber,
      date: selectedDate,
      timeTravel: timeInterval, // Assuming timeInterval holds the time you want to store
      medicineLocalId
    };

    dispatch(updateTimeInterval(timeInterval));
    dispatch(setXWeekDoseTime([newDoseTime]));

    setSelectedDate('');

    setSelectedNumber('');

    setTimeInterval('');

    navigation.navigate('EveryXweeksDoseDetails' as never);
  };

  return (
    <View style={styles.container}>
      <Progress.Bar color="#A6BDF8" progress={0.2} width={380} style={styles.progressBarPosition} />
      <View style={styles.imagePosition}>
        <MedicineLogo />
      </View>
      <View style={styles.headingPosition}>
        <Text style={styles.headingText}>Set Weeks Interval</Text>
      </View>

      <View style={styles.chipPosition}>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              {selectedNumber !== '' && (
                <TouchableOpacity onPress={clearDayNumberSelection}>
                  <FontAwesome name="minus-circle" size={30} color={'red'} />
                </TouchableOpacity>
              )}
              <Text style={styles.chipText}>Week</Text>
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={handleSelectDayNumber}>
              <Text style={styles.selectButtonText}>
                {selectedNumber === '' ? 'Select' : selectedNumber}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.chipheadingPosition}>
        <Text style={styles.chipheadingText}>When do you need to take the first dose?</Text>
      </View>
      <View style={styles.chipPosition}>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              {selectedDate !== '' && (
                <TouchableOpacity onPress={clearSelectedDate}>
                  <FontAwesome name="minus-circle" size={30} color={'red'} />
                </TouchableOpacity>
              )}
              <Text style={styles.chipText}>Date</Text>
            </View>
            <TouchableOpacity style={styles.selectDateButton} onPress={handleSelectDate}>
              <Text style={styles.selectButtonText}>
                {selectedDate === '' ? 'Select' : selectedDate}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.chipheadingPosition}>
        <Text style={styles.chipheadingText}>How many times of each day</Text>
      </View>
      <View style={styles.chipPosition}>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              {timeInterval !== '' && (
                <TouchableOpacity onPress={clearTimeIntervalSelection}>
                  <FontAwesome name="minus-circle" size={30} color={'red'} />
                </TouchableOpacity>
              )}
              <Text style={styles.chipText}>Time Interval</Text>
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={handleSelectTimeInterval}>
              <Text style={styles.selectButtonText}>
                {timeInterval === '' ? 'Select' : timeInterval}
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
          onValueChange={handleDayValueChange}
          onOk={closeWeekPickerModal}
          onCancel={cancelWeekPickerModal}
          leftText="Every"
          rightText="Week(s)"
        />
      )}

      {openTimeInterval && (
        <CustomNumberPickerModal
          isVisible={openTimeInterval}
          min={1}
          max={60}
          selectedValue={timeInterval}
          onValueChange={handleTimeIntervalChange}
          onOk={closeTimePickerModal}
          onCancel={cancelTimePickerModal}
          rightText="Times a day"
        />
      )}

      {modalVisible && (
        <DatePicker
          modal
          mode="date"
          open={modalVisible}
          date={date}
          dividerColor="white"
          onConfirm={date => {
            setModalVisible(false);
            setDate(date);
            const options: Intl.DateTimeFormatOptions = {
              weekday: 'short',
              month: 'long',
              day: '2-digit',
              year: 'numeric'
            };
            const dateStr = new Intl.DateTimeFormat('en-US', options).format(date);
            setSelectedDate(dateStr);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
          theme="dark"
        />
      )}

      {selectedDate !== '' && selectedNumber !== '' && timeInterval !== '' && (
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

export default EveryXweeksDose;
