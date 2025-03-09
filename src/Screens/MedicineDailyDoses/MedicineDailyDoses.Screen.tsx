import React, { type FC } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { setTakeStatus } from '@/store/slices/features/medicineDetails/slice';

import DailyDoseLogo from '../../assets/medicine-daily-dose';
import medicineDailyDoseItems from '../../utils/medicineDailyDoseItems';

import styles from './style';

interface timePeriodItemProps {
  item: string;
  index: number;
}

const MedicineDailyDoses: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const RenderItems: React.FC<timePeriodItemProps> = ({ item, index }) => {
    const handlePress: any = () => {
      if (index === 0) {
        dispatch(setTakeStatus({ takeStatus: item }));
        navigation.navigate('OnceAdayDose' as never);
      } else if (index === 1) {
        navigation.navigate('TwiceAdayDose' as never);
      } else if (index === 2) {
        navigation.navigate('ThreeTimesAdayDose' as never);
      } else if (index === 3) {
        navigation.navigate('FourTimesAdayDose' as never);
      } else if (index === 4) {
        navigation.navigate('AskTimeInterval' as never);
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
      <Progress.Bar color="#A6BDF8" progress={0.4} width={380} style={styles.progressBarPosition} />
      <View style={styles.imagePosition}>
        <DailyDoseLogo />
      </View>
      <View style={styles.headingPosition}>
        <Text style={styles.headingText}>How often do you take it?</Text>
      </View>

      <FlatList
        style={styles.medicineDoseListContainer}
        data={medicineDailyDoseItems}
        renderItem={({ item, index }) => (
          <RenderItems item={item} index={index} key={index.toString()} />
        )}
      />
    </View>
  );
};

export default MedicineDailyDoses;
