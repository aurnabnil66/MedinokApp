// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Pressable, Alert, Text } from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import { connect } from 'react-redux';
// //import { addAlarm } from '../actions/alarms';
// import PushNotification, { Importance } from 'react-native-push-notification';
// import moment from 'moment';
// import { Linking, Platform } from 'react-native';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const TimePicker = props => {
//   const requestExactAlarmPermission = async () => {
//     if (Platform.OS === 'android' && Platform.Version >= 31) {
//       const status = await check(PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM);
//       if (status === RESULTS.DENIED || status === RESULTS.BLOCKED) {
//         // Direct user to the exact alarm permission settings
//         Linking.openSettings();
//       }
//     }
//   };

//   const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

//   const [id, setId] = useState(0);

//   useEffect(() => {
//     createChannels();
//     requestExactAlarmPermission();
//   }, []);

//   const generateId = () => {
//     const newId = id + 1;
//     setId(newId);
//     return newId;
//   };

//   const createChannels = () => {
//     PushNotification.createChannel({
//       channelId: 'alarm-channel',
//       channelName: 'Alarm Channel'
//     });
//   };

//   const showDateTimePicker = () => {
//     setIsDateTimePickerVisible(true);
//   };
//   const hideDateTimePicker = () => {
//     setIsDateTimePickerVisible(false);
//   };

//   const handleDatePicker = async dateTime => {
//     var currentTime = Date.now();
//     if (dateTime.getTime() < currentTime) {
//       Alert.alert('Please choose future time');
//       hideDateTimePicker();
//       return;
//     }
//     // const fireDate = await dateTime;

//     const fireDate = moment(dateTime).toDate();

//     const alarmNotifData = {
//       channelId: 'team-pharmaceuticals',
//       ticker: 'team-pharmaceuticals Notification Message',

//       id: generateId(),
//       title: 'team-pharmaceuticals Alarm Ringing',
//       message: 'Message team-pharmaceuticals',
//       autoCancel: true,
//       vibrate: true,
//       vibration: 100,
//       smallIcon: 'ic_launcher',
//       largeIcon: 'ic_launcher',
//       playSound: true,
//       soundName: 'alarm_tone',
//       color: 'red',
//       tag: 'some_tag',
//       fire_date: fireDate,
//       date: { value: moment(dateTime).format('YYYY-MM-DD HH:mm:ss') }
//     };

//     // date: { value: dateTime }

//     PushNotification.localNotificationSchedule({
//       channelId: 'team-pharmaceuticals',
//       title: alarmNotifData.title,

//       id: alarmNotifData.id,
//       message: alarmNotifData.message,
//       date: alarmNotifData.fire_date,
//       soundName: 'default',
//       actions: ['Snooze', 'Stop Alarm'],
//       importance: Importance.HIGH,
//       playSound: true,
//       allowWhileIdle: true,
//       invokeApp: true
//     });
//     hideDateTimePicker();
//   };
//   return (
//     <>
//       <Pressable
//         style={styles.buttonStyle}
//         onPress={() => {
//           showDateTimePicker(),
//             //handleNotification(),
//             console.log('ShowDateTime');
//         }}>
//         <Text style={styles.buttonText}>+ Add Alarm</Text>
//       </Pressable>
//       <DateTimePicker
//         mode="datetime"
//         isVisible={isDateTimePickerVisible}
//         onConfirm={handleDatePicker}
//         onCancel={hideDateTimePicker}
//       />
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   buttonStyle: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'blue',
//     paddingHorizontal: 10,
//     paddingVertical: 10
//   },
//   buttonText: {
//     fontSize: 15,
//     //fontWeight:'bold',
//     color: 'white'
//   }
// });

// const mapStateToProps = state => {
//   return {};
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     add: alarmNotifData => {
//       //dispatch(addAlarm(alarmNotifData));
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
