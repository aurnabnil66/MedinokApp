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
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  errorTxt: {
    color: colors.error,
    fontFamily: 'WorkSansMedium',
    marginBottom: 6
  },
  forgotPassword: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
  guestButton: {
    alignItems: 'center',
    backgroundColor: colors.textInput,
    borderRadius: scale(30),
    flexDirection: 'row',
    gap: scale(12),
    height: verticalScale(56),
    justifyContent: 'center',
    width: scale(315)
  },
  guestButtonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(12)
  },
  guestButtonText: {
    color: colors.typedText,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(18)
  },
  inputHeader: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    marginRight: scale(226)
  },
  inputText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  mainHeader: {
    alignItems: 'center',
    top: verticalScale(50)
  },
  mobileNumberInput: {
    gap: verticalScale(6)
  },
  orHorizontalLine: {
    backgroundColor: colors.subText,
    height: verticalScale(2),
    width: scale(120)
  },
  orPart: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: scale(16),
    justifyContent: 'space-between'
  },
  orPartPosition: {
    alignItems: 'center',
    marginTop: verticalScale(12)
  },
  orText: {
    color: colors.mainText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(18)
  },
  passwordInput: {
    gap: verticalScale(6),
    marginTop: verticalScale(20)
  },
  signInButtonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(25)
  },
  signUpText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    textDecorationLine: 'underline'
  },
  subHeaderFirstLine: {
    alignItems: 'center',
    top: verticalScale(5)
  },
  subHeaderSecondLine: {
    alignItems: 'center',
    top: verticalScale(-20)
  },
  textInputComponentsPosition: {
    alignItems: 'center',
    marginTop: scale(30)
  },
  textInputError: {
    borderColor: colors.error,
    borderWidth: 1
  }
});

export default styles;
