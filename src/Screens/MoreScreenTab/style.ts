import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  BackbuttonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  chip: {
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    height: scale(55),
    justifyContent: 'center',
    marginTop: verticalScale(5),
    width: scale(330),
  },
  inventoryChip: {
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    height: scale(125),
    justifyContent: 'center',
    marginTop: verticalScale(5),
    width: scale(330),
  },
  remindLeftTextPosition: {
    marginTop: scale(8),
  },
  refilButton: {
    height: scale(25),
    width: scale(80),
    backgroundColor: colors.buttonBg,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: scale(5),
  },
  refilButtonText: {
    color: colors.white,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(13),
  },
  refilButtonPosition: {
    marginTop: scale(10),
    right: scale(10),
  },
  refilButtonPropeties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medicineNameAndPillsLeft: {
    flexDirection: 'row',
    gap: scale(138),
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  doseComponent: {
    gap: verticalScale(2),
  },
  doseDatesPosition: {
    flexDirection: 'row',
    gap: scale(5),
  },
  doseDetailsPosition: {
    justifyContent: 'center',
    marginLeft: scale(20),
  },
  prescriptionDetailsPosition: {
    justifyContent: 'center',
    marginRight: scale(5),
  },
  prescriptionImageStyle: {
    height: '120%',
    width: '12%',
    marginLeft: scale(10),
  },
  headingPosition: {
    alignItems: 'center',
    top: verticalScale(10),
  },
  medicineDoseComponentPosition: {
    alignItems: 'center',
  },
  medicineDoseProperties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pillsLeft: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(13),
  },

  pillsLeftDetailsText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
  },
  remindLeftText: {
    color: colors.error,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
  },
  noStockValueText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
  },
  pillsLeftPosition: {
    marginRight: scale(20),
  },
  pillsLeftPress: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: scale(2),
  },
  refillsHeadingProperties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: scale(10),
    marginTop: verticalScale(20),
  },
  refillsText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
  },
  viewAllPress: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: scale(2),
    justifyContent: 'space-between',
    right: scale(20),
  },
  viewAllText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
  },
  moreSettingsListStyle: {
    flexDirection: 'column',
  },
  scrollContainerStyle: {
    paddingBottom: scale(15),
  },
  itemHeaderStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButtonPosition: {
    top: scale(0.5),
  },
  emptyDataTextPosition: {
    marginTop: scale(260),
    alignItems: 'center',
  },
  emptyDataTextStyle: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
  },
  requiredValueEmptyText: {
    color: colors.error,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
  },
  requiredEmptyTextPosition: {
    left: 5,
  },
});

export default styles;
