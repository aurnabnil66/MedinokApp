import { moderateScale, ScaledSheet } from 'react-native-size-matters';

import { colors } from '../theme/colors';

const styles = ScaledSheet.create({
  usernameText: {
    fontSize: moderateScale(14),
    fontFamily: 'WorkSansSemiBold',
    color: colors.header
  },
  greetingsText: {
    fontSize: moderateScale(12),
    fontFamily: 'WorkSansMedium',
    color: colors.mainText
  },
  backNavigationProperties: {
    flexDirection: 'row'
  },
  backNavigationText: {
    fontSize: moderateScale(14),
    fontFamily: 'WorkSansMedium',
    color: colors.buttonBg,
    alignSelf: 'center'
  }
});

export default styles;
