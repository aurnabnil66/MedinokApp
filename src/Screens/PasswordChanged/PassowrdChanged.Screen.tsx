import React, { type FC, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  FadeInUp,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import SuccessStar from '../../assets/success-star';
import CustomButton from '../../Components/CustomButton/CustomButton';
import { colors } from '../../theme/colors';

import styles from './style';

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

const PasswordChanged: FC = () => {
  const navigation = useNavigation();
  const sv = useSharedValue(0);
  const scale = useSharedValue(1);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  useEffect(() => {
    scale.value = withTiming(scale.value * 3, { duration: 1000 });
    sv.value = withTiming(1, { duration, easing });
  }, []);

  const handleBackToLogin: any = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, scaleStyles]}>
        <SuccessStar />
      </Animated.View>
      <Animated.Text entering={FadeInUp.delay(1000)} exiting={FadeOut} style={styles.mainText}>
        Password changed
      </Animated.Text>
      <Animated.Text entering={FadeInUp.delay(1300)} exiting={FadeOut} style={styles.subText}>
        Your password has been changed succesfully
      </Animated.Text>
      <Animated.View
        entering={FadeInUp.delay(1800)}
        exiting={FadeOut}
        style={styles.backToLoginButtonPosition}>
        <CustomButton
          onPress={handleBackToLogin}
          icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
          text="Back To Login"
        />
      </Animated.View>
    </View>
  );
};

export default PasswordChanged;
