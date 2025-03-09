import React, { type FC } from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { CustomGuestDrawer, PreviewDoseDetails } from '../Screens';
import { colors } from '../theme/colors';

import GuestBottomTabNavigator from './GuestBottomTabNavigator';
import styles from './Styles';

const Drawer = createDrawerNavigator();

const getGreeting = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 16) {
    return 'Good Afternoon';
  } else if (currentHour >= 16 && currentHour < 18) {
    return 'Good Evening';
  } else if (currentHour >= 18 && currentHour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

const GuestDrawerNavigator: FC = () => {
  const greetings = getGreeting();
  return (
    <Drawer.Navigator
      initialRouteName="GuestBottomTab"
      drawerContent={props => <CustomGuestDrawer {...props} />}
      screenOptions={{
        headerTitle: () => (
          <>
            <Text style={styles.usernameText}>Hi, guest</Text>
            <Text style={styles.greetingsText}>{greetings}</Text>
          </>
        ),
        headerTintColor: colors.buttonBg
      }}>
      <Drawer.Screen
        name="GuestBottomTab"
        component={GuestBottomTabNavigator}
        options={{ title: '' }}
      />
      <Drawer.Screen
        name="PreviewDoseDetails"
        component={PreviewDoseDetails}
        options={{ title: '' }}
      />
    </Drawer.Navigator>
  );
};

export default GuestDrawerNavigator;
