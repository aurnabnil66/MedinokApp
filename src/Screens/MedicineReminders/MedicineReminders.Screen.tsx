import React, { type FC, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { type RootState } from '@/store';
import { setExtraMedicineReminder } from '@/store/slices/features/medicineDetailsExtraSetting/slice';

import MedicineReminderLogo from '../../assets/medicine-reminder';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Header from '../../Components/Header/Header';
import { colors } from '../../theme/colors';

import styles from './style';

const MedicineReminders: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();
  const { prevRoute } = route.params as { prevRoute: string };

  const [medicineReminderTotalReq, setMedicineReminderTotalReq] = useState('');
  const [medicineReminderCurrentStock, setMedicineReminderCurrentStock] = useState('');
  const [medicineReminderRemindToLeft, setMedicineReminderRemindToLeft] = useState('');

  const medicineLocalId = useSelector((state: RootState) => state.medicineDetails.medicineLocalId);

  const handleNext: any = () => {
    setMedicineReminderTotalReq('');
    setMedicineReminderCurrentStock('');
    setMedicineReminderRemindToLeft('');

    dispatch(
      setExtraMedicineReminder([
        {
          medicineReminderTotalReq,
          medicineReminderCurrentStock,
          medicineReminderRemindToLeft,
          medicineLocalId
        }
      ])
    );
    navigation.navigate(`${prevRoute}` as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Medicine Reminders" />
      </View>
      <View style={styles.imagePosition}>
        <MedicineReminderLogo />
      </View>
      <View style={styles.subHeadingPosition}>
        <Header subHeader="Set medicine reminders" />
      </View>

      <View style={styles.chipPosition}>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              <Text style={styles.chipText}>Total Required :</Text>
              <View style={styles.totalRequiredInputPosition}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                  style={styles.medicineInput}
                  onChangeText={setMedicineReminderTotalReq}
                  value={medicineReminderTotalReq}
                />
                <Text style={styles.medicineText}>Medicine</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              <Text style={styles.chipText}>Current Stock :</Text>
              <View style={styles.currentStockInputPosition}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                  style={styles.medicineInput}
                  onChangeText={setMedicineReminderCurrentStock}
                  value={medicineReminderCurrentStock}
                />
                <Text style={styles.medicineText}>Medicine</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              <Text style={styles.chipText}>Remind When Left :</Text>
              <View style={styles.remindLeftInputPosition}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                  style={styles.medicineInput}
                  onChangeText={setMedicineReminderRemindToLeft}
                  value={medicineReminderRemindToLeft}
                />
                <Text style={styles.medicineText}>Medicine</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {medicineReminderTotalReq.trim() !== '' &&
        medicineReminderCurrentStock.trim() !== '' &&
        medicineReminderRemindToLeft.trim() !== '' && (
          <View style={styles.NextbuttonPosition}>
            <CustomButton
              onPress={handleNext}
              icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
              text="Next"
            />
          </View>
        )}
    </View>
  );
};

export default MedicineReminders;
