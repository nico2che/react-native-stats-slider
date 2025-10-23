import React from 'react';
import { View } from 'react-native';
import { useRheostatTheme } from '../theme';

const DefaultProgressBar = () => {
  const theme = useRheostatTheme();
  return (
    <View style={{ backgroundColor: theme.themeColor, height: 4 }} />
  );
};

export default DefaultProgressBar;
