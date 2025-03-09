import React, { type FC } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { GuestProfileDetails, HomeScreen, MedicineHistory, MoreScreenTab } from '../Screens';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const GuestBottomTabNavigator: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Today') {
            return <MaterialCommunityIcons name="pill" size={22} color={color} />;
          } else if (route.name === 'History') {
            return <MaterialCommunityIcons name="history" size={22} color={color} />;
          } else if (route.name === 'More') {
            return <Entypo name="dots-three-horizontal" size={22} color={color} />;
          } else if (route.name === 'Profile') {
            return <Ionicons name="person-outline" size={22} color={color} />;
          } else {
            return <MaterialCommunityIcons name="questioncircleo" size={28} color={color} />;
          }
        },
        tabBarActiveTintColor: colors.buttonBg,
        tabBarInactiveTintColor: colors.typedText,
        tabBarLabelStyle: { fontSize: 12, fontFamily: 'WorkSansMedium' },
        tabBarShowLabel: true,
        headerShown: false
      })}>
      <Tab.Screen name="Today" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="History" component={MedicineHistory} options={{ headerShown: false }} />
      <Tab.Screen name="More" component={MoreScreenTab} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={GuestProfileDetails} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default GuestBottomTabNavigator;
