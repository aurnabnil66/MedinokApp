import React, { type FC } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';
import styles from './style';

const reminderData = [
  '10 minutes before',
  '30 minutes before',
  '1 day before',
  '1 week before',
  '2 week before'
];

interface ISetReminderModalProps {
  isVisible: boolean;
  selectedValue: string;
  onValueChange: (value: string) => void;
  onOk: () => void;
  onCancel: () => void;
}

const SetReminderModal: FC<ISetReminderModalProps> = ({
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
            data={reminderData}
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

export default SetReminderModal;
