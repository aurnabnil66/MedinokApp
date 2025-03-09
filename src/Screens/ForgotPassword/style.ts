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
  inputHeader: {
    color: colors.header,
    fontSize: moderateScale(14),
    fontWeight: '500'
  },
  inputText: {
    color: colors.header,
    fontSize: moderateScale(14),
    fontWeight: '400'
  },
  resetPassowrdButton: {
    alignItems: 'center',
    marginTop: verticalScale(20)
  },
  textInputComponentProperties: {
    alignItems: 'center'
  },
  textInputPosition: {
    gap: verticalScale(6),
    marginTop: verticalScale(40)
  }
});

export default styles;
