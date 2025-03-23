/* eslint-disable */

import React, {type FC, useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {type AppStackParamList} from '../../models/routePageModel';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {setQrCodeToScanData} from '../../store/slices/features/medicineDetails/slice';
import {RootState} from '../../store';
import {fetchScannedMedicines} from '../../mutations/scanData';

type CameraScannerNavigationProp = StackNavigationProp<
  AppStackParamList,
  'CameraScanner'
>;

const CameraScanner: FC = () => {
  const navigation = useNavigation<CameraScannerNavigationProp>();
  const dispatch = useDispatch();
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const authStatus = useSelector(
    (state: RootState) => state.users.user.loginStatus,
  );

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async (codes: Code[]) => {
      const scannedValue = codes[0]?.value; // QR code contains only the id
      if (scannedValue) {
        try {
          const medicineId = parseInt(scannedValue, 10);
          if (isNaN(medicineId)) {
            throw new Error('Invalid Medicine ID');
          }

          const medicineData = await fetchScannedMedicines(medicineId);
          console.log('Fetched Medicine Data:', medicineData);

          if (medicineData) {
            dispatch(setQrCodeToScanData(medicineData));
            navigation.navigate('MedicineDetails', {medicineData});
          } else {
            throw new Error('No medicine data found');
          }
        } catch (error) {
          console.error('Error fetching medicine data:', error);
          Alert.alert('Error', 'Invalid QR Code. Please scan again.');

          if (authStatus) {
            navigation.navigate('UserDrawer' as never);
          } else {
            navigation.goBack();
          }
        }
      }
    },
  });

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Device Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {hasPermission && (
        <Camera
          style={StyleSheet.absoluteFill}
          codeScanner={codeScanner}
          device={device}
          isActive={true}
        />
      )}
    </View>
  );
};

export default CameraScanner;
