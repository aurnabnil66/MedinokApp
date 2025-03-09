import React, { type FC } from 'react';
import { Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import AddWithQrCode from '../../assets/add-with-qr-code';
import Hand from '../../assets/hand';
import TinyQrCodeImage from '../../assets/tiny-qr-code-image';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Header from '../../Components/Header/Header';
import { colors } from '../../theme/colors';

import styles from './style';

const MedicineAddingMethod: FC = () => {
  const navigation = useNavigation();
  const handleAddManually: any = () => {
    navigation.navigate('AddMedicineManually' as never);
  };
  const handleScanQrCode: any = () => {
    navigation.navigate('CameraScanner' as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerPosition}>
        <Header mainHeader="Add Medicine" />
      </View>
      <View style={styles.handLogoPosition}>
        <Hand />
      </View>
      <View style={styles.subHeaderPosition}>
        <Text style={styles.subHeader}>How do you want to add your medicine?</Text>
      </View>

      <View style={styles.tinyQrCodeIconPosition}>
        <TinyQrCodeImage />
      </View>
      <View style={styles.scanQrCodebuttonPosition}>
        <CustomButton
          onPress={handleScanQrCode}
          icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
          text="Scan QR Code"
        />
      </View>
      <View style={styles.horizontalLine}></View>
      <View style={styles.addWithQrCodeLogoPosition}>
        <AddWithQrCode />
      </View>
      <View style={styles.addManuallybuttonPosition}>
        <CustomButton
          onPress={handleAddManually}
          icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
          text="Add Manually"
        />
      </View>
    </View>
  );
};

export default MedicineAddingMethod;
