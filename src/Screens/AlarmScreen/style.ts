import { colors } from '@/theme/colors';
import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionBoxPosition: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionBox: {
    backgroundColor: colors.textInput,
    height: scale(150),
    width: scale(230),
    borderRadius: 10,
    alignItems: 'center',
  },
  medicineNameText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(16)
  },
  medicineNameProperties: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    marginTop: scale(20)
  },
  doseDetailsProperties: {
    marginTop: scale(10),
    flexDirection: 'column',
    gap: scale(5)
  },
  scheduleAndDoseProperties: {
    flexDirection: 'row',
    gap: scale(8)
  },
  scheduleAndDoseText: {
    color: colors.typedText,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12)
  },
  userNameProperties: {
    flexDirection: 'row',
    gap: scale(5),
    marginBottom: scale(20)
  },
  userNameText: {
    color: colors.black,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  refilMedText: {
    color: colors.error,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(14)
  },
  reminderText: {
    color: colors.error,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12)
  },
  btnPosition: {
    marginTop: scale(10)
  },
  btnProperties: {
    flexDirection: 'row',
    gap: scale(30)
  },
  btnBackground: {
    backgroundColor: colors.white,
    height: scale(25),
    width: scale(25),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionText: {
    color: colors.black,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12)
  },
  takenText: {
    color: colors.buttonBg,
    fontFamily: 'WorkSansMedium',
    fontSize: moderateScale(12)
  }
  
});

export default styles;
