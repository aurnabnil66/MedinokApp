import React, { type FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../Components/CustomButton/CustomButton';
import Header from '../../Components/Header/Header';
import OtpComponent from '../../Components/OtpComponent/OtpComponent';
import { colors } from '../../theme/colors';

import styles from './style';

const EnterOtp: FC = () => {
  const navigation = useNavigation();
  let otpRef: any = null; // Use to call the clearOtp method in Otp component
  const handleVerify: any = () => {
    otpRef.clearOtp();
    navigation.navigate('ResetPassword' as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Enter Your OTP" />
      </View>
      <View style={styles.otpInputPosition}>
        <OtpComponent ref={ref => (otpRef = ref)} />
      </View>
      <View style={styles.verifyOtpButtonPosition}>
        <CustomButton
          onPress={handleVerify}
          icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
          text="Verify"
        />
      </View>
      <View style={styles.reSendOtpTextPosition}>
        <TouchableOpacity>
          <Text style={styles.reSendOtpText}>Re-Send The OTP Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterOtp;
