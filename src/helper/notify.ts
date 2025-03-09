/* eslint-disable */

import moment from 'moment';
import PushNotification, { Importance } from 'react-native-push-notification';
import AlarmClock from 'react-native-alarm-clock';

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const localSchedule = async (listOfItem: any[], name: string, medicineId: string) => {
  try {
    // Filter items based on the provided condition
    const alarmData = listOfItem.filter(e => e.medicineLocalId === medicineId);

    let dataList: any = [];

    // Proceed only if there is data to schedule
    if (alarmData.length > 0) {
      await Promise.all(
        alarmData.map(async e => {
          // Generate fire date and ensure it's in the future
          const fireDate = moment(e.selectedDateTime).toDate();
          if (fireDate <= new Date()) {
            return;
          }

          const alarmNotifData = {
            channelId: 'team-pharmaceuticals',
            ticker: 'Team Pharmaceuticals Notification',
            id: generateRandomNumber(1, 9999803),
            title: `Medication Reminder: ${e.medicineName}`,
            message: `Time to take ${e.strengthMed} ${e.unitMed}(s) of ${e.medicineName} (${e.typeMed}). Scheduled dose at ${e.doseTime}`,
            // vibrate: true,
            vibration: 100,
            smallIcon: 'ic_launcher',
            largeIcon: 'ic_launcher',
            // playSound: true,
            // soundName: 'iphone_best_alarm',
            color: 'red',
            tag: 'medication_reminder',
            fire_date: fireDate,
            date: { value: moment(e.selectedDateTime).format('YYYY-MM-DD HH:mm:ss') }
          };

          // Schedule the new notification
          PushNotification.localNotificationSchedule({
            autoCancel: true, // (optional)
            channelId: alarmNotifData.channelId,
            title: alarmNotifData.title,
            id: alarmNotifData.id,
            message: alarmNotifData.message,
            date: alarmNotifData.fire_date,
            // soundName: alarmNotifData.soundName,
            timeoutAfter: 120000,
            actions: ['Snooze', 'Stop Alarm'],
            importance: Importance.HIGH,
            playSound: true,
            allowWhileIdle: true,
            vibrate: true,
            invokeApp: false,
            repeatType: 'time', // Repeat at custom interval
            repeatTime: 30000 // Repeat every 1 minute (60000 ms)
          });
          // Schedule alarm using AlarmClock
          const alarmDate = new Date(fireDate);
          AlarmClock.createAlarm(alarmDate.toISOString(), `Medication Reminder: ${e.medicineName}`);

          console.log(`Scheduled alarm for medication: ${alarmNotifData.id}`);
          dataList.push({
            medicineName: e.medicineName,
            medicineId: e.medicineLocalId,
            notificationId: alarmNotifData.id
          });
        })
      );
    } else {
      console.warn('No alarms matched the criteria to schedule.');
    }

    return dataList;
  } catch (err) {
    console.error('Failed to set localSchedule due to error:', err);
  }
};

export const deleteSchedule = async (notificationID: number) => {
  try {
    const notificationId = notificationID; // || generateRandomNumber(1, 9999803);

    // console.log(`Deleting schedule for medication: ${e.medicineName}`);
    // Cancel the scheduled notification by its ID
    PushNotification.cancelLocalNotifications({ id: `${notificationId}` });

    // Remove the associated alarm
    // Note: AlarmClock does not have direct methods for removing alarms.
    // You may need to track and manage custom alarm removal logic if required.
    console.log(`Cancelled alarm for medication: ${notificationId}`);

    console.log(`Successfully deleted schedules for medicineId: ${notificationId}`);
  } catch (err) {
    console.error('Failed to delete schedules due to error:', err);
  }
};
