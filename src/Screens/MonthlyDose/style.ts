import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flex: 1
  },
  buttonPosition: {
    bottom: verticalScale(18),
    position: 'absolute'
  },
  chip: {
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    height: verticalScale(35),
    justifyContent: 'center',
    marginTop: verticalScale(12),
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
    marginBottom: verticalScale(20),
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
  progressBarPosition: {
    borderWidth: scale(0)
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
  },
  selectedDaysList: {
    maxHeight: '15%'
  },
  selectedDaysText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    marginLeft: scale(10),
    marginTop: verticalScale(5)
  },
  timesOfEachDayText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(16)
  },
  timesOfEachDayTextPosition: {
    left: scale(10),
    marginTop: verticalScale(20)
  }
});

export default styles;
