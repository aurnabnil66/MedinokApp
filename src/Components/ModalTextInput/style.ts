import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    flexDirection: 'row',
    height: verticalScale(40),
    position: 'relative',
    width: scale(300)
  },
  iconLeft: {
    left: scale(8),
    position: 'absolute'
  },
  iconRight: {
    position: 'absolute',
    right: scale(10)
  },
  textInput: {
    flex: 1,
    paddingLeft: scale(38),
    paddingVertical: verticalScale(8)
  },
  textInputError: {
    borderColor: colors.error,
    borderWidth: 1
  },
  textInputFocused: {
    borderColor: colors.buttonBg,
    borderWidth: 1
  }
});

export default styles;
