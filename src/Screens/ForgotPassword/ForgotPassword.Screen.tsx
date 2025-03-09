import React, { type FC, useState } from 'react';
import { Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import Header from '../../Components/Header/Header';
import { colors } from '../../theme/colors';

import styles from './style';

const ForgotPassword: FC = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState<string>('');
  const handleResetPassword: any = () => {
    navigation.navigate('EnterOtp' as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Forget Password" />
      </View>
      <View style={styles.textInputComponentProperties}>
        <View style={styles.textInputPosition}>
          <Text style={styles.inputHeader}>Mobile Number</Text>
          <CustomTextInput
            type="mobile"
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter your mobile number..."
            maxLength={11}
            inputStyle={styles.inputText}
            leftIcon={<Feather name="smartphone" size={25} color={'#888888'} />} // Left icon
          />
        </View>
      </View>
      <View style={styles.resetPassowrdButton}>
        <CustomButton
          onPress={handleResetPassword}
          icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
          text="Reset Password"
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
