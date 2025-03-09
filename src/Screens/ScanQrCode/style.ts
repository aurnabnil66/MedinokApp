import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  buttonPosition: {
    bottom: verticalScale(10),
    position: 'absolute'
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center'
  }
});

export default styles;
