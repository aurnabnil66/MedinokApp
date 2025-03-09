import React, {type FC} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  HomeScreen,
  MedicineHistory,
  MoreScreenTab,
  UserProfile,
} from '../Screens';
import {colors} from '../theme/colors';
import {AlarmScreen} from '../Screens/AlarmScreen';

const Tab = createBottomTabNavigator();

const UserBottomTabNavigator: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={({route}: any) => ({
        tabBarIcon: ({color}: any) => {
          if (route.name === 'Today') {
            return (
              <MaterialCommunityIcons name="pill" size={22} color={color} />
            );
          } else if (route.name === 'History') {
            return (
              <MaterialCommunityIcons name="history" size={22} color={color} />
            );
          } else if (route.name === 'More') {
            return (
              <Entypo name="dots-three-horizontal" size={22} color={color} />
            );
          } else if (route.name === 'Profile') {
            return <Ionicons name="person-outline" size={22} color={color} />;
          } else {
            return (
              <MaterialCommunityIcons
                name="questioncircleo"
                size={28}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: colors.buttonBg,
        tabBarInactiveTintColor: colors.typedText,
        tabBarLabelStyle: {fontSize: 12, fontFamily: 'WorkSansMedium'},
        tabBarShowLabel: true,
        headerShown: false,
      })}>
      <Tab.Screen
        name="Today"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="History"
        component={MedicineHistory}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="More"
        component={MoreScreenTab}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Test"
        component={AlarmScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default UserBottomTabNavigator;
