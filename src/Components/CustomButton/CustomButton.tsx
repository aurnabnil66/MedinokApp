import React from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import type ICustomButtonProps from '../../Interfaces/ICustomButtonProps';

import styles from './style';

const CustomButton: React.FC<ICustomButtonProps> = ({
  text,
  icon,
  onPress,
  disabled,
  pageName
}) => {
  return (
    <View>
      {pageName === 'MedicineDetails' ? (
        <TouchableOpacity disabled={disabled} style={styles.buttonProperties} onPress={onPress}>
          {icon !== true && !disabled ? <View>{icon}</View> : <></>}
          {text !== '' && !disabled ? (
            <Text style={styles.buttonText}>{text}</Text>
          ) : (
            <ActivityIndicator size={'large'} color={'white'} />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity disabled={disabled} style={styles.buttonProperties} onPress={onPress}>
          {text !== '' && !disabled ? (
            <Text style={styles.buttonText}>{text}</Text>
          ) : (
            <ActivityIndicator size={'large'} color={'white'} />
          )}
          {icon !== true && !disabled ? <View>{icon}</View> : <></>}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomButton;
