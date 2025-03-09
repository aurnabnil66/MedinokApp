import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  chooseFileBackground: {
    alignItems: 'center',
    borderColor: colors.selectButtonBg,
    borderRadius: scale(8),
    borderStyle: 'dashed',
    borderWidth: scale(3.34),
    height: verticalScale(200),
    justifyContent: 'center',
    width: scale(330)
  },
  chooseFileButton: {
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    borderRadius: scale(16),
    height: verticalScale(37),
    justifyContent: 'center',
    width: scale(162)
  },
  chooseFileButtonPosition: {
    alignItems: 'center',
    marginTop: verticalScale(10)
  },
  chooseFileHeaderText: {
    color: colors.header,
    fontSize: moderateScale(16),
    fontFamily: 'WorkSansSemiBold',
    marginTop: verticalScale(30)
  },
  chooseFileText: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontFamily: 'WorkSansMedium'
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  fileSelectionContentPosition: {
    alignItems: 'center',
    marginTop: verticalScale(30)
  },
  headingPosition: {
    alignItems: 'center',
    top: verticalScale(30)
  },
  imagePosition: {
    alignItems: 'center',
    top: verticalScale(30)
  },
  imagePreview: {
    height: 200, // Height of the image
    resizeMode: 'contain', // Adjust image scaling
    width: 200 // Width of the image
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    gap: scale(10)
  },
  mainText: {
    color: colors.typedText,
    fontSize: moderateScale(16),
    fontFamily: 'WorkSansMedium'
  },
  subHeadingPosition: {
    left: scale(10),
    marginTop: verticalScale(30)
  },
  subText: {
    color: colors.typedText,
    fontSize: moderateScale(16),
    fontFamily: 'WorkSansMedium',
    marginTop: verticalScale(10)
  },
  fliesHeaderText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(18)
  },
  uploadedfilesPosition: {
    left: scale(10),
    marginTop: scale(15)
  },
  filesIconPosition: {
    left: scale(20),
    marginTop: scale(5),
    flexDirection: 'row',
    gap: scale(18)
  },
  imageNameStyle: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12)
  },

  uploadProgressContainer: {
    alignItems: 'center',
    marginTop: scale(2)
  },
  uploadProgressPosition: {
    flexDirection: 'column'
  },
  uploadProgressText: {
    color: colors.header,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12),
    marginLeft: scale(15)
  },
  progressBarBackground: {
    width: '100%',
    height: scale(10),
    backgroundColor: 'white', // Background color of the progress bar
    overflow: 'hidden' // Ensures the fill doesn't go outside the bar
  },
  progressBarFill: {
    height: '30%',
    backgroundColor: colors.progressbarColor // Color of the progress fill
  },
  removeImageButton: {
    marginLeft: scale(10),
    padding: scale(3)
  },
  removeImageText: {
    color: colors.header, // Color for the cross icon
    fontSize: 16
  },
  SavebuttonPosition: {
    marginTop: scale(65),
    right: scale(52)
  }
});

export default styles;
