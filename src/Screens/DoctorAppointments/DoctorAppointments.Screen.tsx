/* eslint-disable */
import React, { type FC, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { type RootState } from '@/store';
import { setAppointment } from '@/store/slices/features/appointment/slice';

import DoctorAppointmentsLogo from '../../assets/doctor-appointments';
import CalendarModal from '../../Components/CalendarModal/CalenderModal';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Header from '../../Components/Header/Header';
import SetReminderModal from '../../Components/SetReminderModal/SetReminderModal';
import { colors } from '../../theme/colors';

import styles from './style';
import moment from 'moment';
import { appointmentSchedule } from '@/helper/appointmentSchedule';

const DoctorAppointments: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();
  const { prevRoute } = route.params as { prevRoute: string };

  const selectedDateTime = useSelector(
    (state: RootState) => state.medicineDetails.selectedDateTime
  );

  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(new Date()); // time setting
  const [selectedTime, setSelectedTime] = useState('');
  const [open, setOpen] = useState(false); // for time picker
  const [reminder, setReminder] = useState('');
  const [tempReminder, setTempReminder] = useState('');
  const [tempDate, setTempDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [openReminderModal, setOpenReminderModal] = useState(false); // for set reminder

  const handleSetDate: any = (date: string) => {
    const formattedDate = format(new Date(date), 'EEE, d MMMM, yyyy');
    setDate(formattedDate);
    setTempDate(new Date(date));
  };

  const handleNext: any = async () => {
    dispatch(
      setAppointment([
        {
          date: tempDate.toString(),
          time: selectedTime,
          doctorName,
          location,
          setReminder: reminder,
          medicineLocalId: 'RANDOM' + Math.random().toString(36)
        }
      ])
    );

    const appointmentsDATA = [
      {
        date: tempDate, // Example date
        time: selectedTime, // Example time
        reminder: reminder,
        location: location,
        doctorName: doctorName
      }
    ];

    await appointmentSchedule(appointmentsDATA);

    setDate('');
    setSelectedTime('');
    setReminder('');
    setTempReminder('');
    setLocation('');
    setDoctorName('');
    navigation.navigate(`${prevRoute}` as never);
  };
  const handleSelectTime: any = () => {
    setOpen(true);
  };
  const handleStartDateSelectInstruction: any = () => {
    setDateModalOpen(!dateModalOpen);
  };

  const handleSelectReminder: any = () => {
    setOpenReminderModal(!openReminderModal);
  };

  const okPress: any = () => {
    setReminder(tempReminder);
    setOpenReminderModal(false);
  };

  const cancelPress: any = () => {
    setTempReminder(reminder);
    setOpenReminderModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Appointment" />
      </View>
      <View style={styles.imagePosition}>
        <DoctorAppointmentsLogo />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.subHeadingPosition}>
          <Header subHeader="Add an appointment" />
        </View>

        <View style={styles.chipPosition}>
          <View style={styles.chip}>
            <View style={styles.chipProperties}>
              <View style={styles.chipContentProperties}>
                <AntDesign name="calendar" size={25} color={colors.header} />
                <Text style={styles.chipText}>Date</Text>
              </View>
              <View style={styles.selectButtonPosition}>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => handleStartDateSelectInstruction()}>
                  <Text style={styles.selectButtonText}>{date !== '' ? date : 'Select'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.chip}>
            <View style={styles.chipProperties}>
              <View style={styles.chipContentProperties}>
                <AntDesign name="clockcircleo" size={22} color={colors.header} />
                <Text style={styles.chipText}>Time</Text>
              </View>
              <View style={styles.selectButtonPosition}>
                <TouchableOpacity
                  style={styles.timeSelectButton}
                  onPress={() => handleSelectTime()}>
                  <Text style={styles.selectButtonText}>
                    {selectedTime === '' ? 'Select' : selectedTime}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.chip}>
            <View style={styles.chipProperties}>
              <View style={styles.chipContentProperties}>
                <FontAwesome6 name="user-doctor" size={22} color={colors.header} />
                <Text style={styles.chipText}>Doctor’s Name</Text>
              </View>
              <View style={styles.inputPosition}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setDoctorName}
                  keyboardType="default"
                  style={styles.nameInput}
                  value={doctorName}
                />
              </View>
            </View>
          </View>
          <View style={styles.chip}>
            <View style={styles.chipProperties}>
              <View style={styles.chipContentProperties}>
                <Feather name="map-pin" size={22} color={colors.header} />
                <Text style={styles.chipText}>Location</Text>
              </View>
              <View style={styles.inputPosition}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  onChangeText={setLocation}
                  style={styles.nameInput}
                  value={location}
                />
              </View>
            </View>
          </View>
          <View style={styles.chip}>
            <View style={styles.chipProperties}>
              <View style={styles.chipContentProperties}>
                <Feather name="bell" size={22} color={colors.header} />
                <Text style={styles.chipText}>Set Reminder</Text>
              </View>
              <View style={styles.reminderSelectButtonPosition}>
                <TouchableOpacity
                  style={styles.reminderSelectButton}
                  onPress={() => handleSelectReminder()}>
                  <Text style={styles.selectButtonText}>{reminder !== '' ? reminder : 'Set'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {openReminderModal && (
          <SetReminderModal
            isVisible={openReminderModal}
            selectedValue={tempReminder}
            onValueChange={setTempReminder}
            onOk={okPress}
            onCancel={cancelPress}
          />
        )}

        {dateModalOpen && (
          <CalendarModal
            modalVisible={dateModalOpen}
            setModalVisible={setDateModalOpen}
            setStartDate={handleSetDate}
            modalFOr="startDate"
          />
        )}
        {open && (
          <DatePicker
            modal
            mode="time"
            open={open}
            date={time}
            dividerColor="white"
            onConfirm={date => {
              setOpen(false);
              setTime(date);
              const timeStr = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }).format(new Date(date));
              setSelectedTime(timeStr);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            theme="dark"
          />
        )}
      </ScrollView>

      {date !== '' &&
        selectedTime !== '' &&
        reminder.trim() !== '' &&
        doctorName.trim() !== '' &&
        location.trim() !== '' && (
          <View style={styles.NextbuttonPosition}>
            <CustomButton
              onPress={handleNext}
              icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
              text="Save"
            />
          </View>
        )}
    </View>
  );
};

export default DoctorAppointments;
