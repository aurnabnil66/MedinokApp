import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  appDeveloperNameText: {
    color: colors.white,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    fontWeight: '500',
    textAlign: 'center'
  },
  appTypeText: {
    color: colors.white,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(18),
    textAlign: 'center'
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    bottom: verticalScale(30),
    position: 'absolute',
    textAlign: 'center'
  }
});

export default styles;
