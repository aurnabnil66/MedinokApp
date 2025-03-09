import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  addManuallybuttonPosition: {
    marginTop: verticalScale(20)
  },
  addWithQrCodeLogoPosition: {
    marginTop: verticalScale(60)
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1
  },
  handLogoPosition: {
    marginTop: verticalScale(20)
  },
  headerPosition: {
    top: verticalScale(10)
  },
  horizontalLine: {
    backgroundColor: colors.progressbarColor,
    height: verticalScale(1),
    marginTop: verticalScale(35),
    width: scale(313)
  },
  scanQrCodebuttonPosition: {
    marginTop: verticalScale(25)
  },
  subHeader: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(16),
    marginTop: verticalScale(30)
  },
  subHeaderPosition: {
    marginTop: verticalScale(5)
  },
  tinyQrCodeIconPosition: {
    marginTop: verticalScale(35)
  }
});

export default styles;
