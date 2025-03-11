import React, {type FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  AddedMedicine,
  AddInstructions,
  AddMedicineManually,
  AddMedicineStrength,
  AddPrescription,
  AskHourInterval,
  AskTimeInterval,
  CameraScanner,
  CreateAccount,
  DoctorAppointments,
  EnterOtp,
  EveryXdaysDose,
  EveryXdaysDoseDetails,
  EveryXhoursDose,
  EveryXmonthsDose,
  EveryXmonthsDoseDetails,
  EveryXweeksDose,
  EveryXweeksDoseDetails,
  ForgotPassword,
  FourTimesAdayDose,
  Login,
  MedicineAddingMethod,
  MedicineDailyDoses,
  MedicineDetails,
  MedicineDoses,
  MedicineReminders,
  MedicineType,
  MonthlyDose,
  MonthlyDoseDetails,
  OnceAdayDose,
  PasswordChanged,
  ResetPassword,
  SetTreatmentDuration,
  ThreeTimesAdayDose,
  TwiceAdayDose,
  WeeklyDose,
  WeeklyDoseDetails,
  XtimesAdayDose,
} from '../Screens';
import {colors} from '../theme/colors';

import styles from './Styles';
import UserDrawerNavigator from './UserDrawerNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const Stack = createNativeStackNavigator();

const UserStackNavigator: FC = () => {
  const screens = [
    {name: 'CameraScanner', component: CameraScanner, headerShown: false},
    {
      name: 'MedicineDetails',
      component: MedicineDetails,
      title: 'Medicine Details',
    },
    {name: 'MedicineDoses', component: MedicineDoses, title: 'Medicine Doses'},
    {
      name: 'MedicineDailyDoses',
      component: MedicineDailyDoses,
      title: 'Medicine Daily Doses',
    },
    //{ name: 'CreateAccount', component: CreateAccount, title: '' },
    //{ name: 'ForgotPassword', component: ForgotPassword, title: '' },
    //{ name: 'EnterOtp', component: EnterOtp, title: '' },
    //{ name: 'ResetPassword', component: ResetPassword, title: '' },
    //{ name: 'PasswordChanged', component: PasswordChanged, title: '' },
    {name: 'OnceAdayDose', component: OnceAdayDose, title: 'Once A Day'},
    {name: 'AddedMedicine', component: AddedMedicine, headerShown: false},
    {
      name: 'MedicineAddingMethod',
      component: MedicineAddingMethod,
      title: 'Select Adding Method',
    },
    {
      name: 'AddMedicineManually',
      component: AddMedicineManually,
      title: 'Add Medicine Name',
    },
    {
      name: 'AddMedicineStrength',
      component: AddMedicineStrength,
      title: 'Add Strength',
    },
    {name: 'MedicineType', component: MedicineType, title: 'Add Type'},
    {
      name: 'AddInstructions',
      component: AddInstructions,
      title: 'Instructions',
    },
    {
      name: 'SetTreatmentDuration',
      component: SetTreatmentDuration,
      title: 'Treatment Duration',
    },
    {
      name: 'MedicineReminders',
      component: MedicineReminders,
      title: 'Medicine Reminders',
    },
    {
      name: 'DoctorAppointments',
      component: DoctorAppointments,
      title: 'Appointment',
    },
    {
      name: 'AddPrescription',
      component: AddPrescription,
      title: 'Prescription',
    },
    {name: 'TwiceAdayDose', component: TwiceAdayDose, title: 'Twice A Day'},
    {
      name: 'ThreeTimesAdayDose',
      component: ThreeTimesAdayDose,
      title: 'Three Times A Day',
    },
    {
      name: 'FourTimesAdayDose',
      component: FourTimesAdayDose,
      title: 'Four Times A Day',
    },
    {
      name: 'AskTimeInterval',
      component: AskTimeInterval,
      title: 'Set Time Interval',
    },
    {name: 'XtimesAdayDose', component: XtimesAdayDose, title: 'X Times A Day'},
    {
      name: 'AskHourInterval',
      component: AskHourInterval,
      title: 'Set Hour Interval',
    },
    {
      name: 'EveryXhoursDose',
      component: EveryXhoursDose,
      title: 'Every X Hours',
    },
    {name: 'WeeklyDose', component: WeeklyDose, title: 'Weekley'},
    {
      name: 'WeeklyDoseDetails',
      component: WeeklyDoseDetails,
      title: 'Set Weekly Dose',
    },
    {name: 'MonthlyDose', component: MonthlyDose, title: 'Monthly'},
    {
      name: 'MonthlyDoseDetails',
      component: MonthlyDoseDetails,
      title: 'Set Monthly Dose',
    },
    {name: 'EveryXdaysDose', component: EveryXdaysDose, title: 'Every X Days'},
    {
      name: 'EveryXdaysDoseDetails',
      component: EveryXdaysDoseDetails,
      title: 'Every X Days',
    },
    {
      name: 'EveryXweeksDose',
      component: EveryXweeksDose,
      title: 'Every X Weeks',
    },
    {
      name: 'EveryXweeksDoseDetails',
      component: EveryXweeksDoseDetails,
      title: 'Every X Weeks',
    },
    {
      name: 'EveryXmonthsDose',
      component: EveryXmonthsDose,
      title: 'Every X Months',
    },
    {
      name: 'EveryXmonthsDoseDetails',
      component: EveryXmonthsDoseDetails,
      title: 'Every X Months',
    },
    {name: 'UserDrawer', component: UserDrawerNavigator, headerShown: false},
  ];

  const headerLeft = (): React.ReactNode => {
    return (
      <TouchableOpacity
        onPress={() => {
          const navigation = useNavigation();
          navigation.goBack();
        }}>
        <View style={styles.backNavigationProperties}>
          <Ionicons name="chevron-back" size={28} color={colors.buttonBg} />
          <Text style={styles.backNavigationText}>Back</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const headerRight = (): React.ReactNode => {
    return (
      <TouchableOpacity
        onPress={() => {
          const navigation = useNavigation();
          navigation.navigate('UserDrawer' as never);
        }}>
        <View style={styles.backNavigationProperties}>
          <Text style={styles.backNavigationText}>Cancel</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const defaultHeaderOptions = {
    headerShown: true,
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: colors.white,
    },
    headerTitleStyle: {fontSize: 14, fontFamily: 'WorkSansSemiBold'},
    headerLeft,
    headerRight,
  };

  //const firstScanMedName = useSelector((state: RootState) => state.medicineDetails.medicineName);

  return (
    <Stack.Navigator initialRouteName={'UserDrawer'}>
      {screens.map(({name, component, title, headerShown = true}) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            ...defaultHeaderOptions,
            headerShown,
            headerTitle: title,
            headerTitleAlign: 'center',
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default UserStackNavigator;
