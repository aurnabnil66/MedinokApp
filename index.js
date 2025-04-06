/* eslint-disable */
import PushNotification, {Importance} from 'react-native-push-notification';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Platform} from 'react-native';
import {navigateToSceeen} from './src/navigators';
import invokeApp from 'react-native-invoke-app';
import AlarmScreen from './src/Screens/AlarmScreen/AlarmScreen';
import {Provider} from 'react-redux';
import {store} from './src/store';

PushNotification.configure({
  onRegister: function (token) {
    console.log('PushNotification token:', token);
  },

  onNotification: function (notification) {
    // Handle the notification in foreground and background
    if (notification.action === 'Stop Alarm') {
      handleStopAlarm(notification);
    } else if (notification.action === 'Snooze') {
      handleSnooze(notification);
    }

    if (notification.userInteraction === false) {
      invokeApp();
    }

    if (notification.userInteraction) {
      const screen = notification.data?.screen; // Get the screen from the payload
      const params = notification.data?.params
        ? JSON.parse(notification.data.params)
        : {}; // Parse params if present

      if (screen) {
        navigateToSceeen(screen, params); // Navigate to the screen
      }
    }

    // Clear notification after tapping
    if (notification.id) {
      PushNotification.cancelLocalNotification(notification.id.toString());
    }
  },

  onAction: function (notification) {
    if (notification.action === 'Stop Alarm') {
      handleStopAlarm(notification);
    } else if (notification.action === 'Snooze') {
      handleSnooze(notification);
    }
  },

  onRegistrationError: function (err) {
    console.error('Registration Error:', err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

// Background Handler
const handleStopAlarm = notification => {
  if (notification.id) {
    // Cancel the specific notification using ID
    PushNotification.cancelLocalNotification(notification.id.toString());
  }
};

const handleSnooze = notification => {
  const snoozeTime = 5 * 60 * 1000; // 5 minutes
  const newFireDate = new Date(Date.now() + snoozeTime);

  // Ensure the notification is not already scheduled before creating a new one
  PushNotification.getScheduledLocalNotifications(scheduledNotifications => {
    const alreadyScheduled = scheduledNotifications.some(
      n => n.id === notification.id.toString(),
    );

    if (!alreadyScheduled) {
      PushNotification.localNotificationSchedule({
        channelId: notification.channelId,
        title: notification.title,
        message: notification.message,
        date: newFireDate,
        id: notification.id,
        soundName: notification.soundName,
        // actions: ['Snooze', 'Stop Alarm'],
        playSound: true,
        importance: Importance.HIGH,
        allowWhileIdle: true,
      });
    }
  });
};

AppRegistry.registerComponent(appName, () => {
  return App;
});

const AlarmScreenIntent = () => {
  return (
    <Provider store={store}>
      <AlarmScreen />
    </Provider>
  );
};

AppRegistry.registerComponent('AlarmScreen', () => AlarmScreenIntent);
