import React, { type FC } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { colors } from '../../theme/colors';

const instructionsData = ['Before Meal', 'During Meal', 'After Meal'];

interface IInstructionsModalProps {
  isVisible: boolean;
  selectedValue: string;
  onValueChange: (value: string) => void;
  onOk: () => void;
  onCancel: () => void;
}

const SetInstructionsModal: FC<IInstructionsModalProps> = ({
  isVisible,
  selectedValue,
  onValueChange,
  onOk,
  onCancel
}) => {
  const renderItem: any = ({ item }: { item: number }) => {
    const isSelected = item.toString() === selectedValue;
    return (
      <TouchableOpacity
        onPress={() => {
          onValueChange(item.toString());
        }}>
        <View style={[styles.item, isSelected && styles.selectedItem]}>
          <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>{item}</Text>
          {isSelected && <Ionicons name="checkmark-sharp" size={28} color={colors.buttonBg} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <FlatList
            data={instructionsData}
            renderItem={renderItem}
            keyExtractor={item => item.toString()}
          />
          <View style={styles.bottomButtonPosition}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.okButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOk}>
              <Text style={styles.okButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SetInstructionsModal;
