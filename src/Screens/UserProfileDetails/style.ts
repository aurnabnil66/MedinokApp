import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  SignInbuttonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(25)
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  detailInfo: {
    alignItems: 'center',
    backgroundColor: colors.textInput,
    borderRadius: scale(6),
    flexDirection: 'row',
    height: verticalScale(40),
    position: 'relative',
    width: scale(330)
  },
  detailInfoText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    marginLeft: scale(20)
  },
  editProfileText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14),
    marginTop: scale(5)
  },
  headingPosition: {
    alignItems: 'center'
  },
  inputHeader: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  scrollViewContainer: {
    paddingBottom: verticalScale(15)
  },
  userDetailsComponentPosition: {
    alignItems: 'center'
  },
  userDetailsComponentProperties: {
    gap: verticalScale(6),
    marginTop: verticalScale(12)
  },
  userImagePosition: {
    alignItems: 'center',
    marginTop: verticalScale(10)
  },
  userNameUnderProfileImage: {
    color: colors.header,
    fontFamily: 'WorkSansSemiBold',
    fontSize: moderateScale(18),
    marginTop: scale(5)
  }
});

export default styles;
