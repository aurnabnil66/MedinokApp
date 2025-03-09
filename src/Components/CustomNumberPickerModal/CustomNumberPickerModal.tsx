import React, { type FC } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

import type ICustomNumberPickerModalProps from '../../Interfaces/ICustomNumberPickerModalProps';

import styles from './style';

const CustomNumberPickerModal: FC<ICustomNumberPickerModalProps> = ({
  isVisible,
  min,
  max,
  selectedValue,
  onValueChange,
  leftText,
  rightText,
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
          {isSelected && <Text style={styles.sideText}>{leftText}</Text>}
          <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>{item}</Text>
          {isSelected && <Text style={styles.sideText}>{rightText}</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <FlatList
            data={Array.from({ length: max - min + 1 }, (_, i) => min + i)}
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

export default CustomNumberPickerModal;
