import React, { type FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigators/AuthStackNavigator';
import { type RootState } from '@/store';

import { colors } from '../../theme/colors';

import styles from './style';
interface NavigationParams {
  prevRoute: string;
}
type NavigationProp = StackNavigationProp<RootStackParamList, 'AddInstructions'>;

const MoreSettings: FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute();

  const currentRoute = route.name;

  const authStatus = useSelector((state: RootState) => state.users.user.loginStatus);

  return (
    <>
      <TouchableOpacity
        style={styles.addMoreSettingsItems}
        onPress={() => {
          navigation.navigate('AddInstructions', { prevRoute: currentRoute });
        }}>
        <View style={styles.addMoreSettingsContentProperties}>
          <Ionicons name="add-circle-sharp" size={30} color={colors.addCircle} />
          <Text style={styles.addMoreSettingsItemsText}>Add Instruction</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addMoreSettingsItems}
        onPress={() => {
          navigation.navigate('SetTreatmentDuration', { prevRoute: currentRoute });
        }}>
        <View style={styles.addMoreSettingsContentProperties}>
          <Ionicons name="add-circle-sharp" size={30} color={colors.addCircle} />
          <Text style={styles.addMoreSettingsItemsText}>Set treatment duration</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addMoreSettingsItems}
        onPress={() => {
          navigation.navigate('MedicineReminders', { prevRoute: currentRoute });
        }}>
        <View style={styles.addMoreSettingsContentProperties}>
          <Ionicons name="add-circle-sharp" size={30} color={colors.addCircle} />
          <Text style={styles.addMoreSettingsItemsText}>Medicine Reminders</Text>
        </View>
      </TouchableOpacity>

      {authStatus && (
        <>
          <TouchableOpacity
            style={styles.addMoreSettingsItems}
            onPress={() => {
              navigation.navigate('DoctorAppointments', { prevRoute: currentRoute });
            }}>
            <View style={styles.addMoreSettingsContentProperties}>
              <Ionicons name="add-circle-sharp" size={30} color={colors.addCircle} />
              <Text style={styles.addMoreSettingsItemsText}>Doctor Appointments</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addMoreSettingsItems}
            onPress={() => {
              navigation.navigate('AddPrescription', { prevRoute: currentRoute });
            }}>
            <View style={styles.addMoreSettingsContentProperties}>
              <Ionicons name="add-circle-sharp" size={30} color={colors.addCircle} />
              <Text style={styles.addMoreSettingsItemsText}>Add prescription</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default MoreSettings;
