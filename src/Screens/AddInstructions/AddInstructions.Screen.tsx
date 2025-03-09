import React, { type FC, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { type RootState } from '@/store';
import { setExtraInstrucTion } from '@/store/slices/features/medicineDetailsExtraSetting/slice';

import AddInstructionsLogo from '../../assets/add-instructions';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Header from '../../Components/Header/Header';
import SetInstructionsModal from '../../Components/SetInstructionsModal/SetInstructionsModal';
import { colors } from '../../theme/colors';

import styles from './style';
interface RouteParams {
  prevRoute: string;
}

const AddInstructions: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Access the parameter
  const prevRoute = (route.params as RouteParams)?.prevRoute;

  console.log('prevRoute', prevRoute);

  const dispatch = useDispatch();
  const [instruction, setInstruction] = useState('');
  const [open, setOpen] = useState(false); // for instruction picker
  const [tempInstruction, setTempInstruction] = useState('');

  const [disable, setDisable] = useState(false);

  const medicineLocalId = useSelector((state: RootState) => state.medicineDetails.medicineLocalId);

  const handleSelectInstruction: any = () => {
    setOpen(!open);
  };

  const clearInstructionSelection: any = () => {
    setInstruction('');
  };

  const okPress: any = () => {
    dispatch(setExtraInstrucTion([{ instrucTion: tempInstruction, medicineLocalId }]));
    setInstruction(tempInstruction);
    setOpen(false);
  };

  const cancelPress: any = () => {
    setTempInstruction(instruction);
    setOpen(false);
  };

  const handleNext: any = () => {
    setDisable(true);
    setInstruction('');
    setTempInstruction('');
    navigation.navigate(`${prevRoute}` as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Add Instruction" />
      </View>
      <View style={styles.imagePosition}>
        <AddInstructionsLogo />
      </View>
      <View style={styles.subHeadingPosition}>
        <Header subHeader="When do you need to take the dose?" />
      </View>

      <View style={styles.chipPosition}>
        <View style={styles.chip}>
          <View style={styles.chipProperties}>
            <View style={styles.chipContentProperties}>
              {instruction !== '' && (
                <TouchableOpacity onPress={() => clearInstructionSelection()}>
                  <FontAwesome name="minus-circle" size={30} color={'red'}></FontAwesome>
                </TouchableOpacity>
              )}
              <Text style={styles.chipText}>Instruction</Text>
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={() => handleSelectInstruction()}>
              <Text style={styles.selectButtonText}>
                {instruction === '' ? 'Select' : instruction}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {open && (
        <SetInstructionsModal
          isVisible={open}
          selectedValue={tempInstruction}
          onValueChange={setTempInstruction}
          onOk={okPress}
          onCancel={cancelPress}
        />
      )}

      {instruction !== '' && (
        <View style={styles.NextbuttonPosition}>
          <CustomButton
            onPress={handleNext}
            disabled={disable}
            icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
            text="Next"
          />
        </View>
      )}
    </View>
  );
};

export default AddInstructions;
