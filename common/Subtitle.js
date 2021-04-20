import React from 'react';
import {Text} from 'react-native';

const Subtitle = ({children, size = 15}) => {
  return <Text style={{fontSize: size}}>{children}</Text>;
};

export default Subtitle;
