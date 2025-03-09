import React, { type FC } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { setMedicineStatus } from '@/store/slices/features/medicineDetails/slice';

import MedicineDoseTime from '../../assets/medicine-dose-time';
import medicineDoseItems from '../../utils/medicineDoseItems';

import styles from './style';

interface timePeriodItemProps {
  item: string;
  index: number;
}

const MedicineDoses: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const RenderItems: React.FC<timePeriodItemProps> = ({ item, index }) => {
    const handlePress: any = () => {
      if (index === 0) {
        dispatch(setMedicineStatus({ medicineStatus: item }));
        navigation.navigate('MedicineDailyDoses' as never);
      } else if (index === 1) {
        navigation.navigate('WeeklyDose' as never);
      } else if (index === 2) {
        navigation.navigate('MonthlyDose' as never);
      } else if (index === 3) {
        navigation.navigate('EveryXdaysDose' as never);
      } else if (index === 4) {
        navigation.navigate('EveryXweeksDose' as never);
      } else if (index === 5) {
        navigation.navigate('EveryXmonthsDose' as never);
      }
    };
    return (
      <View style={styles.medicineDoseItemsPosition}>
        <TouchableOpacity style={styles.medicineDoseItemsProperties} onPress={handlePress}>
          <Text style={styles.medicineDoseItemsText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Progress.Bar color="#A6BDF8" progress={0.2} width={380} style={styles.progressBarPosition} />
      <View style={styles.imagePosition}>
        <MedicineDoseTime />
      </View>

      <View style={styles.headingPosition}>
        <Text style={styles.headingText}>How often do you take it?</Text>
      </View>

      <FlatList
        style={styles.medicineDoseListContainer}
        data={medicineDoseItems}
        renderItem={({ item, index }) => (
          <RenderItems item={item} index={index} key={index.toString()} />
        )}
      />
    </View>
  );
};

export default MedicineDoses;
