import React from 'react';
import { Text, View } from 'react-native';

import type IHeaderProps from '../../Interfaces/IHeaderProps';

import styles from './style';

const Header: React.FC<IHeaderProps> = ({ mainHeader, subHeader }) => {
  return (
    <View>
      <Text style={styles.mainHeader}>{mainHeader}</Text>
      <Text style={styles.subHeader}>{subHeader}</Text>
    </View>
  );
};

export default Header;
