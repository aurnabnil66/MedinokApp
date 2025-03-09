import React, { type FC, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { setMedicineType } from '@/store/slices/features/medicineDetails/slice';

import MedicineDoseTime from '../../assets/medicine-dose-time';
import CustomButton from '../../Components/CustomButton/CustomButton';
import type IMedicineStrengthProps from '../../Interfaces/IMedicineStrengthProps';
import { colors } from '../../theme/colors';
import medicineTypes from '../../utils/medicineTypes';

import styles from './style';

const MedicineType: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState<string>('');

  const handleNext: any = () => {
    dispatch(setMedicineType({ typeMed: selectedType }));
    setSelectedType('');
    navigation.navigate('MedicineDoses' as never);
  };

  // const handleSkip: any = () => {
  //   navigation.navigate('MedicineDoses' as never);
  // };

  const RenderItems: React.FC<IMedicineStrengthProps> = ({ item, selectedUnit, onPress }) => {
    return (
      <View style={styles.unitItemsList}>
        <TouchableOpacity style={styles.unitItems} onPress={onPress}>
          <View style={styles.unitProperties}>
            <Text style={styles.formsItemsText}>{item}</Text>
            {selectedUnit === item && <AntDesign name="check" size={28} color={colors.buttonBg} />}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Progress.Bar color="#A6BDF8" progress={0.4} width={380} style={styles.progressBarPosition} />
      <View style={styles.imagePosition}>
        <MedicineDoseTime />
      </View>

      <View style={styles.headingPosition}>
        <Text style={styles.headingText}>Choose Medicine Type</Text>
      </View>

      <View style={styles.formsPosition}>
        <Text style={styles.formsText}>Forms</Text>
      </View>
      <FlatList
        style={styles.formsItemsPosition}
        data={medicineTypes}
        renderItem={({ item, index }) => (
          <RenderItems
            item={item}
            index={index}
            selectedUnit={selectedType}
            onPress={() => {
              setSelectedType(selectedType === item ? '' : item);
            }}
            key={index.toString()}
          />
        )}
      />
      {selectedType !== '' ? (
        <View style={styles.NextButtonPosition}>
          <CustomButton
            onPress={handleNext}
            icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
            text="Next"
          />
        </View>
      ) : (
        <></>
      )}
      {/* <View style={styles.skipTextPosition}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default MedicineType;
