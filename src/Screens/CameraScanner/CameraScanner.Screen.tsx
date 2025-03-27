/* eslint-disable */

import React, {type FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, ActivityIndicator} from 'react-native';
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!hasPermission) requestPermission();

    // Cleanup function to ensure camera is deactivated when component unmounts
    return () => {
      setIsActive(false);
    };
  }, [hasPermission, requestPermission]);

  const handleCodeScanned = async (codes: Code[]) => {
    if (isProcessing) return;

    const scannedValue = codes[0]?.value;
    if (!scannedValue) return;

    setIsProcessing(true);
    setIsActive(false);

    try {
      //console.log(`QR code scanned with value: "${scannedValue}"`);

      const medicineId = parseInt(scannedValue, 10);
      // if (isNaN(medicineId)) {
      //   throw new Error(
      //     `Invalid Medicine ID: "${scannedValue}" is not a number`,
      //   );
      // }

      //console.log(`Converted QR code to medicine ID: ${medicineId}`);

      const medicineData = await fetchScannedMedicines(medicineId);

      if (!medicineData) {
        throw new Error(`No medicine found with ID: ${medicineId}`);
      } else {
        //console.log('Successfully fetched medicine data:', medicineData);
        dispatch(setQrCodeToScanData(medicineData));
        navigation.navigate('MedicineDetails', {medicineData});
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error in medicine scan process:', errorMessage);

      Alert.alert(
        'Medicine Not Found',
        `We couldn't find information for this medicine. Error: ${errorMessage}`,
        [
          {
            text: 'Try Again',
            onPress: () => {
              setIsProcessing(false);
              setIsActive(true);
            },
          },
          {
            text: 'Go Back',
            onPress: () => {
              if (authStatus) {
                navigation.navigate('UserDrawer' as never);
              } else {
                navigation.goBack();
              }
            },
          },
        ],
      );
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: handleCodeScanned,
  });

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Camera not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {hasPermission && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            codeScanner={codeScanner}
            device={device}
            isActive={isActive && !isProcessing}
          />
          {isProcessing && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>
                Processing medicine data...
              </Text>
            </View>
          )}
        </>
      )}
      {!hasPermission && (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Camera permission is required
          </Text>
          <Text style={styles.permissionButton} onPress={requestPermission}>
            Grant Permission
          </Text>
        </View>
      )}
    </View>
  );
};

export default CameraScanner;
