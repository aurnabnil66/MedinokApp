import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  NextbuttonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(275)
  },
  chip: {
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    height: verticalScale(35),
    justifyContent: 'center',
    marginTop: verticalScale(5),
    width: scale(330)
  },
  chipContentProperties: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20
  },
  chipPosition: {
    alignItems: 'center',
    marginTop: verticalScale(10)
  },
  chipProperties: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  chipText: {
    alignSelf: 'center',
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    marginLeft: scale(10)
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  headingPosition: {
    alignItems: 'center',
    top: verticalScale(30)
  },
  imagePosition: {
    alignItems: 'center',
    top: verticalScale(30)
  },
  instructionProperties: {
    alignItems: 'center',
    borderWidth: scale(0.17),
    height: scale(40),
    justifyContent: 'center',
    marginRight: scale(5),
    width: scale(168)
  },
  medicineInput: {
    borderRadius: scale(2),
    borderWidth: scale(0.15),
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    height: scale(34),
    textAlign: 'center',
    width: scale(80)
  },
  medicineInputContent: {
    flexDirection: 'row',
    gap: scale(15),
    justifyContent: 'center',
    marginTop: scale(10)
  },
  medicineInputHeaderPosition: {
    alignItems: 'center',
    marginTop: scale(30)
  },
  medicineInputHeaderText: {
    color: colors.mainText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(15)
  },
  medicineText: {
    alignSelf: 'center',
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  selectButton: {
    alignItems: 'center',
    backgroundColor: colors.selectButtonBg,
    borderRadius: scale(6),
    height: verticalScale(27),
    justifyContent: 'center',
    position: 'relative',
    right: scale(15),
    width: scale(145)
  },
  selectButtonText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium'
  },
  subHeadingPosition: {
    left: scale(10),
    marginTop: verticalScale(30)
  },
  treatmentDurationContainer: {
    backgroundColor: colors.textInput,
    position: 'absolute',
    right: scale(10),
    top: verticalScale(240)
  },
  treatmentDurationText: {
    color: colors.header
  }
});

export default styles;
