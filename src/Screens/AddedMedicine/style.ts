import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  addAnotherMedButtonPosition: {
    bottom: verticalScale(-195)
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    bottom: verticalScale(30),
    justifyContent: 'center'
  },
  mainText: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(22),
    marginTop: verticalScale(55),
    textAlign: 'center'
  },
  noThanksText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
  noThanksTextPosition: {
    marginBottom: verticalScale(30)
  },
  subText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(16),
    textAlign: 'center'
  }
});

export default styles;
