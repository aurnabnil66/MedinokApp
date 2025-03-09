import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  buttonProperties: {
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    borderRadius: scale(30),
    flexDirection: 'row',
    gap: scale(10),
    height: verticalScale(56),
    justifyContent: 'center',
    width: scale(315)
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(18)
  }
});

export default styles;
