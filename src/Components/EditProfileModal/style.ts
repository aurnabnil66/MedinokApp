import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  UpdatebuttonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(25)
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  headingPosition: {
    alignItems: 'center'
  },
  inputHeader: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  inputText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  modalContainer: {
    backgroundColor: colors.modalBackground,
    flex: 1
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: scale(6),
    elevation: scale(5),
    margin: scale(10),
    padding: scale(12),
    top: scale(10)
    //height: 700
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  scrollViewContainer: {
    paddingBottom: verticalScale(15)
  },
  textInputComponentPosition: {
    alignItems: 'center'
  },
  textInputComponentProperties: {
    gap: verticalScale(6),
    marginTop: verticalScale(12)
  },
  textInputStyle: {
    alignItems: 'center',
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    flexDirection: 'row',
    height: verticalScale(40),
    position: 'relative',
    width: scale(200)
  },
  userImagePosition: {
    alignItems: 'center',
    marginTop: verticalScale(10)
  },
  userNameUnderProfileImage: {
    color: colors.header,
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginTop: scale(5)
  },
  genderInputView: {
    alignItems: 'center',
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    flexDirection: 'row',
    height: verticalScale(40),
    position: 'relative',
    width: scale(300)
  },
  genderIconPosition: {
    left: scale(8),
    position: 'absolute'
  },
  genderPlaceHolderStyle: {
    paddingLeft: scale(38),
    paddingVertical: verticalScale(8)
  },
  genderPlaceHolderText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  genderText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  dropDownIconPosition: {
    right: scale(10),
    position: 'absolute'
  },
  dropDownStyle: {
    position: 'absolute',
    marginTop: scale(70),
    width: scale(300),
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: colors.textInput,
    zIndex: 1000
  },
  datePickerPosition: {
    alignItems: 'center'
  },
  datePickerStyle: {
    backgroundColor: 'black'
  },
  confirmDateButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmDateButtonText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(14)
  },
  birthDateErrorText: {
    color: 'red',
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(14)
  }
});

export default styles;
