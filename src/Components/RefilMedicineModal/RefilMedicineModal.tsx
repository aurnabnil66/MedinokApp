import React, {type FC, useState, useEffect} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import type IRefilModalProps from '../../Interfaces/IRefilModalProps';
import {RootState} from '../../store';
import styles from './style';
import {setRefilMedicine} from '../../store/slices/features/medicineDetailsExtraSetting/slice';

const RefilMedicineModal: FC<IRefilModalProps> = ({
  visible,
  onClose,
  onSubmit,
  numKeybaordType,
  medlocId,
}) => {
  const dispatch = useDispatch();

  const medReminderList = useSelector(
    (state: RootState) =>
      state.medicineDetailsExtraSetting.storeMedicineReminder,
  );

  const [addQuantity, setAddQuantity] = useState<string>('');
  const [remindQuantity, setRemindQuantity] = useState<string>('');

  // Function to get the remaining medicine count
  const getRemaining = (medId: string): string => {
    const foundMedicine = medReminderList.find(
      med => med.medicineLocalId === medId,
    );
    return foundMedicine
      ? String(foundMedicine.medicineReminderRemindToLeft)
      : '5'; // Default to 5 if not found
  };

  // Set initial value when modal opens or medlocId changes
  useEffect(() => {
    if (visible && medlocId) {
      setRemindQuantity(getRemaining(medlocId));
    }
  }, [visible, medlocId, medReminderList]);

  // Handle OK Press
  const handleOkPress = () => {
    const addValue = parseInt(addQuantity, 10) || 0;
    const remindValue = parseInt(remindQuantity, 10) || 0;

    dispatch(
      setRefilMedicine({
        medicineLocalId: medlocId,
        refilAmount: addValue,
        reminderAmount: remindQuantity,
      }),
    );

    onSubmit(addValue, remindValue);
    handleCancelPress(); // Reset inputs and close modal
  };

  // Handle Cancel Press
  const handleCancelPress = () => {
    setAddQuantity('');
    setRemindQuantity(getRemaining(medlocId));
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Refill your medicine</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.addMedLabel}>Add:</Text>
            <TextInput
              style={styles.addMedInput}
              maxLength={2}
              value={addQuantity}
              onChangeText={setAddQuantity}
              keyboardType={numKeybaordType ? 'numeric' : 'email-address'}
            />
            <Text style={styles.medLabel}>Med(s)</Text>
          </View>

          {/* <View style={styles.inputContainer}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.remindMedLabel}>Remind</Text>
              <Text style={styles.remindMedLabel}>When Left:</Text>
            </View>
            <TextInput
              style={styles.remindInput}
              maxLength={2}
              value={remindQuantity}
              onChangeText={setRemindQuantity}
              keyboardType={numKeybaordType ? 'numeric' : 'email-address'}
            />
            <Text style={styles.medLabel}>Med(s)</Text>
          </View> */}

          <View style={styles.cancelAndOkButtonPosition}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelPress}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RefilMedicineModal;
