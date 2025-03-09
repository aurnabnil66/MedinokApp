import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type ICustomButtonProps from '../../Interfaces/ICustomButtonProps';

import styles from './style';

const EditProfileModalButton: React.FC<ICustomButtonProps> = ({
  text,
  icon,
  onPress,
  disabled
}) => {
  return (
    <View>
      <TouchableOpacity disabled={disabled} style={styles.buttonProperties} onPress={onPress}>
        {text !== '' ? <Text style={styles.buttonText}>{text}</Text> : <></>}
        {icon !== true ? <View>{icon}</View> : <></>}
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileModalButton;
