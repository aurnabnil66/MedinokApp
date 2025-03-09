import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  askAboutAccount: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(15)
  },
  askAboutAccountText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12)
  },
  forgotPassword: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
    textAlign: 'center'
  },
  guestGreetingsPosition: {
    alignItems: 'center',
    marginTop: verticalScale(100)
  },
  guestGreetingsText: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(16)
  },
  guestSignInButton: {
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    borderRadius: scale(30),
    flexDirection: 'row',
    gap: scale(5),
    height: verticalScale(38),
    justifyContent: 'center',
    width: scale(140)
  },
  guestSignInButtonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(30)
  },
  guestSignInButtonText: {
    color: colors.white,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(13)
  },
  imagePosition: {
    alignItems: 'center',
    top: verticalScale(80)
  },
  signUpText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
    textDecorationLine: 'underline'
  },
  signUptext: {
    color: colors.header,
    fontSize: moderateScale(14)
  },
  textForGuest: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
  textForGuestPosition: {
    alignItems: 'center',
    marginTop: verticalScale(30)
  }
});

export default styles;
