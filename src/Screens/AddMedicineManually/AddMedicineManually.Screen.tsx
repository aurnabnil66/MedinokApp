import React, { type FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import Header from '../../Components/Header/Header';
import { setMedicineName } from '../../store/slices/features/medicineDetails/slice';
import { colors } from '../../theme/colors';

import styles from './style';

const AddMedicineManually: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [medicineName, setMedName] = useState<string>('');
  const handleNext: any = () => {
    dispatch(setMedicineName({ medicineName }));
    setMedName('');
    navigation.navigate('AddMedicineStrength' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Add Medicine" />
      </View>
      <View style={styles.textInputPosition}>
        <View style={styles.textInputContent}>
          <Text style={styles.inputHeader}>Medicine Name</Text>
          <CustomTextInput
            type="email"
            value={medicineName}
            onChangeText={setMedName}
            placeholder="Enter your medicine name..."
            inputStyle={styles.inputText}
            leftIcon={<Fontisto name="drug-pack" size={30} color={'#888888'} />}
          />
        </View>
      </View>
      {medicineName !== '' && (
        <View style={styles.NextButtonPosition}>
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

export default AddMedicineManually;
