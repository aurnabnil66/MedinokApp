import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  askAboutAccount: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(15)
  },
  askAboutAccountText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  componentsPosition: {
    alignItems: 'center',
    marginTop: verticalScale(10)
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  forgotPassword: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
  guestGreetingsText: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(18)
  },
  guestSignInButton: {
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    borderRadius: scale(30),
    flexDirection: 'row',
    gap: scale(5),
    height: verticalScale(43),
    justifyContent: 'center',
    width: scale(160)
  },
  guestSignInButtonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(50)
  },
  guestSignInButtonText: {
    color: colors.white,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(15)
  },
  headingPosition: {
    alignItems: 'center',
    top: verticalScale(10)
  },
  signUpText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    textDecorationLine: 'underline'
  },
  signUptext: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(16)
  },
  textForGuest: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(15),
    textAlign: 'center'
  }
});

export default styles;
