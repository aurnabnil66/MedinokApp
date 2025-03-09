import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  mainHeader: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(24)
  },
  subHeader: {
    color: colors.mainText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(16)
  }
});

export default styles;
