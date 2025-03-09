import React, {JSX, type FC} from 'react';
import {Alert, PermissionsAndroid, Platform, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import QrCodeLogo from '../../assets/qr-code-logo';
import CustomButton from '../../Components/CustomButton/CustomButton';
import {colors} from '../../theme/colors';

import styles from './style';

const ScanQrCode: FC = (): JSX.Element => {
  const navigation = useNavigation();

  const handlePress: any = () => {
    navigation.navigate('CameraScanner' as never);
  };

  // Request Android notification permission
  const requestAndroidNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.warn('Notification permission denied');
          Alert.alert(
            'Permission required',
            'Please enable notifications in settings.',
          );
        }
      } catch (err) {
        console.error('Permission request error:', err);
      }
    }
  };

  requestAndroidNotificationPermission();

  return (
    <View style={styles.container}>
      <QrCodeLogo />
      <View style={styles.buttonPosition}>
        <CustomButton
          onPress={() => handlePress()}
          text="Let’s Scan QR Code"
          icon={<Icon name="arrowright" size={30} color={colors.white} />}
        />
      </View>
    </View>
  );
};

export default ScanQrCode;
