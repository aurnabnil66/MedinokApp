import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  calendarContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scale(16),
    height: verticalScale(440), // Adjust height as needed
    padding: verticalScale(12),
    width: scale(300) // Adjust width as needed
  },
  calendarStyle: {
    height: 'auto',
    width: scale(270)
  },
  cancelAndOKButtonText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  cancelAndOKbuttonPosition: {
    flexDirection: 'row',
    gap: scale(22),
    left: scale(175),
    marginTop: verticalScale(400),
    position: 'absolute'
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: colors.modalBackground,
    flex: 1,
    justifyContent: 'center'
  },
  scrollViewContainer: {
    maxHeight: '27%',
    width: '90%'
  },
  selectedDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(1),
    marginTop: '5%'
  },
  selectedDaysHeaderText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12)
  },
  selectedDaysText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
    textAlign: 'justify'
  }
});

export default styles;
