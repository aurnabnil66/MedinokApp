import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  brandNameText: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(20),
  },
  buttonPosition: {
    bottom: verticalScale(10),
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
  },
  iconPosition: {
    top: scale(2),
  },
  imagePosition: {
    alignItems: 'center',
    top: verticalScale(20),
  },
  inputHeader: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(14),
  },
  medicineDetailsComponentPosition: {
    alignItems: 'center',
  },
  medicineDetailsComponentProperties: {
    gap: verticalScale(6),
    marginTop: verticalScale(14),
  },
  medicineDetailscontainer: {
    alignItems: 'center',
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    flexDirection: 'row',
    height: 'auto',
    width: scale(332),
  },
  medicineNameAndBrandPosition: {
    //alignItems: 'center',
    marginTop: scale(40),
  },
  manufacturerNameText: {
    color: colors.mainText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
  },
  brandAndManufacturerProperties: {
    //flexDirection: 'row',
    //gap: scale(5),
    alignItems: 'center',
  },
  dosageAndStrengthPosition: {
    flexDirection: 'row',
    gap: scale(10),
    marginLeft: scale(85),
    marginTop: verticalScale(10),
  },
  dosageAndStrengthProperties: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: scale(7),
  },
  dosageAndStrengthStyle: {
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    height: scale(35),
    justifyContent: 'center',
    right: scale(20),
    width: scale(220),
  },
  medicineTypeAndQuantityText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
  },
  manufacturerNamePosition: {
    //marginTop: scale(13),
    alignItems: 'center',
  },
  // manufacturerNameText: {
  //   color: colors.typedText,
  //   fontFamily: 'WorkSansMedium',
  //   fontSize: moderateScale(14),
  // },
  scannedText: {
    color: colors.mainText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
    textAlign: 'justify',
  },
  scannedTextHeader: {
    color: colors.mainText,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(12),
    textAlign: 'justify',
  },
  scannedHeaderAndTextStyle: {
    flexDirection: 'column',
  },
  scrollViewContainer: {
    paddingBottom: verticalScale(15),
  },
  textPosition: {
    marginLeft: scale(12),
    marginRight: scale(15),
    marginTop: scale(8),
  },
});

export default styles;
