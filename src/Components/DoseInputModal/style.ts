import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  buttonText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium'
  },
  cancelButton: {
    alignItems: 'center',
    flex: 1,
    marginRight: scale(10),
    padding: scale(10)
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    height: verticalScale(150),
    padding: verticalScale(20),
    width: scale(280)
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: colors.modalBackground,
    flex: 1,
    justifyContent: 'center'
  },
  modalTitle: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    marginBottom: verticalScale(10)
  },
  okButton: {
    alignItems: 'center',
    flex: 1,
    marginLeft: scale(10),
    padding: scale(10)
  },
  textInput: {
    borderRadius: scale(2),
    borderWidth: scale(0.15),
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    height: verticalScale(40),
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(10),
    width: '100%'
  }
});

export default styles;
