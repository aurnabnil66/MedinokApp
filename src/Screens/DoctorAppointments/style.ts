import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  NextbuttonPosition: {
    alignItems: 'center',
    bottom: scale(15)
  },
  chip: {
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    height: verticalScale(43),
    justifyContent: 'center',
    marginTop: verticalScale(5),
    width: scale(330)
  },
  chipContentProperties: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: scale(8),
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
    fontFamily: 'WorkSansMedium'
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
  inputPosition: {
    marginRight: scale(15)
  },
  nameInput: {
    borderRadius: scale(2),
    borderWidth: scale(0.15),
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(16),
    height: scale(38),
    justifyContent: 'center',
    textAlign: 'center',
    width: scale(150)
  },
  reminderContainer: {
    position: 'absolute',
    right: scale(10),
    top: verticalScale(445)
  },
  reminderProperties: {
    alignItems: 'center',
    backgroundColor: colors.textInput,
    borderColor: colors.mainText,
    borderRadius: scale(6),
    borderWidth: scale(1),
    height: scale(40),
    justifyContent: 'center',
    marginTop: scale(1),
    width: scale(168)
  },
  reminderText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium'
  },
  scrollViewContainer: {
    paddingBottom: verticalScale(15)
  },
  selectButton: {
    alignItems: 'center',
    backgroundColor: colors.selectButtonBg,
    borderRadius: scale(6),
    height: verticalScale(30),
    justifyContent: 'center',
    position: 'relative',
    right: scale(20),
    width: scale(170)
  },
  selectButtonText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium'
  },
  subHeadingPosition: {
    left: scale(10),
    marginTop: verticalScale(30)
  },
  reminderSelectButtonPosition: {
    left: scale(5)
  },
  reminderSelectButton: {
    alignItems: 'center',
    backgroundColor: colors.selectButtonBg,
    borderRadius: scale(6),
    height: verticalScale(30),
    justifyContent: 'center',
    position: 'relative',
    right: scale(20),
    width: scale(150)
  },
  timeSelectButton: {
    alignItems: 'center',
    backgroundColor: colors.selectButtonBg,
    borderRadius: scale(6),
    height: verticalScale(30),
    justifyContent: 'center',
    position: 'relative',
    right: scale(20),
    width: scale(150)
  },
  selectButtonPosition: {
    left: scale(5)
  },
});

export default styles;
