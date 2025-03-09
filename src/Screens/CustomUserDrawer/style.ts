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
    fontSize: moderateScale(12),
    fontWeight: '400'
  },
  forgotPassword: {
    color: colors.buttonBg,
    fontSize: moderateScale(12),
    fontWeight: '400',
    textAlign: 'center'
  },
  imagePosition: {
    alignItems: 'center',
    top: verticalScale(80)
  },
  logOutButton: {
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    borderRadius: scale(30),
    flexDirection: 'row',
    gap: scale(5),
    height: verticalScale(42),
    justifyContent: 'center',
    width: scale(145)
  },
  logOutButtonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(200)
  },
  logOutButtonText: {
    color: colors.white,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(16)
  },
  signUpText: {
    color: colors.typedText,
    fontSize: moderateScale(12),
    fontWeight: '800',
    textDecorationLine: 'underline'
  },
  signUptext: {
    color: colors.header,
    fontSize: moderateScale(14),
    fontWeight: '300'
  },
  textForGuest: {
    color: colors.typedText,
    fontSize: moderateScale(14),
    fontWeight: '300',
    textAlign: 'center'
  },
  textForGuestPosition: {
    alignItems: 'center',
    marginTop: verticalScale(30)
  },
  userContactItemStyle: {
    flexDirection: 'row',
    gap: scale(11),
    marginTop: scale(15)
  },
  userEmailText: {
    color: colors.mainText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(13)
  },
  userHelpAndFaqItemsStyle: {
    flexDirection: 'row',
    gap: scale(18),
    marginTop: scale(15)
  },
  userIconPosition: {
    left: scale(2)
  },
  userItemsPosition: {
    left: scale(30),
    marginTop: scale(30)
  },
  userItemsText: {
    color: colors.mainText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(16)
  },
  userNamePosition: {
    left: scale(30),
    marginTop: verticalScale(100)
  },
  userNameText: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(16)
  },
  userProfileItemStyle: {
    flexDirection: 'row',
    gap: scale(18)
  },
  userSettingsItemStyle: {
    flexDirection: 'row',
    gap: scale(15),
    marginTop: scale(15)
  }
});

export default styles;
