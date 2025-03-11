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
    if (hasPermission !== true) requestPermission();
  }, [hasPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      const value = codes[0].value ?? string;
      if (value) {
        try {
          const scannedData = JSON.parse(value);

          //
          dispatch(setQrCodeToScanData(scannedData));
          navigation.navigate('MedicineDetails', {scannedData: value});
        } catch (error) {
          console.log('Errroooorrrr', error);
          Alert.alert('Invalid QR Code');
          if (authStatus === true) {
            Alert.alert('Invalid QR Code');
            navigation.navigate('UserDrawer' as never);
          } else {
            Alert.alert('Invalid QR Code');
            navigation.goBack();
          }
        }
      }
    },
  });

  if (device == null) {
    return (
      <View>
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
