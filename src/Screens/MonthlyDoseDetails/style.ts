import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  NextbuttonPosition: {
    alignItems: 'center',
    bottom: verticalScale(10)
  },
  addMoreSettingsHeaderPosition: {
    marginTop: verticalScale(24)
  },
  addMoreSettingsHeaderText: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(16),
    left: scale(5)
  },
  addMoresettingsContainer: {
    alignItems: 'center',
    marginTop: verticalScale(5)
  },
  chip: {
    backgroundColor: colors.textInput,
    borderRadius: scale(2),
    height: verticalScale(35),
    justifyContent: 'center',
    marginTop: verticalScale(5),
    width: scale(330)
  },
  chipContentProperties: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: scale(20)
  },
  chipPosition: {
    alignItems: 'center'
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
    left: scale(10),
    marginTop: verticalScale(20)
  },
  headingText: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(18)
  },
  imagePosition: {
    alignItems: 'center',
    top: verticalScale(10)
  },
  intakeNumberText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    left: scale(10),
    marginTop: verticalScale(10)
  },
  progressBarPosition: {
    borderWidth: scale(0)
  },
  scrollViewContainer: {
    paddingBottom: verticalScale(15)
  },
  selectButton: {
    alignItems: 'center',
    backgroundColor: colors.selectButtonBg,
    borderRadius: scale(6),
    height: verticalScale(27),
    justifyContent: 'center',
    position: 'relative',
    right: scale(20),
    width: scale(74)
  },
  selectButtonText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium'
  }
});

export default styles;
