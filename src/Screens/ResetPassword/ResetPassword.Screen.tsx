import React, { type FC, useState } from 'react';
import { Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import Header from '../../Components/Header/Header';
import { colors } from '../../theme/colors';

import styles from './style';

const ResetPassword: FC = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState<string>('');
  const handleVerify: any = () => {
    navigation.navigate('PasswordChanged' as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Reset Password" />
      </View>
      <View style={styles.textInputProperties}>
        <View style={styles.textInputPosition}>
          <Text style={styles.inputHeader}>Password</Text>
          <CustomTextInput
            type="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password..."
            maxLength={8}
            inputStyle={styles.inputText}
            isPassword={true}
            leftIcon={<MaterialCommunityIcons name="lock-outline" size={25} color={'#888888'} />} // Left icon
          />
        </View>
        <View style={styles.textInputPosition}>
          <Text style={styles.inputHeader}>Confirm Password</Text>
          <CustomTextInput
            type="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password..."
            maxLength={8}
            inputStyle={styles.inputText}
            isPassword={true}
            leftIcon={<MaterialCommunityIcons name="lock-outline" size={25} color={'#888888'} />} // Left icon
          />
        </View>
      </View>
      <View style={styles.resetPasswordButtonPosition}>
        <CustomButton
          onPress={handleVerify}
          icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
          text="Reset Password"
        />
      </View>
    </View>
  );
};

export default ResetPassword;
