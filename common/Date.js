import React from 'react';
import {Text} from 'react-native';

const Subtitle = ({children, numberOfLines = 1, size = 10}) => {
  return (
    <Text numberOfLines={numberOfLines} style={{fontSize: size}}>
      {children}
    </Text>
  );
};

export default Subtitle;
