import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  bottomButtonPosition: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: scale(60),
    justifyContent: 'center'
  },
  item: {
    alignItems: 'center',
    paddingVertical: verticalScale(5)
  },
  itemText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: scale(6),
    height: verticalScale(205),
    padding: verticalScale(14),
    width: scale(230)
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: colors.modalBackground,
    flex: 1,
    justifyContent: 'center'
  },
  okButtonText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  selectedItem: {
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    flexDirection: 'row',
    gap: scale(10),
    justifyContent: 'center'
  },
  selectedItemText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(16)
  }
});

export default styles;
