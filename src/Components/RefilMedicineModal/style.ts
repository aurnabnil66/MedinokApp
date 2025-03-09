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
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    height: verticalScale(210),
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
    fontSize: moderateScale(16),
  },
  modalSubTitle: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
  },
  okButton: {
    alignItems: 'center',
    flex: 1,
    marginLeft: scale(10),
    padding: scale(10)
  },
  addMedInput: {
    borderRadius: scale(2),
    borderWidth: scale(0.15),
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    height: verticalScale(40),
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(10),
    width: scale(80),
    marginTop: verticalScale(12),
    left: scale(20)
  },
  remindInput: {
    borderRadius: scale(2),
    borderWidth: scale(0.15),
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    height: verticalScale(40),
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(10),
    width: scale(80),
    marginTop: verticalScale(12),
    left: scale(6)
  },
  inputContainer: {
    width: '100%', 
    height: scale(40), 
    borderRadius: 5,
    marginTop: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  addMedLabel: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(16),
  },
  remindMedLabel: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
  },
  medLabel: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(16),
  }
});

export default styles;
