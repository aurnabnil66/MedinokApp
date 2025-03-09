import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  calendarBox: {
    backgroundColor: colors.textInput,
    height: verticalScale(105)
  },
  dateText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(22)
  },
  dayContainer: {
    alignItems: 'center',
    backgroundColor: colors.selectButtonBg,
    borderRadius: scale(18),
    gap: scale(3),
    height: verticalScale(65),
    justifyContent: 'center',
    marginLeft: scale(5),
    marginRight: scale(5),
    width: scale(47)
  },
  dayText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12)
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  monthYear: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(14),
    marginLeft: scale(13)
  },
  navButton: {
    color: colors.buttonBg,
    fontSize: moderateScale(28),
    marginHorizontal: verticalScale(10),
    marginRight: scale(18)
  },
  navButtons: {
    flexDirection: 'row'
  },
  selectedDay: {
    backgroundColor: colors.buttonBg,
    borderRadius: scale(18)
  },
  notSelectedDay: {
    backgroundColor: colors.darkBlue,
    borderRadius: scale(18)
  },
  selectedDayText: {
    color: colors.white,
    fontFamily: 'WorkSansMedium'
  },
  weekContainer: {
    flexDirection: 'row'
  }
});

export default styles;
