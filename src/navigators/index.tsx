/* eslint-disable */
import React, {FC, useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {CameraScanner, MedicineDetails} from '../Screens';
import {RootState} from '../store';
import {checkingLoader} from '../store/slices/features/settings/slice';
import AuthStackNav from './AuthStackNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDrawerNavigator from './UserDrawerNavigator';
import UserStackNavigator from './UserStackNavigator';
import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../theme/colors';
import styles from './Styles';
import {moderateScale} from 'react-native-size-matters';

const Navigator: FC = () => {
  const authStatus = useSelector(
    (state: RootState) => state.users.user.loginStatus,
  );
  const appLoadFirstTime = useSelector(
    (state: RootState) => state.settings.appLoadFirstTime,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkingLoader());
  }, []);

  const Stack = createNativeStackNavigator();

  const InitialLoadTime = () => {
    const navigation = useNavigation();

    return (
      <Stack.Navigator initialRouteName={'ScanQrCodeScreen'}>
        {/* <Stack.Screen
          name="ScanQrCodeScreen"
          component={ScanQrCodeScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="CameraScanner"
          component={CameraScanner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MedicineDetails"
          component={MedicineDetails}
          options={{
            headerShown: true,
            headerTitle: 'Medicine Details',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTitleStyle: {fontSize: moderateScale(14)},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <View style={styles.backNavigationProperties}>
                  <Ionicons
                    name="chevron-back"
                    size={28}
                    color={colors.buttonBg}
                  />
                  <Text style={styles.backNavigationText}>Back</Text>
                </View>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    );
  };

  const UserStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {authStatus ? (
          <Stack.Screen name="UserDrawer" component={UserStackNavigator} />
        ) : (
          <Stack.Screen name="AuthStackNav" component={AuthStackNav} />
        )}
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <UserStack />
    </NavigationContainer>
  );
};

export default Navigator;
