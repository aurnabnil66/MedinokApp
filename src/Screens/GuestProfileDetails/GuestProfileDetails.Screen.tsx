import React, { type FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import GuestImage from '../../assets/guest-image';
import Header from '../../Components/Header/Header';
import { colors } from '../../theme/colors';

import styles from './style';

const GuestProfileDetails: FC = () => {
  const navigation = useNavigation();

  const handleGuestLogin: any = () => {
    navigation.navigate('Login' as never);
  };

  const handleCreateAccount: any = () => {
    navigation.navigate('CreateAccount' as never);
  };

  const handleForgotPassword: any = () => {
    navigation.navigate('ForgotPassword' as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Profile Details" />
      </View>
      <View style={styles.componentsPosition}>
        <GuestImage />
      </View>
      <View style={styles.componentsPosition}>
        <Text style={styles.guestGreetingsText}>Hello Guest!</Text>
      </View>
      <View style={styles.componentsPosition}>
        <Text style={styles.textForGuest}>
          We can only back up your information if you login to your account. Please{' '}
          <Text style={styles.signUptext}> Sign Up</Text> if you don’t have an account. If you
          already have an account please
          <Text style={styles.signUptext}> Sign In</Text>.
        </Text>
      </View>

      <View style={styles.guestSignInButtonPosition}>
        <TouchableOpacity style={styles.guestSignInButton} onPress={handleGuestLogin}>
          <Text style={styles.guestSignInButtonText}>Sign In</Text>
          <AntDesign name="arrowright" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.askAboutAccount}>
        <Text style={styles.askAboutAccountText}>Don’t have an account? {'  '}</Text>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuestProfileDetails;
