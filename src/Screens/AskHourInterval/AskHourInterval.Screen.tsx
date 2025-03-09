import React, { type FC, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import MedicineLogo from '../../assets/medicine-logo';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomNumberPickerModal from '../../Components/CustomNumberPickerModal/CustomNumberPickerModal';
import { colors } from '../../theme/colors';

import styles from './style';
import { useDispatch } from 'react-redux';
import { updateTimeInterval } from '@/store/slices/features/medicineDetails/slice';

const AskHourInterval: FC = () => {
  const navigation = useNavigation();
  const disptach = useDispatch();
  const [selectedNumber, setSelectedNumber] = useState('');
  const [open, setOpen] = useState(false); // for time picker

  const handleSelectNumber: any = () => {
    setOpen(true);
  };

  const clearNumberSelection: any = () => {
    setSelectedNumber('');
  };

  const handleNext: any = () => {
    navigation.navigate('EveryXhoursDose' as never);
  };

  const handleValueChange: any = (data: string, selectedIndex: number) => {
    setSelectedNumber(data);
  };

  const okPress: any = () => {
    disptach(updateTimeInterval(selectedNumber));
    setOpen(false);
  };

  const cancelPress: any = () => {
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <Progress.Bar color="#A6BDF8" progress={0.4} width={380} style={styles.progressBarPosition} />
      <View style={styles.imagePosition}>
        <MedicineLogo />
      </View>
      <View style={styles.headingPosition}>
        <Text style={styles.headingText}>When do you need to take the dose?</Text>
      </View>

      <View style={styles.chipPosition}>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              {selectedNumber !== '' && (
                <TouchableOpacity onPress={clearNumberSelection}>
                  <FontAwesome name="minus-circle" size={30} color={'red'} />
                </TouchableOpacity>
              )}
              <Text style={styles.chipText}>Time Interval</Text>
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={handleSelectNumber}>
              <Text style={styles.selectButtonText}>
                {selectedNumber === '' ? 'Select' : selectedNumber}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Time Picker modal */}
      {open && (
        <CustomNumberPickerModal
          isVisible={open}
          min={1}
          max={60}
          selectedValue={selectedNumber}
          onValueChange={handleValueChange}
          onOk={okPress}
          onCancel={cancelPress}
          leftText="Every"
          rightText="Hours"
        />
      )}

      {selectedNumber !== '' && (
        <View style={styles.buttonContainer}>
          <View style={styles.buttonPosition}>
            <CustomButton
              onPress={handleNext}
              icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
              text="Next"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AskHourInterval;
