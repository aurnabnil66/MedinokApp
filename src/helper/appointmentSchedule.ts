/* eslint-disable */

import moment from 'moment';
import PushNotification, { Importance } from 'react-native-push-notification';

// Generate random unique number for notification ID
function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const appointmentSchedule = async (appointments: any[]) => {
  try {
    let futureAppointments = appointments.map(e => {
      // Split the time string
      const [time, meridian] = e.time.split(' '); // ["3:37", "PM"]
      const [hour, minute] = time.split(':').map(Number); // ["3", "37"]

      // Parse the reminder string
      const [reminderValue, reminderUnit] = e.reminder.split(' '); // ["10", "minutes"]
      const amountToSubtract = parseInt(reminderValue, 10);

      // Convert hour to 24-hour format if needed
      const hour24 =
        meridian === 'PM' && hour !== 12 ? hour + 12 : meridian === 'AM' && hour === 12 ? 0 : hour;

      // Create the new date and set the time
      const newDoseDate = moment(e.date);
      newDoseDate.set('hour', hour24);
      newDoseDate.set('minute', minute);

      // Adjust the date based on the reminder unit
      if (reminderUnit.includes('minute')) {
        newDoseDate.subtract(amountToSubtract, 'minutes');
      } else if (reminderUnit.includes('hour')) {
        newDoseDate.subtract(amountToSubtract, 'hours');
      } else if (reminderUnit.includes('day')) {
        newDoseDate.subtract(amountToSubtract, 'days');
      } else if (reminderUnit.includes('week')) {
        newDoseDate.subtract(amountToSubtract, 'weeks');
      }

      // Update the object
      e.date = newDoseDate.toISOString();

      return e;
    });

    if (futureAppointments.length > 0) {
      await Promise.all(
        futureAppointments.map(async appointment => {
          const fireDate = moment(appointment.date).toDate();

          if (fireDate <= new Date()) {
            return;
          }

          const notificationData = {
            channelId: 'team-pharmaceuticals',
            ticker: 'Team Pharmaceuticals Notification',
            id: generateRandomNumber(1, 9999803),
            title: `Appointment Reminder: ${appointment.doctorName}`,
            message: `You have an appointment with Dr. ${appointment.doctorName} at ${appointment.time} on ${moment(appointment.date).format('llll')}. Location: ${appointment.location}`,
            autoCancel: true,
            vibrate: true,
            vibration: 100,
            smallIcon: 'ic_launcher',
            largeIcon: 'ic_launcher',
            playSound: true,
            soundName: 'default',
            color: 'blue',
            tag: 'appointment_reminder',
            fire_date: fireDate,
            date: { value: moment(appointment.date).format('YYYY-MM-DD HH:mm:ss') }
          };
          // Schedule the notification
          PushNotification.localNotificationSchedule({
            autoCancel: true,
            channelId: notificationData.channelId,
            title: notificationData.title,
            id: notificationData.id,
            message: notificationData.message,
            date: notificationData.fire_date,
            soundName: notificationData.soundName,
            timeoutAfter: 120000,
            actions: ['Snooze', 'Stop Alarm'],
            importance: Importance.HIGH,
            vibrate: true,
            playSound: true,
            allowWhileIdle: true,
            invokeApp: false,
            repeatType: 'time', // Repeat at custom interval
            repeatTime: 30000
          });
        })
      );
    } else {
      console.warn('No future appointments to schedule.');
    }
  } catch (err) {
    console.error('Failed to set appointment schedule due to error:', err);
  }
};
