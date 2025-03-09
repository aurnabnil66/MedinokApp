import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  SignInbuttonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(25)
  },
  askAboutAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10)
  },
  askAboutAccountText: {
    color: colors.typedText,
    fontSize: moderateScale(14),
    fontFamily: 'WorkSansMedium'
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  errorTxt: {
    color: colors.error,
    fontSize: moderateScale(14),
    fontFamily: 'WorkSansMedium'
  },
  headingPosition: {
    alignItems: 'center'
  },
  inputHeader: {
    color: colors.header,
    fontSize: moderateScale(14),
    fontFamily: 'WorkSansMedium'
  },
  inputText: {
    color: colors.header,
    fontSize: moderateScale(16),
    fontFamily: 'WorkSansMedium'
  },
  scrollViewContainer: {
    paddingBottom: verticalScale(15)
  },
  signUpText: {
    color: colors.buttonBg,
    fontSize: moderateScale(14),
    fontFamily: 'WorkSansMedium',
    textDecorationLine: 'underline'
  },
  signUpWithHorizontalLine: {
    backgroundColor: colors.subText,
    height: verticalScale(2),
    width: scale(120)
  },
  signUpWithIcons: {
    alignItems: 'center', // Center horizontally
    borderColor: colors.buttonBg,
    borderRadius: scale(20),
    borderWidth: scale(1.5),
    height: scale(56),
    justifyContent: 'center', // Center vertically
    width: scale(56)
  },
  signUpWithIconsContainer: {
    flexDirection: 'row',
    gap: scale(8),
    justifyContent: 'center',
    marginTop: verticalScale(15)
  },
  signUpWithPart: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: scale(16),
    justifyContent: 'space-between'
  },
  textInputComponentPosition: {
    alignItems: 'center'
  },
  textInputComponentProperties: {
    gap: verticalScale(6),
    marginTop: verticalScale(12)
  },
  genderInputView: {
    width: scale(330),
    paddingHorizontal: scale(10),
    height: scale(40),
    borderRadius: scale(6),
    backgroundColor: '#F2F1F6',
    justifyContent: 'center'
  },
  genderInputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  genderHeaderStyle: {
    textAlign: 'left',
    width: '100%',
    left: scale(10),
    marginVertical: scale(8)
  },
  genderErrorTextPosition: {
    marginTop: scale(5),
    right: scale(100)
  },

  birthdayInputcontainer: {
    alignItems: 'center',
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    flexDirection: 'row',
    height: verticalScale(40),
    position: 'relative',
    width: scale(330)
  },
  birthdayInputPlaceholderText: {
    color: colors.typedText,
    fontSize: moderateScale(16),
    fontFamily: 'WorkSansMedium'
  },
  textInput: {
    flex: 1,
    paddingLeft: scale(10),
    paddingVertical: verticalScale(8)
  },
  // textInputError: {
  //   borderColor: colors.error,
  //   borderWidth: 1
  // },
  // textInputFocused: {
  //   borderColor: colors.buttonBg,
  //   borderWidth: 1
  // }
  birthdayInputPlaceholderStyle: {
    flexDirection: 'row',
    gap: scale(12)
  }
});

export default styles;
