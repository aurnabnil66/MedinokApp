import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  headingPosition: {
    alignItems: 'center',
    top: verticalScale(20)
  },
  otpInputPosition: {
    alignItems: 'center',
    marginTop: verticalScale(80)
  },
  reSendOtpText: {
    color: colors.buttonBg,
    fontSize: moderateScale(14),
    fontWeight: '400',
    textAlign: 'center'
  },
  reSendOtpTextPosition: {
    marginTop: verticalScale(20)
  },
  verifyOtpButtonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(40)
  }
});

export default styles;
