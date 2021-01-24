import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      // IconComponent={Ionicons}
      iconSize={23}
      color={Colors.accentColor}
    />
  );
};

export default CustomHeaderButton;
