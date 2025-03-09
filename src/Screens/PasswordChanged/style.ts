import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  backToLoginButtonPosition: {
    marginTop: verticalScale(20)
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    bottom: verticalScale(30),
    justifyContent: 'center'
  },
  mainText: {
    color: colors.mainText,
    fontSize: moderateScale(24),
    fontWeight: '600',
    marginTop: verticalScale(15),
    textAlign: 'center'
  },
  subText: {
    color: colors.subText,
    fontSize: moderateScale(16),
    fontWeight: '400',
    textAlign: 'center'
  }
});

export default styles;
