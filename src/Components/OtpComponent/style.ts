import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  header: {
    fontSize: moderateScale(14),
    fontWeight: '800'
  },
  otpPosition: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around'
  },
  otpText: {
    alignItems: 'center',
    backgroundColor: colors.textInput,
    borderRadius: scale(30),
    color: colors.header,
    fontSize: moderateScale(50),
    fontWeight: '700',
    height: scale(131),
    justifyContent: 'center',
    width: scale(74)
  }
});

export default styles;
